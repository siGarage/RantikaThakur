import { Link } from 'react-router-dom';
import './Shop.css';


function Shop(props) {
  const trim=(string)=>{
    return string.slice(0,25)
  }
  console.log(props.products.length)
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
        <div><input type='radio' name='category' onChange={props.handleChange}  defaultChecked value=""/>all</div>
        <div><input type='radio' name='category' onChange={props.handleChange} value="men's clothing"/>men's clothing</div>
        <div><input type='radio' name='category' onChange={props.handleChange} value='jewelery'/>jewelery</div>
        <div><input type='radio' name='category' onChange={props.handleChange} value='electronics'/>electronics</div>
        <div><input type='radio' name='category' onChange={props.handleChange} value="women's clothing"/>women's clothing</div>
        </div>
      <div style={{margin:'10px 0px'}}>
        <div style={{fontWeight:'800'}}>Prices</div>
        <div><label><input type='radio' onChange={props.handleChange2} defaultChecked name='price' value={''}/>all</label></div>
        <div><label><input type='radio' onChange={props.handleChange2} name='price' value={100}/>Over 100</label></div>
        <div><label><input type='radio' onChange={props.handleChange2} name='price' value={200}/>Over 200</label></div>
        <div><label><input type='radio' onChange={props.handleChange2} name='price' value={300}/>Over 300</label></div>
        <div><label><input type='radio' onChange={props.handleChange2} name='price' value={600}/>Over 400</label></div>
      </div>
      <div style={{margin:'10px 0px'}}>
        <div style={{fontWeight:'800'}}>Size</div>
        <div><label><input type='radio' name='size' onChange={props.handleChange3} defaultChecked  value={''}/>all</label></div>
        <div><label><input type='radio' name='size' onChange={props.handleChange3}  value={'S'}/>Small</label></div>
        <div><label><input type='radio' name='size' onChange={props.handleChange3}  value={'M'}/>Medium</label></div>
        <div><label><input type='radio' name='size' onChange={props.handleChange3}  value={'L'}/>Large</label></div>
      </div>
     </div>


    <div className='container' style={{width:'80%'}}>
    <div className="row" >
   

   {props.products.map((element)=> {return <Link onClick={()=>{window.scrollTo(0,0)}} to={`/product/${element.id}`} className="col-md-4 my-3   Product-Small-Cards" key={element.id} >
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

export default Shop;
