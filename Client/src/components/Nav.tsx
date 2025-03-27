import { Link } from 'react-router-dom'
import styles from '../styles/Nav.module.scss'

export default function Nav(){
  return (
    <div className={styles['nav-container']}>
      <Link to="/" className={styles['home-link']}>Home</Link>
    </div>
  )
}

