import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faTimes, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import videoBg from '../SignUp/space.mp4'


const api_url = process.env.REACT_APP_API_URL;

const SignInForm = () =>{

    const [data, setData] = useState({
        Email : "",
        Password : ""
    });

    const [msg, setMsg] = useState('');

    const handleChange = ({currentTarget:input}) =>{
        setData({...data,[input.name]:input.value});
    };

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${api_url}/auth`, { data });
            setMsg(res.data.msg);
            console.log(res.data);
            if (res.data.servercode) {
                localStorage.setItem("access_token", res.data.token)
                navigate('/home');
            } 
        } catch (error) {
            navigate('/');
        };
    };

    let style = msg.includes('Successfully')?({id:'success',icon:faCircleCheck}):({id:'error',icon:faTimes});

    return(
        <div className="kyulu App flex">
            <video autoPlay loop muted>
                <source src={videoBg} type="video/mp4" autoPlay/>
            </video>
            <section className="absolute">
                {msg?(
                        <div className="msg absolute flex" id={style.id}>
                            {msg}
                            <FontAwesomeIcon icon={style.icon} className="absolute msgIcon"/>
                        </div>
                    ):(
                        <div></div>
                    )}
                <FontAwesomeIcon icon={faUserAstronaut} className="fa-float absolute"/>
                <label className="absolute">Welcome<br/>Back</label>
                <form className="flex" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="Email" 
                        id="mail" 
                        placeholder="Email Address"
                        onChange={handleChange} 
                    />
                    <input 
                        type="password" 
                        name="Password" 
                        id="passw2" 
                        placeholder="Password"
                        onChange={handleChange} 
                    />
                    <input 
                        type="submit" 
                        value="SIGN IN"
                    />
                    <Link to='/regester'>
                        <button>SIGN UP</button>
                    </Link>
                </form>
            </section>
        </div>
    )
};

export default SignInForm;