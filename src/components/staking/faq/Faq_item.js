import React from 'react'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';

import styles from './Faq_item.module.scss'
const Faq_item = () => {
  return (
    <div className={styles.bodyItem}>
        <Accordion sx={{ backgroundColor: '#0F0F0E', color: '#AFAFAF',maxWidth: '622px',  width: '100%',
        mb: '8px', mt: '8px', padding: '24px'}}>
        <AccordionSummary
            expandIcon={<AddIcon sx={{color: '#337eee', fontSize: '30px',  }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
        >
            <Typography
            sx={{ fontSize: '22px', background:'-webkit-linear-gradient(180deg,#41D1FF, #076AFE)', WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text',
            fontFamily: 'Space Grotesk', width: '90%', fontWeight: 'bold', lineHeight: '26px', letterSpacing: '0.5px'   }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
        </AccordionSummary>
        <AccordionDetails >
            <Typography sx={{ fontFamily: 'Space Grotesk', fontSize: '18px', lineHeight: '22px' }}> 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
        </AccordionDetails>
        </Accordion>
        
    </div>
  )
}

export default Faq_item