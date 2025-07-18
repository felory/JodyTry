import { createRef, useState } from 'react';
import './App.css';
import GlobalContext from './globalContext';

function Home() {

    const pwdAllStates = [
        {
            type: 'password',
            tips: 'display password',
        },
        {
            type: 'text',
            tips: 'hide password',
        },
    ]

    //M ==> V
    const [state1, setState1] = useState(pwdAllStates[0]);
    //V ==> M
    const inputeEle = createRef();

    function onToggle() {
        console.log("onSubmit:", inputeEle.current);
        if (inputeEle.current === pwdAllStates[0].type) {
            setState1(pwdAllStates[1])
        } else {
            setState1(pwdAllStates[0])
        }
    }

    ////context //
    const sharedData = {
        num: 123,
    }

    /**
     * 使用组件<GlobalContext.Provider，定义共享范围。
     * 这样Header,Footer都可以拿到数据。
     * 使用value传递内容。
     * */

    return (
        <GlobalContext.Provider value={sharedData}>
            <div>{ props.msg }</div>
            <input type={ state1.type } ref={inputeEle} onChange={onInputChange()} />
            <button onClick={() => onToggle()}></button>
            <Header></Header>
            
            <Footer></Footer>
        </GlobalContext.Provider>
    );
}

export default Home;