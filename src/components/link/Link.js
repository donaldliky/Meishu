import React from 'react';
import './Link.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Linkbar() {
  const [isTurn, setIsTurn] = useState(1);
  const set1 = () => { setIsTurn(1) }
  const set2 = () => { setIsTurn(2) }

  return (
    <div className="Linkbar">
      <div>
        <span onClick={() => set1()}>NFT Staking</span>
        <div className={isTurn == 1 ? "light" : ""}></div>
      </div>
      <Link to={'/staking'}><div>
        <span onClick={() => set2()}>Staking</span>
        <div className={isTurn == 2 ? "lightr" : ""}></div>
      </div></Link>
    </div>
  )
}