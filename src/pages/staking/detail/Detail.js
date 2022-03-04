import React, {useState} from 'react'
import styles from './Detail.module.scss'
import { Link } from 'react-router-dom'
import Detail_card from '../../../components/staking/detail_card/Detail_card'

//mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Graph from '../../../components/staking/chart/Graph';

import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Modal from '../../../components/staking/modal/Modal'

import History from '../../../components/staking/history/History';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Detail = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('Enable to stake')
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    function changeText() {
        setShow(false)
        setTitle('Stake it')
    }
    const chartdata = {
        labels: ['2/22', '2/23', '2/24', '2/25', '2/26'],
        datasets: [
            {
                label: 'Price',
                fill: false,
                backgroundColor: 'none',
                borderColor: '#83B5FF',
                borderWidth: 2,
                data: [0.05, 0.07, 0.18, 0.18, 0.29],
                width: '100%',
                borderDashOffset: '5',
                borderDash: [5, 5],
            }
        ]
    }
    return (
        <div className={styles.bodyDetail}>
            
            <div className={styles.maxcontainer}>
                <div className={styles.back}><Link to='/staking'><ArrowBackIcon sx={{ color: 'white', fontSize: '30px' }} /></Link></div><br />
                <div className={styles.content}>
                    <div className={styles.left}>
                        <Detail_card />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.top}>
                            <div className={styles.title}>NFT title</div>
                            <div className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis libero tempus quis quam ultrices elementum pellentesque eget a. Amet, mattis netus ac tortor. Venenatis cras massa habitant feugiat ipsum vitae nulla purus felis. Et, augue id enim nibh vulputate consectetur sed.</div>
                        </div> 
                        <div className={styles.buttonGroup}>
                            {/* <div className={styles.left1} onClick={handleClickOpen}> */}
                            <div className={styles.left1} onClick={() => setShow(true)}> 
                                {title}
                            </div>
                            <div className={styles.right1}>
                                Put  out  for rent
                            </div>
                        </div>
                        {/* <div className={styles.history}>
                            <div className={styles.title}>Price History</div>
                            <div className={styles.desc}><br />All time average.</div>
                            <div className={styles.price}>0.3 ETH</div>
                            <div className={styles.chart}><Graph chartdata={chartdata} /></div>
                            
                        </div>
                        <div className={styles.historySelect}>
                            Rental History
                        </div> */}
   
                        <History type="Price" flag={true} />
                        <History type="Rental" flag={false} />
                    </div>
                </div> 
            </div>
            <div className={styles.modal}>
                <Modal title="My Modal" onClose={() => setShow(false)} onChangeText={changeText} show={show}>
          
                </Modal>
            </div>
        </div>
    )
}

export default Detail