import './App.css';
import {Box} from "@mui/material";
import Navbar from "./components/Navbar";
import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import ExerciseInfo from "./pages/ExerciseInfo";
import {LoadingSpinner} from "./components/LoadingSpinner";

function App() {
    return (
        <BrowserRouter>
            <Box m="auto">
                <Navbar/>
                <Box flexGrow={1}>
                    <React.Suspense fallback={<LoadingSpinner/>}>
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
