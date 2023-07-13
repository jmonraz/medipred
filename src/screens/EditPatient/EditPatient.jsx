import { useState, useEffect, useRef } from "react";
import InputField from "../../components/InputField";
import FieldBox from "../../components/FieldBox";
import { snakeCase } from "lodash";

const EditPatient = ({ onClose, patientData, addressData, onUpdate }) => {

    const [firstName, setFirstName] = useState(patientData.first_name);
    const [middleName, setMiddleName] = useState(patientData.middle_name);
    const [lastName, setLastName] = useState(patientData.last_name);
    const [contactEmail, setContactEmail] = useState(patientData.contact_email);
    const [contactPhone, setContactPhone] = useState(patientData.contact_phone);
    const [gender, setGender] = useState(patientData.gender);
    const [dateOfBirth, setDateOfBirth] = useState(patientData.date_of_birth);
    const [height, setHeight] = useState(patientData.height);
    const [weight, setWeight] = useState(patientData.weight);
    const [bloodGroup, setBloodGroup] = useState(patientData.blood_group);

    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');


    useEffect(() => {
        if (addressData.length > 0) {
            setAddress1(addressData[0]['address1']);
            setAddress2(addressData[0]['address2']);
            setAddress3(addressData[0]['address3']);
            setCity(addressData[0]['city']);
            setState(addressData[0]['state']);
            setPostalCode(addressData[0]['postalCode']);
            setCountry(addressData[0]['country']);
        }
    }, []);

    const handleFirstNameChange = event => {
        setFirstName(event.target.value);
    }
    const handleMiddleNameChange = event => {
        setMiddleName(event.target.value);
    }
    const handleLastNameChange = event => {
        setLastName(event.target.value);
    }
    const handleContactEmailChange = event => {
        setContactEmail(event.target.value);
    }
    const handleContactPhoneChange = event => {
        setContactPhone(event.target.value);
    }
    const handleGenderChange = event => {
        setGender(event.target.value);
    }
    const handleDateOfBirthChange = event => {
        setDateOfBirth(event.target.value);
    }
    const handleHeightChange = event => {
        setHeight(event.target.value);
    }
    const handleWeightChange = event => {
        setWeight(event.target.value);
    }
    const handleBloodGroupChange = event => {
        setBloodGroup(event.target.value);
    }
    const handleAddress1Change = event => {
        setAddress1(event.target.value);
    }
    const handleAddress2Change = event => {
        setAddress2(event.target.value);
    }
    const handleAddress3Change = event => {
        setAddress3(event.target.value);
    }
    const handleCityChange = event => {
        setCity(event.target.value);
    }
    const handleStateChange = event => {
        setState(event.target.value);
    }
    const handlePostalCodeChange = event => {
        setPostalCode(event.target.value);
    }
    const handleCountryChange = event => {
        setCountry(event.target.value);
    }

    const updatePatient = async event => {
        event.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/patients/edit/${patientData.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patient: {
                        [snakeCase('firstName')]: firstName,
                        [snakeCase('middleName')]: middleName,
                        [snakeCase('lastName')]: lastName,
                        [snakeCase('contactEmail')]: contactEmail,
                        [snakeCase('contactPhone')]: contactPhone,
                        [snakeCase('height')]: height,
                        [snakeCase('weight')]: weight,
                        [snakeCase('bloodGroup')]: bloodGroup,
                    },
                    address: {
                        // [snakeCase('id')]: addressData[0]['id'],
                        [snakeCase('address1')]: address1,
                        [snakeCase('address2')]: address2,
                        [snakeCase('address3')]: address3,
                        [snakeCase('city')]: city,
                        [snakeCase('state')]: state,
                        [snakeCase('postalCode')]: postalCode,
                        [snakeCase('country')]: country,
                    }
                }),
            });
            const data = await response.json();
            console.log(data);
            onUpdate();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={updatePatient} className="form-container">
                <div className="create-patient-banner">
                    <p>Create Patient</p>
                    <div className="flex-row space">
                        <button type="submit">Save</button>
                        <p className="bold-letters big close left-space" onClick={onClose}>X</p>
                    </div>
                </div>
                <div className="form-sub-container">
                    <h6 className="form-sub">Information</h6>
                    <div className="form-row">
                        <div className="form-col">
                            <label>First Name*</label>
                            <InputField id="firstName" placeholder="" value={firstName} onChange={handleFirstNameChange} />
                            <label>Middle Name</label>
                            <InputField id="middleName" placeholder="" value={middleName} onChange={handleMiddleNameChange} />
                            <label>Last Name*</label>
                            <InputField id="lastName" placeholder="" value={lastName} onChange={handleLastNameChange} />
                            <label>Contact Email*</label>
                            <InputField id="contactEmail" placeholder="" value={contactEmail} onChange={handleContactEmailChange} />
                            <label>Contact Phone*</label>
                            <InputField id="contactPhone" placeholder="" value={contactPhone} onChange={handleContactPhoneChange} />
                        </div>
                        <div className="form-col">
                            <label>Gender</label>
                            <FieldBox data={gender} />
                            <label>DOB*</label>
                            <FieldBox data={dateOfBirth} />
                            <label>Height (cm)</label>
                            <InputField id="height" placeholder="" value={height} onChange={handleHeightChange} type="number" />
                            <label>Weight (lbs)</label>
                            <InputField id="weight" placeholder="" value={weight} onChange={handleWeightChange} type="number" />
                            <label>Bloog Group</label>
                            <InputField id="bloodGroup" placeholder="" value={bloodGroup} onChange={handleBloodGroupChange} />
                        </div>
                    </div>
                    <hr></hr>
                    <br></br>
                    <h6 className="form-sub">Address</h6>
                    <div className="form-row">
                        <div className="form-col">
                            <label>Address 1</label>
                            <InputField id="adress1" placeholder="" value={address1} onChange={handleAddress1Change} />
                            <label>Address 2</label>
                            <InputField id="address2" placeholder="" value={address2} onChange={handleAddress2Change} />
                            <label>Address 3</label>
                            <InputField id="address3" placeholder="" value={address3} onChange={handleAddress3Change} />
                            <label>City</label>
                            <InputField id="city" placeholder="" value={city} onChange={handleCityChange} />
                        </div>
                        <div className="form-col">
                            <label>State</label>
                            <InputField id="state" placeholder="" value={state} onChange={handleStateChange} />
                            <label>Postal Code</label>
                            <InputField id="postalCode" placeholder="" value={postalCode} onChange={handlePostalCodeChange} />
                            <label>Country</label>
                            <InputField id="country" placeholder="" value={country} onChange={handleCountryChange} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditPatient;