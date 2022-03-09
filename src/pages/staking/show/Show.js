import React, { useState, useEffect } from 'react';
import styles from './Show.module.scss'
import Nft from '../../../components/nft/Nft'
import { getImg } from '../../../utils/Helper';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tabs from '@mui/material/Tabs';

import video1 from '../../../assets/MP4/IMG_1324.MP4'
import video2 from '../../../assets/MP4/IMG_1325.MP4'
import video3 from '../../../assets/MP4/IMG_1326.MP4'


const Show = () => {
  const [isNft, setIsNft] = useState(2)
  const [isNft1, setIsNft1] = useState(0)
  const [value, setValue] = React.useState('1');

  var imgPath1 = 'img_nft1.png'
  var imgPath2 = 'img_nft2.png'

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className={styles.bodyShow}>
        <div className={styles.maxcontainer}>
        
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box>
                <TabList onChange={handleChange} aria-label="lab API tabs example"
                  selected={true}
                  sx={{ml: '130px', fontFamily: 'Space Grotesk', height: '60px' ,'.MuiTabs-indicator': { bottom: 12, boxShadow: '0px 2px 8px 0.5px #076AFE',zIndex: '50', borderRadius: '2px'},'.MuiTab-root.Mui-selected': { color: 'white' } }}
                >
                  <Tab  label="All" value="1" sx={{ color:'white', fontSize: '22px', fontFamily: 'Space Grotesk', textTransform: 'none', width: '40px', minWidth:'30px', ml: '30px', fontWeight:'bold' }} />
                  <Tab  label="Staked" value="2" sx={{ color:'white', fontSize: '22px', fontFamily: 'Space Grotesk', textTransform: 'none', minWidth: '30px', width: '100px', ml: '25px',fontWeight:'bold' }} />
                </TabList>
              </Box>
              <TabPanel value="1" style={{ padding: '0px' }}>
                {isNft > 0 && 
                <div className={styles.nftYes}>
                      <Nft type='1' imgPath={imgPath1} video={video1} />
                      <Nft type='1' imgPath={imgPath1} video={video2} />
                      <Nft type='0' imgPath={imgPath2} video={video3} />
                 
                </div>
                }
                {isNft === 0 && 
                  <div className={styles.nftNo} style={{ textAlign: 'center' }}>
                    <img src={getImg('fall.png')} alt='png' />
                    <div className={styles.desc1}>No Genesis NFT</div>
                    <div className={styles.desc2}>You need a Genesis NFT to start staking</div>
                    <div className={styles.desc3}>Buy Nft</div>
                  </div>
                }
              </TabPanel>
              <TabPanel value="2">
                {isNft1 > 0 && 
                  <div className={styles.nftYes}>
                        <Nft />
                        
                  </div>
                }
                {isNft1 === 0 && 
                  <div className={styles.nftNo} style={{ textAlign: 'center' }}>
                    <img src={getImg('fall.png')} alt='png' />
                    <div className={styles.desc1}>No Genesis NFT</div>
                    <div className={styles.desc2}>You need a Genesis NFT to start staking</div>
                    <div className={styles.desc3}>Buy Nft</div>
                  </div>
                }
              </TabPanel>
            </TabContext>
          </Box>
     
        </div>
    </div>
  )
}

export default Show