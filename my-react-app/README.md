## start
cd my-react-app
npm install
npm run dev

## page
<PageLayout>

  <NavigationHeader>
    <SearchBar />
    <Link to="/docs">文档</Link>
  </NavigationHeader>

  <Sidebar />

  <PageContent>
    <TableOfContents />
    <DocumentationText />
  </PageContent>

</PageLayout>

## 定义组件（不可在组件A中，嵌套定义另一个组件B）
定义组件（大写），并导出
(1)一个文件，有且仅有一个默认导出：
export default function Home(){ return (<div></div>)}
then can 
import Home from '/home.js';

(2)导出其他方法：
export function Home(){}
then 
import {Home} from 'home.js'

## 使用组件不 （可在组件A中，渲染另一个组件B） 通过props传递给子comp。
## 〈section〉是小写的，所以react知道这是 HTML 标签。


## jsx常与react一起使用，但也可以单独使用。
JSX 是一种语法扩展，而 React 则是一个 JavaScript 的库。
