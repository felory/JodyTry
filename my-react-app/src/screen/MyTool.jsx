import React, { forwardRef, use } from 'react'
import { useContext } from 'react';
import { LevelContext } from '../LevelContext.js';

// function MyTool() {
//   return (
//     <div>MyTool</div>
//   )
// }

const MyTool = forwardRef((props, ref) => {
  const level = useContext(LevelContext);
  console.log("in MyTool, LevelContext:", level);
  return <div ref={ref}>MyTool内容</div>;
});

export default MyTool;