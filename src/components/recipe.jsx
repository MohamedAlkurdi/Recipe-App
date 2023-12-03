import earth from '../images/earth.png'
import countries from '../nations.json'
import { useEffect, useRef, useState } from "react"

export default function Recipe({getId,recipeVisibilityFun,recipeData}) {
    const title = recipeData.meals[0].strMeal;
    const src = recipeData.meals[0].strMealThumb;
    const country = recipeData.meals[0].strArea;
    const id = recipeData.meals[0].idMeal;
    const youtubeUrl = recipeData.meals[0].strYoutube;
    const [fav, setFav] = useState(false);
    const [showCountry, setShowCountry] = useState(false);
    const [flag, setFlag] = useState('')
    const recipeRef = useRef();
    useEffect(() => {
        function matchFlag() {
            const neededFlag = countries.find(item => item.nationality === country);
            setFlag(neededFlag?.alpha_2_code || '');
        }
        matchFlag();
    }, [country]);

    useEffect(() => {
        console.log(flag);
    }, [flag]);
    useEffect(()=>{
        if(isValueInLocalStorage(id)){
            setFav(true);
        }
    },[])
    function handleShowCountry() {
        setShowCountry(true);
    }

    function handleHideCountry() {
        setShowCountry(false);
    }

    function handleFavClick(){
        if(fav){
            setFav(false);
            localStorage.removeItem(`recipe${id}`);
        }else{
            setFav(true);
            localStorage.setItem(`recipe${id}`,id);
        }
    }
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
    return (
        <div ref={recipeRef} style={{ backgroundImage: `url(${src})`, backgroundPosition: "center", backgroundSize: "cover" }} className="recipe">
            <h1 className="recipeTitle">{title}</h1>
            <div className="recipeCategory"></div>
            <button
            onClick={()=>{
                recipeVisibilityFun(true);
                getId(id);
                }} className="showRecipeBtn">Get Recipe!</button>
            <a target='blank' className='youtubeLink' href={youtubeUrl}><i className="fa-solid fa-play"></i></a>
            <button onClick={handleFavClick} className="favBtn"><i className={fav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}></i></button>
            <button onMouseEnter={handleShowCountry} onMouseLeave={handleHideCountry} className='earthBtn'>
            <img className='earthImage' src={earth} alt="earth" />
            <div style={{ width: showCountry ? '53px' : '0' }} className='countrySpan'><img src={`https://flagsapi.com/${flag}/flat/64.png`} alt='Unknow' /></div>
            </button>
        </div>
    )
}
