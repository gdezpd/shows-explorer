import styles from './SearchField.module.scss'

type SearchFieldProps = {
  value: string
  onChange: (value: string) => void
}

export function SearchField({ value, onChange }: SearchFieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.caption}>Название</span>
      <input
        className={styles.input}
        value={value}
        placeholder="Введите название"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
