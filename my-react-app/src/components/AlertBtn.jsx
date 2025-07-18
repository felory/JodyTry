import React from 'react';

function AlertBtn() {
    const [userId, setUser] = React.useState(null);

    function openModal(event) { //不是mouseEvent
        //SyntheticBaseEvent是跨浏览器的合成事件。
        alert('This is an alert from AlertBtn component!')
    } 

    return (
        <>
            <button onClick={openModal}>login1</button>
            <button onClick={(event) => openModal(event)}>login2</button>
        </>
    )
}

export default AlertBtn;
