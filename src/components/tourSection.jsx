import { useEffect, useState } from 'react';
import countries from '../nations.json';
import RecipePreview from './recipePreview';

export default function TourSection({ nation }) {
  const [fetchedRecipes, setFetchedRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // Set initial loading state to true
  const [flag, setFlag] = useState('');

  useEffect(() => {
    function matchFlag() {
      const neededFlag = countries.find((item) => item.nationality === nation);
      setFlag(neededFlag?.alpha_2_code || '');
    }
    matchFlag();
  }, [nation]);

  useEffect(() => {
    if (fetchedRecipes.length > 0) {
      setLoading(false);
    }
  }, [fetchedRecipes]); // Corrected dependency array

  const getRecipesByArea = async (nation) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nation}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.meals;
    } catch (error) {
      console.error('Fetch Error:', error.message);
      return null;
    }
  };

  useEffect(() => {
    getRecipesByArea(nation).then((data) => {
      if (data) {
        console.log(data);
        const recipes = data;
        setFetchedRecipes(recipes);
      } else {
        console.error('Error fetching recipe data');
      }
    });
  }, [nation]); // Added dependency array for the useEffect

  const renderRecipeComponents = fetchedRecipes.map((recipe, index) => {
    if (index < 4) {
      return <RecipePreview key={recipe.idMeal} recipeData={recipe} />;
    }
    return null; // You might want to handle the case where index is >= 4
  });

  return (
    <div id={nation} className="tourSection">
      <div className="title mt-50 mb-50">
        <img src={`https://flagsapi.com/${flag}/flat/64.png`} alt="fork" className="titleLeft" />
        <h1 style={{ fontSize: '50px' }}>{`${nation}`} food</h1>
        <img src={`https://flagsapi.com/${flag}/flat/64.png`} alt="fork" className="titleRight" />
      </div>
      <div className="tourContentContainer">
        {loading ? <p className='green'>loading...</p> : renderRecipeComponents}
      </div>
    </div>
  );
}
