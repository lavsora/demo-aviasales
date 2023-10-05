import { useSelector, useDispatch } from 'react-redux'

import TicketList from '../TicketList'
import Footer from '../Footer'
import { buttonConfig } from '../../store/AviaSlice'

import styles from './Tabs.module.scss'

const TicketTabs = () => {
  const dispatch = useDispatch()
  const buttons = useSelector((state) => state.AviaSlice.buttons)

  const button = buttons.map((item) => (
    <button
      key={item.id}
      type='button'
      className={`${styles.tabsActive} ${
        item.active ? styles.active : ''
      }`}
      onClick={() => dispatch(buttonConfig(item.id))}
      disabled={item.disabled}
    >
      {item.text}
    </button>
  ))

  return (
    <div className={styles.ticketDisplay}>
      <div className={styles.tabs}>
        { button }
      </div>
      <TicketList />
      <Footer />
    </div>
  )
}

export default TicketTabs