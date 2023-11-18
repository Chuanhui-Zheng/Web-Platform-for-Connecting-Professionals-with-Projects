import * as React from 'react';
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import ProjectDetailWindow from '../../components/ProjectDetailWindow';
import Header from '../../components/Header';

/**
 * Page displays the full project details in the window.
 * 
 * @returns 
 */
export default function ProjectDetail() {
  const { projectID } = useParams();
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Header></Header>
			</AppBar>
			<ProjectDetailWindow projectID={projectID}/>
		</Box>
	);
}
