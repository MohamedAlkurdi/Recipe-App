import { useEffect, useState } from "react";
import axios from "axios";
import FavRecipe from "../components/favRecipe";
import Loading from "../components/loading";
import Empty from "./empty";
import RecipePopup from "../components/recipePopup";

export default function Fav() {
  const [originalData,setOriginalData] = useState([]); //this data wont change after first loading
  const [favCount, setFavCount] = useState(0); // the number of the fav recipes
  const [underLineExtention, setUnderLineExtention] = useState(false); // a state targets an event
  const [IDs, setIDs] = useState([]); // favorite recipes IDs
  const [favRecipes, setFavRecipes] = useState([]); // this data can be change, its refernce is the originalData state
  const [loading,setLoading] = useState(true); // related to loading animation 
  const [empty,setEmpty] = useState(false); // turns true if the locale storage is not empty
  const [popVis,setRecipePopupVisibilit] = useState(false); // recipe details popup state
  const [clickedRecipe,setClickedRecipe] = useState(0); // stores the clicked recipe id
  const [searchedItem,setSearchedItem] = useState(''); // stores the imput coming from the search bar

  function updateVisibilityState(bool){ 
    setRecipePopupVisibilit(bool);
  }
  function updateClickedRecipe(id){
    setClickedRecipe(id);
  }

  const getRecipeById = async (id) => { // fetches a recipe using its ID
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      return response.data; // Return the data from the response
    } catch (error) {
      console.error("Error fetching recipe by ID:", error);
      return null;
    }
  }
  const fetchFavRecipes = async () => { // brings the recipes the their IDs are stored int the local storage
    const favRecipesUpdater = [];
    if (IDs.length === favCount) {
      const fetchPromises = IDs.map((id) => getRecipeById(id));
      try {
        const recipesData = await Promise.all(fetchPromises);
        favRecipesUpdater.push(...recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }
    setFavRecipes(favRecipesUpdater);
    setOriginalData(favRecipesUpdater);
    console.log("origial data was born.")
  };

  function updateFavList(id){
    console.log('deleted recipe', id);
    const updatedFavList = favRecipes.filter((recipe) => recipe.meals[0].idMeal !== id);
    setFavRecipes(updatedFavList);
    setFavCount(localStorage.length);
  }

  function handleSearchBarClick(){
    setUnderLineExtention(true);
  }
  function handleClearingList(){
    localStorage.clear();
    const updatedFavList = [];
    setFavRecipes(updatedFavList);
    setFavCount(localStorage.length);
  }
  function handleSearchInput(e){
    setSearchedItem(e.target.value);
    const input = e.target.value.toLowerCase();
    const updatedList = originalData.filter(item=>{
      const title = item.meals[0].strMeal.toLowerCase();
      return title.includes(input);
    })
    setFavRecipes(updatedList);
  }

  useEffect(()=>{
    document.addEventListener('click',(e)=>{
      if(e.target.classList.contains('internalSearchBarContainer')
      || e.target.classList.contains('internalSearchBar')
      ){
      setUnderLineExtention(true);}
      else{
        setUnderLineExtention(false);
      }
    })
    
  },[])

  useEffect(() => {
    setFavCount(localStorage.length);
    const IDsArray = [];
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        IDsArray.push(localStorage[key]);
      }
    }
    setIDs(IDsArray);
  }, []);

  useEffect(()=>{
    if(favCount===0){
      setEmpty(true);
    }else{
      setEmpty(false);
    }
  },[favCount])
  useEffect(()=>{
    if(empty){
      setLoading(false);
    }
    else{
      setLoading(true);

    }
  },[empty])

  useEffect(() => {
    fetchFavRecipes();
  }, [IDs]);

  useEffect(() => {
    console.log("favorite recipes", favRecipes);
  }, [favRecipes]);

  useEffect(() => {
    if (favRecipes.length > 0) {
      setLoading(false);
    }
  }, [favRecipes]);

  const renderFavRecipes = favRecipes.map((recipe, index) => {
    return <FavRecipe getId={updateClickedRecipe} popupVis={updateVisibilityState} updateFavList={updateFavList} key={index} recipeData={recipe} />;
  });
  const content =loading ? (
    <Loading />
) : empty && favRecipes.length === 0 ? (
  <Empty />
) : (
    <div className="fav page">
      {popVis?<RecipePopup clickedRecipeData={favRecipes.filter(item=> item.meals[0].idMeal === clickedRecipe )} recipeVisibilityFun={updateVisibilityState}/> : ''}
      <div className="favPageHeader">
        <div
        onClick={handleSearchBarClick}
        className="internalSearchBarContainer">
        <input
          value={searchedItem}
          onChange={handleSearchInput}
          placeholder="search..."
          type="text" className="internalSearchBar" />
        <span style={{width: underLineExtention?"100%" : "40px"}} className="pseudoSpan"></span>
        <i className="fa-solid fa-magnifying-glass searchIcon"></i>
        </div>
        <button onClick={handleClearingList} className="removeAllBtn">Clear</button>
      </div>
      {renderFavRecipes}
    </div>
  );

  return (
    content
  );
}
