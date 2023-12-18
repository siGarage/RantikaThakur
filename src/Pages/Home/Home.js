import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import Img from './IMG_9098.png'
import Marquee from "react-fast-marquee";
import { memo, useEffect } from 'react';
import PRODUCTDATA from '../../API/Product';
import { connect, useDispatch } from 'react-redux';
import constants from '../../constants';
import { toast } from 'react-toastify';

function Home(props) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {products}=props;
  useEffect(() => {
    if(products.length===0){
      PRODUCTDATA.fetchProduct().then((res)=>{
        if(res.status===200){
          dispatch({
            type:constants("product").reducers.product.AddToProducts,
            payload:{Products:res.data.data},
          });
        }
        else{
          toast.error('Server Side Error')
        }
      })
    }
      
    },[dispatch,products])
  
  
  
 
  
  return (
    <section className='Home'>
      <Marquee style={{margin:"100px 0px",fontSize:'50px',fontFamily:'Inter',fontWeight:'100'}}>
        <img style={{height:'50px',width:'50px'}} src={Img} alt='MarqueeImage'/>
      I can be a React component, multiple React components, or just some text.
      </Marquee>
      <div className='Home-Box1'>
        <div style={{fontFamily:'Poppins',fontWeight:'600',color:'white',fontSize:'64px'}}>Turn your Clutter into Points</div>
        <div style={{fontFamily:'Poppins',fontWeight:'400',color:'white',fontSize:'40px'}}>Snap, Buy, Repeat</div>
        <Link to='/shop'  style={{textDecoration:'none',width:'25%',height:'20%',fontFamily:'Poppins',fontWeight:'400',color:'black',fontSize:'48px',cursor:'pointer',borderRadius:'17px',margin:'10px 0px',border:'none',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>Buy Now</Link>
      </div>



      <div style={{width:'90%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',margin:'30px'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Abhaya Libre',fontSize:'32px',fontWeight:'400',color:'#757575',margin:'20px 0px'}}>BEST SELLERS</div>
      
      </div>





      <div style={{width:'90%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',margin:'30px'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Abhaya Libre',fontSize:'32px',fontWeight:'400',color:'#757575',margin:'20px 0px'}}>Shop By Category</div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
       <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'550px',margin:'20px 0px'}}>
          
          {/* clothesTypesBox1 */}
        <div className='clothesTypesBox1' style={{width:'49%',height:'100%'}}>
          <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Men's Clothes</div>
          <div></div>
          <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${'Shirts'}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</div>
        </div>

         {/* clothesTypesBox2 */}
        <div className='clothesTypesBox2' style={{width:'49%',height:'100%'}}>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Jewelery</div>
        <div></div>
        <Link to='/shop/category/Kaaftans'  className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'   value="jewelery" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</Link>
        </div>
        </div>

       {/* clothesTypesBox3 */}
       <div className='clothesTypesBox3' style={{width:'98%',height:'700px',margin:'20px 0px'}}>
       <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Electronics</div>
       <div></div>
       <Link to='/shop/category/Kaaftans'  className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'   value="electronics" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</Link>
       </div>
       <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'550px',margin:'20px 0px'}}>

        {/* clothesTypesBox4 */}
        <div className='clothesTypesBox1'>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Women's Clothes</div>
        <div></div>
        <Link to='/shop/category/Kaaftans' className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'   value="women's clothing" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</Link>
        </div>

        {/* clothesTypesBox5 */}
        <div className='clothesTypesBox2'>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>All</div>
        <div></div>
        <Link to='/shop'  className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'   value="" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</Link>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}


const mapStateToProps = (state) => ({
  products: state.product.Products
});
export default connect(mapStateToProps)(memo(Home));
