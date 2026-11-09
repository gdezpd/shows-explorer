import styles from './GenreChips.module.scss'

type GenreChipsProps = {
  genres: string[]
  selected: string[]
  onToggle: (genre: string) => void
  onClear: () => void
}

export function GenreChips({ genres, selected, onToggle, onClear }: GenreChipsProps) {
  const allSelected = selected.length === 0

  return (
    <div className={styles.row} role="group" aria-label="Жанры">
      <button
        type="button"
        className={allSelected ? styles.chipActive : styles.chip}
        aria-pressed={allSelected}
        onClick={onClear}
      >
        Все
      </button>
      {genres.map((genre) => {
        const active = selected.includes(genre)

        return (
          <button
            key={genre}
            type="button"
            className={active ? styles.chipActive : styles.chip}
            aria-pressed={active}
            onClick={() => onToggle(genre)}
          >
            {genre}
          </button>
        )
      })}
    </div>
  )
}
