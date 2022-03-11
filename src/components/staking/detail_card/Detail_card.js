import React, { useState, useEffect } from 'react';
import styles from './Detail.module.scss'
import { getImg } from '../../../utils/Helper'

import video1 from '../../../assets/MP4/IMG_1324.MP4'
import * as config from '../../../config/config'
const Detail_card = (props) => {
    const [address, setAddress] = useState(config.configVars.NFTAddress)
    const filterAddress = (address) => {
        return address.slice(0, 6) + '...' + address.slice(38, 42)
    }
    console.log(props.nft)
    useEffect(() => {
      let temp = filterAddress(address)
      setAddress(temp)
      return () => {
        
      }
    }, [])
    
    return (
        <div className={styles.bodyDetail_card}>
            <div className={styles.image}>
                <img src={props.nft.imageUri} alt={props.nft.imageUri} />
                {/* <video autoPlay muted loop  >
                    <source src={video1} type="video/mp4"/>
                </video> */}
            </div>
            <div className={styles.bottom}>
                <div className={styles.item}>
                    <div className={styles.left}>
                        Contract Address
                    </div>
                    <div className={styles.right} style={{ color: '#076AFE' }}>
                        {address}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.left}>
                        Token ID
                    </div>
                    <div className={styles.right}>
                        {props.nft.tokenId}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.left}>
                        Token Standard
                    </div>
                    <div className={styles.right}>
                        ERC-721
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.left}>
                        Blockchain
                    </div>
                    <div className={styles.right}>
                        Ethereum
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail_card