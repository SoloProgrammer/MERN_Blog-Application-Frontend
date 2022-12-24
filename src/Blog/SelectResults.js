import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function SelectResults({ setNumOfBlogsPerPage, setpage }) {

    const menuItems = [1, 2, 3, 4, 5, 6]
    const [value, setvalue] = React.useState(localStorage.getItem('num') ? localStorage.getItem('num') : menuItems[1]);

    const handleChange = (e) => {
        setvalue(e.target.value);
        localStorage.setItem('num', e.target.value)
        setNumOfBlogsPerPage(e.target.value);
        setpage(1)
    };
    return (
        <Box sx={{ minWidth: 160 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Blogs Per Page</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    defaultValue={menuItems[0]}
                    label="Blogs Per Page"
                    onChange={handleChange}
                >
                    {
                        menuItems.map(item => {
                            return <MenuItem key={item} value={item}>{item}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default SelectResults
