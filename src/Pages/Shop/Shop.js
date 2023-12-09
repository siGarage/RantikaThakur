import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import { connect, useDispatch } from 'react-redux';
import constants from '../../constants';
import PRODUCTDATA from '../../API/Product'
import { toast } from 'react-toastify';

function Shop(props) {
  let{products}=props;
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

  

  const trim=(string)=>{
    return string.slice(0,25)
   }
  return (
    <>
    <section className='Shop' >
     <div className='category'>
      <div style={{margin:'10px 0px'}}>
        <div style={{fontWeight:'800'}}>Category</div>
        <div>Shirts</div>
        <div>Tops</div>
        <div>Co-ordinates</div>
        <div>Dresses</div>
        <div>Kaaftans</div>
        <div>Skirts</div>
        <div>Pants</div>
        <div>Accessories</div>
        <div>Indian Wear</div>
      </div>
      <div style={{margin:'10px 0px'}}>
        <div style={{fontWeight:'800'}}>Prices</div>
        <div>Shirts</div>
        <div>Tops</div>
        <div>Co-ordinates</div>
        <div>Dresses</div>
      </div>
      <div style={{margin:'10px 0px'}}>
        <div style={{fontWeight:'800'}}>Size</div>
        <div>Shirts</div>
        <div>Tops</div>
        <div>Co-ordinates</div>
        <div>Dresses</div>
      </div>
     </div>


    <div className='container' style={{width:'80%'}}>
    <div className="row" >
   

   {products.map((element)=> {return <Link onClick={()=>{window.scrollTo(0,0)}} to={`/product/${element.id}`} className="col-md-4 my-3   Product-Small-Cards" key={element.id} >
   <div >
    <div className='Card'><img src={element.image} alt='ProductImage' style={{height:'258px',width:'80%'}}/> 
    <div>
        <div className='Card-Title'>{trim(element.title)}...</div>
        <div className='Card-Description'>Rs. {element.price}</div>
    </div>
    <div className='Card-Body-Color'>
    <div className='Card-Body-Color-Box1' >Available Colors</div>
    
    <div className='Card-Body-Color-Box2'>
    <div  className='Card-Body-Color-Box2-InnerBox' style={{backgroundColor:'red',margin:'0px 5px 0px 0px'}}></div>
    <div  className='Card-Body-Color-Box2-InnerBox' style={{backgroundColor:'blue',margin:'0px 5px'}}></div>
    <div  className='Card-Body-Color-Box2-InnerBox' style={{backgroundColor:'green',margin:'0px 5px'}}></div>
    <div  className='Card-Body-Color-Box2-InnerBox' style={{backgroundColor:'yellow',margin:'0px 5px'}}></div>
    </div>
    
    <div>
    
    </div>
    </div>
    </div>
    
    </div>
    </Link>}
   )}
    
    </div>
    </div>
    </section>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state?.product?.Products,
});
export default connect(mapStateToProps)(memo(Shop));
