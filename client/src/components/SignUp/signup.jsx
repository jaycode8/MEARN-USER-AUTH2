import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './signup.css';
import axios from 'axios';

const api_url = import.meta.env.VITE_REACT_API_URL;

const SignUpForm = () => {
    const [data, setData] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        Password: ""
    });

    const [msg, setMsg] = useState('');

    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${api_url}/user`, { data });
            setMsg(res.data.message);
            console.log(res.data)
            if (res.data.servercode) {
                navigate('/login');
            }
        } catch (error) {
            navigate('/regester');
        };
    };


    return (
        <div className="kyulu App flex">
            <section className="">
                {msg ? (
                    <div className="msg absolute flex">
                        {msg}
                    </div>
                ) : (
                    <div></div>
                )}
                <label className="absolute">Create<br />Account</label>
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
