import React, {useState} from 'react'
import styles from './Detail.module.scss'
import { Link } from 'react-router-dom'
import DetailCard from '../../../components/staking/detail_card/Detail_card'

//mui
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '../../../components/staking/modal/Modal'
import History from '../../../components/staking/history/History';

const Detail = () => {
    
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState('Enable to stake')

    function changeText() {
        setShow(false)
        setTitle('Stake it')
    }
    
    return (
        <div className={styles.bodyDetail}>
            
            <div className={styles.maxcontainer}>
                <div className={styles.back}><Link to='/staking'><ArrowBackIcon sx={{ color: 'white', fontSize: '30px' }} /></Link></div><br />
                <div className={styles.content}>
                    <div className={styles.left}>
                        <DetailCard />
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