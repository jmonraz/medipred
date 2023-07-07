import React from "react";
import { snakeCase } from 'lodash';
import "./PatientInfo.css";
import SearchScreen from "../SearchScreen/SearchScreen";
import InputField from "../../components/InputField";
import SingleButton from "../../components/SingleButton";
import FieldBox from "../../components/FieldBox";
import searchIcon from "../../assets/images/icons/search_icon_black.png";

const PatientInfo = ({ onCreate, onClose }) => {
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    const [glucose, setGlucose] = React.useState('');
    const [bloodPressure, setBloodPressure] = React.useState('');
    const [insulin, setInsulin] = React.useState('');
    const [bmi, setBmi] = React.useState('');

    const [firstName, setFirstName] = React.useState('');
    const [middleName, setMiddleName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [id, setId] = React.useState('');

    const button =
        { 'icon': searchIcon, 'label': 'search' };

    const handleGlucoseChange = event => {
        setGlucose(event.target.value);
    }

    const handleBloodPressureChange = event => {
        setBloodPressure(event.target.value);
    }

    const handleInsulinChange = event => {
        setInsulin(event.target.value);
    }

    const handleBmiChange = event => {
        setBmi(event.target.value);
    }
    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };
    const onCloseChildComponent = () => {
        setIsSearchOpen(false);
    }

    const getPatientData = (rowData) => {
        const firstName = rowData['firstName'];
        const middleName = rowData['middleName'];
        const lastName = rowData['lastName'];
        const height = rowData['height'];
        const weight = rowData['weight'];
        const age = rowData['age'];
        const gender = rowData['gender'];
        const id = rowData['id'];

        setFirstName(firstName);
        setMiddleName(middleName);
        setLastName(lastName);
        setHeight(height);
        setWeight(weight);
        setAge(age);
        setGender(gender);
        setId(id);
        setIsSearchOpen(false);
    }

    const analyze = async event => {
        event.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/model/diabetes/predict/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patient: {
                        [snakeCase('id')]: id,
                    },
                    data: {
                        [snakeCase('glucose')]: glucose,
                        [snakeCase('bloodPressure')]: bloodPressure,
                        [snakeCase('insulin')]: insulin,
                        [snakeCase('bmi')]: bmi,
                    }
                }),
            });
            const data = await response.json();
            if (data.message === 'Analysis successful') {
                console.log('ok');
                onCreate('');
            } else {

            }

        } catch (error) {
            console.log(error);
        }
    }

    const renderComponent = () => {

        return (
            <>
                {isSearchOpen && (
                    <div className="overlay">
                        <div className="overlay-container">
                            <SearchScreen getPatientData={getPatientData} onClose={onCloseChildComponent} />
                        </div>

                    </div>
                )}
                <form onSubmit={analyze} className="form-container">
                    <div className="patient-info-banner">
                        <p>Patient Information</p>
                        <div className="flex-row">
                            <button type="submit">Save</button>
                            <p className="close left-space bold-letters big" onClick={onClose}>X</p>
                        </div>
                    </div>
                    <div className="form-sub-container alt-container">
                        <div className="flex-row-start">
                            <h6 className="form-sub">Information</h6>
                            <SingleButton button={button} onClick={handleSearchClick} width={22} />
                        </div>
                        <div className="form-row">
                            <div className="form-col">
                                <label>First Name</label>
                                <FieldBox data={firstName} />
                                <label>Middle Name</label>
                                <FieldBox data={middleName} />
                                <label>Last Name</label>
                                <FieldBox data={lastName} />

                            </div>
                            <div className="form-col">
                                <label>Gender</label>
                                <FieldBox data={gender} />
                                <label>Age</label>
                                <FieldBox data={age} />
                                <label>Height</label>
                                <FieldBox data={height} />
                                <label>Weight</label>
                                <FieldBox data={weight} />
                            </div>
                        </div>
                        <hr></hr>
                        <br></br>
                        <h6 className="form-sub">Analysis</h6>
                        <div className="form-row">
                            <div className="form-col">
                                <label>Glucose*</label>
                                <InputField id="glucose" placeholder="" value={glucose} onChange={handleGlucoseChange} />
                                <label>Blood Pressure*</label>
                                <InputField id="bloodPressure" placeholder="" value={bloodPressure} onChange={handleBloodPressureChange} />
                                <label>Insulin*</label>
                                <InputField id="insulin" placeholder="" value={insulin} onChange={handleInsulinChange} />
                                <label>BMI*</label>
                                <InputField id="bmi" placeholder="" value={bmi} onChange={handleBmiChange} />
                            </div>
                            <div className="form-col">
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )

    }

    return (
        <>
            {renderComponent()}
        </>
    )
}

export default PatientInfo;