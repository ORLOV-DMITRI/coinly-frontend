'use client';

import {ChangeEvent, FormEvent, useState} from 'react';
import Link from 'next/link';
import { authService, LoginCredentials } from '@/lib/auth/authService';
import { useAuth } from '@/lib/auth/authContext';
import { useRouter } from 'next/navigation';
import styles from './Login.module.scss';
import Input from "@/shared/ui/Input/Input";
import Button from "@/shared/ui/Button/Button";
import cn from "classnames";
import GoogleIcon from '/public/assets/svg/google.svg'
import toast from "react-hot-toast";

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginCredentials]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<LoginCredentials> = {};

    if (!formData.email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await authService.login(formData);
      login(response.token, response.user);
      router.push('/');
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={'startPage'}>
      <div className={cn('container', styles.content)}>
        <div className={styles.form}>
          <h1 className={styles.title}>Вход</h1>

          <form onSubmit={handleSubmit} className={styles.formFields}>
            <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="Введите email"
            />

            <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Введите пароль"
            />

            <Button
                type="submit"
                loading={isLoading}
                variant="primary"
                size="large"
                className={styles.submitButton}
            >
              Войти
            </Button>
          </form>

          <div className={styles.divider}>или</div>

          <div className={styles.oauthButtons}>
            <Button
                variant="secondary"
                onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}
            >
              <GoogleIcon/>
              Google
            </Button>
          </div>

          <div className={styles.linkToRegister}>
            <span>Нет аккаунта? </span>
            <Link href="/register" className={styles.link}>
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}