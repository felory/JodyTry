import { useDeferredValue, useState } from "react";

export default function LongList() {
  const [input, setInput] = useState("");
  const deferredInput = useDeferredValue(input); // 延迟的 input

  const items = [];
  for (let i = 0; i < 10000; i++) {
    items.push(<div key={i}>{deferredInput}</div>); // 使用 deferredInput
  }

  return (
    <div> hello there is a long list:
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <div>{items}</div>
    </div>
  );
}