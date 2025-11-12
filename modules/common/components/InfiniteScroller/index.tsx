import { useInfiniteScroller } from "./hooks/useInfiniteScroller";

const InfiniteScroller = ({
  children,
  callback,
  isLoading,
  loader,
}: {
  children: React.ReactNode;
  callback: () => void;
  isLoading: boolean;
  loader: React.ReactNode;
}) => {
  const { targetRef } = useInfiniteScroller({
    callback,
    isLoading,
  });

  return (
    <div>
      {children}
      {isLoading && loader}
      <div id="infinite-scroll-target" ref={targetRef}></div>
    </div>
  );
};

export default InfiniteScroller;
