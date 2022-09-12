



import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useParams, useNavigate } from 'react-router-dom';
import Base64Downloader from 'react-base64-downloader';

import { createProducts, updateProducts } from '../../../actions/products';
import useStyles from './styles';

const Singlepost = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ productname: '', selectmenu: "", selectedFile: "", asd: '', gender: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const params = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        getProductDetails()
    }, []);

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5006/products/${params.id}`)
        result = await result.json()
        console.warn(result)
        // dispatch(updateProducts(params.id, postData));
        setPostData({ productname: (result.productname) })
        setPostData({ selectmenu: (result.selectmenu) })
        setPostData({ asd: (result.asd) })
        setPostData({ gender: (result.gender.value) })
        setPostData({ selectedFile: (result.selectedFile) })

    }





    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}>
                <Typography variant="h2">{currentId ? `Editing "${post.title}"` : 'View the Memory'}</Typography>
                <br />
                <h6>Product Name:</h6>
                <TextField name="title" variant="outlined" disabled label="" fullWidth value={postData.productname} onChange={(e) => setPostData({ ...postData, productname: e.target.value })} />

                <h6>Radio:</h6>
                <TextField name="title" variant="outlined" disabled label="" fullWidth value={postData.gender} onChange={(e) => setPostData({ ...postData, gender: e.target.value })} />

                <h6>Checkbox:</h6>
                <TextField name="title" variant="outlined" disabled label="" fullWidth value={postData.asd} onChange={(e) => setPostData({ ...postData, asd: e.target.value })} />

                <h6>Select value:</h6>
                <TextField name="title" variant="outlined" disabled label="" fullWidth value={postData.selectmenu} onChange={(e) => setPostData({ ...postData, selectmenu: e.target.value })} />

                <h6>Radio:</h6>
                <a href={postData.selectedFile} download> <h6>downloaad file</h6> </a>

                <br />



            </form>
        </Paper >
    );
};

export default Singlepost;
