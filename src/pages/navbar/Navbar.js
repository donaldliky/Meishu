import React from 'react'
import styles from './Navbar.module.scss'
import { getImg } from '../../utils/Helper';
import { Link } from 'react-router-dom';

import Linkbar from '../../components/link/Link';

import { slide as Menu } from 'react-burger-menu'
import { Button } from '@mui/material';
import './hamburger.css'
const Navbar = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
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
                            {/* <TabContext value={value}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example" >
                                    <Tab label="NFT Staking" value="1" sx={{color: 'white', fontFamily: 'Space Grotesk' }} TabIndicatorProps={{style: {background:'red'}}} />
                                    <Tab label="Staking" value="2" sx={{color: 'white'}} />
                                </TabList>
                            </TabContext> */}
                            <Linkbar />
                        </div>
                        {/* <button className={styles.address}>
                            0x56..84d9
                        </button> */}
                        <Button variant="outlined" className={styles.address}>0x56..84d9</Button>
                    </div>
                </div>
            </div>
            <div className={styles.hamburgerMenu}>
                    <div style={{ float: 'start', marginRight: 0 }}>
                        <Menu right >
                            <div id="home" className="menu-item" >NFT Staking</div>
                            <Link to={'/staking'}><div id="about" className="menu-item" >Staking</div></Link>
                            <Button variant="outlined" className={styles.address}>0x56..84d9</Button>
                        </Menu>
                    </div>
                </div>
        </div>
    )
}

export default Navbar