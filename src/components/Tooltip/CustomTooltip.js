import React from "react";
import Tooltip from "@mui/material/Tooltip";

import './CustomTooltip.css';

const CustomTooltip = ({ title, children }) => {
    return (
        <Tooltip
            classes={{
                tooltip: 'exercise-info-tooltip',
                arrow: 'exercise-info-tooltip-arrow',
            }}
            title={title}
            arrow
            enterDelay={500}
        >
            {children}
        </Tooltip>
    );
};

export default CustomTooltip;
