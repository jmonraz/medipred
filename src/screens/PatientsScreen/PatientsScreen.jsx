import React, { useState, useEffect } from "react";

import ButtonsRow from "../../components/ButtonsRow";
import CustomTable from "../../components/CustomTable";
import CreatePatient from "../CreatePatient/CreatePatient";
import OverlayBox from "../../components/OverlayBox";
import addIcon from "../../assets/images/icons/add_icon_green.png";
import editIcon from "../../assets/images/icons/edit_icon_orange.png";
import blockIcon from "../../assets/images/icons/block_icon_red.png";
import searchIcon from "../../assets/images/icons/search_icon_black.png";
import excelIcon from "../../assets/images/icons/excel_icon_green.png";
import adobeIcon from "../../assets/images/icons/adobe_icon_red.png";

const PatientsScreen = () => {
    const [patientData, setPatientData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);

    useEffect(() => {
        getData();
    },)

    const handleButtonClicked = label => {
        if (label === 'add') {
            setIsAddOpen(true);
        }
    }
    const handleCloseAdd = () => {
        setIsAddOpen(false);
    }
    const handleCreatePatientButton = item => {
        setIsAddOpen(false);
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
            id: patient.id,
            firstName: patient.first_name,
            lastName: patient.last_name,
            height: patient.height,
            weight: patient.weight,
            bloodGroup: patient.blood_group,
            dateOfBirth: patient.date_of_birth
        }));
    }

    const renderComponent = () => {
        if (!isDataLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>

                    {isAddOpen && (
                        <div className="overlay">
                            <div className="overlay-container">
                                <CreatePatient onCreate={handleCreatePatientButton} onClose={handleCloseAdd} />
                            </div>
                        </div>
                    )}

                    <ButtonsRow buttons={buttons} width={22} onClick={handleButtonClicked} />
                    <CustomTable data={patientData} columns={columns} />
                </div>
            );
        }


    }

    return (
        <>
            <OverlayBox>
                {renderComponent()}
            </OverlayBox>
        </>
    )
}

export default PatientsScreen;