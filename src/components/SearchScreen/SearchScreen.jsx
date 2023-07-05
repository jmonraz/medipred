import React from "react";
import InputField from "../InputField";
import CustomTable from "../CustomTable";
import "./SearchScreen.css";


const SearchScreen = ({ getPatientData, onClose }) => {
    const [firstName, setFirstName] = React.useState('')
    const [patientData, setPatientData] = React.useState([]);
    const [isDataLoaded, setIsDataLoaded] = React.useState(false);
    const [filteredPatientData, setFilteredPatientData] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, [])

    const handleFirstNameChange = event => {
        const searchValue = event.target.value;
        setFirstName(searchValue);

        const filteredData = patientData.filter(patient => patient.firstName.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredPatientData(filteredData);
    };

    const handleRowDoubleClick = (rowData) => {
        console.log('Selected Row Data:', rowData);
        getPatientData(rowData);

    };


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
            age: patient.age,
            gender: patient.gender,
            height: patient.height,
            weight: patient.weight,
            bloodGroup: patient.blood_group,
            dateOfBirth: patient.date_of_birth,
        }));
    }

    // React.useEffect(() => {
    // }, [patientData]);

    const columns = ['First Name', 'Last Name', 'Age', 'Gender', 'Height (cm)', 'Weight (lb)', 'Blood Group', 'Date Of Birth'];

    return (
        <div className="main-container">
            <div className="flex-row-spread">
                <h6>Search Patient</h6>
                <p className="bold-letters big close" onClick={onClose}>X</p>
            </div>
            <div className="flex-row">
                <label className="flex-item">First Name</label>
                <InputField id="search" placeholder="" value={firstName} onChange={handleFirstNameChange} />
            </div>
            <div className="sub-container">

                <div className="flex-row">
                    <CustomTable data={filteredPatientData.length > 0 ? filteredPatientData : patientData} columns={columns} onRowDoubleClick={handleRowDoubleClick} />
                </div>
            </div>
        </div>

    )
}

export default SearchScreen;