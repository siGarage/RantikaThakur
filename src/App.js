import './App.css';
// Components
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

//Pages
import Contact from './Pages/Contact/Contact'
import Home from './Pages/Home/Home'
import Shop from './Pages/Shop/Shop'
import Product from './Pages/Product/Product';
import {BrowserRouter as Router,Routes,Route, useParams} from "react-router-dom";
function App() {
  console.log(useParams.id)
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/home" element={<Home />}/>
          <Route exact path="/contact" element={<Contact />}/>
          <Route exact path="/shop" element={<Shop />}/>
          {/* <Route exact path="/product" element={<Product/>}/> */}
          <Route exact path="/product/:id" element={<Product/>}/>
        </Routes>
        <Footer/>
    </Router>
    </>
  );
}

export default App;
