import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

export const nftSlice = createSlice({
    name: 'nft',
    initialState: {
        stake: false,
        // tokenId: 0,
        // tokenUri: ''
        allNfts: null,
        stakedNfts: null
    },
    reducers: {
        setAllNfts(state, action) {
            state.allNfts = action.payload
            
        },
        setStakedNfts(state, action) {
            state.stakedNfts = action.payload
            console.log(state.stakedNfts)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAllNfts, setStakedNfts } = nftSlice.actions

export const selectNftById = (state, tokenId) => {
    // state.nft.allNfts.find((nft) => nft.tokenId === tokenId)
    // state.nft.allNfts.find(nft => nft.tokenId === tokenId)
    let temp = state.nft.allNfts
    let right
    for (let i = 0; i < temp.length; i++) {
        if(temp[i].tokenId == tokenId) {
            // __FOUND is set to the index of the element
            right = temp[i];
            break;
        }
    }
    return right
}

export default nftSlice.reducer