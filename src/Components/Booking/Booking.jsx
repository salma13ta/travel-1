import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiDocumentText, HiOutlineDocumentText } from 'react-icons/hi';
import { MdOutlineArrowDropDown, MdLocationOn } from 'react-icons/md';
import { FaFingerprint } from 'react-icons/fa';
import { BsCalendarDate } from 'react-icons/bs';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import countriesData from "world-countries";
import './Booking.scss';
import video from './45569-443244046_small.mp4'

const Booking = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const destination = location.state?.destination;
    const destinationTitle = destination?.title || 'your destination';
    
    const [nationality, setNationality] = useState(null);
    const [visaType, setVisaType] = useState('');
    const [fingerprintLocation, setFingerprintLocation] = useState('');
    const [customLocation, setCustomLocation] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [numberOfTravelers, setNumberOfTravelers] = useState(1);
    const [travelerType, setTravelerType] = useState(''); // عائلات - شركة - أصدقاء
    const [roomType, setRoomType] = useState(''); // زوجي - فردي
    const [numberOfDays, setNumberOfDays] = useState(1);
    
    const [showNationalityDropdown, setShowNationalityDropdown] = useState(false);
    const [showVisaTypeDropdown, setShowVisaTypeDropdown] = useState(false);
    const [showFingerprintDropdown, setShowFingerprintDropdown] = useState(false);
    const [showTravelerTypeDropdown, setShowTravelerTypeDropdown] = useState(false);
    const [showRoomTypeDropdown, setShowRoomTypeDropdown] = useState(false);
    
    const nationalityRef = useRef(null);
    const visaTypeRef = useRef(null);
    const fingerprintRef = useRef(null);
    const travelerTypeRef = useRef(null);
    const roomTypeRef = useRef(null);

    // إغلاق الـ dropdown عند النقر خارجه
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (nationalityRef.current && !nationalityRef.current.contains(event.target)) {
                setShowNationalityDropdown(false);
            }
            if (visaTypeRef.current && !visaTypeRef.current.contains(event.target)) {
                setShowVisaTypeDropdown(false);
            }
            if (fingerprintRef.current && !fingerprintRef.current.contains(event.target)) {
                setShowFingerprintDropdown(false);
            }
            if (travelerTypeRef.current && !travelerTypeRef.current.contains(event.target)) {
                setShowTravelerTypeDropdown(false);
            }
            if (roomTypeRef.current && !roomTypeRef.current.contains(event.target)) {
                setShowRoomTypeDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // قائمة الجنسيات من world-countries (بالإنجليزية)
    // التحقق من أن countriesData هو array
    const countriesArray = Array.isArray(countriesData) ? countriesData : Object.values(countriesData);
    const nationalities = countriesArray
        .map((c) => ({
            name: c.name?.common || c.name || '', // اسم الدولة بالإنجليزية
            code: (c.cca2 || c.code || '').toLowerCase(),
            flag: `https://flagcdn.com/w40/${(c.cca2 || c.code || '').toLowerCase()}.png`,
        }))
        .filter(c => c.name && c.code) // إزالة أي عناصر فارغة
        .sort((a, b) => a.name.localeCompare(b.name)); // ترتيب أبجدي بالإنجليزية

    const visaTypes = [
        { value: 'tourism', label: 'Tourism' },
        { value: 'work', label: 'Work' },
        { value: 'student', label: 'Student' },
        { value: 'medical', label: 'Medical' }
    ];

    const fingerprintLocations = [
        { value: 'cairo', label: 'Cairo' },
        { value: 'dakahlia', label: 'Dakahlia' },
        { value: 'home', label: 'Home' }
    ];

    const travelerTypes = [
        { value: 'family', label: 'Family' },
        { value: 'company', label: 'Company' },
        { value: 'friends', label: 'Friends' }
    ];

    const roomTypes = [
        { value: 'single', label: 'Single' },
        { value: 'double', label: 'Double' }
    ];

    const handleNationalitySelect = (nat) => {
        setNationality(nat);
        setShowNationalityDropdown(false);
    };

    const handleVisaTypeSelect = (type) => {
        setVisaType(type);
        setShowVisaTypeDropdown(false);
    };

    const handleFingerprintSelect = (location) => {
        setFingerprintLocation(location);
        setShowFingerprintDropdown(false);
        if (location !== 'home') {
            setCustomLocation(''); // مسح الموقع المخصص إذا لم يكن "بيتك"
        }
    };

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    setCustomLocation(googleMapsUrl);
                    // يمكنك فتح Google Maps في نافذة جديدة
                    window.open(googleMapsUrl, '_blank');
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to get your location. Please enter it manually.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    const handleDaysChange = (value) => {
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue > 0) {
            setNumberOfDays(numValue);
        }
    };

    const incrementDays = () => {
        setNumberOfDays(prev => prev + 1);
    };

    const decrementDays = () => {
        setNumberOfDays(prev => prev > 1 ? prev - 1 : 1);
    };

    const handleTravelerTypeSelect = (type) => {
        setTravelerType(type);
        setShowTravelerTypeDropdown(false);
        // إذا اختار عائلات، لا حاجة لاختيار نوع الغرفة
        if (type === 'family') {
            setRoomType('');
        }
    };

    const handleRoomTypeSelect = (type) => {
        setRoomType(type);
        setShowRoomTypeDropdown(false);
    };

    const handleTravelersChange = (value) => {
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue > 0) {
            setNumberOfTravelers(numValue);
            // إذا كان مسافر واحد، لا حاجة لاختيار نوع المسافر أو نوع الغرفة
            if (numValue === 1) {
                setTravelerType('');
                setRoomType('');
            }
        }
    };

    // حساب السعر حسب عدد الأيام ونوع الغرفة
    const calculatePrice = () => {
        if (!destination?.price) return 0;
        
        const basePrice = destination.price;
        let totalPrice = basePrice * numberOfDays;
        
        // إضافة 150 إذا كان نوع الغرفة زوجي
        if (roomType === 'double') {
            totalPrice += 150;
        }
        
        // خصم 5% إذا كان من 3 أيام فما فوق (سواء فردي أو زوجي)
        if (numberOfDays >= 3) {
            totalPrice = totalPrice * 0.95; // خصم 5%
        }
        
        return Math.round(totalPrice);
    };

    const totalPrice = calculatePrice();
    const hasDiscount = numberOfDays >= 3;
    
    return (
    <>
            <section className='booking'>
            <video src={video} muted autoPlay loop type = "video/mp4"></video>
            <div className='BookingContent container'>
                <div className="textDiv">
                    <h1 data-aos="fade-up" className='bookingTitle'>
                    Ready to continue your journey? Choose and start booking now
                    </h1>
                    <p data-aos="fade-up" className='bookingDescription'>
                        Fill in the form below to book your trip to <span className='destinationTitle'>{destinationTitle}</span>
                    </p>
                </div>

                <div data-aos="fade-up" className="cardDiv grid">
                    <div className="singleDestinationCard">
                        {/* حقل الجنسية */}
                        <div className="formField">
                            <label htmlFor="nationality">Nationality</label>
                            <div className="inputWrapper" ref={nationalityRef}>
                                <div 
                                    className="input flex" 
                                    onClick={() => {
                                        setShowNationalityDropdown(!showNationalityDropdown);
                                        setShowVisaTypeDropdown(false);
                                    }}
                                >
                                    <MdOutlineArrowDropDown className='dropdownIcon' />
                                    {nationality ? (
                                        <div className="selectedNationality flex">
                                            <img src={nationality.flag} alt={nationality.name} className="flagIcon" />
                                            <span>{nationality.name}</span>
                                        </div>
                                    ) : (
                                        <input 
                                            type="text" 
                                            placeholder='Select Nationality'
                                            readOnly
                                        />
                                    )}
                                    <HiDocumentText className='icon' />
                                </div>
                                {showNationalityDropdown && (
                                    <div className="dropdownList">
                                        {nationalities.map((nat, index) => (
                                            <div 
                                                key={index}
                                                className="dropdownItem flex"
                                                onClick={() => handleNationalitySelect(nat)}
                                            >
                                                <img src={nat.flag} alt={nat.name} className="flagIcon" />
                                                <span>{nat.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {!nationality && <span className="errorText">Select Nationality</span>}
                            </div>
                        </div>

                        {/* حقل نوع التأشيرة */}
                        <div className="formField">
                            <label htmlFor="visaType">Visa Type</label>
                            <div className="inputWrapper" ref={visaTypeRef}>
                                <div 
                                    className="input flex" 
                                    onClick={() => {
                                        setShowVisaTypeDropdown(!showVisaTypeDropdown);
                                        setShowNationalityDropdown(false);
                                    }}
                                >
                                    <MdOutlineArrowDropDown className='dropdownIcon' />
                                    <input 
                                        type="text" 
                                        placeholder='Select Visa Type'
                                        value={visaType ? visaTypes.find(v => v.value === visaType)?.label : ''}
                                        readOnly
                                    />
                                    <HiOutlineDocumentText className='icon' />
                                </div>
                                {showVisaTypeDropdown && (
                                    <div className="dropdownList">
                                        {visaTypes.map((type) => (
                                            <div 
                                                key={type.value}
                                                className="dropdownItem"
                                                onClick={() => handleVisaTypeSelect(type.value)}
                                            >
                                                {type.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {!visaType && <span className="errorText">Select Visa Type</span>}
                            </div>
                        </div>

                        {/* حقل مكان البصمة */}
                        <div className="formField">
                            <label htmlFor="fingerprintLocation">Fingerprint Location</label>
                            <div className="inputWrapper" ref={fingerprintRef}>
                                <div 
                                    className="input flex" 
                                    onClick={() => {
                                        setShowFingerprintDropdown(!showFingerprintDropdown);
                                        setShowNationalityDropdown(false);
                                        setShowVisaTypeDropdown(false);
                                    }}
                                >
                                    <MdOutlineArrowDropDown className='dropdownIcon' />
                                    <input 
                                        type="text" 
                                        placeholder='Select Fingerprint Location'
                                        value={fingerprintLocation ? fingerprintLocations.find(f => f.value === fingerprintLocation)?.label : ''}
                                        readOnly
                                    />
                                    <FaFingerprint className='icon' />
                                </div>
                                {showFingerprintDropdown && (
                                    <div className="dropdownList">
                                        {fingerprintLocations.map((loc) => (
                                            <div 
                                                key={loc.value}
                                                className="dropdownItem"
                                                onClick={() => handleFingerprintSelect(loc.value)}
                                            >
                                                {loc.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {!fingerprintLocation && <span className="errorText">Select Fingerprint Location</span>}
                                
                                {/* إذا اختار "بيتك"، يظهر حقل إدخال وزر الموقع */}
                                {fingerprintLocation === 'home' && (
                                    <div className="customLocationField">
                                        <div className="input flex">
                                            <input 
                                                type="text" 
                                                placeholder='Enter your location'
                                                value={customLocation}
                                                onChange={(e) => setCustomLocation(e.target.value)}
                                            />
                                            <button 
                                                type="button"
                                                className="locationBtn"
                                                onClick={getCurrentLocation}
                                                title="Get current location"
                                            >
                                                <MdLocationOn className='icon' />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* حقل تاريخ الذهاب */}
                        <div className="formField">
                            <label htmlFor="departureDate">Departure Date</label>
                            <div className="inputWrapper">
                                <div className="input flex">
                                    <MdOutlineArrowDropDown className='dropdownIcon' />
                                    <input 
                                        type="date" 
                                        placeholder='Select Departure Date'
                                        value={departureDate}
                                        onChange={(e) => setDepartureDate(e.target.value)}
                                    />
                                    <BsCalendarDate className='icon' />
                                </div>
                                {!departureDate && <span className="errorText">Select Departure Date</span>}
                            </div>
                        </div>

                        {/* حقل عدد المسافرين */}
                        <div className="formField">
                            <label htmlFor="numberOfTravelers">Number of Travelers</label>
                            <div className="inputWrapper">
                                <div className="input flex daysInput">
                                    <button 
                                        type="button"
                                        className="daysBtn"
                                        onClick={() => setNumberOfTravelers(prev => prev > 1 ? prev - 1 : 1)}
                                    >
                                        <AiOutlineMinus className='icon' />
                                    </button>
                                    <input 
                                        type="number" 
                                        placeholder='Travelers'
                                        value={numberOfTravelers}
                                        onChange={(e) => handleTravelersChange(e.target.value)}
                                        min="1"
                                    />
                                    <button 
                                        type="button"
                                        className="daysBtn"
                                        onClick={() => setNumberOfTravelers(prev => prev + 1)}
                                    >
                                        <AiOutlinePlus className='icon' />
                                    </button>
                                </div>
                                
                                {/* إذا كان أكثر من مسافر واحد، يظهر اختيار نوع المسافر */}
                                {numberOfTravelers > 1 && (
                                    <div className="formField" style={{ marginTop: '1rem' }}>
                                        <label htmlFor="travelerType">Traveler Type</label>
                                        <div className="inputWrapper" ref={travelerTypeRef}>
                                            <div 
                                                className="input flex" 
                                                onClick={() => {
                                                    setShowTravelerTypeDropdown(!showTravelerTypeDropdown);
                                                    setShowRoomTypeDropdown(false);
                                                }}
                                            >
                                                <MdOutlineArrowDropDown className='dropdownIcon' />
                                                <input 
                                                    type="text" 
                                                    placeholder='Select Traveler Type'
                                                    value={travelerType ? travelerTypes.find(t => t.value === travelerType)?.label : ''}
                                                    readOnly
                                                />
                                                <HiDocumentText className='icon' />
                                            </div>
                                            {showTravelerTypeDropdown && (
                                                <div className="dropdownList">
                                                    {travelerTypes.map((type) => (
                                                        <div 
                                                            key={type.value}
                                                            className="dropdownItem"
                                                            onClick={() => handleTravelerTypeSelect(type.value)}
                                                        >
                                                            {type.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {!travelerType && <span className="errorText">Select Traveler Type</span>}
                                            
                                            {/* إذا اختار شركة أو أصدقاء، يظهر اختيار نوع الغرفة */}
                                            {(travelerType === 'company' || travelerType === 'friends') && (
                                                <div className="formField" style={{ marginTop: '1rem' }}>
                                                    <label htmlFor="roomType">Room Type</label>
                                                    <div className="inputWrapper" ref={roomTypeRef}>
                                                        <div 
                                                            className="input flex" 
                                                            onClick={() => {
                                                                setShowRoomTypeDropdown(!showRoomTypeDropdown);
                                                                setShowTravelerTypeDropdown(false);
                                                            }}
                                                        >
                                                            <MdOutlineArrowDropDown className='dropdownIcon' />
                                                            <input 
                                                                type="text" 
                                                                placeholder='Select Room Type'
                                                                value={roomType ? roomTypes.find(r => r.value === roomType)?.label : ''}
                                                                readOnly
                                                            />
                                                            <HiDocumentText className='icon' />
                                                        </div>
                                                        {showRoomTypeDropdown && (
                                                            <div className="dropdownList">
                                                                {roomTypes.map((type) => (
                                                                    <div 
                                                                        key={type.value}
                                                                        className="dropdownItem"
                                                                        onClick={() => handleRoomTypeSelect(type.value)}
                                                                    >
                                                                        {type.label}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {!roomType && <span className="errorText">Select Room Type</span>}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* حقل عدد الأيام */}
                        <div className="formField">
                            <label htmlFor="numberOfDays">Number of Days</label>
                            <div className="inputWrapper">
                                <div className="input flex daysInput">
                                    <button 
                                        type="button"
                                        className="daysBtn"
                                        onClick={decrementDays}
                                    >
                                        <AiOutlineMinus className='icon' />
                                    </button>
                                    <input 
                                        type="number" 
                                        placeholder='Days'
                                        value={numberOfDays}
                                        onChange={(e) => handleDaysChange(e.target.value)}
                                        min="1"
                                    />
                                    <button 
                                        type="button"
                                        className="daysBtn"
                                        onClick={incrementDays}
                                    >
                                        <AiOutlinePlus className='icon' />
                                    </button>
                                </div>
                                {/* عرض السعر */}
                                {destination?.price && (
                                    <div className="priceDesc flex">
                                        <div className="priceInfo">
                                            {numberOfDays === 1 && (
                                                <span className="priceText">Price per day: ${destination.price}</span>
                                            )}
                                            {numberOfDays === 2 && (
                                                <span className="priceText">2 days × ${destination.price} = ${destination.price * 2}</span>
                                            )}
                                            {numberOfDays > 2 && (
                                                <>
                                                    <span className="priceText">
                                                        {numberOfDays} days × ${destination.price} = ${destination.price * numberOfDays}
                                                    </span>
                                                    {hasDiscount && (
                                                        <span className="discountText">5% discount applied</span>
                                                    )}
                                                </>
                                            )}
                                            {roomType === 'double' && (
                                                <span className="priceText">+ $150 (Double room)</span>
                                            )}
                                        </div>
                                        <div className="totalPrice">
                                            <h5>${totalPrice}</h5>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <button 
                        className='btn btn-primary'
                        onClick={() => {
                            // إرسال بيانات المسافرين إلى صفحة Information
                            navigate('/information', {
                                state: {
                                    bookingData: {
                                        destination: destination,
                                        nationality: nationality,
                                        visaType: visaType,
                                        fingerprintLocation: fingerprintLocation,
                                        customLocation: customLocation,
                                        departureDate: departureDate,
                                        numberOfTravelers: numberOfTravelers,
                                        travelerType: travelerType,
                                        roomType: roomType,
                                        numberOfDays: numberOfDays,
                                        totalPrice: totalPrice
                                    }
                                }
                            });
                        }}
                    >
                        Visa Application
                    </button>
                </div>
            </div>
            </section>    </>
    );
};

export default Booking;

