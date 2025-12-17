import React, { lazy, useState } from "react";
import First from "./First";
import Second from "./Second";
import { Suspense } from "react";
// import Lazy from "./MyLazy";

const Lazy = React.lazy(()=>import("./MyLazy"))
const ConditionalRendeing = () => {
  let [state, setState] = useState(false);

  return (
    <div>
      {state ? <First /> : <Second />}

      <button onClick={() => setState(prev=>!prev)}>Click me</button>
   <br />
   <br />
      <Suspense fallback="Loading........">
        {/* <MyLazy /> */}
        <Lazy/>
      </Suspense>

    </div>
  );
};

export default ConditionalRendeing;
