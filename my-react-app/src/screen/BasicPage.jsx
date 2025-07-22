import React, {createRef, createState, useRef, useState, useEffect} from 'react'; //加了这一行，在低版本react15中，返回值才会被Babel转换成React.CreateElement。
import MyTool from './MyTool';
import TodoList from '../components/todolist/TodoList';


function BasicPage() {
    ////////////(1)ref bind to DOM or CompInstance
    const inputBoxRef = createRef(); //bind to DOM
    const myToolRef = useRef();  //bind to CompInstance
    function onLogNow() {
        console.log("inputBoxRef current => focus on .value", inputBoxRef.current);
        console.log("myToolRef current:", myToolRef.current);
    }

    useEffect(() => {
        inputBoxRef.current.focus(); // 组件挂载后聚焦
    }, []);

    ////////////(2)state
    const pwdState1 = {
        type: 'text',
        tips: 'hide password',
    };
    const pwdState2 = {
        type: 'password',
        tips: 'display password',
    };
    const [pwdState, setPwdState] = useState(pwdState2); //bind to state, useState() is a hook, only available in function comp.
    function onToggleDisplayPwd() {
        if (pwdState.type === pwdState1.type) {
            setPwdState(pwdState2);
        } else {
            setPwdState(pwdState1);
        }
    }

   
    ///////////(3)props
    //props are passed from parent to child, so no need to define here.

    return (<>
        <h6>Hello~ This is function comp.</h6> 
        <button onClick={onLogNow}>Print Log</button>


        <input type="text" ref={inputBoxRef} onChange={() => {
            console.log("onInputChange=>:", inputBoxRef.current?.value);
        }} />
        <MyTool ref={myToolRef}></MyTool>

        <TodoList></TodoList>

        <input type={pwdState.type} />
        <button onClick={onToggleDisplayPwd}>{pwdState.tips}</button>
        </>
    ) //will be converted by Babel to React.CreateElement() when it's lower version.
}

export default BasicPage;