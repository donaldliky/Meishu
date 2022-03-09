import React from 'react'
import FaqItem from '../../../components/staking/faq/Faq_item'

import styles from './Faq.module.scss'
const Faq = () => {
  return (
    <div className={styles.bodyFaq}>
      <div className={styles.maxcontainer}>
        <div className={styles.title}>FAQ</div>
          <div className={styles.items}>
            <FaqItem/>
            <FaqItem/>
            <FaqItem/>
          </div>
      </div>
    </div>
  )
}

export default Faq