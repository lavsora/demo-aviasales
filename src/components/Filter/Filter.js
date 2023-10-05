import { useSelector, useDispatch } from 'react-redux'

import { checkboxConfig } from '../../store/AviaSlice'

import styles from './Filter.module.scss'

const Filter = () => {
  const dispatch = useDispatch()
  const filtersCheckbox = useSelector((state) => state.AviaSlice.filters)

  const filterCheckbox = filtersCheckbox.map((item) => (
    <label key={item.id} className={styles.ticketFiltersName}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={item.checked}
        onChange={() => dispatch(checkboxConfig(item.id))}
      />
      <span className={styles.fakeCheckbox} />
      <span>{item.text}</span>
    </label>
  ))

  return (
    <div className={styles.ticketFilters}>
      <span className={styles.ticketFiltersTitle}>Количество пересадок</span>
      {filterCheckbox}
    </div>
  )
}

export default Filter
