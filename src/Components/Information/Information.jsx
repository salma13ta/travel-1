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
    const [showTermsModal, setShowTermsModal] = useState(false);

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
                            <div className="termsHeader flex">
                                <div className="termsCheckbox flex">
                                    <input 
                                        type="checkbox" 
                                        checked={agreeToTerms}
                                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    />
                                    <button
                                        type="button"
                                        className="termsTextBtn"
                                        onClick={() => setShowTermsModal(true)}
                                    >
                                        I agree to the terms and conditions
                                    </button>
                                </div>
                            </div>
                        </div>

                        {showTermsModal && (
                            <div className="termsModalOverlay">
                                <div className="termsModal">
                                    <div className="modalHeader flex">
                                        <h3>Trip Terms</h3>
                                        <button 
                                            type="button" 
                                            className="closeBtn" 
                                            onClick={() => setShowTermsModal(false)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <div className="modalBody">
                                        <ul>
                                            <li>
                                                <strong>1) Booking & Payment</strong>
                                                <ul>
                                                    <li>Your booking is confirmed after paying the deposit or required amount shown on the trip page.</li>
                                                    <li>The remaining balance must be paid before the trip date according to the set schedule.</li>
                                                    <li>All prices may change based on seat availability or company updates.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>2) Cancellation Policy</strong>
                                                <ul>
                                                    <li>If the customer cancels before the trip date, cancellation fees apply according to company policy.</li>
                                                    <li>If the company cancels the trip, the customer may receive a full refund or transfer the amount to another trip.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>3) Documents & Travel Requirements</strong>
                                                <ul>
                                                    <li>The customer is responsible for ensuring the validity of required documents (ID, passport, visa if applicable).</li>
                                                    <li>The company is not responsible for travel denial due to missing or incorrect documents.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>4) Itinerary & Schedule</strong>
                                                <ul>
                                                    <li>Activities or timings may be adjusted due to operations, weather, or official instructions.</li>
                                                    <li>The company will provide suitable alternatives without affecting the overall experience quality.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>5) Conduct & Personal Responsibility</strong>
                                                <ul>
                                                    <li>The customer must follow public regulations and the trip leader’s instructions.</li>
                                                    <li>The company is not liable for loss or damage of personal belongings due to misuse or negligence by the customer.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>6) Delays & Punctuality</strong>
                                                <ul>
                                                    <li>If the customer is late for departure, the company is not responsible for missed trips and no refund is due.</li>
                                                    <li>Punctuality is an essential condition for participation.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>7) Liability Limits</strong>
                                                <ul>
                                                    <li>The company is not liable for force majeure events such as flight delays, road conditions, or governmental decisions.</li>
                                                    <li>Completing the booking on the website means the customer accepts all terms.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>8) Support & Contact</strong>
                                                <ul>
                                                    <li>For inquiries or feedback, please reach our customer support via the Contact Us page.</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="modalFooter flex">
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary" 
                                            onClick={() => setShowTermsModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-primary" 
                                            onClick={() => {
                                                setAgreeToTerms(true);
                                                setShowTermsModal(false);
                                            }}
                                        >
                                            Agree
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* زر طلب التأشيرة */}
                        <button 
                            className='btn btn-primary requestVisaBtn'
                            disabled={!agreeToTerms}
                            onClick={() => navigate('/', { state: { showSuccess: true } })}
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
