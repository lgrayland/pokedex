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
      console.log("Observing intersection", entries);
      console.log("is intersecting:", entries[0].isIntersecting);
      if (entries[0].isIntersecting && !isLoading) {
        console.log("Intersected - loading more");
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
