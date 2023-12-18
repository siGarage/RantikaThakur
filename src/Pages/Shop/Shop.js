import { connect } from 'react-redux';
import { memo, useMemo, useState } from 'react';
import { useNavigate, useSearchParams} from 'react-router-dom';
import './Shop.css';
function Shop(props) { 
  const [searchParams,setSearchParams]=useSearchParams()
  // const [categoryFilter,setCategoryFilter]=useState('All')
  const [priceFilter,setPriceFilter]=useState(0)
  const type=searchParams.get('type')

    const {products}=props
  
    const navigate=useNavigate();
    let category=new Set([...products.map((element)=>element.attributes.category.data.attributes.category)])
    category=['All',...category]
    
    
    const price=[1000,2000,3000,4000]
    


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
   filterData.map((element)=> {return <div onClick={()=>{navigate(`/shop/${element.id}`)}} className="col-md-4 my-3   Product-Small-Cards" key={element.id} >
  
    <div className='Card'><img src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`} onMouseOver={e=> (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[1].attributes.url}`) }
       onMouseOut={e=> (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`)} alt='ProductImage' style={{filter:(!element.attributes.instock)?'grayscale(1)':'grayscale(0)'}}/> 
    <div>
        <div className='Card-Title'>{element.attributes.title.length>25?`${element.attributes.title.slice(0,25)}...`:element.attributes.title}</div>
        <div className='Card-Category'>{element.attributes.category.data.attributes.category}</div>
        <div className='Card-Description'>Rs. {element.attributes.price}</div>
    </div> 

    </div>
    
    {(!element.attributes.instock) && <div style={{position:'absolute',fontSize:'22px',fontFamily:'Inter',color:'black',fontWeight:'800'}}>Out Of Stock</div>}
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
    products: state.product.Products
  });
  export default connect(mapStateToProps)(memo(Shop));
