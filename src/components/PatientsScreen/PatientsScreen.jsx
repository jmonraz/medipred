import React from "react";
import "./PatientsScreen.css";
import ButtonsRow from "../ButtonsRow";
import addIcon from "../../assets/images/icons/add_icon_green.png";
import editIcon from "../../assets/images/icons/edit_icon_orange.png";
import blockIcon from "../../assets/images/icons/block_icon_red.png";
import searchIcon from "../../assets/images/icons/search_icon_black.png";
import excelIcon from "../../assets/images/icons/excel_icon_green.png";
import pdfIcon from "../../assets/images/icons/pdf_icon_red.png";
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
    return (
        <>
            <ButtonsRow buttons={buttons} width={20} />
        </>
    )
}

export default PatientsScreen;