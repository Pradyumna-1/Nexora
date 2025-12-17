import React, { useState } from "react";

const CustomHooks = () => {
  let [state, setState] = useState(0);
  let inc = () => {
    setState(state + 1);
  };
  let dec = () => {
    setState(state - 1);
  };
  return { state, inc, dec };
};

export default CustomHooks;
