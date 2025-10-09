export type User = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export type RegisterDto = {
  email: string;
  password: string;
  name?: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type AuthResponse = {
  success: true;
  message: string;
  token: string;
  user: User;
};

export type MeResponse = {
  success: true;
  user: User;
};


export type Category = {
  id: string;
  name: string;
  emoji?: string;
  userId: string;
  createdAt: string;
};

export type CategoryWithCount = Category & {
  _count: {
    items: number;
  };
};

export type CategoryWithItems = Category & {
  items: ItemBasic[];
};

export type ItemBasic = {
  id: string;
  name: string;
  prices: number[];
  isFavorite: boolean;
};

export type CreateCategoryDto = {
  name: string;
  emoji?: string;
  itemIds?: string[];
};

export type UpdateCategoryDto = {
  name?: string;
  emoji?: string;
  itemIds?: string[];
};

export type GetCategoriesResponse = {
  success: true;
  categories: CategoryWithCount[];
};

export type GetCategoryResponse = {
  success: true;
  category: CategoryWithItems;
};

export type CreateCategoryResponse = {
  success: true;
  message: string;
  category: Category;
};

export type UpdateCategoryResponse = {
  success: true;
  message: string;
  category: Category;
};

export type DeleteCategoryResponse = {
  success: true;
  message: string;
};


export type Item = {
  id: string;
  name: string;
  prices: number[];
  isFavorite: boolean;
  categoryId: string | null;
  userId: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  } | null;
};

export type CreateItemDto = {
  name: string;
  prices?: number[];
  categoryId?: string | null;
  isFavorite?: boolean;
};

export type UpdateItemDto = {
  name?: string;
  prices?: number[];
  categoryId?: string | null;
  isFavorite?: boolean;
};

export type ItemsQueryParams = {
  categoryId?: string | 'null';
  search?: string;
  isFavorite?: boolean;
};

export type GetItemsResponse = {
  success: true;
  items: Item[];
};

export type GetItemResponse = {
  success: true;
  item: Item;
};

export type CreateItemResponse = {
  success: true;
  message: string;
  item: Item;
};

export type UpdateItemResponse = {
  success: true;
  message: string;
  item: Item;
};

export type DeleteItemResponse = {
  success: true;
  message: string;
};

export type ExpenseItem = {
  id: string;
  expenseId: string;
  itemId: string;
  amount: number;
  createdAt: string;
  item: {
    id: string;
    name: string;
    prices: number[];
    categoryId: string | null;
    category: {
      id: string;
      name: string;
    } | null;
  };
};

export type Expense = {
  id: string;
  date: string;
  userId: string;
  createdAt: string;
  items: ExpenseItem[];
};

export type CreateExpenseDto = {
  items: Array<{
    itemId: string;
    amount: number;
  }>;
  date?: string;
};

export type UpdateExpenseDto = {
  itemId?: string;
  amount?: number;
  date?: string;
};

export type ExpenseStats = {
  total: number;
  count: number;
  topCategory: {
    id: string | null;
    name: string;
    total: number;
    count: number;
    percentage: number;
  } | null;
  byCategory: Array<{
    id: string | null;
    name: string;
    total: number;
    count: number;
    percentage: number;
  }>;
};

export type ExpensesQueryParams = {
  month?: string; // YYYY-MM
  startDate?: string;
  endDate?: string;
  categoryId?: string | 'null';
  itemId?: string;
};

export type StatsQueryParams = {
  month?: string; // YYYY-MM
  startDate?: string;
  endDate?: string;
};

export type GetExpensesResponse = {
  success: true;
  expenses: Expense[];
};

export type GetExpenseResponse = {
  success: true;
  expense: Expense;
};

export type CreateExpenseResponse = {
  success: true;
  message: string;
  expense: Expense;
};

export type UpdateExpenseResponse = {
  success: true;
  message: string;
  expense: Expense;
};

export type DeleteExpenseResponse = {
  success: true;
  message: string;
};

export type GetStatsResponse = {
  success: true;
  stats: ExpenseStats;
};
