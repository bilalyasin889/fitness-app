import './App.css';
import {Box, CircularProgress} from "@mui/material";
import Navbar from "./components/Navbar";
import React from "react";
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import ExerciseInfo from "./pages/ExerciseInfo";

function App() {
    return (
        <BrowserRouter>
            <Box m="auto">
                <Navbar/>
                <Box flexGrow={1}>
                    <React.Suspense fallback={
                        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                            <CircularProgress/>
                        </Box>
                    }>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/exercises" element={<Exercises/>}/>
                            <Route path="/exercise/:id" element={<ExerciseInfo/>}/>
                        </Routes>
                    </React.Suspense>
                </Box>
            </Box>
        </BrowserRouter>
    );
}

export default App;
