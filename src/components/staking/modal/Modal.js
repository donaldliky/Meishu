import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";
import { Button } from "@mui/material";


import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Modal = props => {
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    props.onChangeText()
    // props.onClose()
    setState({ open: true, ...newState });
    
  };

  const handleClose = () => {
    setState({ ...state, open: false });
    
  };

  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);

  const nodeRef = React.useRef(null)
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
            <div className={'modal_title'}>Stake NFT & earn passive reward</div>
                      <div className={'duration'}>Duration</div>
                          <div className='buttonGroup'>
                              <button >30 Days</button>
                              <button style={{marginLeft: '16px', marginRight: '16px'}} >60 Days</button>
                              <button >90 Days</button>
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
                              <Button className="confirm" variant='contained' onClick={handleClick({vertical: 'top',horizontal: 'right',})}
                                  sx={{ backgroundColor: '#FEE403', color: '#0F0F0E', 
                                  fontWeight: 'bold', fontSize: '18px', textTransform: 'none',borderRadius: '8px',
                                  '&:hover': { color: 'black', backgroundColor: '#f7e334' }   }} >Confirm</Button>
                          </div>
            </div>

          </div>
        </div>
      </CSSTransition>    
      <Snackbar  anchorOrigin={{ vertical, horizontal }} open={open} onClose={handleClose} key={vertical + horizontal}>
            <Alert iconMapping={{success: <CheckCircleRoundedIcon fontSize="inherit" sx={{ color: 'white',}} />,}} 
              sx={{ width: '100%', backgroundColor: '#44CF84',  height: '56px',display: 'flex',justifyContent: 'center', alignItems: 'center',
              fontSize: '16px',  }}>
              Staking is approved. Please continue
            </Alert>
      </Snackbar>
    </>
    
  );
};

export default Modal;
