import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faTimes, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import './signup.css';
import axios from 'axios';
import videoBg from './space.mp4';
const api_url = process.env.REACT_APP_API_URL;

const SignUpForm = () =>{
    const [data, setData] = useState({
        FirstName: "",
        LastName: "",
        Email : "",
        Password : ""
    });

    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const handleChange = ({currentTarget:input}) =>{
        setData({...data,[input.name]:input.value});
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${api_url}/postUser`,{data});
            setMsg(res.data.message);
            console.log(res.data)
            if (res.data.servercode) {
                navigate('/login');
            } 
        } catch (error) {
            navigate('/regester');
        };
    };

    let style = msg.includes('succesfully')?({id:'success',icon:faCircleCheck}):({id:'error',icon:faTimes});

    return(
        <div className="kyulu App flex">
            <video autoPlay loop muted>
                <source src={videoBg} type="video/mp4" autoPlay/>
            </video>
            <section className="">
                {msg?(
                    <div className="msg absolute flex" id={style.id}>
                        {msg}
                        <FontAwesomeIcon icon={style.icon} className="absolute msgIcon"/>
                    </div>
                ):(
                    <div></div>
                )}
                <FontAwesomeIcon icon={faUserAstronaut} className="fa-float absolute"/>
                <label className="absolute">Create<br/>Account</label>
                <form className="flex" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="FirstName" 
                        id="fname" 
                        placeholder="First Name" 
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        name="LastName" 
                        id="nname"
                        placeholder="Last Name" 
                        onChange={handleChange}
                    />
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
                        id="passw" 
                        placeholder="Password"
                        onChange={handleChange} />
                    <input type="submit" value="SIGN UP" />
                    <Link to="/login">
                        <button>SIGN IN</button>
                    </Link>
                </form>
            </section>
        </div>
    )
};

export default SignUpForm;