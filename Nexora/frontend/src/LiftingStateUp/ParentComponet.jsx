// import React, { useState } from "react";
// import Child from "./Child";
// import Child2 from "./Child2";

// const ParentComponet = () => {
//   let [state, setState] = useState("");
//   return (
//     <div>
//       <Child setState={setState} name={state} />
//       <p>
//         I am a Parent Component:----|-- <strong>{state}</strong>
//       </p>
//       <Child2 setState={setState} name={state} />
//     </div>
//   );
// };

// export default ParentComponet;



import React, { useState } from 'react'
import Child from "./Child";
import Child2 from "./Child2";

const ParentComponet = () => {
  let [state,setState]=useState("")
  return (
   
    <>
    <Child setState={setState} name={state}/>
    <Child2 setState={setState} name={state}/>
    <p> I am Parent Component<strong>{state}</strong></p>
    </>
  )
}

export default ParentComponet