import React from 'react'
import styles from './Nft.module.scss'
import { getImg } from '../../utils/Helper'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';

import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

import Button from '@mui/material/Button';

import video1 from '../../assets/MP4/IMG_1324.MP4'
import video2 from '../../assets/MP4/IMG_1325.MP4'
import video3 from '../../assets/MP4/IMG_1326.MP4'

const Nft = (props) => {
  const navigate = useNavigate()
  const goToDetail = () => {
    navigate('/detail')
  }
  return (
    <div className={styles.bodyNft}>
        {/* <img src={getImg(props.imgPath)} /> */}
        <div className={styles.video}>
            <video autoPlay muted loop  >
                <source src={props.video} type="video/mp4"/>
            </video>
        </div>
        
        <div className={styles.name}>NFT Name</div>
        <div className={styles.level}>
            <div className={styles.left}>
                <img src={getImg('star.png')} />
                <div className={styles.level_title}>
                &nbsp;Level
                </div>
            </div>
            <div className={styles.right}>
                <font style={{ color: 'white' }}>1</font> / 6
            </div>
        </div>
        <hr className={styles.hr} style={{ width: '100%' }} />
        {props.type == 1 &&
            <div className={styles.btn}>
                {/* <Link to='/'><button>Enable Stake</button></Link> */}
                <Button onClick={goToDetail} variant='contained' sx={{ textTransform: 'none' }} >Enable Stake</Button>
            </div>
        }
        {props.type == 0 &&    
            <div className={styles.type2}>
                <div className={styles.section1}>
                    <div className={styles.left}> <MonetizationOnOutlinedIcon /> &nbsp;Earning </div>
                    <div className={styles.right}><div style={{color: 'white'}}>12,256,544.54</div>&nbsp; <div>MEISHU</div></div>
                </div>
                <div className={styles.section2}>
                    <div className={styles.left}>Staked on</div>
                    <div className={styles.right}>2022-02-22</div>
                </div>
                <div className={styles.section3}>
                    <div className={styles.left}>End Date</div>
                    <div className={styles.right}>2022-06-22</div>
                </div>
            </div>
        }
        
    </div>
  )
}

export default Nft