import React, { useState, useEffect } from 'react';
import './swap.scss'
import { getImg } from '../../../helpers/Helper';
import Button from '@mui/material/Button';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
const Swap = () => {
    return (
        <>
            <div className='swapBody'>
                <div className='top'>
                    <div className='left'>
                        Swap
                    </div>
                    <div className='right'>
                        <img src={ getImg('moon.png') } alt="moon" />
                        <img src={ getImg('settings.png') } alt="setting" style={{ marginLeft: '11px' }} />
                    </div>
                </div>
                <div className='ethBody'>
                    <div className='top'>
                        <div className='left'>
                            From Etherum
                        </div>
                        <div className='right'>
                            = ~$3,262.62
                        </div>
                    </div>
                    <div className='center'>
                        <div className='left'>
                                <img src={ getImg('eth.png') } alt='eth' />
                                {/* <div style={{ marginLeft: '10px' }}>ETH</div> */}
                                <NativeSelect
                                defaultValue={1}
                                inputProps={{
                                    name: 'age',
                                    id: 'uncontrolled-native',
                                }}
                                sx={{ ml: '10px', fontFamily: 'Oswald', color: '#FCFCFC', border: 'none', '.MuiNativeSelect-icon': { color: 'white', } }}
                                >
                                    <option value={1}>ETH</option>
                                    <option value={2}>BTC</option>
                                    <option value={3}>NEISHU</option>
                                </NativeSelect>
                        </div>
                        <div className='right'>
                            1
                        </div>
                    </div>
                    <div className='bottom'>
                    Your Balance: 1.58 ETH&nbsp; <font>MAX</font>
                    </div>
                </div>
                <div className='swapImg'>
                    <img src={getImg('Swap.png')} alt='swap' />
                </div>
                <div className='ethBody' style={{marginTop: 0}}>
                    <div className='top'>
                        <div className='left'>
                            To MEISHU
                        </div>
                        <div className='right'>
                            = ~$1.25
                        </div>
                    </div>
                    <div className='center'>
                        
                    </div>
                </div>
                <Button variant="contained" className='swapBtn'>Review swap</Button>
                <div className='info'>
                    <div className='item'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>Slippage Tolerance&nbsp;<HelpOutlineRoundedIcon sx={{ fontSize: '16px', }} /></div>
                        <div>2%</div>
                    </div>
                    <div className='item' style={{ margin: '10px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>Minimum Received&nbsp;<HelpOutlineRoundedIcon sx={{ fontSize: '16px', }} /></div>
                        <div>3,262.08 MEISHU</div>
                    </div>
                    <div className='item'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>Gas Fees&nbsp;<HelpOutlineRoundedIcon sx={{ fontSize: '16px', }} /></div>
                        <div>2%</div>
                    </div>
                </div>
            </div>
            <div className='gasBody'>
                <div className='img'>
                    <img src={getImg('local_gas_station.png')} alt="gas_station" />
                </div>
                <div className='tracker'>
                    <div className='top'>
                        Gas Tracker
                    </div>
                    <div className='bottom'>
                        <div className='div' style={{ color: '#44CF84' }}>193 GWEI</div>
                        <div className='v1'></div>
                        <div className='div' style={{ color: '#076AFE' }}>193 GWEI</div>
                        <div className='v1'></div>
                        <div className='div' style={{ color: '#CF5144' }}>203 GWEI</div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Swap