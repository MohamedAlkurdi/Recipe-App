import egypt from '../images/egypt.png'
import uk from '../images/uk.png'
import usa from '../images/usa.png'
import russia from '../images/russia.png'
import map from '../images/foodMap.png'
import TourSection from '../components/tourSection'
import tours from '../avilableTours.json'
import { useState } from 'react'
export default function Tour(){
    const [addresses,setAddresses] = useState(['Egyptian','British','American','Russian']);
    const renderTourSections = addresses.map(item=>{
        return <TourSection nation={`${item}`}/>
    })
    const renderOptions = tours.map((ingredient)=>{
        return <option value={ingredient.area}>{ingredient.area}</option>
    })
    function handleSelectedCountry(e){
        const newArea = e.target.value;
        if (!addresses.includes(newArea)) {
            const updatedAddresses = [...addresses, newArea];
            setAddresses(updatedAddresses);
        }
    }
    return(
        <div className="tour page">
            <div className="tourPageLanding">
                <div className="landingMap">
                <img className='landingMapImg' src={map} alt="food map" />
                </div>
                <a href={`#${addresses[0]}`} className="floatingMap map1"><img src={egypt} alt="" /></a>
                <a href={`#${addresses[1]}`} className="floatingMap map2"><img src={uk} alt="" /></a>
                <a href={`#${addresses[2]}`} className="floatingMap map3"><img src={usa} alt="" /></a>
                <a href={`#${addresses[3]}`} className="floatingMap map4"><img src={russia} alt="" /></a>
            </div>
            <div className="tourSectiosContainer">
            {renderTourSections}
            <div className="addTourSection ">
                <h1>want to discover more? </h1>
                <select onChange={handleSelectedCountry}>
                {renderOptions}
                </select>
            </div>
            </div>
        </div>
    )
}
