import { SearchShows } from '../../screens/SearchShows'
import styles from './app.module.scss'

export function App() {
  return (
    <div className={styles.shell}>
      <SearchShows />
    </div>
  )
}
