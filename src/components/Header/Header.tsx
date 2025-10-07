'use client'
import styles from './Header.module.scss'
import Link from "next/link";
import {usePathname} from "next/navigation";
import cn from "classnames";
import Button from "@/shared/ui/Button/Button";
import {useAuth} from "@/lib/auth/authContext";
import Logo from '/public/assets/svg/logo.svg'

const navLinks = [
    {
        name: 'Главная',
        link: '/'
    },
    {
        name: 'Расходы',
        link: '#'
    },
    {
        name: 'Категории',
        link: '#'
    },
    {
        name: 'Товары',
        link: '#'
    },
]

export default function Header() {
    const path = usePathname()
    const {isAuthenticated} = useAuth();

    return (
        <header className={styles.header}>
            <div className="container">
                <nav className={styles.nav}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoSvg}><Logo/></span>
                        <span className={styles.logoText}>Coinly</span>
                    </Link>

                    {isAuthenticated && (
                        <ul className={styles.navLinks}>
                            {navLinks.map(item => (
                                <li key={item.name}>
                                    <Link href={item.link} className={cn(path === item.link && styles.active)}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {!isAuthenticated && (
                        <div className={styles.userBlock}>
                            <Button variant={'primary'} size={'default'} className={styles.headerBtn}>
                                <Link href={'/login'}>Войти</Link>
                            </Button>
                        </div>
                    )}


                </nav>
            </div>
        </header>
    );
}
