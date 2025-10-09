import styles from './PageHeader.module.scss'
import {useRouter} from "next/navigation";
import BackIcon from '/public/assets/svg/backArrow.svg';

type Props = {
    title: string
}

export default function PageHeader({title}:Props) {
    const router = useRouter()
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContainer}>
                    <button type="button" className={'backBtn'} onClick={() => router.back()}>
                        <BackIcon/>
                    </button>
                    <h2>{title}</h2>
                    <div></div>
                </div>
            </div>
        </header>
    );
}
