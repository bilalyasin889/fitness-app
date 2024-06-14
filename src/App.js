import './App.css';
import {Box} from "@mui/material";
import Navbar from "./components/Navbar";
import React, {lazy} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoadingSpinner} from "./components/LoadingSpinner";

const Home = lazy(() => import('./pages/Home/Home'));
const Exercises = lazy(() => import('./pages/Exercises/Exercises'));
const ExerciseInfo = lazy(() => import('./pages/ExerciseInfo/ExerciseInfo'));

function App() {
    return (
        <BrowserRouter>
            <Box m="auto">
                <Navbar/>
                <Box flexGrow={1}>
                    <React.Suspense fallback={
                        <div className="fallback-loading">
                            <LoadingSpinner role="status" aria-label="Loading Page"/>
                        </div>
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
