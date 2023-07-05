import React from "react";
import ButtonsRow from "../ButtonsRow";
import CustomTable from "../CustomTable";
import PatientInfo from "../PatientInfo";
import addIcon from "../../assets/images/icons/add_icon_green.png";
import editIcon from "../../assets/images/icons/edit_icon_orange.png";
import blockIcon from "../../assets/images/icons/block_icon_red.png";
import searchIcon from "../../assets/images/icons/search_icon_black.png";
import excelIcon from "../../assets/images/icons/excel_icon_green.png";
import adobeIcon from "../../assets/images/icons/adobe_icon_red.png";


const DiabetesScreen = () => {
    const [selectedMenuItem, setSelectedMenuItem] = React.useState('');

    const columns = [
        'First Name', 'Last Name', 'Gender', 'Age', 'Glucose', 'Blood Pressure', 'Insulin', 'BMI', 'Outcome',
    ]

    const dummyData = [
        { 'firstName': 'Jorge', 'lastName': 'Monraz', 'gender': 'male', 'age': '28', 'glucose': '100', 'bloodPressure': '60', 'insulin': '20', 'BMI': '34', 'diabetes': '0' }
    ]
    const buttons = [
        { 'icon': addIcon, 'label': 'add' },
        { 'icon': editIcon, 'label': 'edit' },
        { 'icon': blockIcon, 'label': 'block' },
        { 'icon': searchIcon, 'label': 'search' },
        { 'icon': excelIcon, 'label': 'excel' },
        { 'icon': adobeIcon, 'label': 'adobe' },
    ];
    const data = [];
    const handleMenuItemClick = item => {
        setSelectedMenuItem(item);
    }

    const handleCloseChild = item => {
        setSelectedMenuItem('');
    }

    const renderComponent = () => {
        switch (selectedMenuItem) {
            case 'add':
                return <PatientInfo onCreate={null} onClose={handleCloseChild} />
            default:
                return (
                    <div>
                        <ButtonsRow buttons={buttons} width={22} onClick={handleMenuItemClick} />
                        <CustomTable data={dummyData} columns={columns} />
                    </div>
                );
        }
    }
    return (
        <>
            {renderComponent()}
        </>
    );
};

export default DiabetesScreen;