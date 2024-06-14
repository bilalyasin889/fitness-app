import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../assets/images/Logo.png";
import {NavLink, useLocation} from "react-router-dom";

const title = 'FIT-tastic';
const pages = [
    {url: '/', name: 'Home'},
    {url: '/exercises', name: 'Exercises'}
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const location = useLocation();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const isActive = (pageUrl) => {
        return location.pathname === pageUrl;
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="img"
                        src={Logo}
                        alt="logo"
                        style={{width: '45px', height: '45px'}}
                        sx={{display: {xs: 'none', md: 'flex'}, mr: 2}}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 10,
                            display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        {title}
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <NavLink
                                        to={page.url}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit', ...(isActive(page.url) && {
                                                fontWeight: 600,
                                                color: '#1F0000',
                                                textDecoration: 'underline'
                                            })
                                        }}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box
                        component="img"
                        src={Logo}
                        alt="logo"
                        style={{width: '45px', height: '45px'}}
                        sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 500,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        {title}
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={handleCloseNavMenu}
                                component={NavLink}
                                to={page.url}
                                style={{
                                    fontWeight: isActive(page.url) ? 600 : 500,
                                    color: isActive(page.url) ? "#1F0000" : "inherit",
                                    textDecoration: isActive(page.url) ? "underline" : "none"
                                }}
                                sx={{
                                    my: 2,
                                    color: 'inherit',
                                    display: 'block',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                    },
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
