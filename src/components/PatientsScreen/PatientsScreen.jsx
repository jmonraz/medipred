import React from "react";
import "./PatientsScreen.css";
import ButtonsRow from "../ButtonsRow";
import CustomTable from "../CustomTable";
import addIcon from "../../assets/images/icons/add_icon_green.png";
import editIcon from "../../assets/images/icons/edit_icon_orange.png";
import blockIcon from "../../assets/images/icons/block_icon_red.png";
import searchIcon from "../../assets/images/icons/search_icon_black.png";
import excelIcon from "../../assets/images/icons/excel_icon_green.png";
import adobeIcon from "../../assets/images/icons/adobe_icon_red.png";

const PatientsScreen = () => {

    const buttons = [
        { 'icon': addIcon, 'label': 'add' },
        { 'icon': editIcon, 'label': 'edit' },
        { 'icon': blockIcon, 'label': 'block' },
        { 'icon': searchIcon, 'label': 'search' },
        { 'icon': excelIcon, 'label': 'excel' },
        { 'icon': adobeIcon, 'label': 'adobe' },
    ];
    const columns = [
        'Name', 'Age', 'Height', 'Weight', 'Blood Group', 'Registration Date', 'Last Visit'
    ];
    const data = [
        ['Jorge', 28, 511, 190, 'A+', '01/01/2023', '05/01/2023'],
        ['Aide', 26, 507, 160, 'B-', '01/01/2023', '06/01/2023'],
        ['Insi qoaksdj', 30, 607, 123020, 'BSJDHKS', '012/123/39943', '01203/1222/12321'],
        ['Insuspdsuaaaaaaaaa', 30, 40, 10, 'asdasdsadjlasjdlkasjdljsalda', 'asdhjashdjlashdjsahjdhaskdsa', 'ajsldhajslhdjalshdashdjhsajkdhsahdjahdkhsjdhjkahdks']
    ];
    return (
        <>
            <ButtonsRow buttons={buttons} width={20} />
            <CustomTable data={data} columns={columns} />
        </>
    )
}

export default PatientsScreen;