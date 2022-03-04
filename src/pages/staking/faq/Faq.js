import React from 'react'
import Faq_item from '../../../components/staking/faq/Faq_item'

import styles from './Faq.module.scss'
const Faq = () => {
  return (
    <div className={styles.bodyFaq}>
      <div className={styles.maxcontainer}>
        <div className={styles.title}>FAQ</div>
          <div className={styles.items}>
            <Faq_item/>
            <Faq_item/>
            <Faq_item/>
          </div>
      </div>
    </div>
  )
}

export default Faq