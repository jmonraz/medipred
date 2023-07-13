import React from "react";
import InputField from "../InputField";
import "./SearchBox.css";

const SearchBox = ({ onClose, onSearch }) => {
    const [firstName, setFirstName] = React.useState('');

    const handleFirstName = event => {
        setFirstName(event.target.value);
    };

    const handleSearch = () => {
        onSearch(firstName);
    };

    return (
        <div className="search-container">
            <div className="search-row">
                <p>Search</p>
                <p className="close bold-letters big" onClick={onClose}>X</p>
            </div>
            <div className="search-box">
                <label>First Name</label>
                <InputField id="first-name" placeholder="" value={firstName} onChange={handleFirstName} />
            </div>
            <div className="search-stretch">
                <button onClick={handleSearch} className="search-button">Search</button>
            </div>
        </div>
    );
};

export default SearchBox;