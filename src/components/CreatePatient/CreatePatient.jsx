import React, { useState } from "react";
import InputField from "../InputField";
import "./CreatePatient.css";

const CreatePatient = () => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [dob, setDob] = useState('');
    const [height, setHeight] = useState('');
    const [weigth, setWeight] = useState('');
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

    /* 
        implement handle methods for all state variables
    */

    const handleSubmit = async event => {
        /* 
            implement feature to call backend
             and create new patinet in DB
        */
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="form-container">

                <h6 className="form-sub">Information</h6>

                <div className="form-row">

                    <div className="form-col">
                        <label>First Name*</label>
                        <InputField id="firstName" placeholder="" value={firstName} onChange={handleFirstNameChange} />
                        <label>Middle Name*</label>
                        <InputField id="middleName" placeholder="" value={middleName} onChange={handleFirstNameChange} />
                        <label>Last Name*</label>
                        <InputField id="lastName" placeholder="" value={lastName} onChange={handleFirstNameChange} />
                        <label>Contact Email*</label>
                        <InputField id="contactEmail" placeholder="" value={contactEmail} onChange={handleFirstNameChange} />
                        <label>Contact Phone*</label>
                        <InputField id="contactPhone" placeholder="" value={contactPhone} onChange={handleFirstNameChange} />
                    </div>
                    <div className="form-col">

                        <label>DOB*</label>
                        <InputField id="dob" placeholder="" value={dob} onChange={handleFirstNameChange} />
                        <label>Height</label>
                        <InputField id="height" placeholder="" value={height} onChange={handleFirstNameChange} />
                        <label>Weight</label>
                        <InputField id="weight" placeholder="" value={weigth} onChange={handleFirstNameChange} />
                        <label>Bloog Group</label>
                        <InputField id="bloodGroup" placeholder="" value={bloodGroup} onChange={handleFirstNameChange} />
                    </div>
                </div>
                <hr></hr>
                <br></br>
                <h6 className="form-sub">Address</h6>
                <div className="form-row">
                    <div className="form-col">
                        <label>Address 1</label>
                        <InputField id="adress1" placeholder="" value={address1} onChange={handleFirstNameChange} />
                        <label>Address 2</label>
                        <InputField id="address2" placeholder="" value={address2} onChange={handleFirstNameChange} />
                        <label>Address 3</label>
                        <InputField id="address3" placeholder="" value={address3} onChange={handleFirstNameChange} />
                        <label>City</label>
                        <InputField id="city" placeholder="" value={city} onChange={handleFirstNameChange} />
                    </div>
                    <div className="form-col">
                        <label>State</label>
                        <InputField id="state" placeholder="" value={state} onChange={handleFirstNameChange} />
                        <label>Postal Code</label>
                        <InputField id="postalCode" placeholder="" value={postalCode} onChange={handleFirstNameChange} />
                        <label>Country</label>
                        <InputField id="country" placeholder="" value={country} onChange={handleFirstNameChange} />
                    </div>
                </div>

            </form>
        </>
    )
}

export default CreatePatient;