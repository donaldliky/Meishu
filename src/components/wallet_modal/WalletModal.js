import React, { useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getImg } from '../../helpers/Helper';

import './walletModal.scss'
import * as walletMetamask from '../../helpers/wallet-metamask'
import * as walletconnect from '../../helpers/wallet-connect'
import axios from 'axios';
// redux
import { setConnection } from '../../slice/walletSlice';
import { setAllNfts, setStakedNfts } from '../../slice/nftSlice';
import { useDispatch, useSelector } from 'react-redux';

// web3
import { ethers } from 'ethers';
import * as config from '../../config/config'

import nftContractAbi from '../../config/contracts/NFT.json'
import stakingContractAbi from '../../config/contracts/MEISHU_STAKING.json'
import { hexToInt } from '../../helpers/utils';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px',
};
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const WalletModal = (props) => {
    let desc1 = 'You connected successfully.'
    let desc2 = 'Your connection failed.'
    let desc3 = 'Install Metamask.'
    const [alertTitle, setAlertTitle] = useState('')
    const [alertType, setAlertType] = useState('')
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [stateFail, setStateFail] = useState({
        openFail: false,
        verticalFail: 'top',
        horizontalFail: 'center',
    });
    const { vertical, horizontal, open } = state;
    const { verticalFail, horizontalFail, openFail } = stateFail;
    const dispatch = useDispatch()

    const isMetaMaskInstalled = () => {       
        console.log('Checking metamask ...')     
        const { ethereum } = window;
        return Boolean(ethereum && ethereum.isMetaMask);
    };
    const filterAddress = (address) => {
        return address.slice(0, 4) + '...' + address.slice(38, 42)
    }
    function chainChanged() {
        // alert("chain changed")
        console.log('chain changed')
        window.location.reload()
    }
    function accountChanged(account) {
        console.log('account changed')
        alert('account changed'+account)
    }
    function disconnect() {
        console.log('disconnect')
        alert('disconnect')
    }

    async function getNftsFromContract(provider, account) {
        console.log("Loading NFTs ...");
        const readContract = new ethers.Contract(
            config.configVars.NFTAddress,
            nftContractAbi,
            provider
        )
        const tokenIds = await readContract.walletOfOwner(account)
        let nfts = []
        for (let i = 0; i < tokenIds.length; i++) {    
            let nft = {tokenId: '', tokenUri: '', name: '', approved: '', desc: '', imageUri: ''}
            let jsonBody
            let jsonFile
            let orignImgUri
            let approvedAddress
            nft.tokenId = hexToInt(tokenIds[i])
            nft.tokenUri = await readContract.tokenURI(tokenIds[i])
            jsonFile = await axios.get(nft.tokenUri)
            jsonBody = jsonFile.data
            nft.name = jsonBody.name
            orignImgUri = jsonBody.image
            nft.imageUri = orignImgUri.replace('ipfs://', 'https://ipfs.io/ipfs/')
            nft.desc = jsonBody.description
            approvedAddress = await readContract.getApproved(tokenIds[i])
            if (approvedAddress > 0) {
                nft.approved = true
            } else {
                nft.approved = false
            }
            nfts.push(nft)
        }
        console.log(nfts)
        dispatch(setAllNfts(nfts))
        // get staked NFTs

        const readStakingContract = new ethers.Contract(
            config.configVars.NFTStakingAddress,
            stakingContractAbi,
            provider
        )
        const stakedTokenIds = await readStakingContract.stakeOfOwner(account)
        let stakedNFTs = []
        for (let i = 0; i < stakedTokenIds.length; i++) {
            let stakedNft = { tokenId: '', tokenUri: '', imageUri: '', level: '', name:  '' }
            let jsonBody
            let jsonFile
            let orignImgUri

            stakedNft.tokenId = hexToInt(stakedTokenIds[i])
            stakedNft.tokenUri = await readContract.tokenURI(stakedTokenIds[i])
            jsonFile = await axios.get(stakedNft.tokenUri)
            jsonBody = jsonFile.data
            stakedNft.name = jsonBody.name
            orignImgUri = jsonBody.image
            stakedNft.imageUri = orignImgUri.replace('ipfs://', 'https://ipfs.io/ipfs/')
            let level = await readStakingContract.tokenStakedLevel(stakedNft.tokenId)
            stakedNft.level = parseInt(level, 10)
            stakedNFTs.push(stakedNft)
        }
        console.log(stakedNFTs);
        dispatch(setStakedNfts(stakedNFTs))
        console.log("Loading ended.");
    }
    async function onConnect(walletName) {
        let wallet
        if (walletName === 'metamask') {
            let flag = isMetaMaskInstalled()
            if (!flag) {
                // alert("install metamask")
                openModal({vertical: 'top',horizontal: 'right',}, desc3, 'warning')
                props.onSetModal(false)
                return
            }
            console.log('Metamask installed')
            console.log('Connecting...')
            wallet = await walletMetamask.connect()
            if (wallet.connected == true) {
                console.log('Connected successfully.')
                openModal({vertical: 'top',horizontal: 'right',}, desc1, 'success')
                
                let provider = wallet.browserWeb3Provider;
                let chainId = wallet.chainId;
                let account = wallet.address;
                let connected = wallet.connected;
                dispatch(setConnection({ provider, account, chainId, connected }))
                window.ethereum.on("chainChanged", chainChanged)
                window.ethereum.on("accountsChanged", accountChanged);
                window.ethereum.on("disconnect", disconnect);
            } else {
                openModal({vertical: 'top',horizontal: 'right',}, desc2, 'error')
                return
            }
        } else {
            // alert('Wallet Connect Cannot be')
            wallet = await walletconnect.connect() 
            if (wallet.connected == true) {
                console.log('Connected successfully.')
                openModal({vertical: 'top',horizontal: 'right',}, desc1, 'success')
                
                let provider = wallet.browserWeb3Provider;
                let chainId = wallet.chainId;
                let account = wallet.address;
                let connected = wallet.connected;
                dispatch(setConnection({ provider, account, chainId, connected }))
            } else {
                // alert("Your connection failed.")
                openModal({vertical: 'top',horizontal: 'right',}, desc2, 'error')
                console.log("Your connection failed.");
            }
        }
        let temp = filterAddress(wallet.address)
            props.setAddress(temp)
            props.onSetModal(false)
        getNftsFromContract(wallet.browserWeb3Provider, wallet.address)
    }
    function openModal(newState, desc, type) {
        setAlertTitle(desc)
        setAlertType(type)
        setState({ open: true, ...newState });
    }
    // function openFailedModal(newState) {
    //     setAlertTitle(desc2)
    //     setState({ open: true, ...newState });
    // }
    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={props.showFalse}
                onClose={() => props.onSetModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={props.showFalse}>
                <Box sx={style}>
                    <div className='wallet-modal'>
                        <div className='wallet' onClick={()=>onConnect('metamask')}>
                            <div className='left'>
                                <img src={getImg('metamask.svg')} alt='metamask'/>
                            </div>
                            <div className='right'>
                                Metamask
                            </div>    
                        </div>
                        <div className='wallet' style={{ marginTop: '20px' }} onClick={()=>onConnect('walletconnect')}>
                            <div className='left'>
                                <img src={getImg('walletconnect-circle-blue.png')} alt='walletconnect'/>
                            </div>
                            <div className='right'>
                                WalletConnect
                            </div>    
                        </div>
                    </div>
                </Box>
                </Fade>
            </Modal>
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

export default WalletModal