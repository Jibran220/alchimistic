



import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { useParams, useNavigate } from 'react-router-dom';

import { createProducts, updateProducts } from '../../../actions/products';
import useStyles from './styles';

const UpdatePost = ({ currentId, setCurrentId }) => {
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


    const clear = () => {
        // setCurrentId(0);
        setPostData({ productname: '', selectmenu: "", selectedFile: "", asd: false, gender: 'male' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createProducts(postData));
            clear();
        } else {
            dispatch(updateProducts(params.id, postData));
            navigate('/')
            clear();
        }
    };

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
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.productname} onChange={(e) => setPostData({ ...postData, productname: e.target.value })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>

                <select value={postData.selectmenu} onChange={(e) => setPostData({ ...postData, selectmenu: e.target.value })}>
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>
                <div> <input type="checkbox" onChange={(e) => setPostData({ ...postData, asd: e.target.checked })} name="asd " checked={postData.asd} /></div>
                <div> <input type="radio" onChange={(e) => setPostData({ ...postData, gender: e.target.value })} name="gender " value='male' /></div>
                <div> <input type="radio" onChange={(e) => setPostData({ ...postData, gender: e.target.value })} name="gender " value='female' /></div>




                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Update</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
};

export default UpdatePost;
