import React, { forwardRef } from 'react'

// function MyTool() {
//   return (
//     <div>MyTool</div>
//   )
// }

const MyTool = forwardRef((props, ref) => {
  return <div ref={ref}>MyTool内容</div>;
});

export default MyTool;