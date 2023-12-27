import {Link} from 'react-router-dom';
import './Success.css'
const Success = () => {
    return (
        <div className="Success" >
                <div className="Success-Box">
                    <div style={{fontFamily:'Inter',fontWeight:'800',fontSize:'20px'}}>
                        Thanks for shopping with us!
                    </div>
                    <div style={{fontFamily:'Inter',fontWeight:'600',margin:'10px 0px'}}>
                        Your order has been placed successfully.
                    </div>
                    <div style={{fontFamily:'Inter',fontWeight:'500'}}>
                        For any product related query, drop an email to
                    <div className="underline">shoeshopcontact@shop.com</div>
                    </div>
                    
                    <div style={{margin:'10px 0px'}}>
                    <Link to="/shop?type=All" style={{fontFamily:'Inter',textDecoration:'none',fontWeight:'400'}}>
                        Continue Shopping
                    </Link>
                    </div>
                </div>
        </div>
    );
};

export default Success;