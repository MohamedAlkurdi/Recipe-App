import { useEffect, useState } from "react";

export default function RecipePreview({recipeData}){
    const [fav,setFav] = useState(false);
    const title = recipeData.strMeal;
    const imgUrl = recipeData.strMealThumb;
    const id =  recipeData.idMeal;

    function isValueInLocalStorage(value) {
        for (const key in localStorage) {
          if (localStorage.hasOwnProperty(key)) {
            const storedValue = localStorage[key];
            if (storedValue === value) {
              return true; // Found a match
            }
          }
        }
        return false; // Value not found in local storage
      }
    useEffect(()=>{
            setFav(isValueInLocalStorage(id));
        console.log(recipeData);
    },[])
    function handleFavClick(){
        if(fav){
            setFav(false);
            localStorage.removeItem(`recipe${id}`);
        }else{
            setFav(true);
            localStorage.setItem(`recipe${id}`,id);
        }
    }
    return(
        <div className="recipePreview" style={{backgroundImage:`url(${imgUrl})`}}>
            <h1 className="title">{title}</h1>
            <button onClick={handleFavClick} className="favBtn"><i className={fav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i></button>
        </div>
    )
}