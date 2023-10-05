import { useDispatch, useSelector } from 'react-redux'

import { showTickets } from '../../store/AviaSlice'

import styles from './Footer.module.scss'

const Footer = () => {
  const dispatch = useDispatch()
  const showButton = useSelector((state) => state.AviaSlice.tickets)
  const filters = useSelector((state) => state.AviaSlice.filters)

  const notChecked = filters.some((filter) => filter.checked)

  if (showButton.length > 5 && notChecked) {
    return (
      <button
        type='button'
        aria-label='show ticket'
        className={styles.showButton}
        onClick={() => dispatch(showTickets())}
      >
        Показать еще 5 билетов{' '}
      </button>
    )
  }

  return null
}

export default Footer