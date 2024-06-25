import './App.css';
import {Box} from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import React, {lazy} from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {LoadingSpinner} from "./components/LoadingSpinner";
import {ProtectedRoute} from "./utils/ProtectedRoute";
import {AuthProvider} from "./utils/authentication/AuthProvider";

const Home = lazy(() => import('./pages/Home/Home'));
const Exercises = lazy(() => import('./pages/Exercises/Exercises'));
const ExerciseInfo = lazy(() => import('./pages/ExerciseInfo/ExerciseInfo'));
const Login = lazy(() => import('./pages/Login/Login'));
const CreateAccount = lazy(() => import('./pages/Login/CreateAccount'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard')); // New Dashboard component


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
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
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/create-account" element={<CreateAccount/>}/>

                                <Route element={<ProtectedRoute/>}>
                                    <Route path="/dashboard" element={<Dashboard/>}/>
                                </Route>
                            </Routes>
                        </React.Suspense>
                    </Box>
                </Box>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
