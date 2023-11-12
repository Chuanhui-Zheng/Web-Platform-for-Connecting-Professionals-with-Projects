import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { apiGet } from '../api';
import Button from '@mui/material/Button';
import decodeJWT from '../decodeJWT';

import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import JEMMADialog from './JEMMADialog';
import BrowseCards from './BrowseCards';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import { width } from '@mui/system';
import RecommendedPopupModal from './RecommendedPopupModal';
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

  const [selCategories, setSelCategories] = React.useState('');
  const [selLocation, setSelLocation] = React.useState('');
  const [selSkills, setSelSkills] = React.useState('');
  const [showRecommended, setShowRecommended] = React.useState(false);
  const [userType, setUserType] = useState(null);
  const [recommended, setRecommended] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.userType) {
        setUserType(decoded.userType);

        apiGet('/project/recommended', `professionalId=${decoded.userId}`)
        .then(data => {
            if (!data.error) {
                setRecommended(data);
                console.log("project details:", data)
            } else {
                console.error("Error fetching project list:", data.error);
            }
        })
        .catch(err => {
            console.error("Failed to fetch project list:", err);
        });
      } else {
        setUserType("none");
      }
    } else {
      setUserType("none");
    }

  }, []);

  const toggleShowRecommended = () => {
    setShowRecommended(!showRecommended)
  }

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    //  depends if we want this to search each change
    // Filter the items based on the search term
    // console.log(props.allProjects)
    // const filtered = props.allProjects.filter(item => 
    //   item.projectName.toLowerCase().includes(value) ||     
    //   item.projectCompany.toLowerCase().includes(value) || 
    //   item.projectDescription.toLowerCase().includes(value) 
    // );
    // // console.log(filtered)
  

    //   console.log(filtered);
    //   props.setSearch(filtered);
    //   setFilteredItems(filtered)
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // Filter the items based on the search term
    console.log(props.allProjects)
    const filtered = props.allProjects.filter(item => 
      item.projectName.toLowerCase().includes(searchTerm) ||     
      item.projectCompany.toLowerCase().includes(searchTerm) || 
      item.projectDescription.toLowerCase().includes(searchTerm) 
    );

    // Filter Select 
    const resultsArray = Object.values(filtered).filter(da => {
      console.log(da.projectCategory, selCategories)
      const categoryMatches = da.projectCategory.includes(selCategories) || selCategories === '';
      const locationMatches = da.projectLocation === selLocation || selLocation === '';
      const skillMatches = da.projectSkills.includes(selSkills) || selSkills === '' ;
      console.log(categoryMatches, locationMatches, skillMatches)
      return categoryMatches && locationMatches && skillMatches;
    })

    if (selCategories === '' && selLocation === '' && selSkills === '') {
      props.setSearch(filtered);
    } else {
      props.setSearch(resultsArray);
    }

    console.log(resultsArray)
    console.log(filtered);
    // setFilteredItems(filtered)

    // Backend Call Search
    // apiGet("/project/search", `query=${searchTerm}&category=${selCategories}`,).then((data) =>{
    //     if (!data.error) {
    //         console.log(data.message)
    //         if (data.message === 'No projects found.') {
    //           console.log('AHFSJ')
    //           props.setSearch([]);

    //         } else {
    //           props.setSearch(data);
    //         }
    //     } else {
    //         throw new Error("Search Project Failed");
    //     }
        
    //     props.setSearch(filtered);
    // })
    // .catch(() => {
    //     // alert("Project Search are not valid.")
    // });
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

  const handleClose1 = (event) => {
   
    setOpen1(false);
    setCategories([]);
    console.log(event.target.textContent)
    setSelCategories(event.target.textContent);
  };

  const handleOpen2 = (value) => {
    setOpen2(true);
    (async () => {
      setLoading(true);
      setLoading(false);

      setLocations([...fetchedLocations]);
    })();
  };

  const handleClose2 = (event) => {
    setOpen2(false);
    setLocations([]);
    console.log(event.target.textContent)
    setSelLocation(event.target.textContent);
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

  const handleClose3 = (event) => {
    setOpen3(false);
    setSkills([]);
    console.log(event.target.textContent)
    setSelSkills(event.target.textContent);
    
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
          onChange={handleClose1}
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
    {(userType === 'professional') && <Button variant="contained" onClick={() => 
      {
        setShowRecommended(true)
        console.log(recommended)
    }}>View recommended</Button>}
    {showRecommended && 
      <RecommendedPopupModal 
        titleText={'View Recommended Projects'} 
        recommended={recommended}
      toggleShowRecommended={toggleShowRecommended}
      />
    }
    </Paper>
    </Box>
    
  );

}
