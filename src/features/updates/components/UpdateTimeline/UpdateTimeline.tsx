import styles from './UpdateTimeline.module.scss';
import { UpdateEntry } from '@/data/updates';
import UpdateCard from '../UpdateCard/UpdateCard';

type Props = {
  updates: UpdateEntry[];
};

export default function UpdateTimeline({ updates }: Props) {
  return (
    <div className={styles.timeline}>
      {updates.map((update, index) => (
        <div key={update.id} className={styles.timelineItem}>
          <div className={styles.timelineMarker}>
            <div className={styles.timelineDot} />
            {index < updates.length - 1 && <div className={styles.timelineLine} />}
          </div>
          <div className={styles.timelineContent}>
            <UpdateCard update={update} />
          </div>
        </div>
      ))}
    </div>
  );
}