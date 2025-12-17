import React from "react";

import CustomHooks from "./CustomHooks";
const MyCustom = () => {
  let { state, inc, dec } = CustomHooks();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl text-center">{state}</h1>

      <button onClick={inc} className="border p-2 mr-2 text-center rounded">increment</button>
      <button onClick={dec} className="border p-2 mr-2 text-center rounded">decrement</button>
    </div>
  );
};

export default MyCustom;
