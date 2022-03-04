import React, { useState, useEffect } from 'react';
import Graph from '../chart/Graph';
import './History.scss'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';

const chartdata = {
    labels: ['2/22', '2/23', '2/24', '2/25', '2/26'],
    datasets: [
        {
            label: 'Price',
            fill: false,
            backgroundColor: 'none',
            borderColor: '#83B5FF',
            borderWidth: 2,
            data: [0.05, 0.07, 0.18, 0.18, 0.29],
            width: '100%',
            borderDashOffset: '5',
            borderDash: [5, 5],
        }
    ]
}

class Accordion extends React.Component {
    render() {
      const { expand, onClick } = this.props;
      
      return (
        <div>
            <div className={'history'}>
                <div className={'title'} onClick={this.props.onClick(true)}>
                  Price History
                  <ArrowDropUpRoundedIcon sx={{ color: 'white', fontSize: '25px' }} />
                </div>
            <div className={expand ? 'content is-expanded' : 'content'} onClick={onClick}>
                <div className={'desc'}><br />All time average.</div>
                <div className={'price'}>0.3 ETH</div>
                <div className={'chart'}><Graph chartdata={chartdata} /></div>
            </div>
            </div>
            {/* <div className={'historySelect'} onClick={onClick}>
                Rental History
                <ArrowDropDownRoundedIcon sx={{ color: 'white', fontSize: '25px' }} />
            </div> */}
        </div>
      );
      
    }
  }

class History extends React.Component {  
    constructor (props) {
      super(props);
      this.state = {
        expand: this.props.flag,
      };
    }
    
    toggle = (flag) => () => {
      this.setState({ ['expand']: !flag });
    }
    
    render() {
      return (
        <div className='accordion'>
          <div className={'history'}>
              <div className={'title'} onClick={this.toggle(this.state.expand)}>
                {this.props.type} History {this.props.flag}
                {this.state.expand && 
                  <ArrowDropUpRoundedIcon className='icon' sx={{ color: 'white', fontSize: '25px' }}/>
                }
                {!this.state.expand && 
                  <ArrowDropDownRoundedIcon className='icon' sx={{ color: 'white', fontSize: '25px' }}/>
                }
                
                
              </div>
          <div className={this.state['expand'] ? 'content is-expanded' : 'content'} onClick={this.toggle(true)}>
              <div className={'desc'}><br />All time average.</div>
              <div className={'price'}>0.3 ETH</div>
              <div className={'chart'}><Graph chartdata={chartdata} /></div>
          </div>
          </div>
          {/* <div className={'historySelect'} onClick={this.toggle(false)}>
              Rental History
              <ArrowDropDownRoundedIcon sx={{ color: 'white', fontSize: '25px' }} />
          </div> */}
      </div>
      )
      // <div className="">
      //   {/* <button type="button" className="btn" onClick={this.toggleExpand(true)}>Expand All</button>
      //   <button type="button" className="btn" onClick={this.toggleExpand()}>Collapse All</button> */}
      //   <dl className="accordion">
      //     {/* {
      //       accordionList.map((item, index) => ( */}
      //         <Accordion onClick={this.toggle(this.state['flag'])} expand={this.state['block1']} />
      //       {/* ))
      //     } */}
      //   </dl>
      // </div>;

    }
  }
  
  export default History;