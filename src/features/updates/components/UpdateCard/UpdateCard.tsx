import styles from './UpdateCard.module.scss';
import cn from 'classnames';
import { UpdateEntry, getCategoryColor, getCategoryLabel } from '@/data/updates';

type Props = {
  update: UpdateEntry;
};

export default function UpdateCard({ update }: Props) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.dateAndCategory}>
          <time className={styles.date}>{formatDate(update.date)}</time>
          <span
            className={styles.categoryBadge}
            style={{ backgroundColor: getCategoryColor(update.category) }}
          >
            {getCategoryLabel(update.category)}
          </span>
        </div>
        <h2 className={styles.title}>{update.title}</h2>
        <p className={styles.description}>{update.description}</p>
      </div>

      <div className={styles.features}>
        {update.features.map((feature, index) => (
          <div key={index} className={styles.feature}>
            <div className={styles.featureHeader}>
              <span className={styles.featureEmoji}>{feature.emoji}</span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
            </div>
            <p className={styles.featureDescription}>{feature.description}</p>

            {feature.benefits.length > 0 && (
              <ul className={styles.benefits}>
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className={styles.benefit}>
                    {benefit}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}