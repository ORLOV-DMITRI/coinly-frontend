import styles from './DateSelector.module.scss';
import cn from 'classnames';
import {ChangeEvent, useState} from 'react';
import Button from "@/shared/ui/Button/Button";

type DateOption = 'today' | 'yesterday' | 'custom';

type Props = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  className?: string;
};

export default function DateSelector({ selectedDate, onDateChange, className }: Props) {
  const [activeOption, setActiveOption] = useState<DateOption>('today');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleTodayClick = () => {
    setActiveOption('today');
    setShowCustomInput(false);
    onDateChange(new Date());
  };

  const handleYesterdayClick = () => {
    setActiveOption('yesterday');
    setShowCustomInput(false);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    onDateChange(yesterday);
  };

  const handleCustomClick = () => {
    setActiveOption('custom');
    setShowCustomInput(true);
  };

  const handleCustomDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    if (dateString) {
      const date = new Date(dateString);
      onDateChange(date);
    }
  };

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.buttons}>
        <Button
          type="button"
          size={'large'}
          variant={activeOption === 'today' ? 'primary' : 'secondary'}
          onClick={handleTodayClick}
        >
          Сегодня
        </Button>
        <Button
          type="button"
          size={'large'}
          variant={activeOption === 'yesterday' ? 'primary' : 'secondary'}
          onClick={handleYesterdayClick}
        >
          Вчера
        </Button>
        <Button
          type="button"
          size={'large'}
          variant={activeOption === 'custom' ? 'primary' : 'secondary'}
          onClick={handleCustomClick}
        >
          Другая...
        </Button>
      </div>

      {showCustomInput && (
        <input
          type="date"
          className={styles.customInput}
          value={selectedDate.toISOString().split('T')[0]}
          onChange={handleCustomDateChange}
          max={new Date().toISOString().split('T')[0]}
        />
      )}
    </div>
  );
}
