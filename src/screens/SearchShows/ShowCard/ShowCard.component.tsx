import type { Show } from '../../../entities/show'
import styles from './ShowCard.module.scss'

type ShowCardProps = {
  show: Show
}

export function ShowCard({ show }: ShowCardProps) {
  const year = show.premiered ? show.premiered.slice(0, 4) : '—'
  const rating = show.rating === null ? '—' : show.rating.toFixed(1)
  const summary = show.summary || 'Описания нет'

  return (
    <article className={styles.card}>
      <div className={styles.poster}>
        {show.image ? (
          <img className={styles.image} src={show.image} alt="" />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            {show.name.slice(0, 1)}
          </div>
        )}
      </div>
      <div className={styles.body}>
        <h2 className={styles.name}>{show.name}</h2>
        <p className={styles.meta}>
          <span>{year}</span>
          <span>★ {rating}</span>
          {show.status && <span>{show.status}</span>}
        </p>
        {show.genres.length > 0 && <p className={styles.genres}>{show.genres.join(' · ')}</p>}
        <p className={styles.summary}>{summary}</p>
        <a className={styles.link} href={show.url} target="_blank" rel="noopener noreferrer">
          Открыть на TVmaze
        </a>
      </div>
    </article>
  )
}
