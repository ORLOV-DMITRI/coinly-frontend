import { useEffect } from 'react';
import { getScrollbarWidth } from '@/shared/utils/getScrollbarWidth';


export function useScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (isLocked) {
            const scrollbarWidth = getScrollbarWidth();

            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };
    }, [isLocked]);
}