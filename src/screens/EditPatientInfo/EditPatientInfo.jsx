import React from "react";
import InputField from "../../components/InputField";
import FieldBox from "../../components/FieldBox";
import SingleButton from "../../components/SingleButton";
import { snakeCase } from "lodash";

const EditPatientInfo = ({ onClose, data }) => {

    const [firstName, setFirstName] = React.useState('');
    const [middleName, setMiddleName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [weight, setWeight] = React.useState('');
    const [height, setHeight] = React.useState('');
    const [age, setAge] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [id, setId] = React.useState('');

    const [glucose, setGlucose] = React.useState('');
    const [bloodPressure, setBloodPressure] = React.useState('');
    const [insulin, setInsulin] = React.useState('');
    const [bmi, setBmi] = React.useState('');

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

    const analyze = async event => {
        event.preventDefault();
        if (id !== '') {
            if (glucose && bloodPressure && insulin && bmi) {
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
                        // onCreate('');
                    } else if (data.message === 'Diabetes analysis already exists for this patient') {

                    }

                } catch (error) {
                    console.log(error);
                }
            } else {

            }
        } else {

        }
    }

    return (
        <>
            <form onSubmit={analyze} className="form-container">
                <div className="patient-info-banner">
                    <p>Patient Information</p>
                    <div className="flex-row">
                        <button type="submit">Save</button>
                        <p className="close left-space bold-letters big" onClick={onClose} >X</p>
                    </div>
                </div>
                <div className="form-sub-container alt-container">
                    <div className="flex-row-start">
                        <h6 className="form-sub">Information</h6>
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
    );
};

export default EditPatientInfo;