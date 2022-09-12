import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate, Link } from 'react-router-dom';


import { likePost, deleteProducts } from '../../../actions/products';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'));
    const history = useNavigate();

    const as = (e) => {
        setCurrentId(post._id)
        history.push(`/home`);


    }
    const openPost = (e) => {
        // dispatch(getPost(post._id, history));

        history.push(`/posts/${post._id}`);
    };
    // const Likes = () => {
    //     if (post.likes.length > 0) {
    //         return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
    //             ? (
    //                 <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
    //             ) : (
    //                 <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
    //             );
    //     }

    //     return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    // };

    return (
        // <Card className={classes.card}>
        //     <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        //     <div className={classes.overlay}>
        //         <Typography variant="h6">{post.selectmenu}</Typography>
        //         <Typography variant="h6">{post.asd}</Typography>
        //         <Typography variant="h6">{post.gender}</Typography>
        //     </div>

        //     <div className={classes.details}>
        //     </div>
        //     <div className={classes.overlay2}>
        //         <Button style={{ color: 'white' }} id="myBtn" size="small" onClick={as}><MoreHorizIcon fontSize="default" /></Button>
        //         <Link to={"/updatepost/" + post._id}>UPDATE</Link>
        //     </div>
        //     <CardContent>
        //         <Typography variant="body2" color="textSecondary" component="p">{post.productname}</Typography>
        //     </CardContent>
        //     <CardActions className={classes.cardActions}>
        //         {/* <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
        //             <Likes />
        //         </Button> */}

        //         <Button size="small" color="secondary" onClick={() => dispatch(deleteProducts(post._id))}>
        //             <DeleteIcon fontSize="small" /> Delete
        //         </Button>
        //         <Button size="small" color="secondary" name="test" className={classes.cardAction}
        //             onClick={openPost}>
        //             <DeleteIcon fontSize="small" /> OPEN
        //             <Link to={"/singlepost/" + post._id}>OPEN</Link>

        //         </Button>

        //     </CardActions>



        // </Card>
        <div className='container'>
            <div className='row'>
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">NAME</th>
                                <th scope="col">SELECTMENU</th>
                                <th scope="col">RADIO</th>
                                <th scope="col">CHECKBOX</th>
                                <th scope="col">FILE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>{post.productname}</td>
                                <td>{post.selectmenu}</td>
                                <td>{post.gender}</td>
                                <td>{post.asd}</td>
                                {/* <td>{post.selectedFile}</td> */}
                                <td><Link to={"/singlepost/" + post._id}>VIEW</Link></td>
                                <td><Link to={"/updatepost/" + post._id}>UPDATE</Link></td>
                                <td><Button size="small" color="secondary" onClick={() => dispatch(deleteProducts(post._id))}> <DeleteIcon fontSize="small" /> Delete </Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Post;