import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiCheckCircle } from 'react-icons/hi';
import { MdCreditCard } from 'react-icons/md';
import { FaMoneyBillWave } from 'react-icons/fa';
import './Information.scss';
import video from '../Booking/45569-443244046_small.mp4';

const Information = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData;
    const passengersData = location.state?.passengersData;
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const travelerTypes = {
        'family': 'Family',
        'company': 'Company',
        'friends': 'Friends'
    };

    return (
        <section className='information'>
            <video src={video} muted autoPlay loop type = "video/mp4"></video>
            <div className='InformationContent container'>
                <div className="textDiv">
                    <h1 data-aos="fade-up" className='bookingTitle'>
                        Request Visa
                    </h1>
                </div>

                {bookingData && (
                    <>
                        {/* إطار منفصل للبلد */}
                        {bookingData.destination && (
                            <div data-aos="fade-up" className="cardDiv destinationCard">
                                <div className="destinationInfo">
                                    <h3 className="sectionTitle">Destination</h3>
                                    <div className="destinationDetails">
                                        <h4>{bookingData.destination.title}</h4>
                                        <p>{bookingData.destination.country}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* إطار لعدد المسافرين وعلاقتهم */}
                        <div data-aos="fade-up" className="cardDiv travelersCard">
                            <div className="infoSection">
                                <h3 className="sectionTitle">Number of Travelers: {bookingData.numberOfTravelers}</h3>
                                <div className="travelersList">
                                    {Array.from({ length: bookingData.numberOfTravelers }, (_, index) => {
                                        // التحقق من اكتمال بيانات هذا المسافر
                                        const passengerData = passengersData?.[index];
                                        const isComplete = passengerData ? (
                                            passengerData.firstName.trim() !== '' &&
                                            passengerData.lastName.trim() !== '' &&
                                            passengerData.maritalStatus !== '' &&
                                            passengerData.nationalId !== null &&
                                            passengerData.passport !== null
                                        ) : false;
                                        
                                        return (
                                            <div key={index} className="travelerItem flex">
                                                <span>Traveler {index + 1} Data</span>
                                                <HiCheckCircle className={`checkIcon ${isComplete ? 'complete' : 'incomplete'}`} />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* العلاقة بين المسافرين */}
                            {bookingData.numberOfTravelers > 1 && bookingData.travelerType && (
                                <div className="infoSection">
                                    <div className="separator"></div>
                                    <h3 className="sectionTitle">Relationship between Travelers</h3>
                                    <p className="infoText">{travelerTypes[bookingData.travelerType] || bookingData.travelerType}</p>
                                </div>
                            )}
                        </div>

                        {/* زر ادخل بيانات المسافرين */}
                        <button 
                            className='btn btn-primary enterDataBtn'
                            onClick={() => navigate('/enter-passenger-details', { state: { bookingData } })}
                        >
                            Enter Passenger Details
                        </button>

                        {/* اجمالي التكلفة */}
                        {bookingData?.totalPrice && (
                            <div className="priceSection">
                                <h3 className="sectionTitle">Total Cost</h3>
                                <div className="priceDesc flex">
                                    <div className="totalPrice">
                                        <h5>${bookingData.totalPrice}</h5>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* اختر طريقة الدفع */}
                        <div className="paymentSection">
                            <h3 className="sectionTitle">Choose Payment Method</h3>
                            <div className="paymentMethods">
                                <div 
                                    className={`paymentOption ${paymentMethod === 'online' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('online')}
                                >
                                    <MdCreditCard className="paymentIcon" />
                                    <span>Online</span>
                                    {paymentMethod === 'online' && <HiCheckCircle className="checkIcon" />}
                                </div>
                                <div 
                                    className={`paymentOption ${paymentMethod === 'cash' ? 'active' : ''}`}
                                    onClick={() => setPaymentMethod('cash')}
                                >
                                    <FaMoneyBillWave className="paymentIcon" />
                                    <span>Cash</span>
                                    {paymentMethod === 'cash' && <HiCheckCircle className="checkIcon" />}
                                </div>
                            </div>
                        </div>

                        {/* أوافق علي الشروط والاحكام */}
                        <div className="termsSection">
                            <label className="termsCheckbox flex">
                                <input 
                                    type="checkbox" 
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                />
                                <span>I agree to the terms and conditions</span>
                            </label>
                        </div>

                        {/* زر طلب التأشيرة */}
                        <button 
                            className='btn btn-primary requestVisaBtn'
                            disabled={!agreeToTerms}
                            onClick={() => navigate('/')}
                        >
                            Request Visa
                        </button>
                    </>
                )}

                {!bookingData && (
                    <div className="noDataMessage">
                        <p>No booking data available. Please go back to booking page.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Information;
