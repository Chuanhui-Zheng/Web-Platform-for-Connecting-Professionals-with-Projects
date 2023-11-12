import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider, Avatar, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import styles from '../styles/Professional/Certificate.module.css'


const Certificates  = ({ certificates, ownProfile }) => {
    
    const handleDownload = (cert) => {
        const link = document.createElement('a');
        link.href = cert.professionalCertificate; 
        link.download = `${cert.professionalCertificateProjectName} Certificate`; 
        link.click();
      };

    return (
       <>
        <div className={styles.CertificateContainer}>
            {certificates.map((cert, idx) => (
                <>
                <div className={styles.Certificate} key={idx} >
                    <div className={styles.CertificateContent}>
                        <div className={styles.CertificateContentHolder}>
                            <Avatar 
                                src={certificates.professionalCertificateCompanyLogo} 
                                sx={{ width: '60px', height: '60px', ml: '10px' }}
                                variant="square"
                            />
                            <div className={styles.CertificateInfo}>
                                <Typography variant="h5" sx={{ml:1.5}}>{cert.professionalCertificateProjectName}</Typography>
                                <Typography variant="body1" sx={{ml:1.5}} color="text.secondary">{cert.professionalCertificateCompanyName}</Typography>
                            </div>
                        </div>
                        <div>
                            {ownProfile ? <Button variant="outlined" size="small" color="neutral" 
                            startIcon={<DownloadIcon fontSize="inherit" />} onClick={() => handleDownload(cert)}
                            sx={{cursor: 'pointer' }} >
                            Download
                            </Button> : <></>}
                            {/* {ownProfile ? <DownloadIcon sx={{ width: '30px', height: '30px', mr: '15px', cursor: 'pointer' }} onClick={() => handleDownload(cert)}>
                            </DownloadIcon> : <></>} */}
                            
                        </div>
                    </div>
                </div>
                <Divider sx={{width: '98%', ml:'0px'}}></Divider>
                </>
            ))}
        </div>

       </>
    )
}

export default Certificates;

{/* <a key={idx} href={cert.professionalCertificate} download>Cert {idx}</a> */}