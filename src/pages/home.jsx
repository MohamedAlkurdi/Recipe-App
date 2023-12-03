import '../App.css'
import plus from '../images/plus.png'
import filter from '../images/filter.png'
import free from '../images/free.png'
import international from '../images/international.png'
import fork from '../images/fork.png'
import knife from '../images/knife.png'
import '../carousel'
import {Link} from 'react-router-dom'
import SubNavbar from '../components/subNavbar'
import Slider from '../components/slider'
import GalleryGrid from '../components/homeGalleryGrid'
import { useState } from 'react'
export default function Home(){

    return(
        <div className="home page">
            <SubNavbar props={['whyUs','gallery','testimonials']}/>
            <div className="landing">
                <h1 className="landingContent">RE-UNIONING THE WORLD USING FOOD!</h1>
                <Link to={'./foodTour'} className='landingBtn'>FOOD TOUR</Link>
            </div>
            <div id='whyUs' className="whyUs homeSection">
                <div className='title mb-100 '>
                    <img src={fork} alt='fork' className="titleLeft"/>
                    <h1>WHY US</h1>
                    <img src={knife} alt='fork' className="titleRight"/>
                </div>
                <ul className="features">
                    <li>
                        <img src={plus} alt="" />
                        <h4>290+ food recipe</h4>
                    </li>
                    <li>
                        <img src={free} alt="" />
                        <h4>totally free access</h4>
                    </li>
                    <li>
                        <img src={international} alt="" />
                        <h4>multi-cltural food</h4>
                    </li>
                    <li>
                        <img src={filter} alt="" />
                        <h4>smooth filtering</h4>
                    </li>
                </ul>
            </div>
            <div id='gallery' className="homeImageGallery homeSection">
            <div className='title mb-100'>
                    <img src={fork} alt='fork' className="titleLeft"/>
                    <h1>TAKE A LOOK!</h1>
                    <img src={knife} alt='fork' className="titleRight"/>
            </div>
                <GalleryGrid/>
            </div>
            <div id='testimonials' className="testimonials homeSection">
            <div className='title mb-100 '>
                    <img src={fork} alt='fork' className="titleLeft"/>
                    <h1>TESTIMONIALS</h1>
                    <img src={knife} alt='fork' className="titleRight"/>
            </div>
            <Slider/>
            </div>

        </div>
    )
}
