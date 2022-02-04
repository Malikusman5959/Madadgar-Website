import { useNavigate } from 'react-router-dom';
import _2 from "./../img/sign-in.png";
import _1 from "./../img/logo.png";

const Nav =()=>{
    let navigate = useNavigate();

    return(
        <div className="top-bar" style={{zIndex:"20"}}>
                    <div className="row top-bar__row">
                        <div className="col-lg-2 col-md-2 col-3 pl-md-5 pl-0 top-bar__row-col__logo">
                            <a href="index.html"><img src={_1} alt="Logo" /></a>
                        </div>
                        <nav className="col-lg-8 col-md-8 col-12 top-bar__row-col__nav" id="navComp">
                            <ul>
                                <li>
                                <a onClick=
                                    {()=>{
                                        navigate('/');
                                    }
                                }>Home</a>

                                </li>
                                <li>
                                    
                                  <a onClick=
                                    {()=>{
                                        navigate('/user/search');
                                    }
                                }>Search</a>
                                </li>
                                <li>
                                <a onClick=
                                    {()=>{
                                        navigate('/user/registration');
                                    }
                                }>Provide Service</a>
                                </li>
                                <li>
                                <a onClick=
                                    {()=>{
                                        navigate('/user/hiring');
                                    }
                                }>Payment</a>
                                </li>
                                <li>
                                <a onClick=
                                    {()=>{
                                        navigate('/user/adminpanel');
                                    }}>FAQ Portal</a>
                                </li>
                                <li>
                                    <a href="#who-we-are">About us</a>
                                </li>
                                <li>
                                    <a href="#contact-us">Contact us</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="col-lg-2 d-flex text-right flex-column col-md-2 col-8 pr-5 top-bar__row-col__auth">
                            <a onClick ={()=>{
                                        navigate('/user/login');
                                    }} className="sign-in-btn">
                                <img src={_2} style={{ width: '30px', height: 'auto' }} />
                            </a>

                        </div>
                    </div>
                    <button className="burger-menu">
                        <span></span>
                    </button>
                </div>
    )
}
export default Nav