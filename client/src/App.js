import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home/Home';
import Home1 from './components/Home/Home1';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import UpdatePost from './components/Posts/Post/UpdatePost';
import Singlepost from './components/Posts/Post/Singlepost';

const App = () => (
    <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar />
            <Routes>
                <Route path="/" exact element={<Home1 />} />
                <Route path="/home" exact element={<Home />} />
                <Route path="/auth" exact element={<Auth />} />
                <Route path="/updatepost/:id" exact element={<UpdatePost />} />
                <Route path="/singlepost/:id" exact element={<Singlepost />} />
            </Routes>
        </Container>
    </BrowserRouter>
);

export default App;