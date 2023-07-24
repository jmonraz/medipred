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
import reloadIcon from "../../assets/images/icons/reload_grey_icon.png";

// utils
import { snakeCase } from "lodash";
import { saveAs } from "file-saver";


const PatientsScreen = () => {

    const addressIdRef = useRef(null);

    const patientRef = useRef("");

    const [disabledPopup, setDisabledPopup] = useState(false);
    const [updatedPopup, setUpdatedPopup] = useState(false);
    const [createdPopup, setCreatedPopup] = useState(false);

    const [patientData, setPatientData] = useState([]);
    const [patientFullData, setPatientFullData] = useState([]);
    const [addressData, setAddressData] = useState([]);
    const [filteredPatientData, setFilteredPatientData] = React.useState([]);

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const buttons = [
        { 'icon': addIcon, 'label': 'add' },
        { 'icon': editIcon, 'label': 'edit' },
        { 'icon': blockIcon, 'label': 'block' },
        { 'icon': searchIcon, 'label': 'search' },
        { 'icon': excelIcon, 'label': 'excel' },
        { 'icon': adobeIcon, 'label': 'adobe' },
        { 'icon': reloadIcon, 'label': 'reload' },
    ];
    const columns = [
        'First Name', 'Last Name', 'Height', 'Weight', 'Blood Group', 'Date Of Birth', 'Contact Email'
    ];

    useEffect(() => {
        getData();
    }, [isDataLoaded])

    const handleButtonClicked = label => {
        if (label === 'add') {
            setIsAddOpen(true);
        }
        if (label === 'edit' && patientRef.current !== "") {
            setIsEditOpen(true);
        }
        if (label === 'search') {
            setIsSearchOpen(true);
        }
        if (label === 'block' && patientRef.current !== "") {
            const blockUser = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:8000/api/v1/patients/edit/${patientRef.current[0]['id']}/`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            patient: {
                                [snakeCase('enabled')]: false,
                            },
                            address: {
                            }
                        }),
                    });
                    const data = await response.json();
                    console.log(data);
                    getData();
                    setDisabledPopup(true);
                } catch (error) {
                    console.log(error);
                }
            };
            blockUser();
        }
        if (label === 'excel') {
            handleExportCSV();
        }
        if (label === 'reload') {
            setIsDataLoaded(false);
            setFilteredPatientData([]);
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
        setCreatedPopup(true);
        getData();
    }
    const handleUpdatePatientButton = item => {
        setIsEditOpen(false);
        setUpdatedPopup(true);
        setAddressData([]);
        getData();
    }
    const handleSearch = item => {
        setIsSearchOpen(false);
        const filteredData = patientData.filter(patient => patient.firstName.toLowerCase().includes(item.toLowerCase()));
        setFilteredPatientData(filteredData);
        patientRef.current = "";
    }

    const handleExportCSV = () => {
        let rows = filteredPatientData.length > 0 ? filteredPatientData : patientData;
        const csvData = [
            columns,
            ...rows.map(patient => [
                patient.firstName,
                patient.lastName,
                patient.height,
                patient.weight,
                patient.bloodGroup,
                patient.dateOfBirth,
                patient.email,
            ]),
        ];

        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'patients.csv');
    };

    const getData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/patients/");
            const data = await response.json();
            setPatientFullData(data.patients);
            const formattedData = formatData(data.patients);
            const sortedData = sortByAlphabetic(formattedData);
            setPatientData(sortedData);
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
        return patients
            .filter(patient => patient.enabled)
            .map(patient => ({
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

    const sortByAlphabetic = (list) => {
        list.sort((a, b) => {
            const lastNameA = a.lastName.toLowerCase();
            const lastNameB = b.lastName.toLowerCase();

            if (lastNameA < lastNameB) {
                return -1;
            } else if (lastNameA > lastNameB) {
                return 1;
            } else {
                const firstNameA = a.firstName.toLowerCase();
                const firstNameB = b.firstName.toLowerCase();

                if (firstNameA < firstNameB) {
                    return -1;
                } else if (firstNameA > firstNameB) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });

        return list;
    };


    useEffect(() => {
        if (updatedPopup) {
            setTimeout(() => {
                setUpdatedPopup(false);
            }, 2000);
        }
    }, [disabledPopup]);

    useEffect(() => {
        if (disabledPopup) {
            setTimeout(() => {
                setDisabledPopup(false);
            }, 2000);
        }
    }, [disabledPopup]);

    useEffect(() => {
        if (createdPopup) {
            setTimeout(() => {
                setCreatedPopup(false);
            }, 2000);
        }
    }, [createdPopup]);

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
                    <CustomTable data={filteredPatientData.length > 0 ? filteredPatientData : patientData} columns={columns} onRowDoubleClick={() => { }} onRowClick={handleRowClick} />
                    {disabledPopup && (
                        <div className="popup-message">
                            <p>Patient disabled.</p>
                        </div>
                    )}
                    {updatedPopup && (
                        <div className="popup-message">
                            <p>Patient updated.</p>
                        </div>
                    )}
                    {createdPopup && (
                        <div className="popup-message">
                            <p>Patient created.</p>
                        </div>
                    )}
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