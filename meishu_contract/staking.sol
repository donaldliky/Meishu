// address ::::: 0x93d39E82a60154675dA86229908C80dCF6EdbDDa kovan
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "hardhat/console.sol";

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
 

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

interface IMeishuNFT {
  function balanceOf(address _user) external view returns(uint256);
  function transferFrom(address _user1, address _user2, uint256 _tokenId) external;
  function ownerOf(uint256 _tokenId) external returns(address);
}
interface IMeishu {
  function balanceOf(address _user) external view returns(uint256);
  function transferFrom(address _user1, address _user2, uint256 _amount) external;
  function transfer(address _user, uint256 _amount) external;  
}
contract MEISHU_STAKING is Ownable {
  IMeishuNFT public meishuNFT;
  IMeishu public meishu;
  address public POOL_WALLET;
  uint256 public NFTRewardRate = 600 * (10 ** 18);
  mapping(address => uint256) public harvests;
  mapping(address => uint256) public lastUpdate;
  mapping(uint => address) public ownerOfToken;
  mapping(uint => uint) public tokenStakedLevel;
  mapping(uint => uint256) public tokenStakedTime;
  mapping(address => uint) public stakeBalances;
  mapping(address => mapping(uint256 => uint256)) public ownedTokens;
  mapping(uint256 => uint256) public ownedTokensIndex;
  uint256[] public stakeDuration = [60 , 120 , 180 ];
  // uint256[] public stakeDuration = [30 days, 60 days, 90 days];

  uint256 public burnRate = 20;

  bool public paused;

  constructor(
    address nftAddr,
    address ftAddr
  ) {
    meishuNFT = IMeishuNFT(nftAddr);
    meishu = IMeishu(ftAddr);
    POOL_WALLET = msg.sender;
  }

  function batchStake(uint[] memory tokenIds, uint stakeLevel) external {
    console.log("tokenIds", tokenIds[1]);
    require(paused == false, "Staking finished");
    updateHarvest();
    for (uint256 i = 0; i < tokenIds.length; i++) {
      require(meishuNFT.ownerOf(tokenIds[i]) == msg.sender, "you are not owner!");
      ownerOfToken[tokenIds[i]] = msg.sender;
      tokenStakedLevel[tokenIds[i]] = stakeLevel;
      tokenStakedTime[tokenIds[i]] = getCurrentTime();
      meishuNFT.transferFrom(msg.sender, address(this), tokenIds[i]);
      _addTokenToOwner(msg.sender, tokenIds[i]);
      stakeBalances[msg.sender]++;
    }
  }

  function Stake(uint tokenId, uint stakeLevel) external {
    require(paused == false, "Staking finished");
    updateHarvest();
    require(meishuNFT.ownerOf(tokenId) == msg.sender, "you are not owner!");
    ownerOfToken[tokenId] = msg.sender;
    tokenStakedLevel[tokenId] = stakeLevel;
    tokenStakedTime[tokenId] = getCurrentTime();
    meishuNFT.transferFrom(msg.sender, address(this), tokenId);
    _addTokenToOwner(msg.sender, tokenId);
    stakeBalances[msg.sender]++;
  }

  function batchWithdraw(uint[] memory tokenIds) external {    
    harvest();
    for (uint i = 0; i < tokenIds.length; i++) {
      require(ownerOfToken[tokenIds[i]] == msg.sender, "MEISHU_STAKING: it's not yours");
      require(stakeDuration[tokenStakedLevel[tokenIds[i]]] + tokenStakedTime[tokenIds[i]] > getCurrentTime(), "MEISHU_STAKING: not yet allowed");
      meishuNFT.transferFrom(address(this), msg.sender, tokenIds[i]);
      _removeTokenFromOwner(msg.sender, tokenIds[i]);
      stakeBalances[msg.sender]--;
    }
  }

  function Withdraw(uint tokenId) external {    
    harvest();
    require(ownerOfToken[tokenId] == msg.sender, "MEISHU_STAKING: it's not yours");
    require(stakeDuration[tokenStakedLevel[tokenId]] + tokenStakedTime[tokenId] < getCurrentTime(), "MEISHU_STAKING: not yet allowed");
    meishuNFT.transferFrom(address(this), msg.sender, tokenId);
    _removeTokenFromOwner(msg.sender, tokenId);
    stakeBalances[msg.sender]--;
  }

  function ftWithdraw(uint256 amount) external onlyOwner {
    meishu.transferFrom(address(this), POOL_WALLET, meishu.balanceOf(address(this)));
  }

  function batchWithdrawWithoutharvest(uint[] memory tokenIds) external {    
    for (uint i = 0; i < tokenIds.length; i++) {
      require(ownerOfToken[tokenIds[i]] == msg.sender, "MEISHU_STAKING: Unable to withdraw");
      meishuNFT.transferFrom(address(this), msg.sender, tokenIds[i]);
      _removeTokenFromOwner(msg.sender, tokenIds[i]);
      stakeBalances[msg.sender]--;
    }
  }

  function updateHarvest() internal {
    uint256 time = getCurrentTime();
    console.log("time", time);
    console.log("harvest = ", harvests[msg.sender]);
    uint256 timerFrom = lastUpdate[msg.sender];
    console.log("balance = ", stakeBalances[msg.sender]);
    if (timerFrom >= 0)
      harvests[msg.sender] += stakeBalances[msg.sender] * NFTRewardRate * (time - timerFrom) / 86400;
    lastUpdate[msg.sender] = time;
    console.log("harvest = ", harvests[msg.sender]);
  }

  function harvest() public {
    updateHarvest();
    uint256 reward = harvests[msg.sender];
    console.log("reward = ", reward);
    if (reward > 0) {
      uint256 burnAmount = harvests[msg.sender] * burnRate / 100;

      meishu.transfer(address(0x1), burnAmount);
      meishu.transfer(msg.sender, harvests[msg.sender]-burnAmount);
      harvests[msg.sender] = 0;
    }
  }

  function stakeOfOwner(address _owner)
  public
  view
  returns(uint256[] memory)
  {
    uint256 ownerTokenCount = stakeBalances[_owner];
    uint256[] memory tokenIds = new uint256[](ownerTokenCount);
    for (uint256 i; i < ownerTokenCount; i++) {
      tokenIds[i] = ownedTokens[_owner][i];
    }
    return tokenIds;
  }

  function getTotalClaimable(address _user) external view returns(uint256, uint256, uint256) {
    uint256 time = getCurrentTime();
    uint256 pending = stakeBalances[msg.sender] * NFTRewardRate * (time - lastUpdate[_user]) / 10;
    uint256 total = harvests[_user] + pending;
    return (total, total * burnRate / 100, total * (100 - burnRate) / 100);
  }

  function _addTokenToOwner(address to, uint256 tokenId) private {
      uint256 length = stakeBalances[to];
    ownedTokens[to][length] = tokenId;
    ownedTokensIndex[tokenId] = length;
  }
  
  function _removeTokenFromOwner(address from, uint256 tokenId) private {
      // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
      // then delete the last slot (swap and pop).

      uint256 lastTokenIndex = stakeBalances[from] - 1;
      uint256 tokenIndex = ownedTokensIndex[tokenId];

    // When the token to delete is the last token, the swap operation is unnecessary
    if (tokenIndex != lastTokenIndex) {
          uint256 lastTokenId = ownedTokens[from][lastTokenIndex];

      ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
      ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
    }

    // This also deletes the contents at the last position of the array
    delete ownedTokensIndex[tokenId];
    delete ownedTokens[from][lastTokenIndex];
  }

  function setNftContractAddr(address nftAddr) external onlyOwner {
    meishuNFT = IMeishuNFT(nftAddr);
  }

  function setFtContractAddr(address ftAddr) external onlyOwner {
    meishu = IMeishu(ftAddr);
  }

  function setNFTRewardRate(uint _rate) external onlyOwner {
    NFTRewardRate = _rate;
  }

  function setPOOLWALLET(address _address) external onlyOwner {
    POOL_WALLET = _address;
  }

  function setBurnRate(uint256 _rate) external onlyOwner {
    burnRate = _rate;
  }

  function getCurrentTime()
    internal
    virtual
    view
    returns(uint256){
    return block.timestamp;
  }
}