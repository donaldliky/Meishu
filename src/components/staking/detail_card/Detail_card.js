import React from 'react'
import styles from './Detail.module.scss'
import { getImg } from '../../../utils/Helper'

import video1 from '../../../assets/MP4/IMG_1324.MP4'

const Detail_card = () => {
  return (
    <div className={styles.bodyDetail_card}>
        <div className={styles.image}>
            <img src={getImg('img_nft1.png')} />
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
                    0x51df..8d64
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.left}>
                    Token ID
                </div>
                <div className={styles.right}>
                    1284
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