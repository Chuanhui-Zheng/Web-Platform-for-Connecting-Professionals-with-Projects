import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { apiGet } from '../api';
import decodeJWT from '../decodeJWT';
import Button from '@mui/material/Button';

import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import RecommendedPopupModal from './RecommendedPopupModal';
import PropTypes from 'prop-types';

const fetchedLocations= ["Sydney", "Melbourne","Cairns","Perth","Adelaide","Brisbane"];

/**
 * 
 * @param {*} props 
 * @returns 
 * 
 * Component for search bar on the browse projects page
 */
const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
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

  /**
   * Use effect to initilise the user type and thus the content on the search bar.
   */
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded && decoded.userType) {
        setUserType(decoded.userType);
        if (decoded.userType === 'professional') {
          apiGet('/project/recommended', `professionalId=${decoded.userId}`)
          .then(data => {
            if (!data.error) {
              setRecommended(data);
            } else {
              console.error("Error fetching project list:", data.error);
            }
        })
        .catch(err => {
          console.error("Failed to fetch project list:", err);
        });
        }
      } else {
        setUserType("none");
      }
    } else {
      setUserType("none");
    }
  }, []);

  /**
   * Function to toggle the recommended section for professionals,
   */
  const toggleShowRecommended = () => {
    setShowRecommended(!showRecommended)
  }

  /**
   * 
   * @param {*} event 
   * 
   * Function to keep track of the values being changed in the search bar.
   */
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  /**
   * 
   * @param {*} e 
   * 
   * Function to deal with the searching of projects.
   */
  const handleSearch = async (e) => {
    e.preventDefault();

    // Filter the items based on the search term
    const filtered = props.allProjects.filter(item => 
      item.projectName.toLowerCase().includes(searchTerm) ||     
      item.projectCompany.toLowerCase().includes(searchTerm) || 
      item.projectDescription.toLowerCase().includes(searchTerm) 
    );

    // Filter Select 
    const resultsArray = Object.values(filtered).filter(da => {
      const categoryMatches = da.projectCategory.includes(selCategories) || selCategories === '';
      const locationMatches = da.projectLocation === selLocation || selLocation === '';
      const skillMatches = da.projectSkills.includes(selSkills) || selSkills === '' ;
      return categoryMatches && locationMatches && skillMatches;
    })

    if (selCategories === '' && selLocation === '' && selSkills === '') {
      props.setSearch(filtered);
    } else {
      props.setSearch(resultsArray);
    }
  }

  /**
   * 
   * @param {*} value 
   * 
   * Function to handle the catogies filter.
   */
  const handleOpen1 = (value) => {
    setOpen1(true);
    (async () => {
      setLoading(true);
      setLoading(false);

      apiGet('/get/categories',)
      .then(data => {
        if (!data.error) {
            setCategories(data);
        } else {
            console.error("Error fetching categories:", data.error);
        }
      })
      .catch(err => {
          console.error("Failed to get categories:", err);
      });
    })();
  };

  /**
   * 
   * @param {*} event 
   * 
   * Function to deal with the closing of the categories filter.
   */
  const handleClose1 = (event) => {
    setOpen1(false);
    setCategories([]);
    setSelCategories(event.target.textContent);
  };

  /**
   * 
   * @param {*} value 
   * 
   * Functionto deal with loctions filter.
   */
  const handleOpen2 = (value) => {
    setOpen2(true);
    (async () => {
      setLoading(true);
      setLoading(false);

      // setLocations([...fetchedLocations]);
      apiGet('/get/locations',)
      .then(data => {
        if (!data.error) {
          setLocations(data);
          console.log("location details:", data)
        } else {
            console.error("Error fetching locations:", data.error);
        }
      })
      .catch(err => {
          console.error("Failed to get locations:", err);
      });
    })();
  };

  /**
   * 
   * @param {*} event 
   * 
   * Function to close locations filter.
   */
  const handleClose2 = (event) => {
    setOpen2(false);
    setLocations([]);
    setSelLocation(event.target.textContent);
  };

  /**
   * 
   * @param {*} value 
   * 
   * Function to deal withthe skills filter.
   */
  const handleOpen3 = (value) => {
    setOpen3(true);
    (async () => {
      setLoading(true);
      setLoading(false);

      // gets all skills projects that match
      apiGet('/get/skills',)
      .then(data => {
        if (!data.error) {
          setSkills(data);
        } else {
            console.error("Error fetching skills:", data.error);
        }
      })
      .catch(err => {
          console.error("Failed to get skills:", err);
      });
    })();
  };

  /**
   * 
   * @param {*} event 
   * 
   * Function to deal with the closing of skills.
   */
  const handleClose3 = (event) => {
    setOpen3(false);
    setSkills([]);
    setSelSkills(event.target.textContent);
  };

  return (
    <Box sx={{width:'100%'}}>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', mt: 2 }}
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
	   {(userType === 'professional') && <Button variant="contained" sx={{width: '100%', backgroundColor:'#F29465'}} onClick={() => 
      {
        setShowRecommended(true)
      }}>View recommended</Button>}
      {showRecommended && (
        <RecommendedPopupModal
          titleText={'View Recommended Projects'}
          recommended={recommended}
          toggleShowRecommended={toggleShowRecommended}
        />
      )} 
    </Box>
    
  );

}


SearchBar.propTypes = {
	props: PropTypes.any,
}

export default SearchBar