import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Logo from "../../assets/images/Logo.png";
import {NavLink, useLocation} from "react-router-dom";
import {useAuth} from "../../utils/authentication/AuthProvider";
import {NavItem} from "./NavMenuItem";

const title = 'FIT-tastic';
const defaultPages = [
    {url: '/', name: 'Home'},
    {url: '/exercises', name: 'Exercises'}
];

const nonUserPages = [
    {url: '/login', name: 'Login'},
];

const userPages = [
    {url: '/dashboard', name: 'Dashboard'},
];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const location = useLocation();
    const {isAuthenticated, removeToken} = useAuth();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        removeToken();
        handleCloseNavMenu();
    };

    const isActive = (pageUrl) => {
        return location.pathname === pageUrl;
    };

    const renderNavItems = (pages) => {
        return pages.map((page, index) => (
            <NavItem
                key={`${page.url}-${index}`}
                onClick={handleCloseNavMenu}
                to={page.url}
                isActive={isActive(page.url)}
                text={page.name}
                variant="text"
            />
        ));
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
                        sx={{mr: 2}}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 10,
                            display: 'flex',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        {title}
                    </Typography>

                    <Box sx={{flexGrow: 1}}/>

                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {renderNavItems(defaultPages)}
                        {isAuthenticated ? (
                            <>
                                {renderNavItems(userPages)}
                                <NavItem
                                    navKey="logout"
                                    onClick={handleLogout}
                                    to="/"
                                    text="Logout"
                                    isActive={false}
                                    variant="text"
                                />
                            </>
                        ) : (
                            renderNavItems(nonUserPages)
                        )}
                    </Box>

                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="menu"
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
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                                {renderNavItems(defaultPages)}
                                {isAuthenticated ? (
                                    <>
                                        {renderNavItems(userPages)}
                                        <NavItem
                                            navKey="logout"
                                            onClick={handleLogout}
                                            to="/"
                                            text="Logout"
                                            isActive={false}
                                            variant="text"
                                        />
                                    </>
                                ) : (
                                    renderNavItems(nonUserPages)
                                )}
                            </Box>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
