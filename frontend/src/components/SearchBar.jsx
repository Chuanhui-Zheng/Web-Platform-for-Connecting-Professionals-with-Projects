import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { apiGet } from '../api';

import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

const fetchedSkills = ["Coding","Other"]
const fetchedCategories = ["Software", "Construction"];
const fetchedLocations= ["Sydney", "Melbourne","Cairns","Perth","Adelaide","Brisbane"];
export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(props.allProjects);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [skills, setSkills] = React.useState([]);

  const [selCategories, setSelCategories] = React.useState([]);
  const [selLocation, setSelLocation] = React.useState('');
  const [selSkills, setSelSkills] = React.useState([]);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter the items based on the search term
    console.log(props.allProjects)
    const filtered = props.allProjects.filter(item => 
      item.projectName.toLowerCase().includes(value) ||     
      item.projectCompany.toLowerCase().includes(value) || 
      item.projectDescription.toLowerCase().includes(value) 
    );
    // console.log(filtered)
    
    // Filter Select 
    // const body = {
    //   text: data.get('searchText'),
    //   minBedrooms: data.get('minBedrooms'),
    //   maxBedrooms: data.get('maxBedrooms'),
    //   startDate: data.get('startDate'),
    //   endDate: data.get('endDate'),
    //   minPrice: data.get('minPrice'),
    //   maxPrice: data.get('maxPrice'),
    //   reviewOrder: data.get('reviewOrder'),
    // }
    // console.log(data)
    const resultsArray = Object.values(filtered).filter(da => {
      const categoryMatches = da.projectCategory.toLowerCase().includes(selCategories.toLowerCase())
      const locationMatches = da.projectLocation.toLowerCase().includes(selLocation.toLowerCase())
      const skillMatches = da.projectSkills.toLowerCase().includes(selSkills.toLowerCase()) 

      const finalResults = categoryMatches && locationMatches && locationMatches && skillMatches;
      console.log(finalResults);
    })

      // return textMatches && bedroomMatches && dateMatches && priceMatches;

      // setFilteredItems(filtered);
      console.log(filtered);
      props.setSearch(filtered);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("calling search project api", searchTerm)
    console.log(selCategories,selLocation,selSkills)
    apiGet("/project/search", `query=${searchTerm}&category=${selCategories}`,).then((data) =>{
        if (!data.error) {
            console.log(data.message)
            if (data.message === 'No projects found.') {
              console.log('AHFSJ')
              props.setSearch([]);

            } else {
              props.setSearch(data);
            }
        } else {
            throw new Error("Search Project Failed");
        }
        
        props.setSearch(filtered);
    })
    .catch(() => {
        // alert("Project Search are not valid.")
    });
  }

  const handleOpen1 = (value) => {
    setOpen1(true);
    (async () => {
      setLoading(true);
      // await sleep(1e3); // For demo purposes.
      setLoading(false);

      setCategories([...fetchedCategories]);
    })();
  };

  const handleClose1 = (value) => {
    setOpen1(false);
    setCategories([]);
    setSelCategories(typeof value === 'string' ? value.split(',') : value,)
  };

  const handleOpen2 = (value) => {
    setOpen2(true);
    (async () => {
      setLoading(true);
      // await sleep(1e3); // For demo purposes.
      setLoading(false);

      setLocations([...fetchedLocations]);
    })();
  };

  const handleClose2 = (value) => {
    setOpen2(false);
    setLocations([]);
    setSelLocation(value)
  };

  const handleOpen3 = (value) => {
    setOpen3(true);
    (async () => {
      setLoading(true);
      // await sleep(1e3); // For demo purposes.
      setLoading(false);

      setSkills([...fetchedSkills]);
    })();
  };

  const handleClose3 = (value) => {
    setOpen3(false);
    setSkills([]);
    setSelSkills(typeof value === 'string' ? value.split(',') : value,)
  };

  return (
    <Box sx={{width:'100%'}}>
    <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Projects"
            inputProps={{ 'aria-label': 'search projects' }}
            onChange={handleSearchChange}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <FilterAltIcon /> sprint 3
      </IconButton> */}
    </Paper>
    <Paper sx={{display:'flex'}}>
    
    <Autocomplete
      sx={{ width: '35%' }}
      size="small"
      open={open1}
      onOpen={handleOpen1}
      onClose={handleClose1}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option}
      options={categories}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          value={selCategories}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {/* {loading ? <CircularProgress color="inherit" size={20} /> : null} */}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
    
    <Autocomplete
      sx={{ width: '35%', fontSize: '5px' }}
      size="small"
      open={open2}
      onOpen={handleOpen2}
      onClose={handleClose2}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option}
      options={locations}
      // loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Location"
          value={selLocation}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
    <Autocomplete
      sx={{ width: '30%', fontSize: '5px' }}
      size="small"
      open={open3}
      onOpen={handleOpen3}
      onClose={handleClose3}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option}
      options={skills}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Skills"
          value={selSkills}
          slotProps={{
            input: {
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
    </Paper>
    </Box>
    
  );

}
