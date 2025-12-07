import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { HiCamera } from 'react-icons/hi';
import './EnterPassengerDetails.scss';
import video from '../Booking/45569-443244046_small.mp4';

const EnterPassengerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const bookingData = location.state?.bookingData;
    const numberOfTravelers = bookingData?.numberOfTravelers || 1;
    
    const [activeTab, setActiveTab] = useState(0);
    const [passengers, setPassengers] = useState(
        Array.from({ length: numberOfTravelers }, () => ({
            firstName: '',
            lastName: '',
            maritalStatus: '',
            nationalId: null,
            passport: null,
            hasPreviousVisa: false,
            hasTraveledInLastTenYears: false,
            hasVisaCancelled: false,
            hasDrivingLicense: false,
            hasRelatives: false
        }))
    );
    const [showMaritalStatusDropdown, setShowMaritalStatusDropdown] = useState(false);
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const maritalStatuses = [
        { value: 'single', label: 'Single' },
        { value: 'married', label: 'Married' },
        { value: 'divorced', label: 'Divorced' },
        { value: 'widowed', label: 'Widowed' }
    ];

    const handleInputChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    const handleFileUpload = (index, field, file) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = file;
        setPassengers(updatedPassengers);
    };

    const handleMaritalStatusSelect = (status) => {
        handleInputChange(activeTab, 'maritalStatus', status);
        setShowMaritalStatusDropdown(false);
        // إزالة خطأ الحالة الاجتماعية عند الاختيار
        const errorKey = `passenger-${activeTab}-maritalStatus`;
        if (errors[errorKey]) {
            const newErrors = { ...errors };
            delete newErrors[errorKey];
            setErrors(newErrors);
        }
    };

    const validatePassengerData = (passenger, index) => {
        const passengerErrors = {};
        
        if (!passenger.firstName.trim()) {
            passengerErrors[`passenger-${index}-firstName`] = 'First Name is required';
        }
        if (!passenger.lastName.trim()) {
            passengerErrors[`passenger-${index}-lastName`] = 'Last Name is required';
        }
        if (!passenger.maritalStatus) {
            passengerErrors[`passenger-${index}-maritalStatus`] = 'Marital Status is required';
        }
        if (!passenger.nationalId) {
            passengerErrors[`passenger-${index}-nationalId`] = 'National ID is required';
        }
        if (!passenger.passport) {
            passengerErrors[`passenger-${index}-passport`] = 'Passport is required';
        }

        return passengerErrors;
    };

    const handleConfirm = () => {
        const allErrors = {};
        let hasErrors = false;
        const incompletePassengers = [];

        // التحقق من بيانات كل مسافر
        passengers.forEach((passenger, index) => {
            const passengerErrors = validatePassengerData(passenger, index);
            if (Object.keys(passengerErrors).length > 0) {
                Object.assign(allErrors, passengerErrors);
                hasErrors = true;
                incompletePassengers.push(index + 1);
            }
        });

        if (hasErrors) {
            setErrors(allErrors);
            setShowAlert(true);
            
            if (incompletePassengers.length === 1) {
                setAlertMessage(`Please complete all required fields for Traveler ${incompletePassengers[0]}.`);
            } else {
                setAlertMessage(`Please complete all required fields for Travelers: ${incompletePassengers.join(', ')}.`);
            }

            // إخفاء التنبيه بعد 5 ثواني
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);

            // الانتقال إلى أول مسافر به أخطاء
            if (incompletePassengers.length > 0) {
                setActiveTab(incompletePassengers[0] - 1);
            }

            return;
        }

        // إذا كانت كل البيانات مكتملة، الانتقال إلى صفحة Information
        navigate('/information', {
            state: {
                bookingData: bookingData,
                passengersData: passengers,
                allDataComplete: true
            }
        });
    };

    const handleInputChangeWithValidation = (index, field, value) => {
        handleInputChange(index, field, value);
        // إزالة خطأ الحقل عند التعديل
        const errorKey = `passenger-${index}-${field}`;
        if (errors[errorKey]) {
            const newErrors = { ...errors };
            delete newErrors[errorKey];
            setErrors(newErrors);
        }
    };

    const handleFileUploadWithValidation = (index, field, file) => {
        handleFileUpload(index, field, file);
        // إزالة خطأ الحقل عند رفع الملف
        const errorKey = `passenger-${index}-${field}`;
        if (errors[errorKey]) {
            const newErrors = { ...errors };
            delete newErrors[errorKey];
            setErrors(newErrors);
        }
    };

    const currentPassenger = passengers[activeTab];

    return (
        <section className='enterPassengerDetails'>
            <video src={video} muted autoPlay loop type="video/mp4"></video>
            <div className='EnterPassengerContent container'>
                <div className="textDiv">
                    <h1 data-aos="fade-up" className='pageTitle'>
                        Travel Data
                    </h1>
                </div>

                {/* Tabs للمسافرين */}
                {numberOfTravelers > 1 && (
                    <div className="passengerTabs">
                        {Array.from({ length: numberOfTravelers }, (_, index) => (
                            <button
                                key={index}
                                className={`tabBtn ${activeTab === index ? 'active' : ''}`}
                                onClick={() => setActiveTab(index)}
                            >
                                Traveler {index + 1} Data
                            </button>
                        ))}
                    </div>
                )}

                {/* محتوى بيانات المسافر */}
                <div className="contentArea">
                    <div className="cardDiv">
                        {/* المعلومات الشخصية */}
                        <div className="infoSection">
                            <h3 className="sectionTitle">Personal Information</h3>
                            
                            {/* الاسم الأول والاسم الأخير */}
                            <div className="nameFields">
                                <div className="formField">
                                    <label htmlFor={`firstName-${activeTab}`}>First Name</label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            id={`firstName-${activeTab}`}
                                            placeholder="First Name"
                                            value={currentPassenger.firstName}
                                            onChange={(e) => handleInputChangeWithValidation(activeTab, 'firstName', e.target.value)}
                                            className={errors[`passenger-${activeTab}-firstName`] ? 'error' : ''}
                                        />
                                        {errors[`passenger-${activeTab}-firstName`] && (
                                            <span className="errorText">{errors[`passenger-${activeTab}-firstName`]}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="formField">
                                    <label htmlFor={`lastName-${activeTab}`}>Last Name</label>
                                    <div className="inputWrapper">
                                        <input
                                            type="text"
                                            id={`lastName-${activeTab}`}
                                            placeholder="Last Name"
                                            value={currentPassenger.lastName}
                                            onChange={(e) => handleInputChangeWithValidation(activeTab, 'lastName', e.target.value)}
                                            className={errors[`passenger-${activeTab}-lastName`] ? 'error' : ''}
                                        />
                                        {errors[`passenger-${activeTab}-lastName`] && (
                                            <span className="errorText">{errors[`passenger-${activeTab}-lastName`]}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* الحالة الاجتماعية */}
                            <div className="formField">
                                <label htmlFor={`maritalStatus-${activeTab}`}>Marital Status</label>
                                <div className="inputWrapper">
                                    <div 
                                        className="input flex" 
                                        onClick={() => setShowMaritalStatusDropdown(!showMaritalStatusDropdown)}
                                    >
                                        <MdOutlineArrowDropDown className='dropdownIcon' />
                                        <input
                                            type="text"
                                            id={`maritalStatus-${activeTab}`}
                                            placeholder="Select Marital Status"
                                            value={currentPassenger.maritalStatus ? maritalStatuses.find(m => m.value === currentPassenger.maritalStatus)?.label : ''}
                                            readOnly
                                        />
                                    </div>
                                    {showMaritalStatusDropdown && (
                                        <div className="dropdownList">
                                            {maritalStatuses.map((status) => (
                                                <div
                                                    key={status.value}
                                                    className="dropdownItem"
                                                    onClick={() => handleMaritalStatusSelect(status.value)}
                                                >
                                                    {status.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {errors[`passenger-${activeTab}-maritalStatus`] && (
                                        <span className="errorText">{errors[`passenger-${activeTab}-maritalStatus`]}</span>
                                    )}
                                </div>
                            </div>

                            {/* رفع الهوية الوطنية */}
                            <div className="formField">
                                <label htmlFor={`nationalId-${activeTab}`}>National ID</label>
                                <div className="fileUploadArea">
                                    <input
                                        type="file"
                                        id={`nationalId-${activeTab}`}
                                        accept="image/*"
                                        onChange={(e) => handleFileUploadWithValidation(activeTab, 'nationalId', e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    <label 
                                        htmlFor={`nationalId-${activeTab}`} 
                                        className={`fileUploadLabel ${errors[`passenger-${activeTab}-nationalId`] ? 'error' : ''}`}
                                    >
                                        <HiCamera className="cameraIcon" />
                                        <span>{currentPassenger.nationalId ? currentPassenger.nationalId.name : 'Attach National ID'}</span>
                                    </label>
                                    {errors[`passenger-${activeTab}-nationalId`] && (
                                        <span className="errorText">{errors[`passenger-${activeTab}-nationalId`]}</span>
                                    )}
                                </div>
                            </div>

                            {/* رفع جواز السفر */}
                            <div className="formField">
                                <label htmlFor={`passport-${activeTab}`}>Passport</label>
                                <div className="fileUploadArea">
                                    <input
                                        type="file"
                                        id={`passport-${activeTab}`}
                                        accept="image/*"
                                        onChange={(e) => handleFileUploadWithValidation(activeTab, 'passport', e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    <label 
                                        htmlFor={`passport-${activeTab}`} 
                                        className={`fileUploadLabel ${errors[`passenger-${activeTab}-passport`] ? 'error' : ''}`}
                                    >
                                        <HiCamera className="cameraIcon" />
                                        <span>{currentPassenger.passport ? currentPassenger.passport.name : 'Attach Passport'}</span>
                                    </label>
                                    {errors[`passenger-${activeTab}-passport`] && (
                                        <span className="errorText">{errors[`passenger-${activeTab}-passport`]}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* تأشيرة سابقة */}
                    <div className="cardDiv">
                        <div className="infoSection">
                            <h3 className="sectionTitle">Previous Visa</h3>
                            
                            {/* السؤال الأول */}
                            <div className="visaQuestion">
                                <span>Have you previously obtained a visa for {bookingData?.destination?.title || 'this destination'}?</span>
                                <label className="toggleSwitch">
                                    <input
                                        type="checkbox"
                                        checked={currentPassenger.hasPreviousVisa}
                                        onChange={(e) => handleInputChange(activeTab, 'hasPreviousVisa', e.target.checked)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            {/* السؤال الثاني */}
                            <div className="visaQuestion">
                                <span>Have you traveled to {bookingData?.destination?.title || 'this destination'} in the last ten years?</span>
                                <label className="toggleSwitch">
                                    <input
                                        type="checkbox"
                                        checked={currentPassenger.hasTraveledInLastTenYears}
                                        onChange={(e) => handleInputChange(activeTab, 'hasTraveledInLastTenYears', e.target.checked)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            {/* السؤال الثالث */}
                            <div className="visaQuestion">
                                <span>Has your visa been canceled before?</span>
                                <label className="toggleSwitch">
                                    <input
                                        type="checkbox"
                                        checked={currentPassenger.hasVisaCancelled}
                                        onChange={(e) => handleInputChange(activeTab, 'hasVisaCancelled', e.target.checked)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            {/* السؤال الرابع */}
                            <div className="visaQuestion">
                                <span>Do you have a driving license?</span>
                                <label className="toggleSwitch">
                                    <input
                                        type="checkbox"
                                        checked={currentPassenger.hasDrivingLicense}
                                        onChange={(e) => handleInputChange(activeTab, 'hasDrivingLicense', e.target.checked)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            {/* السؤال الخامس */}
                            <div className="visaQuestion">
                                <span>Do you have relatives living in {bookingData?.destination?.title || 'this destination'}?</span>
                                <label className="toggleSwitch">
                                    <input
                                        type="checkbox"
                                        checked={currentPassenger.hasRelatives}
                                        onChange={(e) => handleInputChange(activeTab, 'hasRelatives', e.target.checked)}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* رسالة التنبيه */}
                {showAlert && (
                    <div className="alertMessage">
                        <span>{alertMessage}</span>
                        <button onClick={() => setShowAlert(false)}>×</button>
                    </div>
                )}

                {/* زر التأكيد */}
                <button 
                    className='btn btn-primary confirmBtn'
                    onClick={handleConfirm}
                >
                    Confirm
                </button>
            </div>
        </section>
    );
};

export default EnterPassengerDetails;

