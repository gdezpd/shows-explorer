import styles from './Pagination.module.scss'

type PaginationProps = {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <nav className={styles.nav} aria-label="Страницы результатов">
      <button
        type="button"
        className={styles.edge}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Назад
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          className={pageNumber === page ? styles.pageActive : styles.page}
          aria-current={pageNumber === page ? 'page' : undefined}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        className={styles.edge}
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Вперёд
      </button>
    </nav>
  )
}
