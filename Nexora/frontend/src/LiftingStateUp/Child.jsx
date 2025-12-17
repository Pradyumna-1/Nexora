// import React from "react";

// const Child = (props) => {
//   return (
//     <div>
//       <input
//         type="text"
//         className="border mt-2 "
//         onChange={(e) => props.setState(e.target.value)}
//       />
//       <p>
//         This is the state value inside Child input:
//         <strong>{props.name}</strong>
//       </p>
//     </div>
//   );
// };

// export default Child;



import React from 'react'

const Child = (props) => {
  return (
    <div>
      <input type="text" 
      placeholder='Write'
      onChange={(e)=>props.setState(e.target.value)} />
      <p>Dispaly the content:{props.name}</p>
    </div>
  )
}

export default Child