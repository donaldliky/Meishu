import React, { useState, useEffect, useLayoutEffect } from 'react';

import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import styles from './Graph.module.scss'
import ReactDOM from 'react-dom'
import { width } from '@mui/system';


function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
      window.location.reload()
    }, ms);
  };
}

const Graph = (props) => {
  // const [time, setTime] = useState(0)
  // const [Temp, setTemp] = useState(null)
  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  let x = 0
  // React.useEffect(() => {
  //   // setTemp(content)
  //   // x = (x +5)*(-1)
  //   const debouncedHandleResize = debounce(function handleResize() {
  //     // setTime(t
  //     setDimensions({
  //       height: window.innerHeight,
  //       width: window.innerWidth
  //     })
  //   }, 500)

  //   window.addEventListener('resize', debouncedHandleResize)

  //   return _ => {
  //     window.removeEventListener('resize', debouncedHandleResize)
    
  //   }
  // }, [width])
 
  return (
    <div className={styles.bodyGraph}>
      <Line
              data={props.chartdata}
              options={{
                  title: {
                      display: true,
                      text: 'Average Rainfall per month',
                      fontSize: 20,
                      color: 'white'
                  },
                  plugins: {
                      legend: {
                        display: false
                      }
                  },
                  responsive: true,
                  scales: {
                      y: {
                        grid: {
                          drawBorder: true,
                          color: function(context) {
                            if (context.tick.value > 0) {
                              return '#DEDEDE';
                            } else if (context.tick.value < 0) {
                              return 'white';
                            }
                
                            return '#000000';
                          },
                          },
                          min: 0,
                          max: 0.3,
                          ticks: {
                              // forces step size to be 50 units
                              stepSize: 0.1
                          }
                      },
                  }
              }}
              height="0px"
              style={{ width: '100%', height: '100%' }}
          />
    </div>
  )
}

export default Graph