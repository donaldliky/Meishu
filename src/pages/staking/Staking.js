import React, { useState, useEffect } from 'react';
import Header from './header/Header';
import Show from './show/Show';
import Faq from './faq/Faq';

const Staking = () => {
  return (
    <div>
      <Header/>
      <Show />
      <Faq/>
    </div>
  )
}

export default Staking