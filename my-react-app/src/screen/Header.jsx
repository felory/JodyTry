import GlobalContext from "../globalContext";
import AlertBtn from "../components/AlertBtn";

export default function Header() {
    
/**
 * 使用组件<GlobalContext.Consumer定义消费范围
 * 回调函数
 */
    return (
        <GlobalContext.Consumer>
            { 
                (context) => {
                    return (<>
                        <button onClick={() => { }}>
                            {/* num coming from Root: {context.num} */}
                        </button>
                        <AlertBtn></AlertBtn>
                    </>

                    )
                }
            }
        </GlobalContext.Consumer>
    )
}