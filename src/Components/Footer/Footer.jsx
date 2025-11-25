import React,{useEffect} from 'react';
import video from '../video-img/video/istockphoto-1124530677-640_adpp_is.mp4';
import { FiSend } from "react-icons/fi";
import './Footer.scss';
import { MdOutlineTravelExplore } from "react-icons/md";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { SiTripadvisor } from "react-icons/si";
import { FiTwitter } from "react-icons/fi";
import { FiYoutube } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

import Aos from 'aos';
import'aos/dist/aos.css'



const Footer = () => {
    //add animation..................
useEffect(()=>{
    Aos.init({duration:2000})

    },[])

    return (
            <section className='footer'>
                <div data-aos="fade-up" className="VideoDiv">
                    <video src={video} muted autoPlay loop type = "video/mp4"></video>
                </div>
                <div data-aos="fade-up" className="secContent container">
                    <div className="contactDiv flex">
                        <div className="text">
                            <small>KEEP IN TOUCH</small>
                            <h2>Travel with us</h2>
                        </div>
                        <div data-aos="fade-up" className="inputDiv flex">
                            <input type="text" placeholder='Enter Email Address' />
                            <button className='btn flex' type='submit'>
                                SEND <FiSend className='icon'/>
                            </button>
                        </div>

                    </div>
                    <div data-aos="fade-up" className="footerCard flex">
                        <div className="footerIntro flex">  
                            <div className="logoDiv">
                                <a href="/" className="logo flex">
                                <MdOutlineTravelExplore className='icon'/> Travel.
                                </a>
                            </div>
                            <div className="footerParagraph">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                            </div>
                            <div className="footerSocials flex">
                                <FiFacebook className='icon'/>
                                <FaInstagram className='icon'/>
                                <FiTwitter className='icon'/>
                                <FiYoutube className='icon'/>
                                <SiTripadvisor className="icon"/>
                            </div>
                        </div>

                        {/* Groups Links */}
                        <div data-aos="fade-up" className="footerLinks grid">
                        {/*Groups One*/}
                            <div className="linkGroup">
                                <span className="groupTitle">
                                    Our Agency
                                </span>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Services
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Insurance
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Agency
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Tourism
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Payment
                                </li>
                        </div>
                        {/*Groups two*/}
                        <div className="linkGroup">
                                <span className="groupTitle">
                                    PARTNERS
                                </span>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Bookings
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Rentcars
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    HostelWorld
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Trivage
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    TripAdvisor
                                </li>
                        </div>

                        {/*Groups three*/}
                       <div className="linkGroup">
                                <span className="groupTitle">
                                    LAST MINUTE
                                </span>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    London
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    California
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    indonesia
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Europe
                                </li>
                                <li className="footerLink flex">
                                    <FiChevronRight className='icon'/>
                                    Oceania
                                </li>
                        </div>

                        <div className='footerDiv'>
                            <small>BEST TRAVEL WEBSITE THEME</small>
                            <small>COPYRIGHTS RESERVED - ISRATECH 2022</small>

                        </div>
                        </div>
                    </div>
                </div>
            </section>
    );
};

export default Footer;
                          