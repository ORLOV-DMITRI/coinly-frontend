import { useState, useEffect, useRef } from 'react';

export function useAsideVisibility() {
  const [isAsideVisible, setIsAsideVisible] = useState(true);
  const [hasSelectedItems, setHasSelectedItems] = useState(false);
  const selectedItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = selectedItemsRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {

        setIsAsideVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.9,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [hasSelectedItems]);

  const updateItemsPresence = (itemsCount: number) => {
    const hasItems = itemsCount > 0;
    if (hasItems !== hasSelectedItems) {
      setHasSelectedItems(hasItems);
    }
  };


  const shouldShowAside = hasSelectedItems && isAsideVisible;

  return {
    shouldShowAside,
    selectedItemsRef,
    updateItemsPresence
  };
}