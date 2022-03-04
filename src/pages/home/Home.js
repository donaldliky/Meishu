import React from 'react'
import './Home.scss'
import { getImg } from '../../utils/Helper'

const Home = () => {
  return (
    <div className='bodyHome'>
        <div className='maxcontainer'>
            <div className='title'>
                Welcome to <br/> Meishu platform.    
            </div>
            <div className='buttonGroup'>
                <button>Stake my NFT</button>
                <button>Buy $Meishu</button>
            </div>
        </div>
        {/* <img src={getImg('gradient.png')} alt="gradient" style={{ width: '100%', marginBottom: '0px' }} /> */}
        {/* <div className='for_gra'></div> */}
        <div className='gradient'></div>
        
    </div>
  )
}

export default Home