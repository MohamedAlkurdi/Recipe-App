import { useEffect,useState } from "react"
import foodVector1 from '../images/salad2.png'
import foodVector2 from '../images/hamburger2.png'
import copy from 'clipboard-copy';

export default function RecipePopup({clickedRecipeData,recipeVisibilityFun}){
    const IGREDIENT_TEXT = 'Copy Ingredients';
    const MEASURE_TEXT = 'Copy Measures';
    const [ingredients,setIngredients] = useState([]);
    const [measures,setMeasures] = useState([]);
    const [ingCpy,setIngCpy] = useState(IGREDIENT_TEXT);
    const [measCpy,setMeasCpy] = useState(MEASURE_TEXT);

    useEffect(() => {
        console.log('here i am',clickedRecipeData)
        console.log('this text is coming from popup component', clickedRecipeData[0].meals[0].idMeal);
        const ingredientsUpdater = Object.keys(clickedRecipeData[0].meals[0]).map(key => {
            if (key.startsWith("strIngredient") && clickedRecipeData[0].meals[0][key] !== '') {
                return clickedRecipeData[0].meals[0][key];
            }
            return null;
        });
        setIngredients(ingredientsUpdater.filter(Boolean));
        const measuresUpdater = Object.keys(clickedRecipeData[0].meals[0]).map(key => {
            if (key.startsWith("strMeasure") && clickedRecipeData[0].meals[0][key] !== ' ') {
                return clickedRecipeData[0].meals[0][key];
            }
            return null; 
        });
        setMeasures(measuresUpdater.filter(Boolean)); 
    }, []);
    function handlePopupVisibility(e){
        if(!e.target.classList.contains('recipeEl')){
            recipeVisibilityFun(false)
        }
    }
    function copyIngredients() {
        const arrayString = ingredients.join('\n'); // Join array elements with line breaks
        copy(arrayString)
        .then(() => {
            setIngCpy('Copied!');
        })
        .catch((err) => {
            console.error('Copy to clipboard failed:', err);
        });
        }
        function copyMeasures() {
        const arrayString = measures.join('\n'); // Join array elements with line breaks
        copy(arrayString)
        .then(() => {
            setMeasCpy("Copied!");
        })
        .catch((err) => {
            console.error('Copy to clipboard failed:', err);
        });
        }
    useEffect(()=>{
        console.log(ingredients);
    },[ingredients])
    useEffect(()=>{
        console.log(measures);
    },[measures])
    useEffect(()=>{
        setTimeout(()=>{
            setIngCpy(IGREDIENT_TEXT)
        },2000)
    },[ingCpy])
    useEffect(()=>{
        setTimeout(()=>{
            setMeasCpy(MEASURE_TEXT)
        },2000)
    },[measCpy])
    const renderIngredients = ingredients.map((item)=>{
        return <p className="recipeEl">{item}</p>
    })
    const renderMeasures = measures.map((item)=>{
        return <p className="recipeEl">{item}</p>
    })
    return(
        <div onClick={handlePopupVisibility} className="recipePopup">
            <div className="popup recipeEl">
                <div className="popupSection ingredients recipeEl">
                <h1 className="title recipeEl">Ingredients</h1>
                {renderIngredients}
                <button className="cpyBtn recipeEl" onClick={copyIngredients}>{ingCpy}</button>
                <div className="pad"></div>
                </div>
                <div className="popupSection measures recipeEl">
                <h1 className="title recipeEl">Measures</h1>
                {renderMeasures}
                <button className="cpyBtn recipeEl" onClick={copyMeasures}>{measCpy}</button>
                <div className="pad"></div>
                </div>
                <img className="floatingVectors v1" src={foodVector1} alt="FoodVector"/>
                <img className="floatingVectors v2" src={foodVector2} alt="FoodVector"/>
            </div>
        </div>
    )
}