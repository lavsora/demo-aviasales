import logo from '../../img/Logo.svg'

import styles from './Header.module.scss'

const Header = () => <img src={logo} alt='Logo' className={styles.logo} />

export default Header