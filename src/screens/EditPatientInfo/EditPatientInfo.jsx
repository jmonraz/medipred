import React from "react";
import InputField from "../../components/InputField";
import FieldBox from "../../components/FieldBox";
import SingleButton from "../../components/SingleButton";
import { snakeCase } from "lodash";

const EditPatientInfo = ({ onClose, patientData, analysisData, onUpdate }) => {
    const analysisIdRef = React.useRef("");

    const [firstName, setFirstName] = React.useState(patientData.firstName);
    const [middleName, setMiddleName] = React.useState(patientData.middleName);
    const [lastName, setLastName] = React.useState(patientData.lastName);
    const [weight, setWeight] = React.useState(patientData.weight);
    const [height, setHeight] = React.useState(patientData.height);
    const [age, setAge] = React.useState(patientData.age);
    const [gender, setGender] = React.useState(patientData.gender);
    const [id, setId] = React.useState(patientData.id);

    const [glucose, setGlucose] = React.useState(analysisData.glucose);
    const [bloodPressure, setBloodPressure] = React.useState(analysisData.blood_pressure);
    const [insulin, setInsulin] = React.useState(analysisData.insulin);
    const [bmi, setBmi] = React.useState(analysisData.bmi);

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

    const updateAnalysis = async event => {
        event.preventDefault();

        if (glucose && bloodPressure && insulin && bmi) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/model/diabetes/predict/${analysisData.analysis_id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        [snakeCase('glucose')]: glucose,
                        [snakeCase('bloodPressure')]: bloodPressure,
                        [snakeCase('insulin')]: insulin,
                        [snakeCase('bmi')]: bmi,
                    }),
                });

            } catch (error) {
                console.log(error);
            }
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
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log('blank values');
        }
        onUpdate();
    }

    return (
        <>
            <form onSubmit={updateAnalysis} className="form-container">
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
                            <InputField id="glucose" placeholder={glucose} value={glucose} onChange={handleGlucoseChange} />
                            <label>Blood Pressure*</label>
                            <InputField id="bloodPressure" placeholder={bloodPressure} value={bloodPressure} onChange={handleBloodPressureChange} />
                            <label>Insulin*</label>
                            <InputField id="insulin" placeholder={insulin} value={insulin} onChange={handleInsulinChange} />
                            <label>BMI*</label>
                            <InputField id="bmi" placeholder={bmi} value={bmi} onChange={handleBmiChange} />
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