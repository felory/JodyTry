import { useState, createRef, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import './App.css';
import Home from './screen/Home';
import BasicPage from './screen/BasicPage';
import Header from './screen/Header';
import Footer from './screen/Footer';
import { LevelContext } from './LevelContext';

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
      
      <Header level={1}></Header>
      <BasicPage level={1}></BasicPage>
      {/* <Home ref={homeCompInstanceRef} msg={msg}></Home> */}
      <Footer level={1}></Footer>
      
      
      <h1>Vite + React</h1>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <input type="text" ref={inputeEle} onChange={onInputChange()}/>

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
