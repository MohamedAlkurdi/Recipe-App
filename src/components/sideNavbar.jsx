import { useState } from 'react'
import countiriesData from '../nations.json'
import categoriesData from '../categories.json'
import ingredientsData from '../ingredient.json'

export default function SideBar({countrySetter,categorySetter,ingredientSetter}){
    const [visibility,setVisibility] = useState(false);

    const renderCountries = countiriesData.map((country)=>{
        return <option value={country.nationality}>{country.nationality}</option>
    })
    const renderCategories = categoriesData.map((category)=>{
        return <option value={category.name}>{category.name}</option>
    })
    const renderIngredients = ingredientsData.map((ingredient)=>{
        return <option value={ingredient.name}>{ingredient.name}</option>
    })
    
    function handleClosingSideBar(){
        setVisibility(false);
    }
    function handleOpeningSideBar(){
        setVisibility(true);
    }

    return (
    <div style={{minWidth:visibility ? '20%' : '50px',position:visibility?"absolute":"relative",height:visibility?"100vh":''}} className="sideBar ">
        <div className="visibilityToggle">
            {
                visibility ? <button onClick={handleClosingSideBar}><i class="fa-solid fa-x"></i></button>
                : <button onClick={handleOpeningSideBar}><i class="fa-solid fa-bars"></i></button>
            }
        </div>
        {visibility ? 
        <>
        <div className="filterSection filterByCountry">
            <h3 className="filterTitle">
                filter by country
            </h3>
            <select onChange={countrySetter}>
            <option value={'All'}>All</option>
            {renderCountries}
            </select>
        </div>
        <div className="filterSection filterByCategory">
        <h3 className="filterTitle">
            filter by category
        </h3>
        <select onChange={categorySetter}>
            <option value={'All'}>All</option>
            {renderCategories}
            </select>
        </div>
        <div className="filterSection filterByIngredient">
        <h3 className="filterTitle">
            filter by an ingredient
        </h3>
        <select onChange={ingredientSetter}>
            <option value={'All'}>All</option>
            {renderIngredients}
            </select>
        </div>
        </>
        :
        ''
        }
    </div>
    )
}