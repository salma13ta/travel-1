import React, { useState } from 'react';
import './Navbar.css';
import { MdTravelExplore } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { TbChartGridDots } from "react-icons/tb";

const Navbar = () => {
    const [active, setActive] = useState('navbar')

    const showNav = ()=>{
        setActive('navbar activeNavbar')
    }
    const removeNav = () => {
        setActive('navbar')
    }
   
    return (
        <section className='navbarSection'>
            <header className="header flex">

                <div className="LogeDiv">
                    <a href="/" className="logo flex">
                        <h1><MdTravelExplore className ="icon" />Travel.</h1>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <a href="/" className="navLink" onClick={removeNav}>Home</a>
                        </li>

                        <li className="navItem">
                            <a href="/packages" className="navLink" onClick={removeNav}>Packages</a>
                        </li>

                        <li className="navItem">
                            <a href="/shop" className="navLink" onClick={removeNav}>Shop</a>
                        </li>

                        <li className="navItem">
                            <a href="/about" className="navLink" onClick={removeNav}>About</a>
                        </li>
                        <li className="navItem">
                            <a href="/pages" className="navLink" onClick={removeNav}>Pages</a>
                        </li>

                        <li className="navItem">
                            <a href="/news" className="navLink" onClick={removeNav}>News</a>
                        </li>

                        <li className="navItem">
                            <a href="/contact" className="navLink" onClick={removeNav}>Contact</a>
                        </li>

                        <button className='btn' onClick={removeNav}>
                            <a href='/book' className='navLink'>Book Now</a>
                        </button>
                        
                    </ul>

                    <div className='closeNavbar' onClick={removeNav}>
                        <IoIosCloseCircle className='icon'/>
                    </div>
                </div>

                <div className="toggleNavbar" onClick={showNav}>
                    <TbChartGridDots className='icon'/>
                </div>

            </header>
        </section>
    );
};

export default Navbar;