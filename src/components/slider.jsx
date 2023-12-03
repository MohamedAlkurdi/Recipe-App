import { useEffect, useRef, useState } from "react";
import { testimonials } from "./testimonials";

import Card from "./card";
export default function Slider() {
  // const [scroll, setScroll] = useState(0);
  // const [cardWidth,setCardWidth] = useState(0);
  // const [scrollDistance,setDistance] = useState(0);
  // const [maxScroll,setMaxScroll] = useState(0);
  const carouselRef = useRef();
  const cardRef = useRef();

// useEffect(()=>{
//   window.addEventListener('resize',()=>{
//     console.log("card width",cardWidth);
//   })
// },[cardWidth])

  // function moveCarousel(e) {
  //   const updatedDistance = e.target.id === "left" ? -scrollDistance : scrollDistance;
  //   console.log(scrollDistance)
  //   if(scroll < 0 || scroll >= maxScroll){
  //     setScroll(0);
  //   }else{
  //     setScroll(prevScroll => prevScroll + updatedDistance);
  //   }
  // }

  // useEffect(() => {
  //   carouselRef.current.scrollLeft = scroll;
  // }, [scroll]);

  // useEffect(()=>{
  // setDistance(cardWidth);
  // setMaxScroll(prevValue => prevValue + cardWidth - 100);
  // },[cardWidth])

  // useEffect(()=>{
  //   setInterval(()=>{
  //   if(cardRef.current){
  //     console.log(cardRef.current.offsetWidth)
  //     if(cardRef.current.offsetWidth>1000)
  //     setCardWidth(((cardRef.current.offsetWidth)/3));
  //     else if(cardRef.current.offsetWidth>700)
  //     setCardWidth((cardRef.current.offsetWidth)/2);
  //     }else{
  //     setCardWidth((cardRef.current.offsetWidth)/1);
  //     }
  // },1000)
  //   setMaxScroll(carouselRef.current.offsetWidth);
  // },[])

  const renderCards = testimonials.map((dataElement)=>{
    return <Card key={dataElement.id} props={dataElement}/>
  })

  return (
    <div ref={carouselRef} className="slider">
      <ul ref={cardRef} className="carousel">
        {/* <i onClick={moveCarousel} id="left" className="fa-solid fa-angle-left arrow"></i> */}
        {renderCards}
        {/* <i onClick={moveCarousel} id="right" className="fa-solid fa-angle-right arrow"></i> */}
      </ul>
    </div>
  );
}
