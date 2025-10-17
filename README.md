# 💰 Money Tracker — Frontend

> Современное веб-приложение для учёта личных расходов с умным выбором товаров и детальной аналитикой

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.90.2-red)
![SCSS](https://img.shields.io/badge/SCSS-1.93.2-pink)

</div>

---

## 🎯 О проекте

Money Tracker — это интуитивно понятное приложение для ведения семейного бюджета, которое помогает отслеживать траты, анализировать привычки потребления и принимать осознанные финансовые решения.

### ✨ Ключевые особенности

- 🔍 **Умный поиск товаров** — мгновенные результаты поиска с автоочисткой
- 📱 **Адаптивный дизайн** — идеально работает на всех устройствах
- 🎨 **Темная/светлая тема** — переключение в один клик
- 📊 **Детальная аналитика** — статистика по категориям и периодам
- ⚡ **Быстрое создание расходов** — минимум кликов, максимум удобства
- 🌟 **Избранные товары** — быстрый доступ к часто покупаемым товарам
- 📌 **Умная боковая панель** — выбранные товары всегда на виду

---

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18+
- npm или yarn
- Backend сервер (см. `/backend`)

### Установка

```bash
# Клонируйте репозиторий
git clone <repository-url>

# Перейдите в папку frontend
cd money/frontend

# Установите зависимости
npm install

# Запустите development сервер
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:3000`

### Доступные команды

```bash
npm run dev      # Запуск development сервера
npm run build    # Сборка для production
npm run start    # Запуск production сервера
```

---

## 🏗️ Архитектура

### 📁 Структура проекта

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (auth)/            # Группировка auth роутов
│   ├── dashboard/         # Главная страница
│   ├── expenses/          # Управление расходами
│   ├── items/             # Управление товарами
│   ├── categories/        # Управление категориями
│   └── updates/           # Страница обновлений
│
├── features/              # Feature-based модули
│   ├── auth/              # Аутентификация
│   ├── dashboard/         # Главная панель + статистика
│   ├── expenses/          # Создание и управление расходами
│   ├── items/             # CRUD товаров
│   ├── categories/        # CRUD категорий
│   ├── updates/           # Система уведомлений об обновлениях
│   └── shopping-lists/    # Списки покупок (в разработке)
│
├── shared/                # Переиспользуемые компоненты
│   ├── ui/                # UI компоненты (Button, Modal, Input)
│   ├── utils/             # Вспомогательные функции
│   └── services/          # Общие сервисы
│
├── components/            # Глобальные компоненты
│   ├── Header/            # Шапка приложения
│   ├── BottomNavigation/  # Мобильная навигация
│   ├── UserMenu/          # Выпадающее меню пользователя
│   └── WhatsNewProvider/  # Провайдер уведомлений
│
├── lib/                   # Конфигурация и хуки
│   ├── auth/              # Auth context и сервисы
│   ├── hooks/             # Переиспользуемые хуки
│   ├── settings/          # Конфигурация (React Query, Axios)
│   └── types/             # TypeScript типы
│
└── styles/                # Глобальные стили
    ├── globals.scss       # Базовые стили
    ├── variables.scss     # SCSS переменные
    └── themes.scss        # CSS переменные для тем
```

### 🧩 Feature-based архитектура

Каждая фича организована по принципу:

```
features/example/
├── components/           # Компоненты фичи
├── hooks/               # React Query хуки
├── pages/               # Страницы (импортируются в app/)
├── services/            # API вызовы
├── types/               # TypeScript типы
└── utils/               # Вспомогательные функции
```

### 🔄 Управление состоянием

- **React Query** — серверное состояние, кэширование, синхронизация
- **React Context** — аутентификация пользователя
- **useState** — локальное состояние компонентов
- **localStorage** — настройки темы, последние обновления

---

## 🛠️ Технологический стек

### Core

- **Next.js 15** — React фреймворк с App Router
- **React 19** — Библиотека для создания пользовательских интерфейсов
- **TypeScript 5** — Статическая типизация

### Управление данными

- **TanStack Query 5** — Серверное состояние и кэширование
- **Axios** — HTTP клиент для API запросов

### Стилизация

- **SCSS Modules** — Модульные стили с препроцессором
- **CSS Variables** — Система тем (темная/светлая)
- **classnames** — Утилита для управления CSS классами

### UI/UX

- **react-hot-toast** — Современные уведомления
- **Intersection Observer API** — Отслеживание видимости элементов
- **Mobile-first** — Адаптивный дизайн

### Разработка

- **js-cookie** — Управление cookies
- **next-plugin-svgr** — SVG как React компоненты

---

## 🎨 Дизайн система

### Темы

Приложение поддерживает светлую и темную темы с автоматическим определением системных настроек:

```scss
// CSS переменные для тем
:root {
  --background: #ffffff;
  --foreground: #000000;
  --primary: #2563eb;
  --muted: #f8fafc;
  // ...
}

[data-theme="dark"] {
  --background: #0f172a;
  --foreground: #f8fafc;
  --primary: #3b82f6;
  --muted: #1e293b;
  // ...
}
```

### Компоненты

- **Button** — primary, secondary, danger варианты
- **Modal** — переиспользуемые модальные окна
- **Input** — стилизованные поля ввода
- **ConfirmDialog** — диалоги подтверждения действий
- **SkeletonLoading** — скелетоны для состояния загрузки

### Адаптивность

```scss
// Миксины для responsive дизайна
@mixin sm {
  @media (max-width: 768px) { @content; }
}

@mixin xs {
  @media (max-width: 600px) { @content; }
}
```

---

## 🔧 API интеграция

### Конфигурация Axios

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});
```

### React Query настройки

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,     // 5 минут
      refetchOnWindowFocus: false,
    },
  },
});
```

### Типизация API

```typescript
// Примеры типов
export type Item = {
  id: string;
  name: string;
  prices: number[];
  category?: Category | null;
  isFavorite: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
```

---

## ✨ Ключевые фичи

### 1. Dashboard (Главная)

- 📊 **Статистика расходов** — траты за месяц, средний чек
- 🏆 **Топ категорий** — самые затратные категории
- 💰 **Управление бюджетом** — установка и отслеживание лимитов
- 📈 **Динамика трат** — графики и тренды

### 2. Умное создание расходов

- 🔍 **Мгновенный поиск** — результаты под полем ввода
- ⭐ **Избранные товары** — быстрый доступ к частым покупкам
- 📌 **Боковая панель** — выбранные товары всегда видны
- 💰 **Выбор цены** — из истории или ввод новой

### 3. Управление товарами

- ✏️ **CRUD операции** — создание, редактирование, удаление
- 🏷️ **Категоризация** — привязка к категориям
- ⭐ **Избранное** — отметка популярных товаров
- 📊 **История цен** — отслеживание изменения стоимости

### 4. Система категорий

- 😊 **Эмодзи иконки** — визуальная идентификация
- 🎨 **Цветовое кодирование** — быстрое распознавание
- 📋 **Управление товарами** — привязка и отвязка товаров
- 🔍 **Поиск и фильтрация** — находите нужное быстро

### 5. Аналитика и отчёты

- 📅 **Фильтры по периодам** — день, неделя, месяц, год
- 📊 **Группировка** — по категориям или товарам
- 💹 **Тренды** — понимание динамики трат
- 📈 **Сравнение периодов** — месяц к месяцу

---

## 🔐 Аутентификация

### JWT + Google OAuth

```typescript
// Контекст аутентификации
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Хук для использования
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### Защищённые роуты

```typescript
// Middleware для защиты роутов
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token && !isPublicRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}
```

---

## 📱 Мобильная версия

### Responsive компоненты

- **BottomNavigation** — мобильная навигация
- **Адаптивные модалки** — fullscreen на мобильных
- **Touch-friendly** — оптимизированные размеры кнопок
- **Gesture support** — свайпы и тапы

### PWA готовность

Приложение готово к превращению в PWA:
- Адаптивный дизайн
- Offline-ready архитектура (React Query)
- Оптимизированная производительность

---

## 🚀 Производительность

### Оптимизации

- **Code splitting** — ленивая загрузка страниц
- **Image optimization** — Next.js Image компонент
- **Bundle analysis** — мониторинг размера бандла
- **React Query cache** — эффективное кэширование данных

### Метрики

- **First Contentful Paint** < 1.5s
- **Largest Contentful Paint** < 2.5s
- **Cumulative Layout Shift** < 0.1
- **Bundle size** — оптимизирован для быстрой загрузки

---

## 🧪 Разработка

### Code Style

```typescript
// Стиль компонентов
type Props = {
  // используем type вместо interface
  className?: string;
};

export default function Component({ className }: Props) {
  // default export для компонентов
  return <div className={cn(styles.component, className)} />;
}
```

### SCSS Guidelines

```scss
// Используем относительные импорты
@use '../../styles/variables' as *;

.component {
  // BEM methodology
  &__element {
    // Nested styles
  }

  &--modifier {
    // Modifiers
  }
}
```

### TypeScript

- Строгая типизация всех компонентов
- API типы на основе backend схемы
- Utility types для переиспользования

---

## 📚 Документация

### Дополнительные ресурсы

- [`/docs/guides/frontend-style-guide.md`](../docs/guides/frontend-style-guide.md) — Стайлгайд
- [`/docs/guides/API.json`](../docs/guides/API.json) — API спецификация
- [`/docs/modules/frontend/`](../docs/modules/frontend/) — Документация модулей
- [`/docs/sessions/`](../docs/sessions/) — История разработки

### Модули

| Модуль | Статус | Описание |
|--------|--------|----------|
| **Dashboard** | ✅ 100% | Главная страница со статистикой |
| **Items** | ✅ 100% | Управление товарами |
| **Expenses** | ✅ 95% | Создание и история расходов |
| **Categories** | ✅ 100% | Управление категориями |
| **Auth** | ✅ 100% | JWT + Google OAuth |
| **Updates** | ✅ 100% | Система уведомлений |
| **Shopping Lists** | 🚧 80% | Списки покупок (заморожен) |

---

## 🤝 Contributing

### Workflow

1. Создайте feature branch
2. Следуйте стайлгайду проекта
3. Добавьте документацию для новых фич
4. Протестируйте на разных экранах
5. Создайте Pull Request

### Commit Guidelines

```bash
feat: добавить умную боковую панель
fix: исправить поиск товаров
docs: обновить README
style: улучшить адаптивность модалок
```

---

## 📄 Лицензия

Этот проект создан для личного использования и обучения.

---

## 👥 Команда

**Разработано с использованием AI-as-Colleague подхода:**
- 🤖 Claude (Anthropic) — AI разработчик
- 👨‍💻 Human Developer — Product Owner & QA

---

<div align="center">

**[⬆ Вернуться к началу](#-money-tracker--frontend)**

Сделано с ❤️ для удобного ведения семейного бюджета

</div>
