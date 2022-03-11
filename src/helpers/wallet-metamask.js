import { ethers } from "ethers"; // npm install ethers
import * as config from "../config/config"
import { defaultWallet } from "../store/interfaces";
import * as utils from "./utils";


export const switchNetwork = async () => {
   try {
    console.log('switchNetwork')
     await window.ethereum.request({
       method: "wallet_switchEthereumChain",
       params: [{
          chainId: config.configVars.rpcNetwork.chainIdHex
        }],
     });
   } catch (e) {
     if (e.code === 4001) {
      throw alert("You rejected.")
     }
     console.log(e);
     console.log('switchNetwork')
     await window.ethereum.request({
       method: "wallet_addEthereumChain",
       params: [
         {
           chainId: config.configVars.rpcNetwork.chainIdHex,
           chainName: config.configVars.rpcNetwork.chainName,
           rpcUrls: [config.configVars.rpcNetwork.rpcUrl],
          //  nativeCurrency: config.configVars.ftmTesetnet.nativeCurrency,
          //  blockExplorerUrls: [config.configVars.ftmTesetnet.blockExplorerUrl],
         },
       ],
     });
   }
 };
 
 // Main login flow for injected wallet like MetaMask
 export const connect = async () => {
   try {
     let chainId = await window.ethereum.request({ method: "eth_chainId" });
     console.log('chainID: ', chainId)
     if (!(chainId === config.configVars.rpcNetwork.chainIdHex)) {
       await switchNetwork();
       await utils.delay(2000);
      //  return defaultWallet;
     }
     const accounts = await window.ethereum.request({
       method: "eth_requestAccounts",
     });
    
    alert('success connect!')
     return {
       ...defaultWallet,
       walletProviderName: "metamask",
       address: accounts[0],
       browserWeb3Provider: new ethers.providers.Web3Provider(window.ethereum),
       serverWeb3Provider: new ethers.providers.JsonRpcProvider(
         config.configVars.rpcNetwork.rpcUrl
       ),
       connected: true,
       chainId: utils.hexToInt(
         await window.ethereum.request({ method: "eth_chainId" })
       ),
     };
   } catch (e) {
    return defaultWallet;
   }
 };