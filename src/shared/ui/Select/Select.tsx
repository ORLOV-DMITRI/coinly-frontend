import styles from './Select.module.scss'
import cn from "classnames";

type Props = {
  isShow: boolean;
  setIsShow: (value: boolean) => void
  value: string
  options: { value: string, label: string }[]
  handleSelect: (newValue: string) => void
}


export default function Select({isShow, setIsShow, options, value, handleSelect}:Props) {
    return (
        <div className={styles.select}>
          <button
              type="button"
              className={styles.selectBtn}
              onClick={() => setIsShow(!isShow)}
          >
            {value}
            <span className={styles.arrow}>▼</span>
          </button>

          {isShow && (
              <div className={styles.dropdown}>
                {options.map(option => (
                    <button
                        key={option.value}
                        type="button"
                        className={cn(styles.dropdownItem, { [styles.selected]: option.value === value })}
                        onClick={() => handleSelect(option.value)}
                    >
                      {option.label}
                    </button>
                ))}
              </div>
          )}
        </div>
    );
}
