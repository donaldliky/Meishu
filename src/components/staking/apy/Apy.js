import React from 'react'
import styles from './Apy.module.scss'

import Button from '@mui/material/Button';

const Apy = () => {
  return (
    <div className={styles.bodyApy}>
        <div className={styles.title}>APY 872.57%</div>
        <div className={styles.bottom}>
            <div className={styles.left}>
                <div>Total Staked MEISHU</div>
                <div>8,598,641</div>
            </div>
            {/* <div className={styles.vertical}></div> */}
            <div className={styles.right}>
                <div className={styles.top}>
                    <div><font style={{ fontWeight: 400 }}>Duration </font>30 Days min</div>
                </div>
                <div className={styles.bottom1}>
                    
                    {/* <button>Calculate earning</button> */}
                        <Button variant="outlined"
                        sx={{ textTransform:'none'  }}>
                        Calculate earning</Button>
                    
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Apy