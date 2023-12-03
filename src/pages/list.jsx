import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Recipe from "../components/recipe";
import Loading from "../components/loading";
import SideBar from "../components/sideNavbar";
import RecipePopup from '../components/recipePopup';

export default function List() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // New state for original data
  const [dataLoading, setDataLoading] = useState(true); // loading state
  const [showRecipe,setShowRecipe] = useState(false); // a state to trigger showing the recipe details
  const [clickedRecipe,setClickedRecipe] = useState(''); // state to store the id of the clicked recipe
  const [selectedCountry, setSelectedCountry] = useState(''); // state to store the nationality string
  const [selectedCategory, setSelectedCategory] = useState(''); // state to store the category string
  const [loadingNewRecipes,setLoadingNewRecipes] = useState(false);

  function updateShowRecipeState(bool){ // a state to handle closing the popup that contains the recipe details
    setShowRecipe(bool);
  }
  function getRecipeId(id){ // a funciont to update the clicked recipe state by importing the id from Recipe component
    setClickedRecipe(id);
  }
  function handleCountrySelection(e) { // event handler and filter trigger
    const newSelectedCountry = e.target.value;
    if(e.target.value === 'All'){ 
      setData(originalData)
    }
    else{
    setSelectedCountry(newSelectedCountry);
    const filteredData = originalData.filter((recipe) => {
      return recipe.meals[0].strArea === newSelectedCountry;
    });
    setData(filteredData);
    }
  }
  function handleCategorySelection(e) {
    const newSelectedCategory = e.target.value;
    if(e.target.value === 'All'){
      setData(originalData)
    }
    else{
    setSelectedCategory(newSelectedCategory);
    const filteredData = originalData.filter((recipe) => {
      return recipe.meals[0].strCategory === newSelectedCategory;
    });
    setData(filteredData);
    }
  }
  function handleIngredientSelection(e) {
    if(e.target.value === 'All'){
      setData(originalData)
    }
    else{
    const extractedIngredients = originalData.filter((recipe) => {
      const allProperties = recipe.meals[0];
      const ingredients = Object.keys(allProperties).filter(key => key.startsWith('strIngredient'));
      const ingredientsValues = ingredients.map(key => allProperties[key]);
      if (ingredientsValues.includes(e.target.value)) {
        return recipe;
      }
    });
    setData(extractedIngredients);
    }
  }
  function handleLoadingMore(){
    getRecipesSet();
    setSelectedCategory("All");
    setSelectedCountry("All");
    setLoadingNewRecipes(true);
  }
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php/images/media/meals/llcbn01574260722.jpg/preview";
  const getRecipesSet = async () => { // fetching a set of recipes from the used api
    const uniqueIds = new Set(); // creating a new empty set to store the unique IDs
    data.forEach((item)=>{
      uniqueIds.add(item.meals[0].idMeal);
    })
    const newDataArray = [...data]; // copying the content of the state data and assiging it to a constant
    for (let i = 0; i < 15; i++) { // fetching 15 recipe (randomly chosen, i could load more but fetching too many may cause network-related issues)
      try { // using try / catch to hanldle the errors
        const response = await axios.get(apiUrl); // fetching the api
        const newData = response.data; // extracting data
        if (!uniqueIds.has(newData.meals[0].idMeal)) { //recipe uniqness control
          newDataArray.push(newData);
          uniqueIds.add(newData.meals[0].idMeal);
        }
        await new Promise(resolve => setTimeout(resolve, 100)); // set a timeout before executing the next loop
      } catch (error) {
        console.error('API call failed'); // error handling
      }
    }
    setOriginalData(newDataArray); //update the original data to the new extracted unique set of recipes
    setData(newDataArray);  
  };
  useEffect(() => {
    getRecipesSet();

  }, []);
  useEffect(()=>{
    if(selectedCategory === "All" && selectedCountry === "All"){
      setData(originalData)
    }
  },[selectedCountry])
  useEffect(() => {
    console.log(data);
  }, [data]);
  useEffect(() => {
    if (data.length >10) {
      data.forEach(item => {
        console.log(item.meals[0].strMeal);
        console.log(item.meals[0].strMealThumb);
      });
      setDataLoading(false);
    }
  }, [data]);
  useEffect(() => {
    console.log('loading state changed');
  }, [dataLoading]);

  const renderRecipes = data.map((recipeData) => {
    return <Recipe getId={getRecipeId} recipeVisibilityFun={updateShowRecipeState} recipeData={recipeData} key={recipeData.meals[0].idMeal}/>;
  });
  
  useEffect(()=>{
    setTimeout(()=>{
      setLoadingNewRecipes(false);
    },3500)
  },[loadingNewRecipes])
  return (
    <div className="list page">
      <SideBar countrySetter={handleCountrySelection} categorySetter={handleCategorySelection} ingredientSetter={handleIngredientSelection} />
      <div className="listPageContent">
        {dataLoading ? <Loading /> : <div className="recipesContainer">{renderRecipes}</div>}
        {dataLoading ? '' : <button  className="loadMoreBtn" onClick={handleLoadingMore}>Load More Recipes!</button>}
      </div>
      {showRecipe ? <RecipePopup clickedRecipeData={ data.filter(item=> item.meals[0].idMeal === clickedRecipe ) } recipeVisibilityFun={updateShowRecipeState}/> : ''}
      <div style={{display:loadingNewRecipes?'block':'none'}} className="loadingNew">Loading new recipes, might take some time...</div>
    </div>
  );
}
