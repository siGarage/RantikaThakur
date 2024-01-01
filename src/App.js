import './App.css';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { memo} from 'react';
import { connect} from 'react-redux';
import ScrollToTop from './ScrollToTop';
import 'react-multi-carousel/lib/styles.css';


// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import FooterNavbar from './Components/FooterNavbar'

//Pages
import Contact from './Pages/Contact/Contact'
import Home from './Pages/Home/Home'
import Shop from './Pages/Shop/Shop'
import About from './Pages/About/About';
import ShopId from './Pages/Shop/ShopId'
import Custom from './Pages/CustomSize/Custom'
import Success from './Pages/Success/Success'
import Fail from './Pages/Success/Fail'

import Wishlist from './Pages/Wishlist/Wishlist'
import Profile from './Pages/Profile/Profile'
import Cart from './Pages/Cart/Cart'
import Order from './Pages/Order/Order';




import Privacy from './Pages/PrivacyPolicy/Privacy'
import ExchangePolicy from './Pages/ExchangePolicy/ExchangePolicy';
import Terms from './Pages/TermsCondition/Terms';


import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';

import {BrowserRouter as Router,Routes,Route} from "react-router-dom";


function App(props) {
  const {logged_in}=props;

  


  return (
    <div >
    <Router>
      <ScrollToTop/>
      <Navbar/>
       <ToastContainer/>
    
        <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/contact" element={<Contact />}/>
          <Route exact path="/customsize" element={<Custom />}/>
          <Route exact path="/about" element={<About/>}/>
          
          <Route exact path="/shop" element={<Shop/>}/>
          <Route exact path="/shop/:shopId" element={<ShopId/>}/>
         
          <Route exact path="/success" element={<Success/>}/>
          <Route exact path="/fail" element={<Fail/>}/>
          
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

          
          <Route exact path="/privacypolicy" element={<Privacy/>}/>
          <Route exact path="/exchangepolicy" element={<ExchangePolicy/>}/>
          <Route exact path="/termsandcondition" element={<Terms/>}/>
          <Route exact path="*" element={<Home/>}/>
        </Routes>
        <Footer/>
        <FooterNavbar/>
    </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.Products.data,
  logged_in:state.auth.logged_in,
});
export default connect(mapStateToProps)(memo(App));
