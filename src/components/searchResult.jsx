import { useEffect, useState } from "react";
export default function SearchResult({data}){
const [fav, setFav] = useState(false);
const id = data.idMeal;
const imgUrl = data.strMealThumb;
const nameString=data.strMeal;

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
    <div className="searchResult">
        <img src={imgUrl} alt="recipeImg"/>
        <h2>{nameString}</h2>
        <button onClick={handleFavClick} className="favBtn"><i className={fav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i></button>
    </div>
)
}