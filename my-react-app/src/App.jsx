import { useState, createRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import './App.css';
import Home from './Home';

function App() {
  const [count, setCount] = useState(0);

  const [msg, setMsg] = useState('');

  const inputeEle = createRef();
  const homeCompInstanceRef = createRef();

  function fn1() {
    //bind ref to DOM or CompInstance.
    console.log("inputeEle:", inputeEle.current);
    console.log("homeCompInstanceRef:", homeCompInstanceRef.current);
  }

  function onInputChange() {
    console.log("onInputChange:", inputeEle.current?.value);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <input type="text" ref={inputeEle} onChange={onInputChange()}/>
      <Home ref={homeCompInstanceRef} msg={ msg }></Home>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p onClick={fn1()}>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
