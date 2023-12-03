import earth from '../images/earth.png'
import countries from '../nations.json'
// import src from '../images/ella-olsson-C1Q3qOTlegg-unsplash.jpg'
import { useEffect, useState } from 'react';

export default function FavRecipe({getId,popupVis,updateFavList,recipeData}){
    const title = recipeData.meals[0].strMeal;
    const src = recipeData.meals[0].strMealThumb;
    const country = recipeData.meals[0].strArea;
    const id = recipeData.meals[0].idMeal;
    const youtubeUrl = recipeData.meals[0].strYoutube;
    const [showCountry,setShowCountry] = useState(false);
    const [flag, setFlag] = useState('')

    useEffect(() => {
        function matchFlag() {
            const neededFlag = countries.find(item => item.nationality === country);
            setFlag(neededFlag?.alpha_2_code || '');
        }
        matchFlag();
    }, [country]);
    function handleDeleteFav(){
        localStorage.removeItem(`recipe${id}`);
        updateFavList(id);
    }
    function handleShowCountry(){
        setShowCountry(true);
    }
    function handleHideCountry(){
        setShowCountry(false);
    }

    useEffect(()=>{
        console.log(recipeData)
    },[])
    return(
        <div className="favRecipe">
            <div style={{backgroundImage:`url(${src})`}} className="favImgSection"/>
            <div className="favContent">
                <h1 className="favTitle">{title}</h1>
                <button
                onClick={()=>{
                popupVis(true);
                getId(id);
                }} className="favShowRecipeBtn">Get Recipe!</button>
                <a target='blank' className='youtubeLink favYoutubeLink' href={youtubeUrl}><i className="fa-solid fa-play"></i></a>
                <button onClick={handleDeleteFav} className="favDeleteFav">remove</button>
                <button onMouseEnter={handleShowCountry} onMouseLeave={handleHideCountry} className='favEarthBtn'>
                <img className='favEarthImage' src={earth} alt="earth" />
                <div style={{ width: showCountry ? '80px' : '0' }} className='favCountrySpan'><img src={`https://flagsapi.com/${flag}/flat/64.png`} alt='Unknow' /></div>
                </button>
                </div>
        </div>
    )
}