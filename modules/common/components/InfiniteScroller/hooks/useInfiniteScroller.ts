import { useCallback, useEffect, useRef } from "react";

export const useInfiniteScroller = ({
  callback,
  isLoading,
}: {
  callback: () => void;
  isLoading: boolean;
}) => {
  const targetRef = useRef(null);

  const intersected = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading) {
        callback();
      }
    },
    [callback, isLoading]
  );

  useEffect(() => {
    const currentTarget = targetRef.current;
    const observer = new IntersectionObserver(intersected, undefined);

    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [intersected, targetRef]);

  return {
    targetRef,
  };
};
