import './Custom.css';
function Custom(props) {
  return (
    <section className='Custom' >
        <div style={{margin:'50px',fontSize:'36px',fontWeight:'600'}}>CUSTOM SIZE</div>
        <p style={{width:'80%',textAlign:'center',margin:'0px 0px 40px 0px'}}>If you're unable to find your size in our standard chart, fill in the measurements form below with all your details and your order shall be processed accordingly. </p>
        <div style={{width:'80%'}}>
    <div className='Custom-Box1'>
        <div className='Custom-Box1-Box1'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Name
                <input type='text' required/>
            </label>
        </div>
        <div className='Custom-Box1-Box2'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Contact No.
                <input type='text' required/>
            </label>
        
        </div>
    </div>

    <div>
    <div className='Custom-Box2'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Email
                <input type='email' required/>
            </label>
        </div>
    </div>
    <div className='Custom-Box3'>
    <div className='Custom-Box3-Box'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Upper Bust
                <input type='number'/>
            </label>
        </div>
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Bust
                <input type='number'/>
            </label>
        </div> 
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                High Waist
                <input type='number'/>
            </label>
        </div> 
    </div>
    <div className='Custom-Box3'>
    <div className='Custom-Box3-Box'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Waist
                <input type='number'/>
            </label>
        </div>
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Hip
                <input type='number'/>
            </label>
        </div> 
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Shoulder
                <input type='number'/>
            </label>
        </div> 
    </div>
    <div className='Custom-Box3'>
    <div className='Custom-Box3-Box'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Armhole
                <input type='number'/>
            </label>
        </div>
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Sleeve Length
                <input type='number'/>
            </label>
        </div> 
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Bicep
                <input type='number'/>
            </label>
        </div> 
    </div>
    <div className='Custom-Box3'>
    <div className='Custom-Box3-Box'>
            <label  style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Full Length
                <input type='number'/>
            </label>
        </div>
        <div className='Custom-Box3-Box'>
            <label style={{display:'flex',flexDirection:'column',width:'100%'}}>
                Pant/Skirt Length
                <input type='number'/>
            </label>
        </div> 
       <div className='Custom-Box3-Box'>
      </div>
    </div>
    </div>
    </section>
  );
}

  export default Custom;



  