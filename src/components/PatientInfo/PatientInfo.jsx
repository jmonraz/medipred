import React from "react";
import "./PatientInfo.css";
import SearchScreen from "../SearchScreen";
import InputField from "../InputField";
import SingleButton from "../SingleButton/SingleButton";
import FieldBox from "../FieldBox";
import searchIcon from "../../assets/images/icons/search_icon_black.png";


const PatientInfo = ({ onCreate }) => {
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('');
    const [glucose, setGlucose] = React.useState('');
    const [bloodPressure, setBloodPressure] = React.useState('');
    const [insulin, setInsulin] = React.useState('');
    const [bmi, setBmi] = React.useState('');

    const button =
        { 'icon': searchIcon, 'label': 'search' };

    const handleMenuItemClick = item => {
        setSelectedMenuItem(item);
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

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'search':
                return <SearchScreen />
            default:
                return (
                    <form className="form-container">
                        <div className="patient-info-banner">
                            <p>Patient Information</p>
                            <button type="submit">Save</button>
                        </div>
                        <div className="form-sub-container">
                            <div className="form-row-1">
                                <h6 className="form-sub">Information</h6>
                                <SingleButton button={button} onClick={handleMenuItemClick} width={22} />
                            </div>
                            <div className="form-row">
                                <div className="form-col">
                                    <label>First Name</label>
                                    <FieldBox data="Jorge" />
                                    <label>Middle Name</label>
                                    <FieldBox data="Octavio" />
                                    <label>Last Name</label>
                                    <FieldBox data="Monraz" />

                                </div>
                                <div className="form-col">
                                    <label>Contact Email</label>
                                    <FieldBox data="monraz@mail.com" />
                                    <label>Contact Phone</label>
                                    <FieldBox data="619800800" />
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
                                    <p className="red-letters bold-letters">FALSE</p>
                                    <p>OR</p>
                                    <p className="green-letters bold-letters">TRUE</p>
                                    <p className="orange-letters">Needs Further Evaluation*</p>
                                </div>
                            </div>
                        </div>
                    </form>
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