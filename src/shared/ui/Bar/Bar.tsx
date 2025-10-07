import styles from './Bar.module.scss'
import cn from "classnames";

type BarProps = {
    value: string
    className?:string
}

export default function Bar({value, className}:BarProps) {
    return (
        <div className={cn(styles.bar, className)}>
            <div className={styles.fill} style={{width: value}}></div>
        </div>
    );
}
