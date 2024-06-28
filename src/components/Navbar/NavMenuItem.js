import React from "react";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";

export const NavItem = ({navKey, onClick, to, isActive, text, variant}) => (
    <Button
        key={navKey}
        onClick={onClick}
        component={NavLink}
        to={to}
        style={{
            fontWeight: isActive ? 600 : 500,
            color: isActive ? "#1F0000" : "inherit",
            textDecoration: isActive ? "underline" : "none",
            margin: '0 10px',
        }}
        variant={variant}
    >
        {text}
    </Button>
);