import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
function Shop() {
    let [array, setArray] = useState([])
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(data => setArray(data))
  },[])


  

  return (
    <>
    <section className='Shop' >
    <div className='container'>
    <div className="row" >
   

   {array.map((element)=> {return <Link onClick={()=>{window.scrollTo(0,0)}} to={`/product/${element.id}`} className="col-md-4 my-3   Product-Small-Cards" key={element.id} >
   <div >
    <div className='Card'><img src={element.image} alt='ProductImage' style={{height:'258px'}}/> 
    <div>
        <div className='Card-Title'>{element.title}</div>
        <div className='Card-Description'>Rs. {element.price}</div>
    </div>
    {/* {console.log(element.color['1'])} */}
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

export default Shop;
