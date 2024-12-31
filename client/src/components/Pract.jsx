import React, { useState } from 'react';

const Pract = ({ ele, arr, ind, setRender }) => {
  const [isCheck, setIsCheck] = useState(false);

  const onClick = () => {
    const filterarr = arr.filter((item) => item != ele);
    console.log('render');
    setIsCheck((prev) => !prev);
    setRender(filterarr);
  };
  return (
    <div key={ele}>
      <input type="checkbox" onClick={() => setIsCheck((prev) => !prev)} />

      {ele}
      {isCheck && (
        <button onClick={() => onClick()} className="bg-red-500 p-2">
          X
        </button>
      )}
    </div>
  );
};

export default Pract;
