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
        },
        setNftApproved(state, action) {
            let index = action.payload
            state.allNfts[index].approved = true
        },
        setNftStaked(state, action) {
            let index = action.payload
            let temp = state.allNfts[index]
            let stakedNft = { tokenId: '', tokenUri: '', imageUri: '', level: '', name:  '' }
            console.log(index)
            state.allNfts.splice(index, 1)
            stakedNft.tokenId = temp.tokenId
            stakedNft.tokenUri = temp.tokenUri
            stakedNft.imageUri = temp.imageUri
            stakedNft.level = 1
            stakedNft.name = temp.name
            state.stakedNfts.push(stakedNft)
            
        }
    },
})

// Action creators are generated for each case reducer function
export const { setAllNfts, setStakedNfts, setNftApproved, setNftStaked } = nftSlice.actions

export const selectNftById = (state, tokenId) => {
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

export const selectIndexById = (state, tokenId) => {
    let temp = state.nft.allNfts
    let right
    for (let i = 0; i < temp.length; i++) {
        if(temp[i].tokenId == tokenId) {
            // __FOUND is set to the index of the element
            right = i;
            break;
        }
    }
    return right
}


export default nftSlice.reducer