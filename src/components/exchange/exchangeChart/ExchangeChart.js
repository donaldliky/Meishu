import React, { useState, useEffect } from 'react';
import './exchangeChart.scss'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { getImg } from '../../../helpers/Helper';

// chart
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
// react mui
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


const chartdata = {
    labels: ['2/17', '2/18', '2/19', '2/20', '2/21', '2/22', '2/23', '2/24', '2/25', '2/26'],
    datasets: [
        {
            label: 'MEISHU',
            fill: true,
            backgroundColor: 'rgba(7, 106, 254, 0.47)',
            borderColor: '#83B5FF',
            borderWidth: 2,
            data: [0.5, 0.7, 0.4, 0.65, 0.6, 0.55, 0.7, 0.4, 0.5, 0.6],
            width: '100%',
            // borderDashOffset: '5',
            // borderDash: [5, 5],
        }
    ]
}
const ExchangeChart = () => {
    const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus senectus quis lectus ornare iaculis vitae cras. Donec ultrices est morbi dolor commodo enim nibh pulvinar id. Dolor, montes, consectetur non, commodo tempus sit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lectus senectus quis lectus ornare iaculis vitae cras. Donec ultrices est morbi dolor commodo enim nibh pulvinar id. Dolor, montes, consectetur non, commodo tempus sit.'
    return (
        <div className='exchangeChartBody'>
            <div className='chartBody'>
                <div className='chartHeader'>
                    <div className='token'>
                        <div  className='top'>
                            <div className='logo'>
                                <img src={getImg('footer_logo.png')} alt='logo' />
                            </div>
                            <div className='logo-title'>
                                Meishu
                            </div>
                        </div>
                        <div className='bottom'>
                            <div className='value'>
                                $1.05
                            </div>
                            <div className='percent'>
                                +1.24%
                            </div>
                        </div>
                    </div>
                    <div className='add'>
                        
                            <img src={getImg('icon_metamask.png')} alt="metamask" />
                        
                        <div className='plus'>
                            +
                        </div>
                    </div>
                </div>
                <div className='chart'>
            <Line
                data={chartdata}
                options={{
                title: {
                    display: true,
                    text: 'Price List',
                    fontSize: 20,
                    color: 'white'
                },
                plugins: {
                    legend: {
                      display: false
                    }
                },
                responsive: true,
                scales: {
                    y: {
                        grid: {
                            drawBorder: true,
                            color: function(context) {
                            if (context.tick.value > 0) {
                                return 'rgba(0,0,0,0)';
                            } else if (context.tick.value < 0) {
                                return 'white';
                            }
                
                            return '#000000';
                            },
                        },
                        min: 0,
                        max: 1,
                        ticks: {
                            // forces step size to be 50 units
                            stepSize: 0.1
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: true,
                            color: function(context) {
                                if (context.tick.value > 0) {
                                  return 'rgba(0,0,0,0)';
                                } else if (context.tick.value < 0) {
                                  return 'white';
                                }
                                return '#000000';
                            },
                        }
                    }
                }
              }}
              height="0px"
              style={{ width: '100%', height: '100%' }}
          />             
                </div>
                <div className='chartFooter'>
                    <div className='left'>
                        <FormControlLabel
                            label="BTC"
                            sx = {{ fonFtamily: 'Space Grotesk', fontSize: '16px', color: 'white' }}
                            control=
                            {<Checkbox   
                            sx={{
                                color: '#83B5FF',
                                '&.Mui-checked': {
                                  color: '#FE07E6',
                                },
                            }} />}
                        />
                        <FormControlLabel
                            label="ETH"
                            sx = {{ fonFtamily: 'Space Grotesk', fontSize: '16px', color: 'white' }}
                            control=
                            {<Checkbox   
                            sx={{
                                color: '#83B5FF',
                                '&.Mui-checked': {
                                  color: '#E5FF47',
                                },
                            }} />}
                        />
                    </div>
                    <div className='right'>
                        <div className='item' style={{color: '#076AFE'}}>D</div>
                        <div className='item'>M</div>
                        <div className='item'>Y</div>
                        <div className='item'>All</div>
                    </div>
                </div>
            </div>
            <div className='chartStatus'>
                <div className='item' style={{ width: '40%' }}>
                    <div className='top'>24hr Trading Volume</div>
                    <div className='bottom'>$8.32m</div>
                </div>
                <div className='item' style={{ borderLeft: '1px solid #494847',width: '30%' }}>
                    <div className='top'>All Time high</div>
                    <div className='bottom'>$1.05</div>
                </div>
                <div className='item' style={{ borderLeft: '1px solid #494847',width: '40%' }}>
                    <div className='top'>Token holders</div>
                    <div className='bottom'>8.5K</div>
                </div>
            </div>
            <div className='desc'>
                {desc}
            </div>
            <div className='contract'>
                <div>Contract Address</div>
                <div className='right'>
                    0x1c33...9673
                    <OpenInNewRoundedIcon sx={{ ml: '19px' }} />
                </div>
            </div>
        </div>
    )
}

export default ExchangeChart