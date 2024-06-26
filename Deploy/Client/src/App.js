import "./App.css";
import CartProvider from "./components/ContentReducer";
import About from "./screens/About";
import Home from "./screens/Home";
import Login from "./screens/Login";
import MyOrder from "./screens/MyOrder";
import Signup from "./screens/Signup";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/myOrders" element={<MyOrder/>}/>
          <Route exact path="/about" element={<About/>}/>
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
