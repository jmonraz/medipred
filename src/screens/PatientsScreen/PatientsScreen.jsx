import React, { useState, useEffect, useRef } from "react";

// components
import ButtonsRow from "../../components/ButtonsRow";
import CustomTable from "../../components/CustomTable";
import CreatePatient from "../CreatePatient/CreatePatient";
import EditPatient from "../EditPatient/EditPatient";
import SearchBox from "../../components/SearchBox/SearchBox";
import OverlayBox from "../../components/OverlayBox";

// icons
import addIcon from "../../assets/images/icons/add_icon_green.png";
import editIcon from "../../assets/images/icons/edit_icon_orange.png";
import blockIcon from "../../assets/images/icons/block_icon_red.png";
import searchIcon from "../../assets/images/icons/search_icon_black.png";
import excelIcon from "../../assets/images/icons/excel_icon_green.png";
import adobeIcon from "../../assets/images/icons/adobe_icon_red.png";


const PatientsScreen = () => {

    const addressIdRef = useRef(null);

    const patientRef = useRef([]);

    const [patientData, setPatientData] = useState([]);
    const [patientFullData, setPatientFullData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [addressData, setAddressData] = useState([]);


    useEffect(() => {
        getData();
    }, [])

    const handleButtonClicked = label => {
        if (label === 'add') {
            setIsAddOpen(true);
        }
        if (label === 'edit') {
            setIsEditOpen(true);
        }
        if (label === 'search') {
            setIsSearchOpen(true);
        }
    }
    const handleCloseAdd = () => {
        setIsAddOpen(false);
    }
    const handleCloseEdit = () => {
        setIsEditOpen(false);
        setAddressData([]);
    }
    const handleCloseSeach = () => {
        setIsSearchOpen(false);
    }
    const handleCreatePatientButton = item => {
        setIsAddOpen(false);
        getData();
    }
    const handleUpdatePatientButton = item => {
        setIsEditOpen(false);
        setAddressData([]);
        getData();
    }
    const handleSearch = item => {
        setIsSearchOpen(false);
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
        'First Name', 'Last Name', 'Height', 'Weight', 'Blood Group', 'Date Of Birth', 'Contact Email'
    ];

    const getData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/patients/");
            const data = await response.json();
            setPatientFullData(data.patients);
            const formattedData = formatData(data.patients);
            setPatientData(formattedData);
            setIsDataLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getAddress = async () => {
        if (addressIdRef.current !== null) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/v1/address/${addressIdRef.current}/`)
                const data = await response.json();
                const formattedData = formatAddressData(data.data);
                console.log(formattedData);
                setAddressData(formattedData);
            } catch (error) {
                console.log(error);
            }
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
            dateOfBirth: patient.date_of_birth,
            email: patient.contact_email
        }));
    }

    const formatAddressData = address => {
        return [
            {
                id: address.id,
                address1: address.address_1,
                address2: address.address_2,
                address3: address.address_3,
                city: address.city,
                state: address.state,
                postalCode: address.postal_code,
                country: address.country
            }
        ]
    }

    const handleRowClick = (patient) => {
        patientRef.current = patient;
        patientRef.current = patientFullData.filter((item, index) => patient.id === item.id);
        addressIdRef.current = patientRef.current[0]['address'];
        getAddress();
    }

    const renderComponent = () => {
        if (!isDataLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div className="main-container">
                    {isAddOpen && (
                        <div className="overlay">
                            <div className="overlay-container">
                                <CreatePatient onCreate={handleCreatePatientButton} onClose={handleCloseAdd} />
                            </div>
                        </div>
                    )}
                    {isEditOpen && (
                        <div className="overlay">
                            <div className="overlay-container">
                                <EditPatient onUpdate={handleUpdatePatientButton} onClose={handleCloseEdit} patientData={patientRef.current[0]} addressData={addressData} />
                            </div>
                        </div>
                    )}
                    {isSearchOpen && (
                        <div className="overlay">
                            <div className="overlay-column">
                                <SearchBox onClose={handleCloseSeach} onSearch={handleSearch} />
                            </div>
                        </div>
                    )}
                    <ButtonsRow buttons={buttons} width={22} onClick={handleButtonClicked} />
                    <CustomTable data={patientData} columns={columns} onRowDoubleClick={() => { }} onRowClick={handleRowClick} />
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