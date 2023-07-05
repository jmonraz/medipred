import React, { useState, useEffect } from "react";
import "./PatientsScreen.css";
import ButtonsRow from "../ButtonsRow";
import CustomTable from "../CustomTable";
import CreatePatient from "../CreatePatient";
import addIcon from "../../assets/images/icons/add_icon_green.png";
import editIcon from "../../assets/images/icons/edit_icon_orange.png";
import blockIcon from "../../assets/images/icons/block_icon_red.png";
import searchIcon from "../../assets/images/icons/search_icon_black.png";
import excelIcon from "../../assets/images/icons/excel_icon_green.png";
import adobeIcon from "../../assets/images/icons/adobe_icon_red.png";

const PatientsScreen = () => {

    const [selectedMenuItem, setSelectedMenuItem] = React.useState(false);
    const [patientData, setPatientData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const handleMenuItemClick = item => {
        setSelectedMenuItem(item);
    }

    const handleCloseChild = () => {
        setSelectedMenuItem('');
    }
    const handleCreatePatientButton = item => {
        setSelectedMenuItem('');
        getData();
    }

    const buttons = [
        { 'icon': addIcon, 'label': 'add' },
        { 'icon': editIcon, 'label': 'edit' },
        { 'icon': blockIcon, 'label': 'block' },
        { 'icon': searchIcon, 'label': 'search' },
        { 'icon': excelIcon, 'label': 'excel' },
        { 'icon': adobeIcon, 'label': 'adobe' },
    ];
    const columns = [
        'First Name', 'Last Name', 'Height', 'Weight', 'Blood Group', 'Date Of Birth'
    ];

    const getData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/patients/");
            const data = await response.json();
            const formattedData = formatData(data.patients);
            setPatientData(formattedData);
            setIsDataLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    const formatData = (patients) => {
        return patients.map(patient => ({
            firstName: patient.first_name,
            lastName: patient.last_name,
            height: patient.height,
            weight: patient.weight,
            bloodGroup: patient.blood_group,
            dateOfBirth: patient.date_of_birth
        }));
    }

    useEffect(() => {
    }, [patientData]);

    const renderComponent = () => {
        if (!isDataLoaded) {
            return <div>Loading...</div>
        } else {
            switch (selectedMenuItem) {
                case 'add':
                    return <CreatePatient onCreate={handleCreatePatientButton} onClose={handleCloseChild} />
                case 'edit':
                    return <div></div>
                case 'block':
                    return <div></div>
                case 'search':
                    return <div></div>
                case 'excel':
                    return <div></div>
                case 'adobe':
                    return <div></div>
                default:
                    return (
                        <>
                            <ButtonsRow buttons={buttons} width={22} onClick={handleMenuItemClick} />
                            <CustomTable data={patientData} columns={columns} />
                        </>
                    );
            }

        }
    }

    return (
        <>
            {renderComponent()}
        </>
    )
}

export default PatientsScreen;