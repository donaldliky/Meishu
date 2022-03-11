import React, {useEffect, useState} from 'react'
import styles from './Detail.module.scss'
import { Link, useParams } from 'react-router-dom'
import DetailCard from '../../../components/staking/detail_card/Detail_card'

//mui
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '../../../components/staking/modal/Modal'
import History from '../../../components/staking/history/History';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { selectNftById } from '../../../slice/nftSlice';
// contract
import { ethers } from 'ethers';
import stakingAbi from '../../../config/contracts/MEISHU_STAKING.json'
const Detail = (props) => {
    
    const [show, setShow] = useState(false);
    const [stakeBtn, setStakeBtn] = useState('Enable to stake')
    let flag = useSelector((state) => state.wallet.connected)
    const {tokenId} = useParams()
    const allNft = useSelector((state) => state.nft.allNfts)
    // const x = allNft.find((y) => y.tokenId === tokenId)
    const nft = useSelector((state) => selectNftById(state, tokenId))

    const [approved, setApproved] = useState(false)
    function changeText() {
        setShow(false)
        setStakeBtn('Stake it')
        setApproved(true)
    }

    const wallet = useSelector((state) => state.wallet)
    // contract
    const provider = wallet.provider
    const signer = provider.getSigner()
    const readContract = new ethers.Contract(
        "0x93d39E82a60154675dA86229908C80dCF6EdbDDa",
        stakingAbi,
        provider
    )
    const writeContract = readContract.connect(signer)
    async function onClickApprove() {
        // console.log('connected: ', flag)
        // if (flag === false) {
        //     alert('You have to connect wallet.')
        //     return
        // }
        if (approved === true) {
            try {
                const tx = await writeContract.Stake(tokenId, 1)
                await tx.wait()
            } catch (error) {
                throw error
            }
        } else {
            setShow(true)
        }
        
    }
    useEffect(() => {
        // find(allNft)
        // console.log(found)
    }, []) 
    return (
        <div className={styles.bodyDetail}>
            
            <div className={styles.maxcontainer}>
                <div className={styles.back}><Link to='/staking'><ArrowBackIcon sx={{ color: 'white', fontSize: '30px' }} /></Link></div><br />
                <div className={styles.content}>
                    <div className={styles.left}>
                        <DetailCard nft={nft} />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.top}>
                            <div className={styles.title}>NFT title</div>
                            <div className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis libero tempus quis quam ultrices elementum pellentesque eget a. Amet, mattis netus ac tortor. Venenatis cras massa habitant feugiat ipsum vitae nulla purus felis. Et, augue id enim nibh vulputate consectetur sed.</div>
                        </div> 
                        <div className={styles.buttonGroup}>
                            {/* <div className={styles.left1} onClick={handleClickOpen}> */}
                            <div className={styles.left1} onClick={() => onClickApprove()}> 
                                {stakeBtn}
                            </div>
                            <div className={styles.right1}>
                                Put  out  for rent
                            </div>
                        </div>
   
                        <History type="Price" flag={true} />
                        <History type="Rental" flag={false} />
                    </div>
                </div> 
            </div>
            <div className={styles.modal}>
                <Modal nft={nft} title="My Modal" onClose={() => setShow(false)} onChangeText={changeText} show={show}>

                </Modal>
            </div>
        </div>
    )
}

export default Detail