import './App.css';
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { memo, useState ,useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import constants from './constants';
import PRODUCTDATA from './API/Product';

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

function App(props) {
  const dispatch=useDispatch();
  useEffect(() => {
    PRODUCTDATA.fetchProduct().then((res) => {
      if(res.status===200){
      dispatch({
        type: constants("product").reducers.product.AddToProducts,
        payload: { data: res.data },
      });
    }
    else{
      toast.error('Server Side Error')
    }
  });
    
  },[dispatch])

//  const {products}=props;

const products=[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 100,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": ["https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg","https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"],
    "size":['S','M','L'],
    "color":['red','blue','green','yellow'],
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 200,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": ["https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg","https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"],
    "size":['S','L'],
    "color":['gold','silver','black'],
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  },
  // {
  //   "id": 3,
  //   "title": "Mens Cotton Jacket",
  //   "price": 500,
  //   "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
  //   "category": "men's clothing",
  //   "size":['S','M'],
  //   "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 4.7,
  //     "count": 500
  //   }
  // },
  // {
  //   "id": 4,
  //   "title": "Mens Casual Slim Fit",
  //   "price": 150,
  //   "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
  //   "category": "men's clothing",
  //   "size":['L'],
  //   "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  //   "rating": {
  //     "rate": 2.1,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 5,
  //   "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  //   "price": 695,
  //   "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
  //   "category": "jewelery",
  //   "size":['L'],
  //   "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 4.6,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 6,
  //   "title": "Solid Gold Petite Micropave ",
  //   "price": 168,
  //   "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
  //   "category": "jewelery",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 3.9,
  //     "count": 70
  //   }
  // },
  // {
  //   "id": 7,
  //   "title": "White Gold Plated Princess",
  //   "price": 200,
  //   "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
  //   "category": "jewelery",
  //   "size":['M','L'],
  //   "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 3,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 8,
  //   "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
  //   "price": 100,
  //   "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
  //   "category": "jewelery",
  //   "size":['S','L'],
  //   "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 1.9,
  //     "count": 100
  //   }
  // },
  // {
  //   "id": 9,
  //   "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
  //   "price": 200,
  //   "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
  //   "category": "electronics",
  //   "size":['S','M'],
  //   "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  //   "rating": {
  //     "rate": 3.3,
  //     "count": 203
  //   }
  // },
  // {
  //   "id": 10,
  //   "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
  //   "price": 109,
  //   "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
  //   "category": "electronics",
  //   "size":['S','L'],
  //   "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 2.9,
  //     "count": 470
  //   }
  // },
  // {
  //   "id": 11,
  //   "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
  //   "price": 109,
  //   "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
  //   "category": "electronics",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 4.8,
  //     "count": 319
  //   }
  // },
  // {
  //   "id": 12,
  //   "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
  //   "price": 114,
  //   "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
  //   "category": "electronics",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 4.8,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 13,
  //   "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
  //   "price": 599,
  //   "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
  //   "category": "electronics",
  //   "size":['S'],
  //   "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 2.9,
  //     "count": 250
  //   }
  // },
  // {
  //   "id": 14,
  //   "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA)  Super Ultrawide Screen QLED ",
  //   "price": 900,
  //   "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
  //   "category": "electronics",
  //   "size":['M'],
  //   "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 2.2,
  //     "count": 140
  //   }
  // },
  // {
  //   "id": 15,
  //   "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
  //   "price": 300,
  //   "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
  //   "category": "women's clothing",
  //   "size":['L'],
  //   "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 2.6,
  //     "count": 235
  //   }
  // },
  // {
  //   "id": 16,
  //   "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
  //   "price": 600,
  //   "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
  //   "category": "women's clothing",
  //   "size":['S','L'],
  //   "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  //   "rating": {
  //     "rate": 2.9,
  //     "count": 340
  //   }
  // },
  // {
  //   "id": 17,
  //   "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
  //   "price": 400,
  //   "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
  //   "category": "women's clothing",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  //   "rating": {
  //     "rate": 3.8,
  //     "count": 679
  //   }
  // },
  // {
  //   "id": 18,
  //   "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
  //   "price": 300,
  //   "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
  //   "category": "women's clothing",
  //   "size":['M','L'],
  //   "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  //   "rating": {
  //     "rate": 4.7,
  //     "count": 130
  //   }
  // },
  // {
  //   "id": 19,
  //   "title": "Opna Women's Short Sleeve Moisture",
  //   "price": 200,
  //   "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
  //   "category": "women's clothing",
  //   "size":['S'],
  //   "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 4.5,
  //     "count": 146
  //   }
  // },
  // {
  //   "id": 20,
  //   "title": "DANVOUY Womens T Shirt Casual Cotton Short",
  //   "price": 100,
  //   "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
  //   "category": "women's clothing",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 3.6,
  //     "count": 145
  //   }
  // },
  // {
  //   "id": 21,
  //   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //   "price": 100,
  //   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //   "category": "men's clothing",
  //   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //   "size":['S','M','L'],
  //   "rating": {
  //     "rate": 3.9,
  //     "count": 120
  //   }
  // },
  // {
  //   "id": 22,
  //   "title": "Mens Casual Premium Slim Fit T-Shirts ",
  //   "price": 200,
  //   "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  //   "category": "men's clothing",
  //   "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  //   "size":['S','L'],
  //   "rating": {
  //     "rate": 4.1,
  //     "count": 259
  //   }
  // },
  // {
  //   "id": 23,
  //   "title": "Mens Cotton Jacket",
  //   "price": 500,
  //   "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
  //   "category": "men's clothing",
  //   "size":['S','M'],
  //   "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 4.7,
  //     "count": 500
  //   }
  // },
  // {
  //   "id": 24,
  //   "title": "Mens Casual Slim Fit",
  //   "price": 150,
  //   "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
  //   "category": "men's clothing",
  //   "size":['L'],
  //   "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  //   "rating": {
  //     "rate": 2.1,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 25,
  //   "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  //   "price": 695,
  //   "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
  //   "category": "jewelery",
  //   "size":['L'],
  //   "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 4.6,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 26,
  //   "title": "Solid Gold Petite Micropave ",
  //   "price": 168,
  //   "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
  //   "category": "jewelery",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 3.9,
  //     "count": 70
  //   }
  // },
  // {
  //   "id": 27,
  //   "title": "White Gold Plated Princess",
  //   "price": 200,
  //   "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
  //   "category": "jewelery",
  //   "size":['M','L'],
  //   "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 3,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 28,
  //   "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
  //   "price": 100,
  //   "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
  //   "category": "jewelery",
  //   "size":['S','L'],
  //   "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 1.9,
  //     "count": 100
  //   }
  // },
  // {
  //   "id": 29,
  //   "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
  //   "price": 200,
  //   "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
  //   "category": "electronics",
  //   "size":['S','M'],
  //   "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  //   "rating": {
  //     "rate": 3.3,
  //     "count": 203
  //   }
  // },
  // {
  //   "id": 30,
  //   "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
  //   "price": 109,
  //   "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
  //   "category": "electronics",
  //   "size":['S','L'],
  //   "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 2.9,
  //     "count": 470
  //   }
  // },
  // {
  //   "id": 31,
  //   "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
  //   "price": 109,
  //   "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
  //   "category": "electronics",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 4.8,
  //     "count": 319
  //   }
  // },
  // {
  //   "id": 32,
  //   "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
  //   "price": 114,
  //   "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
  //   "category": "electronics",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 4.8,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 33,
  //   "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
  //   "price": 599,
  //   "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
  //   "category": "electronics",
  //   "size":['S'],
  //   "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 2.9,
  //     "count": 250
  //   }
  // },
  // {
  //   "id": 34,
  //   "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA)  Super Ultrawide Screen QLED ",
  //   "price": 900,
  //   "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
  //   "category": "electronics",
  //   "size":['M'],
  //   "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 2.2,
  //     "count": 140
  //   }
  // },
  // {
  //   "id": 35,
  //   "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
  //   "price": 300,
  //   "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
  //   "category": "women's clothing",
  //   "size":['L'],
  //   "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 2.6,
  //     "count": 235
  //   }
  // },
  // {
  //   "id": 36,
  //   "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
  //   "price": 600,
  //   "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
  //   "category": "women's clothing",
  //   "size":['S','L'],
  //   "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  //   "rating": {
  //     "rate": 2.9,
  //     "count": 340
  //   }
  // },
  // {
  //   "id": 37,
  //   "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
  //   "price": 400,
  //   "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
  //   "category": "women's clothing",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  //   "rating": {
  //     "rate": 3.8,
  //     "count": 679
  //   }
  // },
  // {
  //   "id": 38,
  //   "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
  //   "price": 300,
  //   "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
  //   "category": "women's clothing",
  //   "size":['M','L'],
  //   "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  //   "rating": {
  //     "rate": 4.7,
  //     "count": 130
  //   }
  // },
  // {
  //   "id": 39,
  //   "title": "Opna Women's Short Sleeve Moisture",
  //   "price": 200,
  //   "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
  //   "category": "women's clothing",
  //   "size":['S'],
  //   "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 4.5,
  //     "count": 146
  //   }
  // },
  // {
  //   "id": 40,
  //   "title": "DANVOUY Womens T Shirt Casual Cotton Short",
  //   "price": 100,
  //   "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
  //   "category": "women's clothing",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 3.6,
  //     "count": 145
  //   }
  // },
  // {
  //   "id": 41,
  //   "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  //   "price": 100,
  //   "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  //   "category": "men's clothing",
  //   "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  //   "size":['S','M','L'],
  //   "rating": {
  //     "rate": 3.9,
  //     "count": 120
  //   }
  // },
  // {
  //   "id": 42,
  //   "title": "Mens Casual Premium Slim Fit T-Shirts ",
  //   "price": 200,
  //   "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  //   "category": "men's clothing",
  //   "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  //   "size":['S','L'],
  //   "rating": {
  //     "rate": 4.1,
  //     "count": 259
  //   }
  // },
  // {
  //   "id": 43,
  //   "title": "Mens Cotton Jacket",
  //   "price": 500,
  //   "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
  //   "category": "men's clothing",
  //   "size":['S','M'],
  //   "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 4.7,
  //     "count": 500
  //   }
  // },
  // {
  //   "id": 44,
  //   "title": "Mens Casual Slim Fit",
  //   "price": 150,
  //   "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
  //   "category": "men's clothing",
  //   "size":['L'],
  //   "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
  //   "rating": {
  //     "rate": 2.1,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 45,
  //   "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  //   "price": 695,
  //   "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
  //   "category": "jewelery",
  //   "size":['L'],
  //   "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 4.6,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 46,
  //   "title": "Solid Gold Petite Micropave ",
  //   "price": 168,
  //   "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
  //   "category": "jewelery",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 3.9,
  //     "count": 70
  //   }
  // },
  // {
  //   "id": 47,
  //   "title": "White Gold Plated Princess",
  //   "price": 200,
  //   "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
  //   "category": "jewelery",
  //   "size":['M','L'],
  //   "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 3,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 48,
  //   "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
  //   "price": 100,
  //   "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
  //   "category": "jewelery",
  //   "size":['S','L'],
  //   "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
  //   "rating": {
  //     "rate": 1.9,
  //     "count": 100
  //   }
  // },
  // {
  //   "id": 49,
  //   "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
  //   "price": 200,
  //   "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
  //   "category": "electronics",
  //   "size":['S','M'],
  //   "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
  //   "rating": {
  //     "rate": 3.3,
  //     "count": 203
  //   }
  // },
  // {
  //   "id": 50,
  //   "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
  //   "price": 109,
  //   "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
  //   "category": "electronics",
  //   "size":['S','L'],
  //   "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 2.9,
  //     "count": 470
  //   }
  // },
  // {
  //   "id": 51,
  //   "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
  //   "price": 109,
  //   "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
  //   "category": "electronics",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 4.8,
  //     "count": 319
  //   }
  // },
  // {
  //   "id": 52,
  //   "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
  //   "price": 114,
  //   "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
  //   "category": "electronics",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 4.8,
  //     "count": 400
  //   }
  // },
  // {
  //   "id": 53,
  //   "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
  //   "price": 599,
  //   "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
  //   "category": "electronics",
  //   "size":['S'],
  //   "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 2.9,
  //     "count": 250
  //   }
  // },
  // {
  //   "id": 54,
  //   "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA)  Super Ultrawide Screen QLED ",
  //   "price": 900,
  //   "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
  //   "category": "electronics",
  //   "size":['M'],
  //   "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
  //   "rating": {
  //     "rate": 2.2,
  //     "count": 140
  //   }
  // },
  // {
  //   "id": 55,
  //   "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
  //   "price": 300,
  //   "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
  //   "category": "women's clothing",
  //   "size":['L'],
  //   "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 2.6,
  //     "count": 235
  //   }
  // },
  // {
  //   "id": 56,
  //   "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
  //   "price": 600,
  //   "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
  //   "category": "women's clothing",
  //   "size":['S','L'],
  //   "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  //   "rating": {
  //     "rate": 2.9,
  //     "count": 340
  //   }
  // },
  // {
  //   "id": 57,
  //   "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
  //   "price": 400,
  //   "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
  //   "category": "women's clothing",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  //   "rating": {
  //     "rate": 3.8,
  //     "count": 679
  //   }
  // },
  // {
  //   "id": 58,
  //   "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
  //   "price": 300,
  //   "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
  //   "category": "women's clothing",
  //   "size":['M','L'],
  //   "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
  //   "rating": {
  //     "rate": 4.7,
  //     "count": 130
  //   }
  // },
  // {
  //   "id": 59,
  //   "title": "Opna Women's Short Sleeve Moisture",
  //   "price": 200,
  //   "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
  //   "category": "women's clothing",
  //   "size":['S'],
  //   "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 4.5,
  //     "count": 146
  //   }
  // },
  // {
  //   "id": 60,
  //   "title": "DANVOUY Womens T Shirt Casual Cotton Short",
  //   "price": 100,
  //   "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
  //   "category": "women's clothing",
  //   "size":['S','M','L'],
  //   "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
  //   "rating": {
  //     "rate": 3.6,
  //     "count": 145
  //   }
  // }
]


  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");
  
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  
  const filteredItems = products.filter(
      (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 
    );
    
    // ----------- Radio Filtering -----------
    const handleChange = (event) => {
      setSelectedCategory(event.target.value);
    };
    
    const handleChange2 = (event) => {
      setSelectedPrice(parseInt(event.target.value));
    };
    
    const handleChange3 = (event) => {
      setSelectedSize(event.target.value);
    };
    
  // ------------ Button Filtering -----------
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

 
  function filteredData(products, selectedCategory,selectedPrice,selectedSize, query) {
    let filteredProducts = products;

    // Filtering Input Items
    if (query) {
      filteredProducts = filteredItems;
      return filteredProducts;
    }

    //1. Applying selectedCategory filter
    
    if (selectedCategory){
      if (selectedPrice){
        if (selectedSize){
          filteredProducts = filteredProducts.filter(
            (element) =>
              element.category === selectedCategory &&
              element.price >= selectedPrice && (
              element.size[0] === selectedSize ||
              element.size[1] === selectedSize ||
              element.size[2] === selectedSize)
          );
          }
      else{
      filteredProducts = filteredProducts.filter(
        (element) =>
          element.category === selectedCategory &&
          element.price >= selectedPrice
      );
      }
    }
    if (selectedSize){
      if (selectedPrice){
        filteredProducts = filteredProducts.filter(
          (element) =>
            element.category === selectedCategory &&
            element.price >= selectedPrice && (
            element.size[0] === selectedSize ||
            element.size[1] === selectedSize ||
            element.size[2] === selectedSize)
        );
        }
    else{
    filteredProducts = filteredProducts.filter(
      (element) =>
        element.category === selectedCategory &&
        element.size >= selectedSize
    );
    }
  }
      else{
        filteredProducts = filteredProducts.filter(
          (element) =>
            element.category === selectedCategory 
        );
        }
    }
 
    //2. Applying selectedPrice filter

    if (selectedPrice){
      if (selectedCategory){
        if (selectedSize){
          filteredProducts = filteredProducts.filter(
            (element) =>
              element.price >= selectedPrice &&
              element.category === selectedCategory && (
              element.size[0] === selectedSize ||
              element.size[1] === selectedSize ||
              element.size[2] === selectedSize)
          );
          }
      else{
      filteredProducts = filteredProducts.filter(
        (element) =>
        element.price >= selectedPrice &&
          element.category === selectedCategory
          
      );
      }
    }
    if (selectedSize){
      if (selectedCategory){
        filteredProducts = filteredProducts.filter(
          (element) =>
          element.price >= selectedPrice &&
             (
            element.size[0] === selectedSize ||
            element.size[1] === selectedSize ||
            element.size[2] === selectedSize)
            && element.category === selectedCategory 
        );
        }
    else{
    filteredProducts = filteredProducts.filter(
      (element) =>
        element.price >= selectedPrice &&
        element.size >= selectedSize
    );
    }
  }
      else{
        filteredProducts = filteredProducts.filter(
          (element) =>
            element.price >= selectedPrice
        );
        }
    }

  //3. Applying selectedSize filter
    if (selectedSize){
      if (selectedCategory){
        if (selectedPrice){
          filteredProducts = filteredProducts.filter(
            (element) => 
               (
              element.size[0] === selectedSize ||
              element.size[1] === selectedSize ||
              element.size[2] === selectedSize)
              &&
              element.category === selectedCategory &&
              element.price >= selectedPrice
          );
          }
      else{
      filteredProducts = filteredProducts.filter(
        (element) =>
        element.size >= selectedSize &&
          element.category === selectedCategory
          
      );
      }
    }
    if (selectedPrice){
      if (selectedCategory){
        filteredProducts = filteredProducts.filter(
          (element) =>
          
             (
            element.size[0] === selectedSize ||
            element.size[1] === selectedSize ||
            element.size[2] === selectedSize)&& 
            element.price >= selectedPrice &&
            element.category === selectedCategory 
        );
        }
    else{
    filteredProducts = filteredProducts.filter(
      (element) =>
        
        element.size >= selectedSize
         && element.price >= selectedPrice
    );
    }
  }
      else{
        filteredProducts = filteredProducts.filter(
          (element) =>
            element.size>= selectedSize
        );
        }
    }
    
    return filteredProducts;
  }

  const result = filteredData(products, selectedCategory,selectedPrice,selectedSize, query);

  let logged_in=true;
  return (
    <>
    <Router>
      <Navbar handleInputChange={handleInputChange}/>
       <ToastContainer/>
        <Routes>
        <Route exact path="/" element={<Home handleClick={handleClick}/>}/>
        <Route exact path="/home" element={<Home handleClick={handleClick}/>}/>
          <Route exact path="/contact" element={<Contact />}/>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/shop" element={<Shop handleChange={handleChange}  handleChange3={handleChange3}  handleChange2={handleChange2} selectedCategory={selectedCategory} selectedPrice={selectedPrice} selectedSize={selectedSize} products={result}/>}/>
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

const mapStateToProps = (state) => ({
  products: state?.product?.Products,
});
export default connect(mapStateToProps)(memo(App));
