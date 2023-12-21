import { connect, useDispatch } from 'react-redux';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom';
import './Shop.css';
import WISHLIST from '../../API/Wishlist'
import { toast } from 'react-toastify';
import constants from '../../constants';
function Shop(props) { 

  // state variables of shop
  const [searchParams,setSearchParams]=useSearchParams();
  const {authtoken,products,logged_in}=props;
  const [priceFilter,setPriceFilter]=useState(0)
  const type=searchParams.get('type')
  const dispatch=useDispatch()
  let wishlist=props.wishlist

  // set username only when user logged_in 
  if(logged_in){
    var useremail=props.useremail.user.email   
  }
  
    const navigate=useNavigate();
    
    // Set categories
    let category=new Set([...products.map((element)=>element.attributes.category.data.attributes.category)])
    category=['All',...category]
    
    //set price
    const price=[1000,2000,3000,4000]
    


   // Add to Wishlist functionality
    const AddToWishlist = (data) => { 
      const findData=wishlist.find((element)=>Number(element.attributes.id_product)===Number(data.id_product))
       if(findData){
        toast.success('Item Already In Wishlist!')
       }
       else{
         WISHLIST.addWishlistItems(data,authtoken).then((res)=>{
           if(res.status===200){
             dispatch({
               type: constants("wishlist").reducers.wishlist.AddToWishlist,
               payload: {wishItems:[...wishlist,res.data.data]},
             })
             toast.success('Item Added To Wishlist!')
              }    
           })
       }
       };


    // Filter products data on the basis of category and price
      const filterData=useMemo(()=>{
        if(products.length>0)
        {
            if(type!=='All')
            {
            if(priceFilter)
            {
                return products.filter((element) => element.attributes.category.data.attributes.category===type && element.attributes.price>=priceFilter)
            }    
             else
             {
              return products.filter((element) => element.attributes.category.data.attributes.category===type)
             }   
            }
            else
            {
            if(priceFilter)
            {
               return products.filter((element) => element.attributes.price>=priceFilter)
            }    
             else
             {
              return products
             }   
            }
            
        }
        else{
            return []
        }
      },[products,priceFilter,type])


  // Get Wishlist Data 
      useEffect(() => {
        if(logged_in){
          if(wishlist.length===0){
        WISHLIST.getWishlistItems(useremail,authtoken).then((res)=>{
          if(res.status===200){
            dispatch({
              type: constants("wishlist").reducers.wishlist.AddToWishlist,
              payload: {wishItems:res.data.data}
            })
          }
          else{
            toast.error('Server Side Error')
          }
        })
      }
    }
      },[useremail,authtoken,dispatch,logged_in,wishlist.length])
    

     let wistItemsId=wishlist.map((element)=>Number(element.attributes.id_product))


  return (
    <>
    <section className='Shop' >
     <div className='category'>
    <div style={{margin:'10px 0px'}} >
        <div style={{fontWeight:'800'}}>Category</div>
        {category.map((element)=>{return (
    <div key={element} ><input type='radio' checked={element===type}  onChange={()=>{setSearchParams(`?type=${element}`)}} value={element} /> {element}</div>
        )
        
        } )}
       
        </div>


        <div style={{margin:'10px 0px'}}>
        <div style={{fontWeight:'800'}}>Prices</div>

        {price.map((element)=>{return (
    <div  key={element} ><input type='radio'  checked={element===priceFilter}  onChange={()=>{setPriceFilter(element)}} value={element} key={element}/> Over ₹{element}</div>
        )
        
        } )}
        
      </div>


      </div>



   {products?.length===0?<div style={{width:'80%',display:'flex',justifyContent:'center'}}><span className="loader" ></span></div>:
   
   <div className='container' style={{width:'80%'}}>
    <div className="row" >
   {products?.length>0?
   <>
    {
   filterData.map((element)=> {return <div style={{position:'relative',cursor:'pointer'}} className="col-md-4 my-3   Product-Small-Cards" key={element.id} >
  
    <div className='Card' onClick={()=>{navigate(`/shop/${element.id}`)}}><img src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`} onMouseOver={e=> (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[1].attributes.url}`) }
       onMouseOut={e=> (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`)} alt='ProductImage' style={{filter:(!element.attributes.instock)?'grayscale(1)':'grayscale(0)'}}/> 
       
    <div>
        <div className='Card-Title'>{element.attributes.title.length>25?`${element.attributes.title.slice(0,25)}...`:element.attributes.title}</div>
        <div className='Card-Category'>{element.attributes.category.data.attributes.category}</div>
        <div className='Card-Description'>Rs. {element.attributes.price}</div>
    </div> 

    </div>
    
    {(!element.attributes.instock) && <div style={{position:'absolute',fontSize:'22px',fontFamily:'Inter',color:'black',fontWeight:'800'}}>Out Of Stock</div>}
    {logged_in ? (wistItemsId.find((ele)=>ele===element.id)?
    <span className="material-symbols-outlined" style={{position:'absolute',bottom:'18%',right:'5%',color:'red',fontSize:'40px',fontWeight:'500',cursor:'pointer'}}>favorite</span>
    :<span onClick={()=>{AddToWishlist({"email":useremail,
                     "title":element.attributes.title,
                     "price":element.attributes.price,
                     "category":element.attributes.category.data.attributes.category,
                     "id_product":element.id,
                     "image":`${element.attributes.images.data[0].attributes.url}`
                  },authtoken)
    }} className="material-symbols-outlined" style={{position:'absolute',bottom:'18%',right:'5%',color:'#696969',fontSize:'40px',fontWeight:'500',cursor:'pointer'}}>favorite</span>)
  :<span onClick={()=>{navigate(`/login`)}} className="material-symbols-outlined" style={{position:'absolute',bottom:'18%',right:'5%',color:'#696969',fontSize:'40px',fontWeight:'500',cursor:'pointer'}}>favorite</span>
  }
    </div>}
   )}
   </>
   :'No Data Found'}
    
    </div>
    </div>
   } 

    </section>
    </>
  );
}

const mapStateToProps = (state) => ({
    products: state.product.Products,
    useremail:state.auth.user,
    authtoken:state.auth.user.jwt,
    logged_in:state.auth.logged_in,
    wishlist:state.wishlist.wishItems
  });
  export default connect(mapStateToProps)(memo(Shop));
