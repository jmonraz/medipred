import React from "react";
import { snakeCase } from 'lodash';
import "./PatientInfo.css";
import SearchScreen from "../SearchScreen";
import InputField from "../InputField";
import SingleButton from "../SingleButton/SingleButton";
import FieldBox from "../FieldBox";
import searchIcon from "../../assets/images/icons/search_icon_black.png";


const PatientInfo = ({ onCreate, onClose }) => {
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('');
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

    const handleMenuItemClick = item => {
        setSelectedMenuItem(item);
    }

    const handleCloseChildScreen = item => {
        setSelectedMenuItem('');
    }

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
        setSelectedMenuItem('');
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
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Analysis successful') {
                        console.log('ok');
                        onCreate('');
                    } else {

                    }
                })
        } catch (error) {
            console.log(error);
        }
    }

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'search':
                return <SearchScreen getPatientData={getPatientData} onClose={handleCloseChildScreen} />
            default:
                return (
                    <>
                        <form className="form-container-2" onSubmit={analyze}>
                            <div className="patient-info-banner">
                                <p>Patient Information</p>
                                <div className="flex-row space">
                                    <button type="submit">Save</button>
                                    <p className="close left-space bold-letters big" onClick={onClose}>X</p>
                                </div>
                            </div>
                            <div className="form-sub-container-2">
                                <div className="form-row-1">
                                    <h6 className="form-sub">Information</h6>
                                    <SingleButton button={button} onClick={handleMenuItemClick} width={22} />
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
                                    <div className="form-col center-letters">
                                        <p className="bold-letters">Diabetes Risk</p>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </>
                )
        }
    }


    return (
        <>
            {renderComponent()}
        </>
    )
}

export default PatientInfo;