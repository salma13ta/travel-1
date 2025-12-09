import React ,{useEffect, useState} from 'react';
import './Home.scss';
import video from '../video-img/video/istockphoto-1124530677-640_adpp_is.mp4'
import successGif from '../video-img/video/Travel is fun.gif';
import { GrLocation } from "react-icons/gr";
import { HiFilter } from "react-icons/hi";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";
import { FaList } from "react-icons/fa";
import { TbApps } from "react-icons/tb";
import { HiCheckCircle } from "react-icons/hi";
import { useLocation, useNavigate } from 'react-router-dom';


import Aos from 'aos';
import'aos/dist/aos.css'

const Home = () => {
    const [price, setPrice] = useState(5000);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

//add animation..................
useEffect(()=>{
    Aos.init({duration:2000})

    },[])

useEffect(() => {
    if (location.state?.showSuccess) {
        setShowSuccessModal(true);
        // clear the state so it doesn't show again on refresh/back
        navigate('/', { replace: true, state: {} });
    }
}, [location.state, navigate]);

    return (
        <section className='home'>
            {showSuccessModal && (
                <div className="successModalOverlay">
                    <div className="successModal">
                        <div className="successHeader">
                            <div className="successTitle flex">
                            </div>
                            <button className="closeBtn" onClick={() => setShowSuccessModal(false)}>×</button>
                        </div>
                        <div className="successBody">
                            <img
                                className="successGif"
                                src={successGif}
                                alt="Success"
                            />
                            <p>Your visa request was submitted successfully.</p>
                        </div>
                        <div className="successFooter">
                            <button className="btn btn-primary" onClick={() => setShowSuccessModal(false)}>Done</button>
                        </div>
                    </div>
                </div>
            )}
            <div className="overlay"></div>
            <video src={video} muted autoPlay loop type = "video/mp4"></video>

            <div className='homeContent container'>
                <div className="textDiv">
                    <span data-aos="fade-up" className='smallText'>
                        Our Packages
                    </span>
                    <h1 data-aos="fade-up" className='homeTitle'>
                        Search your Holiday
                    </h1>
                </div>

                <div data-aos="fade-up" className="cardDiv grid">
                    <div className="destionInput">
                        <label htmlFor="city">
                            Search your destination :
                            <div className="input flex">
                                <input type="text" placeholder=' Enter name here....' />
                                <GrLocation className='icon'/>

                            </div>
                        
                        </label>
                    </div>
                    <div className="dataInput">
                        <label htmlFor="date">
                            Select your date :                       
                        </label>
                        <div className="input flex">
                                <input type="date" />
                        </div>
                    </div>
                    <div className="priceInput">
                        <div className="label_total flex">
                            <label htmlFor="price">
                             Max price:
                            </label>
                            <h3 className='total'>
                                ${price}
                            </h3>                      
                            </div>
                        <div className="input flex">
                            <input 
                                type='range' 
                                max="5000" 
                                min="500" 
                                step="500"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="searchOptions flex">
                    <HiFilter className='icon' />
                    <span>MORE FILTERS</span>
                    </div>

                </div>
                <div data-aos="fade-up" className="homeFooterIcons flex">
                        <div className="rightIcons">
                            <FiFacebook className='icon'/>
                            <FaInstagram className='icon'/>
                            <SiTripadvisor className="icon"/>
                        </div>
                        <div className="leftIcons">
                        <FaList className="icon"/>
                        <TbApps  className="icon"/>
                        </div>
                    </div>
            </div>
        </section>
    );
};

export default Home;