import React from 'react'
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <RotatingLines
      strokeColor="black"
      strokeWidth="5"
      animationDuration="0.85"
      width="20"
      visible={true}
    />
  );
}

export default Loader;