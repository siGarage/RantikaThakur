import { useEffect, useState } from 'react';
import './Product.css';
import {toast} from 'react-toastify'
import { useParams } from 'react-router-dom';
import constants from '../../constants';
import { useDispatch } from 'react-redux';


import YouMayLike from '../YouMayLike/YouMayLike'
function Product(props) {
  const dispatch = useDispatch();
  const {id}= useParams()
  let [product,setProduct]=useState({});
 
  useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
      },[id])
  

      const AddToCart=(array)=>{
        dispatch({
          type: constants("cart").reducers.cart.AddToCart,
          payload: { data: array },
        })
        toast.success('Product Added To Cart');
      }
  return (
    <>
  <div className='ProductDescriptionBox' key={product.id}>
    <div className='ProductDescriptionBox1'>
        <div className='ProductDescriptionBox1-Box1'><img src={product.image} alt='ProductImage' style={{height:'510px',width:'60%'}}/></div>
        <div className='ProductDescriptionBox1-Box2'>
            <h5 style={{fontFamily:'Abhaya',fontWeight:'400',fontSize:'20px'}}>{product.title}</h5>
            <h6 style={{fontFamily:'Abhaya',fontWeight:'700',fontSize:'30px',color:'#737373'}}>Rs. {product.price}</h6>
            
            <p style={{fontFamily:'poppins',fontWeight:'300',fontSize:'15px',color:'#737373',margin:'53px 0px'}}>Size Guide</p>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div className='Size-Box'>S</div>
                <div className='Size-Box'>M</div>
                <div className='Size-Box'>L</div>
            </div>
            <p style={{fontFamily:'poppins',fontWeight:'300',fontSize:'15px',color:'#737373',margin:'50px 0px 10px 0px'}}>Available Colours</p>
            <div style={{display:'flex',flexDirection:'row'}}>
                <div className='Color-Box' style={{backgroundColor:'red'}}></div>
                <div className='Color-Box' style={{backgroundColor:'blue'}}></div>
                <div className='Color-Box' style={{backgroundColor:'green'}}></div>
            </div>

            <div style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',margin:'100px 0px 0px 0px'}}>
                <button style={{backgroundColor:"#E2BF44",width:'230px',height:'77px',border:'none',borderRadius:'72px',fontFamily:'Inter',color:'white',fontSize:'32px'}}>Buy Now</button>
                <button onClick={()=>{AddToCart(product)}} style={{backgroundColor:'white',width:'267px',height:'77px',border:'1px solid black',borderRadius:'72px',fontFamily:'Inter',color:'black',fontSize:'32px',cursor:'pointer'}}>Add To Cart</button>
            </div>
        </div>
        
    </div>
    <div className='ProductDescriptionBox2'>
        <div style={{width:'50%',padding:'0px 100px 0px 0px'}}>
        <h5 style={{width:'60%',margin:'46px 0px'}}>Product Description</h5>
        <p style={{width:'60%',fontSize:'12px',fontWeight:'300'}}>{product.description}</p>
        <h5 style={{width:'60%',margin:'59px 0px 30px 0px'}}>Product Details</h5>
        <h5 style={{width:'60%'}}>Size-</h5>
        <h5 style={{width:'60%'}}>Material-</h5>
        <h5 style={{width:'60%'}}>Product Code-</h5>
        </div>
    </div>
  </div>
  <YouMayLike/>
    </>
  );
}

export default Product;
