import React from 'react'
import styles from './Nft.module.scss'
import { getImg } from '../../utils/Helper'
import {useNavigate} from 'react-router-dom'

import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

import Button from '@mui/material/Button';
import { ethers } from "ethers";

const Nft = (props) => {

    const navigate = useNavigate()
    const goToDetail = () => {
        navigate(`/detail/${props.tokenId}`)
    }
    
    return (
        <div className={styles.bodyNft}>
            <div className={styles.video}>
                {/* <video autoPlay muted loop  >
                    <source src={props.video} type="video/mp4"/>
                </video> */}
                <img src={props.imgPath} alt={props.imgPath} />
            </div>
            
            <div className={styles.name}>NFT Name</div>
            <div className={styles.level}>
                <div className={styles.left}>
                    <img src={getImg('star.png')} alt="star png" />
                    <div className={styles.level_title}>
                    &nbsp;Level
                    </div>
                </div>
                <div className={styles.right}>
                    <font style={{ color: 'white' }}>1</font> / 6
                </div>
            </div>
            <hr className={styles.hr} style={{ width: '100%' }} />
            {props.type === '1' &&
                <div className={styles.btn}>
                    <Button onClick={goToDetail} variant='contained' sx={{ textTransform: 'none' }} >Enable Stake</Button>
                </div>
            }
            {props.type === '0' &&    
                <div className={styles.type2}>
                    <div className={styles.section1}>
                        <div className={styles.left}> <MonetizationOnOutlinedIcon /> &nbsp;Earning </div>
                        <div className={styles.right}><div style={{color: 'white'}}>12,256,544.54</div>&nbsp; <div>MEISHU</div></div>
                    </div>
                    <div className={styles.section2}>
                        <div >Staked on</div>
                        <div >2022-02-22</div>
                    </div>
                    <div className={styles.section3}>
                        <div >End Date</div>
                        <div >2022-06-22</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Nft