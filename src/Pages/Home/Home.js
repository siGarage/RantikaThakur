import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import Img from './IMG_9098.png'
import Marquee from "react-fast-marquee";
import { memo } from 'react';
import { connect} from 'react-redux';
import Carousel from 'react-multi-carousel';
// import axios from "axios";


function Home(props) {
  
  const {products}=props;
  const data=products.filter((element)=>element.attributes.bestseller===true)


  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


  const navigate=useNavigate()
  



  let category=new Set([...products.map((element)=>element.attributes.category.data.attributes.category)])
  category=[...category]
  const shuffled = category.sort(() => 0.5 - Math.random());
    let array = shuffled.slice(0, 5);
  
  
  
 
  
  return (
    <section className='Home'>
      <Marquee style={{margin:"100px 0px",fontSize:'50px',fontFamily:'Inter',fontWeight:'100'}}>
        <img style={{height:'50px',width:'50px'}} src={Img} alt='MarqueeImage'/>
      I can be a React component, multiple React components, or just some text.
      </Marquee>
      <div className='Home-Box1'>
        <div style={{fontFamily:'Poppins',fontWeight:'600',color:'white',fontSize:'64px'}}>Turn your Clutter into Points</div>
        <div style={{fontFamily:'Poppins',fontWeight:'400',color:'white',fontSize:'40px'}}>Snap, Buy, Repeat</div>
        <Link to='/shop?type=All'  style={{textDecoration:'none',width:'25%',height:'20%',fontFamily:'Poppins',fontWeight:'400',color:'black',fontSize:'48px',cursor:'pointer',borderRadius:'17px',margin:'10px 0px',border:'none',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>Buy Now</Link>
      </div>
   


      <div style={{width:'90%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',margin:'30px'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Abhaya Libre',fontSize:'32px',fontWeight:'400',color:'#757575',margin:'20px 0px'}}>BEST SELLERS</div>
      <Carousel responsive={responsive}  autoPlay={true} autoPlaySpeed={4000} className="multi-carousel-container">
      {data.map((element) => {
                    return (
                      <div
                        style={{ position: "relative", cursor: "pointer" }}
                        className=" Product-Small-Cards"
                        key={element.id}
                      >
                        <div
                          style={{width:'80%'}}
                    
                          onClick={() => {
                            navigate(`/shop/${element.id}`);
                          }}
                        >
                          <img
                            src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`}
                            onMouseOver={(e) =>
                              (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[1].attributes.url}`)
                            }
                            onMouseOut={(e) =>
                              (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`)
                            }
                            alt="ProductImage"
                            style={{
                              filter: !element.attributes.instock
                                ? "grayscale(1)"
                                : "grayscale(0)",
                            width:'100%',height:'300px'}}
                          />

                          <div>
                            <div className="Card-Title">
                              {element.attributes.title.length > 25
                                ? `${element.attributes.title.slice(0, 25)}...`
                                : element.attributes.title}
                            </div>
                            <div className="Card-Category">
                              {
                                element.attributes.category.data.attributes
                                  .category
                              }
                            </div>
                            <div className="Card-Description">
                              Rs. {element.attributes.price}
                            </div>
                          </div>
                        </div>

                  
                      </div>
                    );
                  })}
     </Carousel>
      </div>





      <div style={{width:'90%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',margin:'30px'}}>
      <div style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Abhaya Libre',fontSize:'32px',fontWeight:'400',color:'#757575',margin:'20px 0px'}}>Shop By Category</div>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
       <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'550px',margin:'20px 0px'}}>
          
          {/* clothesTypesBox1 */}
        <div className='clothesTypesBox1' style={{width:'49%',height:'100%'}}>
          <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>{array[0]}</div>
          <div></div>
          <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[0]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</div>
        </div>

         {/* clothesTypesBox2 */}
        <div className='clothesTypesBox2' style={{width:'49%',height:'100%'}}>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>{array[1]}</div>
        <div></div>
        <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[1]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</div>
        </div>
        </div> 

       {/* clothesTypesBox3 */}
       <div className='clothesTypesBox3' style={{width:'98%',height:'700px',margin:'20px 0px'}}>
       <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>{array[2]}</div>
       <div></div>
       <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[2]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</div>
       </div>
       <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'550px',margin:'20px 0px'}}>

        {/* clothesTypesBox4 */}
        <div className='clothesTypesBox1'>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>{array[3]}</div>
        <div></div>
        <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[3]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</div>
        </div>

        {/* clothesTypesBox5 */}
        <div className='clothesTypesBox2'>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>{array[4]}</div>
        <div></div>
        <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[4]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" style={{opacity:'0',height:'100%',width:'100%',position:'absolute',cursor:'pointer'}}/>Button</div>
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
