import axios from 'axios';
import './home.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from './avatar.png';

const api_url = process.env.REACT_APP_API_URL

const Home = () => {

    const token = localStorage.getItem('access_token');
    const headers = {
        'Authorization': `Bearer ${token}`,
        'content-type': 'aplication/json'
    }
    const navigate = useNavigate();

    const logOut = async () => {
        try {
            const res = await axios({
                method: "get",
                url: `${api_url}/logOut`,
                headers : headers
            });
            if (res.data.status === 200) {
                localStorage.removeItem("access_token");
                navigate('/');
            }
        } catch (error) {
            navigate('/');
        }
    }
          
    const fetchUser = async() => {
        try {
            const res = await axios({
                method: 'get',
                url: `${api_url}/users`,
                headers: headers
            })
            document.getElementById('fname').innerHTML = res.data.msg.FirstName;
            document.getElementById('lname').innerHTML = res.data.msg.LastName;
            document.getElementById('mail').innerHTML = res.data.msg.Email;
        } catch (error) {
            navigate('/');
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return(
        <div className="App flex home">
            <div className="kitise grid">
                <div className="avatar flex">
                    <div className="img">
                        <img src={ avatar } alt="user avatar"/>
                    </div>
                </div>
                <div className="content">
                    <span>
                        <label>First Name :</label>
                        <p id="fname"></p>
                    </span>
                    <span>
                        <label>Last Name :</label>
                        <p id="lname"></p>
                    </span>
                    <span>
                        <label>Email Address :</label>
                        <p id="mail"></p>
                    </span>
                    <span>
                        <label>Password :</label>
                        <p>***********</p>
                    </span>
                </div>
                <button className="absolute" onClick={logOut}>logout</button>
            </div>
        </div>
    )
};

export default Home;