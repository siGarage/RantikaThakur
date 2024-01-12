import { useNavigate } from 'react-router-dom';
import './YouMayLike.css';
import { memo } from 'react';
import { connect } from 'react-redux';
function Like(props) {
   const navigate=useNavigate();

    const {products}=props;
    const shuffled = products.sort(() => 0.5 - Math.random());
    let array = shuffled.slice(0, 4);

  return (
    <>
    {products.length>0 && <section className='Like' >
    <div className='container'>
     <div style={{fontFamily:'Abhaya Libre',fontSize:'40px',fontWeight:'400'}}>You may also like</div>
    {(array.length>0)?<div className='row'>
     {
   array.map((element)=> {return <div onClick={()=>{navigate(`/shop/${element.id}`)}} className="col-md-3 my-3 " key={element.id} >
  
    <div className='Card'><img src={`${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`} onMouseOver={e=> (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[1].attributes.url}`) }
       onMouseOut={e=> (e.currentTarget.src = `${process.env.REACT_APP_SERVERNAME}${element.attributes.images.data[0].attributes.url}`)} alt='ProductImage' style={{height:'400px',width:'100%'}}/> 
    <div>
        <div className='Card-Title'>{element.attributes.title.length>25?`${element.attributes.title.slice(0,25)}...`:element.attributes.title}</div>
        <div className='Card-Category'>{element.attributes.category.data.attributes.category}</div>
        <div className='Card-Description'>Rs. {element.attributes.price}</div>
    </div> 

    </div>
    
    
    </div>}
   )}
    </div>
    :"No Data"}
    </div>
     
    </section>}
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.product.Products
});
export default connect(mapStateToProps)(memo(Like));
