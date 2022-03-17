import React, { useState, useEffect } from 'react';

import { getImg } from '../../helpers/Helper';
import { Link } from 'react-router-dom';
import Linkbar from '../../components/link/Link';
import { slide as Menu } from 'react-burger-menu'
import WalletModal from '../../components/wallet_modal/WalletModal';
import { Button } from '@mui/material';
import './hamburger.css'
import styles from './Navbar.module.scss'

const Navbar = () => {
    const [showFalse, setShowFalse] = useState(false)
    const [address, setAddress] = useState('Connect Wallet')

    function onSetModal(flag) {
        setShowFalse(flag)
    }
    return (
        <div style={{ backgroundColor: 'black' }}>
            <div className={styles.bodyNav}>
                <div className={styles.maxcontainer}>
                    <Link to={'/'}><div className={styles.logo}>
                        <img src={ getImg('Union.png') } alt='logo' style={{ width: 40, height: 40 }} />
                        <img src={ getImg('MEISHU.png') } alt='logo1' style={{ width: 186, height: 33 }} />
                    </div></Link>
                    <div className={styles.menu}>
                        <div className={styles.tab}>
                            
                            <Linkbar />
                        </div>
                        {/* <Button variant="outlined" className={styles.address}>0x56..84d9</Button> */}
                        <Button variant="outlined" className={styles.address} onClick={() => onSetModal(true)} disabled={address !== 'Connect Wallet'}>{address}</Button>
                    </div>
                </div>
            </div>
            <div className={styles.hamburgerMenu}>
                <div style={{ float: 'start', marginRight: 0,  }}>
                    <Menu right >
                        <div id="home" className="menu-item" >NFT Staking</div>
                        <Link to={'/staking'}><div id="about" className="menu-item" >Exchange</div></Link>
                        <Button variant="outlined" className={styles.address} onClick={() => onSetModal(true)} disabled={address !== 'Connect Wallet'}>{address}</Button>
                    </Menu>
                </div>
            </div>
            <WalletModal showFalse={showFalse} onSetModal={onSetModal} setAddress={setAddress} />
        </div>
    )
}

export default Navbar