import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/lib/auth/authService';
import type { UpdateSettingsDto } from '@/lib/types/api.types';
import toast from 'react-hot-toast';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSettingsDto) => authService.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['weekly-stats'] });
      toast.success('Настройки обновлены');
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Ошибка обновления настроек');
    },
  });
}
