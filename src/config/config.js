// config/config.ts
export const configVars = {
  mode: "regular",
  rpcNetwork: {
    rpcUrl: "https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    chainId: 42,
    chainIdHex: "0x2a",
    chainName: "Kovan Test Network",
    chainType: "testnet",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrl: "https://kovan.etherscan.io",
  },
  TOKENAddress: "0x6e5875Ae2b9aBC5870201FE4888dB671e0163906",
  NFTAddress: "0x6260ceA845838F5C3D26eca8fd4324e8C55E453F",
  NFTStakingAddress: "0x93d39E82a60154675dA86229908C80dCF6EdbDDa",
  rpcNetwork_mainnet: {
    rpcUrl: "https://evm-cronos.crypto.org/",
    chainId: 25,
    chainIdHex: "0x19",
    chainName: "Cronos Mainnet Beta",
    chainType: "mainnet",
    nativeCurrency: {
      name: "CRO",
      symbol: "CRO",
      decimals: 18,
    },
    blockExplorerUrl: "https://cronos.crypto.org/explorer/",
  },
};
