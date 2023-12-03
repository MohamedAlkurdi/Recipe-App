import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

export default function GalleryGrid() {
  const [urls, setUrls] = useState([]);
  const [menuBtnVis,setMenuBtnVis] = useState(false);
  function handleMouseEnter(){
      setMenuBtnVis(true);
  }
  function handleMouseLeave(){
    setMenuBtnVis(false);
}
  const apiUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

  const fetchUrls = async () => {
    try {
      const uniqueIDs = new Set();
      const urlsArray = [];
      let i = 0;

      while (i < 5) {
        const response = await axios.get(apiUrl);
        const data = response.data.meals[0];

        if (!uniqueIDs.has(data.idMeal)) {
          uniqueIDs.add(data.idMeal);
          urlsArray.push(data.strMealThumb);
          i++;
        }
      }
      setUrls(urlsArray);
    } catch (error) {
      console.error("Error fetching meal images:", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const renderImages = urls.map((url, index) => (
    <div
      key={index}
      className={`div${index + 1}`}
      style={{
        backgroundImage: `url(${url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  ));

  return (
    <div  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="galleryGrid">
      {urls.length === 0 ? (
        <p>Loading...</p>
      ) : (
        renderImages
      )}
        <Link style={{bottom:menuBtnVis?'100px':'-100px',zIndex:menuBtnVis?'100':'-100'}} to={'./recipesList'} className='menuBtn'>Check Our Menu!</Link>
    </div>
  );
}
