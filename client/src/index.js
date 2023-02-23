import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes } from 'react-router-dom';
import App from './App';

const Jay = () =>{
    return(
        <>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </>
    );
};

ReactDOM.render(<Jay/>, document.getElementById('root'))