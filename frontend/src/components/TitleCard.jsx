import styles from"../styles/Professional/Dashboard.module.css";
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ErrorIcon from '@mui/icons-material/Error';
import PropTypes from 'prop-types';

/**
 * 
 * @param {*} title 
 * @param {*} body 
 * @param {*} type 
 * @returns 
 * 
 * Component for title card 
 */
function TitleCard(title, body, type) {
	const navigate = useNavigate();

	return (
		<button className={styles.dashboardCard} onClick={() => { navigate('') }}>
			{type === 'active' && <ErrorIcon color="primary" fontSize="large"/>}
			{type === 'complete' && <CheckCircleIcon color="success" fontSize="large"/>}
			{type === 'pending' && <AccessTimeFilledIcon color="disabled" fontSize="large"/>}
			{type === 'cert' && <WorkspacePremiumIcon sx={{ color: 'orange' }} fontSize="large"/>}

			<h1 className={styles.dashboardCardTitle}>{title}</h1>
			<div className={styles.dashboardCardBody}>{body}</div>
		</button>
	)
}

TitleCard.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	type: PropTypes.string,
}

export default TitleCard;