import { Link } from 'react-router-dom';
import './Order.css';
function Order(props) {
    const cart=[ {
        "id": 1,
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        "price": 109.95,
        "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
          "rate": 3.9,
          "count": 120
        }
      },
      {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
          "rate": 4.1,
          "count": 259
        }
      },
      {
        "id": 3,
        "title": "Mens Cotton Jacket",
        "price": 55.99,
        "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        "rating": {
          "rate": 4.7,
          "count": 500
        }
      }]

      const trim=(string)=>{
        return string.slice(0,30)
       }
  return (
    <section className='Order'>
   <div className='OrderBox1'>
    <div className='OrderBox1-Box1'>
        <div>
            <p className='Order-Amount'>Total Amount</p>
            <p className='Order-Amount'>Rs 5,439</p>
            <p className='Order-PaidBy'>Paid by</p>
            <p className='Order-PaidBy'>UPI</p>
        </div>
        <div className='Order-Date'>12 March 2022</div>
    </div>

    <div className='OrderBox2-Box1'>
        <div>
        <div className='Order-Address'>Delivery Address</div>
        </div>
        <div className='Order-Details'>View Details</div>
    </div>
    
   </div>

   <div className='Order2' style={{width:'100%',margin:'100px 0px'}}>
    <div className='Order-Main-Box'>
      <div className='Order-Main-Box1'>
    {cart.length!==0 ? cart.map((element)=>{return <div style={{display:'flex',flexDirection:'row',width:'100%',margin:'0px 0px 50px 0px'}}>
        <div key={element.id} style={{display:'flex',flexDirection:'row',width:'60%',justifyContent:'center',alignItems:'center',height:'300px',fontFamily:'Comfortaa',fontWeight:'500',fontSize:'20px'}}>
        <div style={{width:'50%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <img src={element.image} alt='ProductImage' style={{height:'299px',width:'254px'}}/>
        </div>
      <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent:'space-between',height:'100%'}}>
        <div style={{width:'100%'}}>
      <p style={{margin:'0px 0px'}}>{trim(element.title)}...</p>
      <p style={{margin:'0px 0px'}}>Rs. {element.price}</p>
      <p style={{margin:'0px 0px'}}>Category: {element.category}</p>
      <p style={{margin:'0px 0px'}}>Product Id: {element.id}</p>
      </div>
      
  </div>
</div>
<div style={{width:'40%',display:'flex',justifyContent:'flex-end',padding:'20px 50px',fontFamily:'poppins',fontWeight:'400',fontSize:'24px',color:'#E2BF44'}}>Cancel</div>  
</div>
}):<div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',height:'100%',fontFamily:'Comfortaa',color:'#737373',fontSize:'20px',fontWeight:'700'}}>Server Error</div>} 
      </div>  
      
    </div> 
    </div>


    <div className='Order3'>
    <div style={{width:'100%',display:'flex',justifyContent:'flex-start',fontFamily:'poppins',fontWeight:'600',fontSize:'30px',margin:'0px 0px 40px 0px'}}>Order Details</div>
    <div className='Order3-Box'>
        <div>Bag Total</div>
        <div>5,299</div>
    </div>
    
    <div className='Order3-Box'>
        <div>Delivery</div>
        <div>50</div>
    </div>

    <div className='Order3-Box' style={{fontWeight:'600'}}>
        <div>Order Total</div>
        <div>5,349</div>
    </div>

    <div className='Order3-Box' style={{fontWeight:'600'}}>
        <div>Amount Paid</div>
        <div>2,882</div>
    </div>
   </div>


   <div className='Order4'>
    <div className='Order4-Box1 Order4-Box'>Deliver to</div>
    <div className='Order4-Box2 Order4-Box'>Akshay Kumar</div>
    <div className='Order4-Box3  Order4-Box'>House no. Floor-66 Landmark City 171009 </div>
    <div className='Order4-Box4 Order4-Box'>Phone : 6767686697</div>
   </div>

   <div className='Order5'>
   <Link to='/shop' onClick={()=>{window.scrollTo(0,0)}} className='Order5Button'><button style={{backgroundColor:'transparent',border:'none'}} >Continue Shopping</button></Link>
    </div>

    </section>
  );
}

export default Order;

