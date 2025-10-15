'use client'
import styles from './Header.module.scss'
import Link from "next/link";
import {usePathname} from "next/navigation";
import cn from "classnames";
import Button from "@/shared/ui/Button/Button";
import UserMenu from "@/components/UserMenu/UserMenu";
import Logo from '/public/assets/svg/logo.svg'
import {useAuth} from "@/lib/auth/authContext";
import {useEffect, useState} from "react";

const navLinks = [
    {
        name: 'Главная',
        link: '/dashboard',
    },
    {
        name: 'Расходы',
        link: '/expenses',
    },
    {
        name: 'Категории',
        link: '/categories',
    },
    {
        name: 'Товары',
        link: '/items',
    },
]

type HeaderProps = {
    isAuthenticated: boolean;
}

export default function Header({ isAuthenticated: serverAuth }: HeaderProps) {
    const path = usePathname();

    const { isAuthenticated: clientAuth } = useAuth();
    const [mounted, setMounted] = useState(false);

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isAuthenticated = mounted ? clientAuth : serverAuth;
    return (
        <header className={cn(styles.header, isUserMenuOpen && styles.userMenu)}>
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
                                    <Link href={item.link} className={cn(path.startsWith(item.link) && styles.active)}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {isAuthenticated ? (
                        <UserMenu isOpen={isUserMenuOpen} setIsOpen={setIsUserMenuOpen} />
                    ) : (
                        <div className={styles.userBlock}>
                            <Link href={'/login'}>
                                <Button variant={'primary'} size={'default'} className={styles.headerBtn}>
                                    Войти
                                </Button>
                            </Link>
                        </div>
                    )}

                </nav>
            </div>
        </header>
    );
}
