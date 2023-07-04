import React from "react";
import "./PatientInfo.css";
import SearchScreen from "../SearchScreen";
import InputField from "../InputField";
import SingleButton from "../SingleButton/SingleButton";
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

    const handleBloodPressure = event => {
        setBloodPressure(event.target.value);
    }

    const handleInsulin = event => {
        setInsulin(event.target.value);
    }

    const handleBmi = event => {
        setBmi(event.target.value);
    }

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'search':
                return <SearchScreen />
            default:
                return (
                    <form className="form-container">
                        <div className="create-patient-banner">
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

                                </div>
                                <div className="form-col">

                                </div>
                            </div>
                            <hr></hr>
                            <br></br>
                            <h6 className="form-sub">Analysis</h6>
                            <div className="form-row">
                                <div className="form-col"></div>
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