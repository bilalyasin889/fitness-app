import React, {useEffect, useRef} from 'react';
import {Box, Button, InputAdornment, TextField} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import {Clear} from "@mui/icons-material";
import {atom, useRecoilState} from "recoil";

import {searchFilterState} from "../../../../recoil/ExerciseListAtoms";

import './SearchExercise.css'

const searchInputState = atom({
    key: 'searchInputState',
    default: '',
});

const SearchExercise = () => {
    const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);
    const [searchInput, setSearchInput] = useRecoilState(searchInputState);

    const searchInputRef = useRef(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const handleSearch = () => {
        setSearchFilter(searchInput.toLowerCase());
        if (searchInputRef.current) {
            searchInputRef.current.blur();
        }
        window.scrollTo({top: 450, behavior: 'smooth'});
    };

    const handleClear = () => {
        setSearchInput('');
        setSearchFilter('');
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            e.preventDefault();
            handleSearch();
        }
    };

    return (
        <Box position="relative" mt="10px" mb="20px">
            <TextField
                inputRef={searchInputRef}
                className="searchTextField"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Search Exercises"
                type="text"
                aria-label="Search Exercises"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {searchFilter && (
                                <IconButton
                                    aria-label="Clear Search"
                                    onClick={handleClear}
                                    edge="start"
                                    tabIndex={0}
                                >
                                    <Clear/>
                                </IconButton>
                            )}
                        </InputAdornment>
                    ),
                }}
            />
            <Button
                className="search-btn"
                onClick={handleSearch}
                aria-label="Search"
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchExercise;