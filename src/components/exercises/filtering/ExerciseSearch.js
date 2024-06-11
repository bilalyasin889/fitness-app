import React, {useState} from 'react';
import {Box, Button, InputAdornment, TextField} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {getSearchFilter, searchChanged} from "../../../store/exercises";
import IconButton from "@mui/material/IconButton";
import {Clear} from "@mui/icons-material";

const ExerciseSearch = () => {
    const dispatch = useDispatch();
    const searchFilter = useSelector(getSearchFilter);
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = async () => {
        dispatch(searchChanged(searchInput.toLowerCase()));
    };

    const handleClear = async () => {
        setSearchInput('');
        dispatch(searchChanged(''));
    };

    return (
        <Box position="relative" mb="40px">
            <TextField
                height="76px"
                sx={{
                    input: {fontWeight: '700', border: 'none', borderRadius: '4px'},
                    width: {lg: '1170px', xs: '450px'},
                    backgroundColor: '#fff',
                    borderRadius: '40px'
                }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Exercises"
                type="text"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {searchFilter && (
                                <IconButton onClick={handleClear}>
                                    <Clear />
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
            />
            <Button className="search-btn" sx={{
                backgroundColor: 'blue',
                color: 'white',
                '&:hover': {
                    backgroundColor: 'dodgerblue',
                },
                textTransform: 'none',
                width: {lg: '173px', xs: '90px'},
                height: '56px',
                position: 'absolute',
                right: '0px',
                fontSize: {lg: '20px', xs: '14px'}
            }} onClick={handleSearch}>
                Search
            </Button>
        </Box>
    );
};

export default ExerciseSearch;