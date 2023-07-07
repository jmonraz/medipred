import React from "react";
import ButtonsRow from "../../components/ButtonsRow";
import CustomTable from "../../components/CustomTable";
import PatientInfo from "../PatientInfo/PatientInfo";
import addIcon from "../../assets/images/icons/add_icon_green.png";
import editIcon from "../../assets/images/icons/edit_icon_orange.png";
import blockIcon from "../../assets/images/icons/block_icon_red.png";
import searchIcon from "../../assets/images/icons/search_icon_black.png";
import excelIcon from "../../assets/images/icons/excel_icon_green.png";
import adobeIcon from "../../assets/images/icons/adobe_icon_red.png";


const DiabetesScreen = () => {
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [patientData, setPatientData] = React.useState([]);
    const [isAddOpen, setIsAddOpen] = React.useState(false);

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
    ];

    React.useEffect(() => {
        getData();
    },)

    const getData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/diabetes/");
            const data = await response.json();
            const formattedData = formatData(data.data);
            setPatientData(formattedData);
            setIsDataLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

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
    }

    const handleCloseAdd = () => {
        setIsAddOpen(false);
    }

    const handleAnalyze = () => {
        setIsAddOpen(false);
        getData();
    }

    const renderComponent = () => {
        if (!isDataLoaded) {
            return <div>Loading...</div>
        }
        return (
            <div>
                {isAddOpen && (
                    <div className="overlay">
                        <div className="overlay-container">
                            <PatientInfo onCreate={handleAnalyze} onClose={handleCloseAdd} />
                        </div>
                    </div>
                )}
                <ButtonsRow buttons={buttons} width={22} onClick={handleButtonClicked} />
                <CustomTable data={patientData} columns={columns} onRowDoubleClick={() => { }} />
            </div>
        );
    }
    return (
        <>
            {renderComponent()}
        </>
    );
};

export default DiabetesScreen;