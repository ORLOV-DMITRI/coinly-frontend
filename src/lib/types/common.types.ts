export type ApiResponse<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
  error?: string;
};


export type DateRange = {
  startDate: string;
  endDate: string;
};

export type Period = 'week' | 'month' | 'year' | 'all';
