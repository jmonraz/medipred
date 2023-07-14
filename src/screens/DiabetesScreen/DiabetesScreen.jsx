import React, { useEffect } from "react";

// components
import ButtonsRow from "../../components/ButtonsRow";
import CustomTable from "../../components/CustomTable";
import PatientInfo from "../PatientInfo/PatientInfo";
import EditAnalysis from "../EditAnalysis/EditAnalysis";
import SearchBox from "../../components/SearchBox/SearchBox";

// icons
import addIcon from "../../assets/images/icons/add_icon_green.png";
import editIcon from "../../assets/images/icons/edit_icon_orange.png";
import blockIcon from "../../assets/images/icons/block_icon_red.png";
import searchIcon from "../../assets/images/icons/search_icon_black.png";
import excelIcon from "../../assets/images/icons/excel_icon_green.png";
import adobeIcon from "../../assets/images/icons/adobe_icon_red.png";
import reloadIcon from "../../assets/images/icons/reload_grey_icon.png";

// utils
import { saveAs } from "file-saver";


const DiabetesScreen = () => {

    const patientRef = React.useRef("");

    const [patientData, setPatientData] = React.useState([]);
    const [filteredPatientData, setFilteredPatientData] = React.useState([]);
    const [analysisData, setAnalysisData] = React.useState([]);
    const [filteredAnalysisData, setFilteredAnalysisData] = React.useState([]);


    const [isDataLoaded, setIsDataLoaded] = React.useState(false);

    const [isAddOpen, setIsAddOpen] = React.useState(false);
    const [isEditOpen, setIsEditOpen] = React.useState(false);
    const [isSearchOpen, setIsSearchOpen] = React.useState(false);

    const columns = [
        'First Name', 'Last Name', 'Gender', 'Age', 'Glucose', 'Blood Pressure', 'Insulin', 'BMI', 'Outcome', 'Last Checked',
    ]

    const buttons = [
        { 'icon': addIcon, 'label': 'add' },
        { 'icon': editIcon, 'label': 'edit' },
        { 'icon': blockIcon, 'label': 'block' },
        { 'icon': searchIcon, 'label': 'search' },
        { 'icon': excelIcon, 'label': 'excel' },
        { 'icon': adobeIcon, 'label': 'adobe' },
        { 'icon': reloadIcon, 'label': 'reload' },
    ];

    const getData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/diabetes/");
            const data = await response.json();
            console.log(data);
            const fullData = data.data;
            setAnalysisData(fullData);
            console.log(fullData);
            const formattedData = formatData(data.data);
            setPatientData(formattedData);
            setIsDataLoaded(true);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        // setTimeout(() => {
        //     getData();
        // }, 2000);
        getData();
    }, [isDataLoaded]);

    const formatData = (data) => {
        return data.map(data => ({
            id: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            gender: data.gender,
            age: data.age,
            glucose: data.glucose,
            bloodPressure: data.blood_pressure,
            insulin: data.insulin,
            bmi: data.bmi,
            outcome: data.outcome,
            lastChecked: data.last_checked,
        }))
    }

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

    const handleAnalyze = () => {
        setIsAddOpen(false);
    }

    const handleCloseEdit = () => {
        setIsEditOpen(false);
    }

    const handleUpdateEdit = () => {
        setIsEditOpen(false);
        getData();
    }
    const handleCloseSearch = () => {
        setIsSearchOpen(false);
    }
    const handleSearch = item => {
        setIsSearchOpen(false);
        const filteredData = patientData.filter(patient => patient.firstName.toLowerCase().includes(item.toLowerCase()));
        setFilteredPatientData(filteredData);
        patientRef.current = "";
    }

    const handleRowClick = (patient) => {
        patientRef.current = patient;
        const filteredAnalysisData = analysisData.filter((item, index) => patient.id === item.id);
        setFilteredAnalysisData(filteredAnalysisData);
        console.log(filteredAnalysisData);
    }

    const handleExportCSV = () => {
        let rows = filteredPatientData.length > 0 ? filteredPatientData : patientData;
        const csvData = [
            columns,
            ...rows.map(patient => [
                patient.firstName,
                patient.lastName,
                patient.gender,
                patient.age,
                patient.glucose,
                patient.bloodPressure,
                patient.insulin,
                patient.bmi,
                patient.outcome,
                patient.lastChecked,
            ]),
        ];

        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'diabetes_analysis.csv');
    };

    const renderComponent = () => {
        if (!isDataLoaded) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        } else {
            return (
                <div className="main-container">
                    {isAddOpen && (
                        <div className="overlay">
                            <div className="overlay-container">
                                <PatientInfo onCreate={handleAnalyze} onClose={handleCloseAdd} />
                            </div>
                        </div>
                    )}
                    {isEditOpen && (
                        <div className="overlay">
                            <div className="overlay-container">
                                <EditAnalysis patientData={patientRef.current} analysisData={filteredAnalysisData[0]} onClose={handleCloseEdit} onUpdate={handleUpdateEdit} />
                            </div>
                        </div>
                    )}
                    {isSearchOpen && (
                        <div className="overlay">
                            <div className="overlay-column">
                                <SearchBox onClose={handleCloseSearch} onSearch={handleSearch} />
                            </div>
                        </div>
                    )}
                    <ButtonsRow buttons={buttons} width={22} onClick={handleButtonClicked} />
                    <CustomTable data={filteredPatientData.length > 0 ? filteredPatientData : patientData} columns={columns} onRowDoubleClick={() => { }} onRowClick={handleRowClick} />
                </div>
            )
        }

    }

    return (
        <>
            {renderComponent()}
        </>
    );
};

export default DiabetesScreen;