import styles from './SearchInput.module.scss'
import SearchIcon from '/public/assets/svg/search.svg'

type Props = {
  search: string;
  handleSearch: (value: string) => void;
  placeholder: string
}
export default function SearchInput({search, handleSearch, placeholder}:Props) {
    return (
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon}><SearchIcon/></span>
          <input
              type="text"
              className={styles.searchInput}
              placeholder={placeholder}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
          />
        </div>
    );
}
