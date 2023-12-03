// import axios from "axios";
// import { useEffect, useState } from "react"
// import SearchResult from "./searchResult";
// export default function SearchBar(){
//     const [searchInput,setSearchInput] = useState('');
//     const [searchedData,setSearchedData] = useState([]);
//     const [resultsList,setResultList] = useState(false);
//     function hasndleSearchInput(e){
//         setSearchInput(e.target.value);
//     }
//     function searchRecipe(nameString){
//         console.log("enter searching function")
//         axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameString}`)
//         .then(res=>{
//             console.log(res);
//             setSearchedData(res.data.meals)})
//         .catch(err=>{console.log(err)});
//     }
//     useEffect(()=>{
//         if(searchInput==="" || searchInput===" "){
//             setSearchedData([]);
//             setResultList(false);
//         }
//         else{
//         searchRecipe(searchInput);
//         setResultList(true);
//     }
//     },[searchInput])
    
//     const renderResults = searchedData.map((item)=>{
//         return <SearchResult data={item}/>
//     })
//     return(
//         <div className="externalSearchBarContainer ">
//             <input placeholder="Search any recipe..." className="searchBar" value={searchInput} onChange={hasndleSearchInput} type="text" />
//             {
//                 resultsList?<div className="searchingResults">{renderResults}</div>
//                 : ''
//             }
            
//         </div>
//     )
// }
import axios from "axios";
import { useEffect, useState } from "react";
import SearchResult from "./searchResult";

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const [resultsList, setResultList] = useState(false);
  
    function handleSearchInput(e) {
      setSearchInput(e.target.value);
    }
  
    function searchRecipe(nameString) {
      console.log("enter searching function");
      axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameString}`)
        .then(res => {
          console.log(res);
          setSearchedData(res.data.meals || []); // Ensure searchedData is an array
        })
        .catch(err => {
          console.log(err);
          setSearchedData([]); // Clear the data in case of an error
        });
    }
  
    useEffect(() => {
      if (searchInput === "" || searchInput === " ") {
        setSearchedData([]);
        setResultList(false);
      } else {
        searchRecipe(searchInput);
        setResultList(true);
      }
    }, [searchInput]);
  
    let renderResults;
  
    if (searchedData && searchedData.length > 0) {
      renderResults = searchedData.map((item) => (
        <SearchResult key={item.idMeal} data={item} />
      ));
    } else if (searchedData) {
      renderResults = <p className="green" >No matching recipes found.</p>;
    } else {
      renderResults = <p className="green">Loading...</p>; // You can adjust this message accordingly
    }
  
    return (
      <div className="externalSearchBarContainer">
        <input
          placeholder="Search any recipe..."
          className="searchBar"
          value={searchInput}
          onChange={handleSearchInput}
          type="text"
        />
        {resultsList ? <div className="searchingResults">{renderResults}</div> : ''}
      </div>
    );
  }