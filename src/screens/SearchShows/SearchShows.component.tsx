import { GenreChips } from './GenreChips'
import { Pagination } from './Pagination'
import { SearchField } from './SearchField'
import { ShowCard } from './ShowCard'
import { useSearchShowsPresenter } from './hooks/useSearchShowsPresenter'
import styles from './SearchShows.module.scss'

export function SearchShows() {
  const presenter = useSearchShowsPresenter()

  return (
    <main className={styles.screen}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>Каталог TVmaze</p>
        <h1 className={styles.title}>Найти сериал</h1>
        <p className={styles.lede}>
          Введите название. Жанры и страницы соберутся из того, что вернёт поиск.
        </p>
        <SearchField value={presenter.input} onChange={presenter.onInput} />
      </header>

      {presenter.queryLabel && <p className={styles.query}>{presenter.queryLabel}</p>}

      {presenter.phase === 'loading' && (
        <p className={styles.status} role="status">
          Ищем шоу…
        </p>
      )}
      {presenter.phase === 'error' && presenter.error && (
        <p className={styles.error} role="alert">
          {presenter.error}
        </p>
      )}
      {presenter.phase === 'empty' && (
        <p className={styles.status} role="status">
          По этому запросу ничего не найдено
        </p>
      )}

      {presenter.showGenres && (
        <GenreChips
          genres={presenter.genres}
          selected={presenter.selectedGenres}
          onToggle={presenter.onToggleGenre}
          onClear={presenter.onClearGenres}
        />
      )}

      {presenter.phase === 'empty-filter' && (
        <p className={styles.status} role="status">
          Ничего не найдено по выбранным жанрам
        </p>
      )}

      {presenter.phase === 'loading' && (
        <div className={styles.grid} aria-hidden="true">
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
          <div className={styles.skeleton} />
        </div>
      )}

      {presenter.phase === 'results' && (
        <ul className={styles.grid}>
          {presenter.shows.map((show) => (
            <li key={show.id} className={styles.item}>
              <ShowCard show={show} />
            </li>
          ))}
        </ul>
      )}

      {presenter.showPagination && (
        <Pagination
          page={presenter.page}
          pageCount={presenter.pageCount}
          onPageChange={presenter.onPageChange}
        />
      )}
    </main>
  )
}
