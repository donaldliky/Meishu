import React, { useState, useEffect } from 'react';
import ExchangeChart from '../../components/exchange/exchangeChart/ExchangeChart';
import Swap from '../../components/exchange/swap/Swap';
import './exchange.scss'

const Exchange = () => {
    return (
        <div className='bodyExchange'>
            <div className='maxcontainer'>
                <div className='exchangeChart'>
                    <ExchangeChart />
                </div>
                <div className='swap'>
                    <Swap />
                </div>                
            </div>
        </div>
    )
}

export default Exchange