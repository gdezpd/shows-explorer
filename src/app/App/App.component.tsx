import { SearchShows } from '../../screens/SearchShows'
import styles from './App.module.scss'

export function App() {
  return (
    <div className={styles.shell}>
      <SearchShows />
    </div>
  )
}
