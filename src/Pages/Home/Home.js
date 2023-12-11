import { Link } from 'react-router-dom';
import './Home.css';

function Home(props) {
  return (
    <section className='Home'>
      <div className='Home-Box1'>
        <div style={{fontFamily:'Poppins',fontWeight:'600',color:'white',fontSize:'64px'}}>Turn your Clutter into Points</div>
        <div style={{fontFamily:'Poppins',fontWeight:'400',color:'white',fontSize:'40px'}}>Snap, Buy, Repeat</div>
        <Link to='/shop' onClick={()=>{window.scrollTo(0,0)}} style={{textDecoration:'none',width:'25%',height:'20%',fontFamily:'Poppins',fontWeight:'400',color:'black',fontSize:'48px',cursor:'pointer',borderRadius:'17px',margin:'10px 0px',border:'none',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>Buy Now</Link>
      </div>



      <div style={{width:'90%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',margin:'30px'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Abhaya Libre',fontSize:'32px',fontWeight:'400',color:'#757575',margin:'20px 0px'}}>NEW ARRIVALS</div>
      <div style={{display:'flex',flexDirection:'row',width:'100%',height:'330px'}}>
        <div style={{width:'32%'}}  className='NewArrival-Box1'></div>
        <div style={{width:'32%'}} className='NewArrival-Box2'></div>
        <div style={{width:'32%'}} className='NewArrival-Box3'></div>
      </div>
      </div>




      <div style={{width:'90%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',margin:'30px'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Abhaya Libre',fontSize:'32px',fontWeight:'400',color:'#757575',margin:'20px 0px'}}>Shop By Category</div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
       <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'550px',margin:'20px 0px'}}>
          
          {/* clothesTypesBox1 */}
        <div className='clothesTypesBox1' style={{width:'49%',height:'100%'}}>
          <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Men's Clothes</div>
          <div></div>
          <Link to='/shop' onClick={()=>{window.scrollTo(0,0)}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category' onChange={props.handleClick} value="men's clothing" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</Link>
        </div>

         {/* clothesTypesBox2 */}
        <div className='clothesTypesBox2' style={{width:'49%',height:'100%'}}>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Jewelery</div>
        <div></div>
        <Link to='/shop' onClick={()=>{window.scrollTo(0,0)}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category' onChange={props.handleClick}  value="jewelery" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</Link>
        </div>
        </div>

       {/* clothesTypesBox3 */}
       <div className='clothesTypesBox3' style={{width:'98%',height:'700px',margin:'20px 0px'}}>
       <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Electronics</div>
       <div></div>
       <Link to='/shop' onClick={()=>{window.scrollTo(0,0)}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category' onChange={props.handleClick}  value="electronics" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</Link>
       </div>
       <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'550px',margin:'20px 0px'}}>

        {/* clothesTypesBox4 */}
        <div className='clothesTypesBox1'>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Women's Clothes</div>
        <div></div>
        <Link to='/shop' onClick={()=>{window.scrollTo(0,0)}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category' onChange={props.handleClick}  value="women's clothing" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</Link>
        </div>

        {/* clothesTypesBox5 */}
        <div className='clothesTypesBox2'>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>All</div>
        <div></div>
        <Link to='/shop' onClick={()=>{window.scrollTo(0,0)}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category' onChange={props.handleClick}  value="" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</Link>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Home;
