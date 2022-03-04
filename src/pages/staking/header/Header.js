import React from 'react'
import styles from './Header.module.scss'
import Apy from '../../../components/staking/apy/Apy'


const Header = () => {
  return (
    <div className={styles.headerBody}>
        <div className={styles.maxcontainer}>
            <div className={styles.left}>
                <div className={styles.title}>NFT staking</div>
                <div className={styles.desc}>Stake your MEISHU genesis NFTs to earn passive rewards.</div>
            </div>
            <div className={styles.right}>
                <Apy />
            </div>
        </div>
    </div>
  )
}

export default Header