// import { useEffect, useRef, useState } from 'react';

// const Prac = () => {
//   const [len, setLen] = useState(0);
//   const st = useRef([]);
//   const [render, setRender] = useState(false);
//   const handleClick = (data) => {
//     if (!st.current.includes(data)) {
//       st.current.push(data);
//     }
//     console.log(st.current);
//     setRender((prev) => !prev);
//   };

//   const pop = useRef(false);
//   if (st.current.length == len && st.current.length != 0) {
//     console.log('Flase');
//     pop.current = true;
//   } else if (st.current.length == 0) {
//     pop.current = false;
//   }
//   useEffect(() => {
//     if (pop.current) {
//       const interval = setInterval(() => {
//         if (st.current.length > 0) {
//           st.current.pop();
//           setRender((prev) => !prev); // Trigger a re-render
//         } else {
//           clearInterval(interval); // Stop the interval when the array is empty
//         }
//       }, 1000);
//       return () => clearInterval(interval); // Cleanup on unmount
//     }
//   }, [st.current.length]);
//   return (
//     <div className="min-h-screen flex flex-col gap-10 justify-center items-center">
//       <input
//         value={len}
//         onChange={(e) => setLen(e.target.value)}
//         className="border-2 p-5"
//       />
//       <div className="grid grid-cols-3 gap-5">
//         {Array.from({ length: len })
//           .fill(1)
//           .map((e, ind) => {
//             return (
//               <div
//                 key={ind + 1}
//                 className={`${
//                   st.current.includes(ind + 1) ? 'bg-green-700' : 'bg-red-700'
//                 } p-10`}
//                 onClick={() => handleClick(ind + 1)}
//               >
//                 {ind + 1}
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default Prac;

import React, { useState } from 'react';
import Pract from './Pract';

const Prac = () => {
  const [render, setRender] = useState(['a', 'b', 'c']);

  return (
    <div>
      {render.map((ele, ind) => (
        <Pract ele={ele} key={ele} arr={render} setRender={setRender} />
      ))}
    </div>
  );
};

export default Prac;
