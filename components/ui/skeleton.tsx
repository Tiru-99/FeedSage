
import React from 'react';



interface SkeletonProps {

  className?: string;

}



export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {

  return <div className={`bg-gray-300 animate-pulse ${className}`}></div>;

};
