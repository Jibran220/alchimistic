import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createProducts, updateProducts } from '../../actions/products';
import useStyles from './styles';
import Base64Downloader from 'react-base64-downloader';
import { useNavigate } from 'react-router-dom';


const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ productname: '', selectmenu: "", selectedFile: "", asd: '', gender: '' });
    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate()

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);


    const clear = () => {
        setCurrentId(0);
        setPostData({ productname: '', selectmenu: "", selectedFile: "", asd: false, gender: 'male' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createProducts(postData));
            navigate('/')

            clear();
        } else {
            dispatch(updateProducts(currentId, postData));
            clear();
        }
    };
    // const handlee = (e) => {
    //     const value = e.target.value
    //     const checked = e.target.checked
    //     if (checked) {
    //         setPostData({ selectedFile: (result.selectedFile) })

    //     }
    // }
    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }
    const base64 =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjEuNv1OCegAAAAMSURBVBhXY/jPYAwAAzQBM849AKsAAAAASUVORK5CYII=';

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
                <hr />
                <hr />
                <hr />
                <div> <input type="checkbox" onChange={(e) => setPostData({ ...postData, asd: e.target.checked })} name="asd " checked={postData.asd} />I AGREE</div>
                <div> <input type="radio" onChange={(e) => setPostData({ ...postData, gender: e.target.value })} name="gender " value='male' />MALE</div>
                <div> <input type="radio" onChange={(e) => setPostData({ ...postData, gender: e.target.value })} name="gender " value='female' />FEMALE</div>
                {/* <div>
                    <div> <input type="checkbox" name="fruits" value="apple" onChange={handlee} />apple</div>
                    <div> <input type="checkbox" name="fruits" value="mango" onChange={handlee} />mango</div>
                    <div> <input type="checkbox" name="fruits" value="orange" onChange={handlee} />orange</div>
                    <div> <input type="checkbox" name="fruits" value="guava" onChange={handlee} />guava</div>
                </div> */}



                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper >
    );
};

export default Form;