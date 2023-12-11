import { Link } from 'react-router-dom';
import './Shop.css';


function Shop(props) {
  const trim=(string)=>{
    return string.slice(0,25)
  }
  return (
    <>
    <section className='Shop' >
     <div className='category'>
      <div style={{margin:'10px 0px'}}>
        <div style={{fontWeight:'800'}}>Category</div>
        {/* <div><input type='radio' name='category' value='shirts'/>Shirts</div>
        <div><input type='radio' name='category' value='tops'/>Tops</div>
        <div><input type='radio' name='category' value='co-ordinates'/>Co-ordinates</div>
        <div><input type='radio' name='category' value='dresses'/>Dresses</div>
        <div><input type='radio' name='category' value='kaaftans'/>Kaaftans</div>
        <div><input type='radio' name='category' value='skirts'/>Skirts</div>
        <div><input type='radio' name='category' value='pants'/>Pants</div>
        <div><input type='radio' name='category' value='accessories'/>Accessories</div>
        <div><input type='radio' name='category' value='indian-wear'/>Indian Wear</div> */}
        <div><input type='radio' name='category' onChange={props.handleChange} checked={props.selectedCategory === ""}  value=""/> All</div>
        <div><input type='radio' name='category' onChange={props.handleChange} checked={props.selectedCategory === "men's clothing"} value="men's clothing"/> Men's Clothing</div>
        <div><input type='radio' name='category' onChange={props.handleChange} checked={props.selectedCategory === 'jewelery'} value='jewelery'/> Jewelery</div>
        <div><input type='radio' name='category' onChange={props.handleChange} checked={props.selectedCategory === 'electronics'} value='electronics'/> Electronics</div>
        <div><input type='radio' name='category' onChange={props.handleChange} checked={props.selectedCategory === "women's clothing"} value="women's clothing"/> Women's Clothing</div>
        </div>


      <div style={{margin:'10px 0px'}}>
        <div style={{fontWeight:'800'}}>Prices</div>
        <div><label><input type='radio' onChange={props.handleChange2}  name='price' checked={props.selectedPrice === 0} value={0}/> All</label></div>
        <div><label><input type='radio' onChange={props.handleChange2} name='price' checked={props.selectedPrice === 100} value={100}/> Over 100</label></div>
        <div><label><input type='radio' onChange={props.handleChange2} name='price' checked={props.selectedPrice === 200} value={200}/> Over 200</label></div>
        <div><label><input type='radio' onChange={props.handleChange2} name='price' checked={props.selectedPrice === 300} value={300}/> Over 300</label></div>
        <div><label><input type='radio' onChange={props.handleChange2} name='price' checked={props.selectedPrice === 400} value={400}/> Over 400</label></div>
      </div>


      <div style={{margin:'10px 0px'}}>
        <div style={{fontWeight:'800'}}>Size</div>
        <div><label><input type='radio' name='size' onChange={props.handleChange3} checked={props.selectedSize === ''} value={''}/> All</label></div>
        <div><label><input type='radio' name='size' onChange={props.handleChange3} checked={props.selectedSize === 'S'} value={'S'}/> Small</label></div>
        <div><label><input type='radio' name='size' onChange={props.handleChange3} checked={props.selectedSize === 'M'} value={'M'}/> Medium</label></div>
        <div><label><input type='radio' name='size' onChange={props.handleChange3}  checked={props.selectedSize === 'L'}value={'L'}/> Large</label></div>
      </div>

     </div>


    <div className='container' style={{width:'80%'}}>
    <div className="row" >
   

   {props.products.map((element)=> {return <Link onClick={()=>{window.scrollTo(0,0)}} to={`/product/${element.id}`} className="col-md-4 my-3   Product-Small-Cards" key={element.id} >
   <div >
    <div className='Card'><img src={element.image[0]} onMouseOver={e=> (e.currentTarget.src = element.image[1]) }
       onMouseOut={e=> (e.currentTarget.src = element.image[0])}alt='ProductImage' style={{height:'258px',width:'100%'}}/> 
    <div>
        <div className='Card-Title'>{trim(element.title)}...</div>
        <div className='Card-Description'>Rs. {element.price}</div>
    </div>

    {/* For Color */}
    {/* <div className='Card-Body-Color'>
    <div className='Card-Body-Color-Box1' >Available Colors</div>
    
    <div className='Card-Body-Color-Box2'>
    {element.color.map((color) => {return <div  className='Card-Body-Color-Box2-InnerBox' style={{backgroundColor:color,margin:'0px 5px 0px 0px'}}></div> })}
    </div>
    
    <div>
    
    </div>
    </div> */}
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
