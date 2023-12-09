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
import Profile from './Pages/Profile/Profile'
import Login from './Pages/Login/Login';
import Order from './Pages/Order/Order';
import SignUp from './Pages/SignUp/SignUp';
import About from './Pages/About/About';
import Wishlist from './Pages/Wishlist/Wishlist'


import {BrowserRouter as Router,Routes,Route} from "react-router-dom";


function App() {
  let logged_in=true;
  return (
    <>
    <Router>
      <Navbar/>
       <ToastContainer/>
        <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/home" element={<Home />}/>
          <Route exact path="/contact" element={<Contact />}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/shop" element={<Shop />}/>
          {/* <Route exact path="/product" element={<Product/>}/> */}
          <Route exact path="/product/:id" element={<Product/>}/>
         
          
          
          {logged_in?<>
          <Route exact path="/wishlist" element={<Wishlist/>}/>
          <Route exact path="/profile" element={<Profile/>}/>
          <Route exact path="/order" element={<Order/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          </>:
          <>
          <Route exact path="/wishlist" element={<Login/>}/>
          <Route exact path="/profile" element={<Login/>}/>
          <Route exact path="/order" element={<Login/>}/>
          <Route exact path="/cart" element={<Login/>}/>
          </>
          }


          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="*" element={<Home/>}/>
        </Routes>
        <Footer/>
    </Router>
    </>
  );
}

export default App;
