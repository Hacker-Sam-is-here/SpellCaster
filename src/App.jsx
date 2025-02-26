import Mainpage from "./components/mainpage"
import Navbar from "./components/navbar"
import Store from './store';
function App() {

  return (
    <Store>
      <div className="small-screen text-center text-5xl font-bold">Screen width is too small</div>
      <div className="app">
        <Navbar/>
        <div className="content">
          <Mainpage/>
        </div>
      </div>
    </Store>
  )
}

export default App
