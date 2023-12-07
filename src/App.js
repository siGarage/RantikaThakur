import './App.css';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

//Pages
import Contact from './Pages/Contact/Contact'
import Home from './Pages/Home/Home'
import Shop from './Pages/Shop/Shop'
import Product from './Pages/Product/Product';
import Cart from './Pages/Cart/Cart'

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Navbar/>
   <ToastContainer/>
        <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/home" element={<Home />}/>
          <Route exact path="/contact" element={<Contact />}/>
          <Route exact path="/shop" element={<Shop />}/>
          {/* <Route exact path="/product" element={<Product/>}/> */}
          <Route exact path="/product/:id" element={<Product/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
        </Routes>
        <Footer/>
        <ToastContainer />
    </Router>
    </>
  );
}

export default App;
