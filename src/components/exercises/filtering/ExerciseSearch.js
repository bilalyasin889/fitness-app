import React from 'react';
import {Box, Button, InputAdornment, TextField} from '@mui/material';
import IconButton from "@mui/material/IconButton";
import {Clear} from "@mui/icons-material";
import {atom, useRecoilState} from "recoil";
import {searchFilterState} from "../../../recoil/ExerciseListAtoms";

const searchInputState = atom({
    key: 'searchInputState',
    default: '',
});

const ExerciseSearch = () => {
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
                                    <Clear/>
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