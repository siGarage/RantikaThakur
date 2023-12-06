import './Home.css';

function Home() {
  return (
    <section className='Home'>
      <div className='Home-Box1'>
        <div style={{fontFamily:'Poppins',fontWeight:'600',color:'white',fontSize:'64px'}}>Turn your Clutter into Points</div>
        <div style={{fontFamily:'Poppins',fontWeight:'400',color:'white',fontSize:'40px'}}>Snap, Buy, Repeat</div>
        <button style={{width:'25%',height:'20%',fontFamily:'Poppins',fontWeight:'400',color:'black',fontSize:'48px',borderRadius:'17px',margin:'10px 0px',border:'none'}}>Buy Now</button>
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
        <div className='clothesTypesBox1' style={{width:'49%',height:'100%'}}>
          <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Over Coats</div>
          <div></div>
          <button className='clothesTypes-Button'>Button</button>
        </div>
        <div className='clothesTypesBox2' style={{width:'49%',height:'100%'}}>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Co-ord Sets</div>
        <div></div>
        <button className='clothesTypes-Button'>Button</button>
        </div>
        </div>
       <div className='clothesTypesBox3' style={{width:'98%',height:'700px',margin:'20px 0px'}}>
       <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Over Coats</div>
       <div></div>
        <button className='clothesTypes-Button2'>Button</button>
       </div>
       <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center',height:'550px',margin:'20px 0px'}}>
        <div className='clothesTypesBox1'>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Over Coats</div>
        <div></div>
          <button className='clothesTypes-Button'>Button</button>
        </div>
        <div className='clothesTypesBox2'>
        <div style={{fontFamily:'Abhaya Libre',fontSize:'64px',fontWeight:'700',color:'white'}}>Co-ord Sets</div>
        <div></div>
        <button className='clothesTypes-Button'>Button</button>
        </div>
        </div>
      </div>
      </div>
    </section>
  );
}

export default Home;
