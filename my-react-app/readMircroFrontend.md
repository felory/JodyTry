## 微前端前置知识：web component : shadowDom

=======
1. npm i typescript -g
2. tsc --init 生成了配置文件tsconfig.json
3. new一个index.ts文件，然后在终端输入tcs -w 会实时编译这个index.ts生成index.js。
4. 在index.html里引入这个index.js
5. 在index.ts里
window.onload = ()=>{ 
    class TryWebC extends HTMLElement{
        constructor(){ //1.初始化一个web components
            super();
        }
    }

    window.customElements.define('try-webc',TryWebC) //2.挂载完成
}

6. 直接在index.html里使用: //3.直接使用，解析成一个组件
<body>
    <try-webc></try-webc>

    <template id="trywebc"> <!--给定id绑定到web components-->
        <style>
            div{background: pink;}
        </style>
        <div>I'm div inside template</div>
    </template>
     
</body>

7. 在index.ts里，创建shadowDOM

8. 



