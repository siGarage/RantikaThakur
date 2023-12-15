import './Navbar.css'
import {Link,  useNavigate} from 'react-router-dom'
import CartImage from '../Images/Cart.png'
import HeartImage from '../Images/heart.png'
import ProfileImage from '../Images/profileicon.png'
import RantikaLogo from '../Images/Rantika.png'
import SearchImage from '../Images/Search.png'
import { connect } from 'react-redux'
import { memo, useMemo, useState } from 'react'

function Navbar(props) {
  const {products}=props;
 const navigate=useNavigate()
 const[query,setQuery]=useState('');
 const onChange=(e)=>{
  setQuery(e.target.value)
 
 }

 const filteredItems = products.filter(
  (element) => element.attributes.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 
);

 const filterData=useMemo(()=>{
  if(products.length>0)
  {
    if (query) 
    {
      
      const filteredProducts = filteredItems;
      return filteredProducts;
    }
    else
    {
    return []
    }
  }

},[products,filteredItems,query])


const [isShown, setIsShown] = useState(false);

const handleClick = event => {
  setIsShown(true);
};

const handleClickClose = event => {
  setIsShown(false);
};


  return (
    <>
   <section className='Navbar'>
    <div className='Navbar-box1'>
      <div className='Navbar-box1-box'>
     <div style={{height:'35px',width:'100%',borderRadius:'7px',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',border:'1px solid #B0B0B0',margin:'0px 6px',padding:'2px 5px'}}>
      <div  style={{height:'25px',width:'20%',margin:'0px 10px 0px 0px'}}><img src={SearchImage}style={{height:'20px'}} alt='search' /></div>

      <input type='text'  placeholder='Search Products' onClick={handleClick} onChange={onChange} style={{height:'28px',border:'none'}}/>
      </div> 
      <Link to='/cart' style={{textDecoration:'none',color:'#757575'}}><div style={{height:'30px',width:'30px',margin:'0px 6px'}}><img src={CartImage} alt='cart' /></div></Link>
      <Link to='/wishlist' style={{textDecoration:'none',color:'#757575'}}><div style={{height:'30px',width:'30px',margin:'0px 6px'}}><img src={HeartImage} alt='wishlist' /></div></Link>
      <Link to='/profile' style={{textDecoration:'none',color:'#757575'}}><div style={{height:'30px',width:'30px',margin:'0px 6px'}}><img src={ProfileImage} alt='profile' /></div></Link>
      </div>
    </div>
    <div className='Navbar-box2' style={{margin:'14px 0px'}}>
    <img src={RantikaLogo} alt='Logo'/>
    </div>
    <div className='Navbar-box3' style={{fontFamily:'Abhaya Libre',fontSize:'32px',padding:'21px 21px'}}>
    <Link to='/' style={{textDecoration:'none',color:'#757575'}}><div style={{margin:'0px 35px'}}>Home</div></Link>
    <Link to='/shop'  style={{textDecoration:'none',color:'#757575'}}><div style={{margin:'0px 35px'}}>Shop</div></Link>
    <Link to='/shop'  style={{textDecoration:'none',color:'#757575'}}><div style={{margin:'0px 35px'}}>Customize Size</div></Link>
      <Link to='/contact' style={{textDecoration:'none',color:'#757575'}}><div style={{margin:'0px 35px'}}>Contact</div></Link>
    </div>
   
   </section>

   {isShown && <div className='SearchBox'>
    <div onClick={handleClickClose} className='close'></div>
   <div className="row" style={{width:'100%',height:'100%'}} >
   {filterData?.length>0?
   filterData.map((element)=> {return <div onClick={()=>{navigate(`/shop/${element.id}`);setIsShown(false)}} className="col-md-4 my-3   Product-Small-Cards" key={element.id} >
  
    <div className='Card'><img src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`} onMouseOver={e=> (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[1].attributes.url}`) }
       onMouseOut={e=> (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`)} alt='ProductImage' style={{height:'258px',width:'100%'}}/> 
    <div>
        <div className='Card-Title'>{element.attributes.title.length>25?`${element.attributes.title.slice(0,25)}...`:element.attributes.title}</div>
        <div className='Card-Category'>{element.attributes.category.data.attributes.category}</div>
        <div className='Card-Description'>Rs. {element.attributes.price}</div>
    </div> 

    </div>
    
    
    
    </div>}
   )
   :<div style={{display:'flex',justifyContent:'center',alignItems:'center',fontSize:'50px',fontWeight:'600'}}>Search For Products &nbsp; <span style={{fontSize:'50px',fontWeight:'600'}} className="material-symbols-outlined">
   search
   </span></div>
   }
    </div>
   </div>
}
   
    </>
  );
}


const mapStateToProps = (state) => ({
  products: state.product.Products
});
export default connect(mapStateToProps)(memo(Navbar));

