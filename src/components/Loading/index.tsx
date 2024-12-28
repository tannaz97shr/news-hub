import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Loading: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-blackWithOpacity dark:bg-whiteWithOpacity flex justify-center items-center z-[60]">
      <div className="border-t-4 border-b-4 border-white w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
