import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


const api_url = import.meta.env.VITE_REACT_API_URL;

const SignInForm = () => {

    const [data, setData] = useState({
        Email: "",
        Password: ""
    });

    const [msg, setMsg] = useState('');

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
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


    return (
        <div className="kyulu App flex">
            <section className="absolute">
                {msg ? (
                    <div className="msg absolute flex">
                        {msg}
                    </div>
                ) : (
                    <div></div>
                )}
                <label className="absolute">Welcome<br />Back</label>
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
