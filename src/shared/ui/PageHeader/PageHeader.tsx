import styles from './PageHeader.module.scss'
import {useRouter} from "next/navigation";
import BackIcon from '/public/assets/svg/backArrow.svg';
import Link from "next/link";
import Button from "@/shared/ui/Button/Button";
import cn from "classnames";

type Props = {
    title: string
    actionType: 'back' | 'link';
    isLoading?: boolean
    link?: string
}

export default function PageHeader({title, actionType = 'back', link, isLoading}:Props) {
    const router = useRouter()
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.headerContainer}>

                    {actionType === 'back' && (
                        <button type="button" className={'backBtn'} onClick={() => router.back()}>
                            <BackIcon/>
                        </button>
                    )}


                    <h2>{title}</h2>


                    {actionType === 'link' && link ? (
                        <Link href={link}>
                            <Button variant={'primary'} size={'default'} className={cn(styles.addBtn, isLoading && styles.creating)}>
                                {isLoading ? "Создание" : 'Создать'}
                            </Button>
                        </Link>
                    ) : <div></div>}


                </div>
            </div>
        </header>
    );
}
