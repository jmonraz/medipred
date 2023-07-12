import { useState } from "react";
import InputField from "../../components/InputField";
import FieldBox from "../../components/FieldBox";
import { snakeCase } from "lodash";

const EditPatient = ({ onClose, data, onUpdate }) => {

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [gender, setGender] = useState(data.gender);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

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

    const handleSubmit = () => { };

    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">
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