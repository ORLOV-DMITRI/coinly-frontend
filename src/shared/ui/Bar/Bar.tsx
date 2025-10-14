import styles from './Bar.module.scss'
import cn from "classnames";

type BarProps = {
    value: string
    size?: 'default' | 'large'
    className?:string
}

export default function Bar({value, className, size = 'default'}:BarProps) {
    return (
        <div className={cn(styles.bar, className, styles[size])}>
            <div className={styles.fill} style={{width: value}}></div>
        </div>
    );
}
