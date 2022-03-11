import React, { useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getImg } from '../../utils/Helper';

import './walletModal.scss'
import * as walletMetamask from '../../helpers/wallet-metamask'
// import * as walletconnect from '../../helpers/wallet-connect'
import axios from 'axios';
// redux
import { setConnection } from '../../slice/walletSlice';
import { setAllNfts } from '../../slice/nftSlice';
import { useDispatch, useSelector } from 'react-redux';

// web3
import { ethers } from 'ethers';
import * as config from '../../config/config'
import nftContractAbi from '../../config/contracts/NFT.json'
import stakingContractAbi from '../../config/contracts/MEISHU_STAKING.json'
import { hexToInt } from '../../helpers/utils';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '15px',
};

const WalletModal = (props) => {
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
        // alert("account changed")
        console.log('account changed')
        alert('account changed'+account)

        // dispatch(setConnection({}))
    }
    function disconnect() {
        console.log('disconnect')
        alert('disconnect')
    }

    async function getNftsFromContract(provider, account) {
        // get All NFTs
        const readContract = new ethers.Contract(
            "0x6260ceA845838F5C3D26eca8fd4324e8C55E453F",
            nftContractAbi,
            provider
        )
        const tokenIds = await readContract.walletOfOwner(account)
        let nfts = []
        for (let i = 0; i < tokenIds.length; i++) {    
            let nft = {tokenId: '', tokenUri: ''}
            let jsonBody
            let jsonFile
            let orignImgUri
            nft.tokenId = hexToInt(tokenIds[i])
            nft.tokenUri = await readContract.tokenURI(tokenIds[i])
            jsonFile = await axios.get(nft.tokenUri)
            jsonBody = jsonFile.data
            orignImgUri = jsonBody.image
            nft.imageUri = orignImgUri.replace('ipfs://', 'https://ipfs.io/ipfs/')
            nfts.push(nft)
        }
        console.log(nfts)
        dispatch(setAllNfts(nfts))
        // get staked NFTs
        const readStakingContract = new ethers.Contract(
            "0x93d39E82a60154675dA86229908C80dCF6EdbDDa",
            stakingContractAbi,
            provider
        )
        const stakedTokenIds = await readStakingContract.stakeOfOwner(account)
        let stakedNFTs = []
        for (let i = 0; i < stakedTokenIds.length; i++) {
            let stakedNft = { stakedTokenId: '', stakedTokenUri: '', stakedOn: '', stakedOff: '', level: '' }
            stakedNft.stakedTokenId = hexToInt(stakedTokenIds[i])
            stakedNft.stakedTokenUri = await readContract.tokenURI(stakedTokenIds[i])
            stakedNft.level = await readStakingContract.tokenStakedLevel
            
        }
    }
    async function onConnect(walletName) {
        let wallet
        if (walletName === 'metamask') {
            let flag = isMetaMaskInstalled()
            if (!flag) {
                alert("install metamask")
                props.onSetModal(false)
                return
            }
            console.log('Metamask installed')
            console.log('Connecting...')
            wallet = await walletMetamask.connect()
            if (wallet.connected == true) {
                console.log('Connected successfully.')
                // console.log('wallet: ', wallet)
                let provider = wallet.browserWeb3Provider;
                let chainId = wallet.chainId;
                let account = wallet.address;
                let connected = wallet.connected;
                dispatch(setConnection({ provider, account, chainId, connected }))
                window.ethereum.on("chainChanged", chainChanged)
                window.ethereum.on("accountsChanged", accountChanged);
                window.ethereum.on("disconnect", disconnect);
            } else {
                alert('Connect failed. Poor you.')
                return
            }
        } else {
            alert('Wallet Connect Cannot be')
        }
        let temp = filterAddress(wallet.address)
            props.setAddress(temp)
            props.onSetModal(false)
        getNftsFromContract(wallet.browserWeb3Provider, wallet.address)
    }
    
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
        </div>
    )
}

export default WalletModal