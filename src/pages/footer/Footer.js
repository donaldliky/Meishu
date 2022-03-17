import React from 'react'
import styles from './Footer.module.scss'

import { getImg } from '../../helpers/Helper'

const Footer = () => {
  return (
    <div className={styles.bodyFooter}>
        <div className={styles.maxcontainer}>
            <div className={styles.left}>
                <div className={styles.sub_left}>
                    <div className={styles.top2}>
                        <div className={styles.left2}>
                            <img src={getImg('footer_logo.png')} alt='footer_logo' />
                        </div>
                        <div className={styles.right2}>
                            <div className={styles.top2}>
                                MEISHU
                            </div>
                            <div className={styles.bottom2}>
                                $0.15
                            </div>
                        </div>
                    </div>

                    <div className={styles.bottom1}>
                        <div className={styles.left1}>
                            <img src={getImg('icon_metamask.png')} alt='icon_metamask' />
                        </div>
                        <div className={styles.right1}>
                            <button>Buy MEISHU</button>
                            {/* <Button variant='contained' sx={{ textTransform: 'none' }}>Buy MEISHU</Button> */}
                        </div>
                    </div>

                </div>
                <div className={styles.sub_right}>
                    <div>
                        <font style={{color: '#83B5FF'}}>Max supply</font>
                        <font style={{fontWeight:'500'}}>100 000 000</font>
                    </div>
                    <div>
                        <font style={{color: '#83B5FF'}}>Total supply</font>
                        <font>100 000 000</font>
                    </div>
                    <div>
                        <font style={{color: '#83B5FF'}}>Circulating supply</font>
                        <font>100 000 000</font>
                    </div>
                    <div>
                        <font style={{color: '#83B5FF'}}>Total Burned</font>
                        <font>100 000 000</font>
                    </div>
                    <div>
                        <font style={{color: '#83B5FF'}}>Market Cap</font>
                        <font>100 000 000</font>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.sub_left}>
                    <div className={styles.products}>
                        <div className={styles.title}>Products</div>
                        <div><a href='https://meishu-staking-dapp.herokuapp.com/'>Exchange</a></div>
                        <div><a href='https://meishu-staking-dapp.herokuapp.com/'>Staking</a></div>
                        <div><a href='https://meishu-staking-dapp.herokuapp.com/'>Rental</a></div>
                        <div><a href='https://meishu-staking-dapp.herokuapp.com/'>Game</a></div>
                    </div>
                    <div className={styles.about}>
                        <div className={styles.title}>About</div>
                        <div><a href='https://meishu-staking-dapp.herokuapp.com/'>Team</a></div>
                        <div><a href='https://meishu-staking-dapp.herokuapp.com/'>Litepaper</a></div>
                        <div><a href='https://meishu-staking-dapp.herokuapp.com/'>Updates</a></div>
                    </div>
                    <div className={styles.community}>
                        <div className={styles.title}>Community</div>
                        <div className={styles.icons}>
                            <div><a href='https://meishu-staking-dapp.herokuapp.com/'><img src={getImg('telegram.png')} alt={'telegram'} /></a></div>
                            <div><a href='https://meishu-staking-dapp.herokuapp.com/'><img src={getImg('twitter.png')} alt={'twitter'} /></a></div>
                            <div><a href='https://meishu-staking-dapp.herokuapp.com/'><img src={getImg('youtube.png')} alt={'youtube'}/></a></div>
                            <div><a href='https://meishu-staking-dapp.herokuapp.com/'><img src={getImg('medium.png')} alt={'medium'}/></a></div>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </div>
        <div className={styles.footer_desc}>MEISHU, all right reserved. 2022</div>
    </div>
  )
}

export default Footer