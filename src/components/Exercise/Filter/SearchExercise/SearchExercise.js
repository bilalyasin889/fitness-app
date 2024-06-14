import './SearchExercise.css'
import React from 'react';
import {Box, Button, InputAdornment, TextField} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import {Clear} from "@mui/icons-material";
import {atom, useRecoilState} from "recoil";
import {searchFilterState} from "../../../../recoil/ExerciseListAtoms";

const searchInputState = atom({
    key: 'searchInputState',
    default: '',
});

const SearchExercise = () => {
    const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);
    const [searchInput, setSearchInput] = useRecoilState(searchInputState);

    const handleSearch = async () => {
        setSearchFilter(searchInput.toLowerCase());
    };

    const handleClear = async () => {
        setSearchInput('');
        setSearchFilter('');
    };

    return (
        <Box position="relative" mb="20px">
            <TextField
                className="searchTextField"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Exercises"
                type="text"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {searchFilter && (
                                <IconButton onClick={handleClear}>
                                    <Clear/>
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
            />
            <Button className="search-btn" onClick={handleSearch}>
                Search
            </Button>
        </Box>
    );
};

export default SearchExercise;