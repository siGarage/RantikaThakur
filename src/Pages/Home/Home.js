import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import Marquee from "react-fast-marquee";
import { memo } from 'react';
import { connect} from 'react-redux';
import Carousel from 'react-multi-carousel';


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
      <Marquee style={{height:'auto',fontSize:'18px',fontFamily:'Inter',fontWeight:'100',backgroundColor:'#E2BF44',color:'white'}}>
      I can be a React component, multiple React components, or just some text.
      </Marquee>
      <div className='Home-Box1'>
        <div className='Home-Box1-Heading'>Turn your Clutter into Points</div>
        <div className='Home-Box1-Description'>Snap, Buy, Repeat</div>
        <Link to='/shop?type=All'  className='Home-Box1-Button'>Buy Now</Link>
      </div>
   


      <div className='Home-Box2'>
      <div className='Home-Box2-Box1'>BEST SELLERS</div>
      <Carousel responsive={responsive}  autoPlay={true} autoPlaySpeed={2000} className="multi-carousel-container">
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
                          <img className='carousel-best-image'
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
                                : "grayscale(0)"
                        }}
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





      <div className='Home-Box3'>
      <div className='Home-Box3-Box1'>Shop By Category</div>
      <div className='Home-Box3-Box1-Box'>
       <div className='Home-Box3-Box1-Box-InnerBox1'>
          
          {/* clothesTypesBox1 */}
        <div className='clothesTypesBox1'>
          <div className='clothesTypesBox1-Box1'>{array[0]}</div>
          <div></div>
          <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[0]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" />Button</div>
        </div>

         {/* clothesTypesBox2 */}
        <div className='clothesTypesBox1' style={{width:'49%',height:'100%'}}>
        <div className='clothesTypesBox1-Box1'>{array[1]}</div>
        <div></div>
        <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[1]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" />Button</div>
        </div>
        </div> 

       {/* clothesTypesBox3 */}
       <div className='clothesTypesBox3'>
       <div className='clothesTypesBox1-Box1'>{array[2]}</div>
       <div></div>
       <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[2]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" />Button</div>
       </div>



       <div className='Home-Box3-Box1-Box-InnerBox1'>

        {/* clothesTypesBox4 */}
        <div className='clothesTypesBox1'>
        <div className='clothesTypesBox1-Box1'>{array[3]}</div>
        <div></div>
        <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[3]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" />Button</div>
        </div>

        {/* clothesTypesBox5 */}
        <div className='clothesTypesBox1'>
        <div className='clothesTypesBox1-Box1'>{array[4]}</div>
        <div></div>
        <div onClick={()=>{navigate({
            pathname:'/shop',
            search:`?type=${array[4]}`
          })}} className='clothesTypes-Button' style={{textDecoration:'none'}}><input  type='radio' name='category'  value="men's clothing" />Button</div>
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
