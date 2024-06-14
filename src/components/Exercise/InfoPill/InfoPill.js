import Button from "@mui/material/Button";
import React from "react";

import CustomTooltip from "../../Tooltip/CustomTooltip";

import './InfoPill.css'

const InfoPill  = ({ tooltipTitle, buttonText }) => {
    let className = '';

    switch (tooltipTitle.toLowerCase()) {
        case 'body part':
            className = 'body-part-btn';
            break;
        case 'target muscle':
            className = 'target-muscle-btn';
            break;
        case 'equipment':
            className = 'equipment-btn';
            break;
        default:
            className = '';
            break;
    }

    return (
        <CustomTooltip title={tooltipTitle}>
            <Button className={`pill ${className}`} aria-label={`${tooltipTitle}. ${buttonText}`}>{buttonText}</Button>
        </CustomTooltip>
    );
};

export default InfoPill;