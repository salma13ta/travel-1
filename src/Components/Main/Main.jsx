import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.scss';
import './Main.css';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsClipboard2Check } from "react-icons/bs";

import Aos from 'aos';
import'aos/dist/aos.css'

const data = [
    {
      "id": 1,
      "title": "Bora Bora",
      "country": "New Zealand",
      "category": "Cultural",
      "subCategory": "Relax",
      "price": 700,
      "thumbnail": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "shortDescription": "Known for its turquoise lagoons and romantic overwater bungalows."
    },
    {
      "id": 3,
      "title": "Great Barrier Reef",
      "country": "Australia",
      "category": "Nature",
      "subCategory": "Relax",
      "price": 700,
      "thumbnail": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
      "shortDescription": "One of the largest coral reef systems, perfect for diving lovers."
    },
    {
      "id": 5,
      "title": "Tokyo",
      "country": "Japan",
      "category": "Cultural",
      "subCategory": "Modern",
      "price": 950,
      "thumbnail": "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
      "shortDescription": "A futuristic city mixing technology, culture, and traditions."
    },
    {
      "id": 6,
      "title": "Banff National Park",
      "country": "Canada",
      "category": "Nature",
      "subCategory": "Adventure",
      "price": 650,
      "thumbnail": "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
      "shortDescription": "Famous for its turquoise lakes and breathtaking mountain landscapes."
    },
    {
      "id": 9,
      "title": "Paris",
      "country": "France",
      "category": "Cultural",
      "subCategory": "Romantic",
      "price": 900,
      "thumbnail": "https://images.unsplash.com/photo-1543353071-087092ec393a",
      "shortDescription": "The city of love, fashion, and iconic landmarks like Eiffel Tower."
    },
    {
      "id": 10,
      "title": "Bali",
      "country": "Indonesia",
      "category": "Relax",
      "subCategory": "Nature",
      "price": 680,
      "thumbnail": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      "shortDescription": "Tropical paradise known for beaches, yoga retreats, and volcanoes."
    },
    {
      "id": 11,
      "title": "Dubai",
      "country": "UAE",
      "category": "Modern",
      "subCategory": "Luxury",
      "price": 1100,
      "thumbnail": "https://images.unsplash.com/photo-1504274066651-8d31a536b11a",
      "shortDescription": "Futuristic skyline, luxury shopping, and desert adventures."
    },
    {
      "id": 13,
      "title": "New York",
      "country": "USA",
      "category": "Modern",
      "subCategory": "Urban",
      "price": 1000,
      "thumbnail": "https://images.unsplash.com/photo-1534447677768-be436bb09401",
      "shortDescription": "The city that never sleeps, full of entertainment and culture."
    },
    {
      "id": 14,
      "title": "Phuket",
      "country": "Thailand",
      "category": "Relax",
      "subCategory": "Beach",
      "price": 550,
      "thumbnail": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
      "shortDescription": "Beautiful beaches, nightlife, and island adventures."
    },
    {
      "id": 15,
      "title": "Serengeti",
      "country": "Tanzania",
      "category": "Nature",
      "subCategory": "Safari",
      "price": 900,
      "thumbnail": "https://images.unsplash.com/photo-1508672019048-805c876b67e2",
      "shortDescription": "Endless plains with Africa’s most iconic wildlife."
    },
    {
      "id": 17,
      "title": "Kyoto",
      "country": "Japan",
      "category": "Cultural",
      "subCategory": "Historic",
      "price": 920,
      "thumbnail": "https://images.unsplash.com/photo-1553514029-1318c9127859",
      "shortDescription": "Traditional temples, cherry blossoms, and calm gardens."
    },
    {
      "id": 18,
      "title": "Cairo",
      "country": "Egypt",
      "category": "Cultural",
      "subCategory": "Historic",
      "price": 400,
      "thumbnail": "https://images.unsplash.com/photo-1505739772539-b2f0f9b2c51d",
      "shortDescription": "Home of the Pyramids, Nile River cruises, and ancient heritage."
    },
    {
      "id": 19,
      "title": "Zanzibar",
      "country": "Tanzania",
      "category": "Beach",
      "subCategory": "Relax",
      "price": 550,
      "thumbnail": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957",
      "shortDescription": "Pristine beaches and exotic island culture."
    },
    {
      "id": 20,
      "title": "Hawaii",
      "country": "USA",
      "category": "Nature",
      "subCategory": "Relax",
      "price": 1300,
      "thumbnail": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "shortDescription": "Volcanoes, beaches, rainforests, and an island paradise."
    },
    {
      "id": 22,
      "title": "Seoul",
      "country": "South Korea",
      "category": "Modern",
      "subCategory": "Cultural",
      "price": 980,
      "thumbnail": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "shortDescription": "A mix of K-pop culture, technology, and ancient palaces."
    },
    {
      "id": 23,
      "title": "London",
      "country": "UK",
      "category": "Urban",
      "subCategory": "Cultural",
      "price": 1050,
      "thumbnail": "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      "shortDescription": "Iconic red buses, Big Ben, and world-class museums."
    },
    {
      "id": 25,
      "title": "Sydney",
      "country": "Australia",
      "category": "Urban",
      "subCategory": "Relax",
      "price": 1100,
      "thumbnail": "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0",
      "shortDescription": "Home of the Opera House and beautiful coastal views."
    },
    {
      "id": 26,
      "title": "Singapore",
      "country": "Singapore",
      "category": "Modern",
      "subCategory": "Luxury",
      "price": 1150,
      "thumbnail": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
      "shortDescription": "Clean, futuristic, and home to Marina Bay Sands."
    },
    ]
  
const Main = () => {
    const navigate = useNavigate();

//add animation..................
  useEffect(()=>{
    Aos.init({duration:2000})

    },[])

    return (
        <section className='main containar section'>
                <div className='secTitle'>
                    <h3 className='title'>
                        Most visited destinations
                    </h3>
                </div>

            {/*  array method (map) to list  */}
            <div className="secContent grid">
              {data.map(({id, title,country,category,subCategory,thumbnail,price,shortDescription}) => (
                <div key={id} data-aos="fade-up" className="singleDestinationCard">
                    <div className="imageDiv">
                        <img src={thumbnail} alt={title} />
                    </div>

                    <div className="cardInfo">
                        <h4 className="destTitle">{title}</h4>
                        <span className="continent flex">
                            <HiOutlineLocationMarker className='icon' />
                                <span className="name">{country}</span>
                        </span>

                        <div className="cardPrice flex">
                            <div className="price">
                                <span>{category.toUpperCase()} {subCategory.toUpperCase()}<small>+1</small></span>
                                </div>
                            <div className="priceDesc">
                                <h5>${price}</h5>
                            </div>
                            </div>
                            
                            <div className="desc">
                                <p>{shortDescription}</p>
                            </div>
                            <button 
                                className="btn flex" 
                                onClick={() => {
                                    sessionStorage.setItem('fromMain', 'true');
                                    navigate('/booking', { 
                                        state: { 
                                            destination: {
                                                title,
                                                country,
                                                category,
                                                subCategory,
                                                price,
                                                shortDescription,
                                                thumbnail
                                            }
                                        } 
                                    });
                                }}
                            > 
                                DETATAILS <BsClipboard2Check className='icon'/>
                            </button>
                        </div>
                    </div>
              
              ))}
              </div>
        </section>
    );
};

export default Main;