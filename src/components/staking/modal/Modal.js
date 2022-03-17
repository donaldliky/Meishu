import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./Modal.scss";
import { Button } from "@mui/material";


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import { ethers } from "ethers";
import * as config from '../../../config/config'
import { useSelector } from "react-redux";
import stakingAbi from '../../../config/contracts/MEISHU_STAKING.json'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Modal = props => {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const [alertTitle, setAlertTitle] = useState('')
  const [alertType, setAlertType] = useState('')
  const nft = props.nft
  const [level, setLevel] = useState(1)
  console.log('modal nft: ', nft)
  const wallet = useSelector((state) => state.wallet)
  // contract
  const provider = wallet.provider
  const signer = provider.getSigner()
  const readContract = new ethers.Contract(
    // "0x93d39E82a60154675dA86229908C80dCF6EdbDDa",
    config.configVars.NFTStakingAddress,
    stakingAbi,
    provider
  )
  const writeContract = readContract.connect(signer)

  const { vertical, horizontal, open } = state;
  // approve function
  const handleClickConfirm = (newState) => async () => {
    try {
      const tx = await writeContract.Stake(nft.tokenId, level)
      await tx.wait()
      await props.onStaking()
      // setState({ open: true, ...newState });
      // handleClick1('Your staking successed.')
    } catch (error) {
      if (error.code == 4001) {
        // alert("You rejected.")
        handleClick1('You rejected.', 'error')
        return
      } else {
        // alert("Something went wrong.")
        handleClick1("Something went wrong.", 'error')
        return
      }
    }
  };
  // const handleClose = () => {
  //   setState({ ...state, open: false });
    
  // };
  // const closeOnEscapeKeyDown = e => {
  //   if ((e.charCode || e.keyCode) === 27) {
  //     props.onClose();
  //   }
  // };
  // useEffect(() => {
  //   document.body.addEventListener("keydown", closeOnEscapeKeyDown);
  //   return function cleanup() {
  //     document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
  //   };
  // }, []);

  const nodeRef = React.useRef(null)

  const [open1, setOpen1] = React.useState(false);

  const handleClick1 = (title, type) => {
    setAlertTitle(title)
    setAlertType(type)
    setOpen1(true);
  };

  const handleClose1 = (event, reason) => {

    setOpen1(false);
  };
  return (
    <>
      <CSSTransition
        in={props.show}
        unmountOnExit
        timeout={{ enter: 0, exit: 300 }}
        nodeRef={nodeRef}
      >
        <div className="modal" onClick={props.onClose} ref={nodeRef}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-body">
              <div className={'modal_title'}>Stake NFT &amp; earn passive reward</div>
                <div className={'duration'}>Duration</div>
                <div className='buttonGroup'>
                    <button onClick={() => setLevel(1)}>30 Days</button>
                    <button onClick={() => setLevel(2)} style={{marginLeft: '16px', marginRight: '16px'}} >60 Days</button>
                    <button onClick={() => setLevel(3)}>90 Days</button>
                </div>
                <hr style={{ marginTop: '24px', border: '1px solid #044098' }}/>
                <div className={'summary'}>Summary</div>
                <div className={'data'} style={{ marginTop: '24px' }} >
                    <div  >Stake Date</div>
                    <div>2022/03/13, 16:20</div>
                </div>
                <div className={'data'}>
                    <div>Est. APY</div>
                    <div>241.5%</div>
                </div>
                <div className={'data'}>
                    <div>Est. Earning</div>
                    <div>2,474,256.547<font style={{color: '#076AFE'}}>&nbsp;MEISHU</font></div>
                </div>
                <div className={'data'}>
                    <div>Redemption Date</div>
                    <div>2022/04/12, 16:20</div>
                </div>
                <div className="btnConfirm">
                    <Button className="cancel" variant='outlined' onClick={props.onClose}
                        sx={{ width: '174px', height: '56px', color: '#AFAFAF', fontWeight: 'bold', fontSize: '18px', textTransform: 'none',border: '1px solid #AFAFAF', borderRadius: '8px' }}
                    >
                        Cancel
                    </Button>
                    <Button className="confirm" variant='contained' onClick={handleClickConfirm({vertical: 'top',horizontal: 'right',})}
                        sx={{ backgroundColor: '#FEE403', color: '#0F0F0E', 
                        fontWeight: 'bold', fontSize: '18px', textTransform: 'none',borderRadius: '8px',
                        '&:hover': { color: 'black', backgroundColor: '#f7e334' }   }} >Confirm</Button>
                </div>
            </div>

          </div>
        </div>
      </CSSTransition>    
      {/* <Snackbar  anchorOrigin={{ vertical, horizontal }} open={open} onClose={handleClose} key={vertical + horizontal}>
            <Alert iconMapping={{success: <CheckCircleRoundedIcon fontSize="inherit" sx={{ color: 'white',}} />,}} 
              sx={{ width: '100%', backgroundColor: '#44CF84',  height: '56px',display: 'flex',justifyContent: 'center', alignItems: 'center',
              fontSize: '16px',  }}>
              Staking is approved. Please continue
            </Alert>
      </Snackbar> */}
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open1} autoHideDuration={6000} onClose={handleClose1} >
        <Alert onClose={handleClose1} severity={alertType} sx={{ width: '100%' }}>
          {alertTitle}
        </Alert>
      </Snackbar>
    </>
    
  );
};

export default Modal;
