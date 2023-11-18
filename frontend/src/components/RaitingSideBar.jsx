import React, { useState, useEffect } from "react";
import {
    Card,
    Avatar,
    ListItemAvatar,
    ListItemText,
    Divider,
    ListItem,
    List,
    Typography,
    ListItemButton,
  } from '@mui/material';
  import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { apiGet } from '../api';

/**
 * 
 * @param {*} param0 
 * @returns 
 * 
 * Component for raiting side bar.
 */
function RaitingSideBar({professionals, projectName, onSelectUser }) {
	const [professionalDetails, setProfessionalDetails] = useState({});
	const [allProfessionals, setAllProfessionals] = useState([]);

	/**
	 * Use effect to get all professionals that are part of a project.
	 */
	useEffect(() => {
		const fetchAllProfessionals = () => {
			Promise.all(
				professionals.map((professional) =>
					apiGet('/user/details/professional', `id=${professional.professionalId}`)
				)
			)
			.then((results) => {
				setAllProfessionals(results);
			})
			.catch((error) => {
				console.error("Failed to fetch professionals", error);
			});
		};

		fetchAllProfessionals();
	}, [professionals]);
	
	/**
	 * 
	 * @param {*} professionalId 
	 * 
	 * Function to get theselected professionals details.
	 */
	const getName = (professionalId) => {
		apiGet("/user/details/professional", `id=${professionalId}`)
		.then((data) => {
			if (!data.error) {
				setProfessionalDetails((prevDetails) => ({
				...prevDetails,
				[professionalId]: data,
				}));
			} else {
				throw new Error("Get Profile Failed");
			}
		})
		.catch(() => {
			alert("Profile fetch5 failed.");
		});
	}

	/**
	 * Use effect to get professional name.
	 */
	useEffect(() => {
		professionals.forEach((professional) => {
			if (!professionalDetails[professional.professionalId]) {
				getName(professional.professionalId);
			}
		});
	}, [professionals]);

	return (
		<Card sx={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', marginRight: '4vw', paddingRight: '1vw', borderRadius:'0px 0px 0px 20px'}}>
			<Typography  gutterBottom sx={{fontSize:'30px', marginLeft: 'auto', marginRight: 'auto', fontWeight: '600'}}>
				Project Members
			</Typography>
			<Typography variant='h7' sx={{marginLeft: 'auto', marginRight: 'auto'}}>Start Reviewing each Member</Typography>

			<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginLeft: 'auto', marginRight: 'auto'}}>
				{allProfessionals.map((professional, idx) => {
					const details = professionalDetails[professional.professionalId] || {};
					return(
						<ListItem key={professional.professionalId} alignItems="flex-start">
						<ListItemButton id={professional.professionalId} onClick={() => onSelectUser(details)} alignItems="flex-start">
										
							<ListItemAvatar>
							{professional.professionalPhoto ? (
								<Avatar
								src={professional.professionalPhoto}
								sx={{ width: '3rem', height: '3rem' }}
								/>
							) : (
								<AccountCircleIcon sx={{ color: 'grey', fontSize: '3rem' }} />
							)}
							</ListItemAvatar>
							<ListItemText
								primary={details.professionalFullName}
								secondary={
									<React.Fragment>
									<Typography
										component="span"
										variant="body2"
										sx={{ color: 'text.primary', display: 'inline' }}
									>
										{projectName}:
									</Typography>
									{" Click here to review "}
									</React.Fragment>
								}
							/>
						</ListItemButton>
						<Divider variant="inset" component="li" />
					</ListItem>
				)})}
			</List>
		</Card>
	); 
}

export default RaitingSideBar;