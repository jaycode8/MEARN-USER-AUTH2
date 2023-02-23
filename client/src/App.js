import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignUpForm from './components/SignUp/signup.jsx';
import SignInForm from './components/SignIn/signin';
import Home from './components/Home/home';


const App = () => {
  return (
    <div className="App flex">
      <Routes>
        <Route path='/login' exact element={<SignInForm />} />
        <Route path='/regester' exact element={<SignUpForm />} />
        <Route path='/home' exact element={<Home/>} />
        <Route exact path='/' element={<Navigate replace to='/login'/>} />
      </Routes>
    </div>
  );
}

export default App;
