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
    <div className="">
      {children}
      {isLoading && loader}
      <div ref={targetRef}></div>
    </div>
  );
};

export default InfiniteScroller;
