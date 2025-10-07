import styles from './StatsPanel.module.scss'
import cn from "classnames";
import SettingsIcon from '/public/assets/svg/settings.svg'

type StatsCardProps = {
    title: string
    value: string
    info: string
}

export default function StatsPanel() {
    return (

      <section className={styles.panel}>

          <div className={styles.panelInfo}>
              <h3>Панель статистики</h3>
              <div className={styles.panelSettings}>
                  <span>Настроить</span>
                  <SettingsIcon/>
              </div>
          </div>

          <div className={styles.statsCards}>
              <div className={'card'}>
                  <div className={styles.label}>Потрачено в январе</div>
                  <div className={styles.value}>15 420₽</div>
                  <div className={cn(styles.change, styles.negative)}>на <span>12%</span> больше чем в декабре</div>
              </div>

              <div className={'card'}>
                  <div className={styles.label}>Средний расход в день</div>
                  <div className={styles.value}>820₽</div>
                  <div className={cn(styles.change, styles.positive)}><span>8%</span> меньше чем обычно</div>
              </div>
          </div>
      </section>

    );
}
