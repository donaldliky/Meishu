import React, {useEffect, useState} from 'react'
import styles from './Detail.module.scss'
import { Link, useParams, useNavigate } from 'react-router-dom'
import DetailCard from '../../../components/staking/detail_card/Detail_card'

//mui
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Modal from '../../../components/staking/modal/Modal'
import History from '../../../components/staking/history/History';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { selectNftById, selectIndexById, setNftApproved, setNftStaked } from '../../../slice/nftSlice';
// contract
import { ethers } from 'ethers';
import nftAbi from '../../../config/contracts/NFT.json'
import * as config from '../../../config/config'

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Detail = (props) => {
    const navigate =  useNavigate()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);// Confirm Modal
    const [stakeBtn, setStakeBtn] = useState('Enable to stake')
    const [btnFlag, setBtnFlag] = useState(false)
    const [isStack, setIsStack] = useState(false)
    let flag = useSelector((state) => state.wallet.connected)
    const {tokenId} = useParams()
    let allNft = useSelector((state) => state.nft.allNfts)
    // const x = allNft.find((y) => y.tokenId === tokenId)
    let nft = useSelector((state) => selectNftById(state, tokenId))
    let index = useSelector((state) => selectIndexById(state, tokenId))
    
    console.log(index);
    const [approved, setApproved] = useState(false)

    const wallet = useSelector((state) => state.wallet)
    // contract
    const provider = wallet.provider
    const signer = provider.getSigner()
    const readContract = new ethers.Contract(
        // "0x6260ceA845838F5C3D26eca8fd4324e8C55E453F",
        config.configVars.NFTAddress,
        nftAbi,
        provider
    )
    const writeContract = readContract.connect(signer)
    // This is function from staking modal
    async function onClickStaking() {
        try {
            // setBtnFlag(true)
            // const tx = await writeContract.Stake(tokenId, 1)
            // await tx.wait()
            // alert("You staked successfully.")
            openModal({vertical: 'top',horizontal: 'right',}, 'You staked successfully.', 'success')
            setIsStack(true)
            setShow(false)
            setBtnFlag(true)
            // dispatch(setNftStaked(index))
        } catch (error) {
            setBtnFlag(false)
            if (error.code == 4001) {
                // alert("You rejected.")
                openModal({vertical: 'top',horizontal: 'right',}, 'You rejected.', 'error')
                return
            } else {
                // alert("Something went wrong.")
                openModal({vertical: 'top',horizontal: 'right',}, 'Something went wrong.', 'error')
                return
            }
        }
        setShow(false)
    }
 
    // Approve/Stake Button Click
    async function onClickApprove() {
        // approve function
        if (nft.approved !== true) {
            try {
                setBtnFlag(true)
                // const tx = await writeContract.Stake(tokenId, 1)
                // await tx.wait()
                // alert("You staked successfully.")
                const tx = await writeContract.approve("0x93d39E82a60154675dA86229908C80dCF6EdbDDa", ethers.BigNumber.from(nft.tokenId))
                await tx.wait()  
                openModal({vertical: 'top',horizontal: 'right',}, 'Staking is approved. Please continue', 'success')
                // setIsStack(true)
                dispatch(setNftApproved(index))
                setBtnFlag(false)
                
            } catch (error) {
                setBtnFlag(false)
                if (error.code == 4001) {
                    // alert("You rejected.")
                    openModal({vertical: 'top',horizontal: 'right',}, 'You rejected.', 'error')
                    return
                } else {
                    // alert("Something went wrong.")
                    openModal({vertical: 'top',horizontal: 'right',}, 'Something went wrong.', 'error')
                    return
                }
            }
            // Open modal for staking
        } else {
            setShow(true)
        }
    }
    useEffect(() => {
        if (nft.approved === true) {
            setStakeBtn("Stake it")
        } else {
            setStakeBtn("Enable to stake")
        }
    }, [nft.approved]) 
    function goBack () {
        if (isStack === true) {
            dispatch(setNftStaked(index))
        }
        
        navigate('/staking')
    }

    const [alertTitle, setAlertTitle] = useState('')
    const [alertType, setAlertType] = useState('')
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;
    function openModal(newState, desc, type) {
        setAlertTitle(desc)
        setAlertType(type)
        setState({ open: true, ...newState });
    }

    const handleClose = () => {
        setState({ ...state, open: false });
    };
    return (
        <div className={styles.bodyDetail}>
            
            <div className={styles.maxcontainer}>
                {/* <div className={styles.back}><Link to='/staking'><ArrowBackIcon sx={{ color: 'white', fontSize: '30px' }} /></Link></div><br /> */}
                <div className={styles.back}><ArrowBackIcon onClick={goBack} sx={{ color: 'white', fontSize: '30px' }} /></div><br />
                <div className={styles.content}>
                    <div className={styles.left}>
                        <DetailCard nft={nft} />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.top}>
                            <div className={styles.title}>{ nft.name }</div>
                            <div className={styles.desc}>{ nft.desc }</div>
                        </div> 
                        <div className={styles.buttonGroup}>
                            {/* <div className={styles.left1} onClick={handleClickOpen}> */}
                            <div className={styles.left1}  > 
                                <button onClick={() => onClickApprove()} disabled={btnFlag}>{stakeBtn}</button>
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
                <Modal nft={nft} title="My Modal" onClose={() => setShow(false)} onStaking={onClickStaking} show={show}>

                </Modal>
            </div>
            <Snackbar  anchorOrigin={{ vertical, horizontal }} open={open} onClose={handleClose} key={vertical + horizontal}>
                <Alert severity={alertType}
                // iconMapping={{success: <CheckCircleRoundedIcon fontSize="inherit" sx={{ color: 'white',}} />,}} 
                sx={{ width: '100%', height: '56px',display: 'flex',justifyContent: 'center', alignItems: 'center',fontSize: '16px',  }}
                >
                {alertTitle}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Detail