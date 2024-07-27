import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { deleteItem } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import Subscriptions from './Subscriptions'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function Item({ movieData, memberData, userData }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector((store) => store.user)

    const moviesURL = "http://127.0.0.1:5000/subscriptions/movies"
    const membersURL = "http://127.0.0.1:5000/subscriptions/members"
    const usersURL = "http://127.0.0.1:5000/users"


    //delete 
    const deleteOne = async (url, entity, itemData) => {
        await deleteItem(`${url}/${itemData._id}`)
        dispatch({ type: "DELETE", payload: itemData, entity: entity });
        // alert(`The movie "${movieData.name}" deleted successfully`);
        navigate(`/mainPage/${entity}`)
    }

    return (
        <div>

            {movieData
                ?
                <div>
                    <Card sx={{ maxWidth: 345, margin: '30px' }} >
                        <CardMedia
                            component="img"
                            // alt="green iguana"
                            height="50%"
                            image={movieData.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {movieData.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {movieData.premiered}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Genres: {movieData.genres?.map((g) => `${g}, `)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {user.permissions?.includes("Update Movies") ?
                                < Link to={`/mainPage/editMovie/${movieData._id}`}><button>Edit</button></Link>
                                : null}
                            &nbsp;
                            {user.permissions?.includes("Delete Movies")
                                ? <button onClick={() => deleteOne(moviesURL, "movies", movieData)}>Delete</button>
                                : null}
                        </CardActions>
                        <Subscriptions movieId={movieData._id} />
                    </Card>
                    {/* <h2>{movieData.name}</h2>
                    <h3>{movieData.premiered}</h3>
                    <h4>Genres: {movieData.genres?.map((g) => `${g}, `)}</h4>
                    <img src={movieData.image} style={{ width: '100px', height: "150px" }} />
                    <br></br> */}

                </div>
                : null}

            {memberData
                ? <div>
                    <Card sx={{ maxWidth: 345, margin: '30px' }} >
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div">
                                {memberData.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email:  {memberData.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                City:  {memberData.city}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {user.permissions?.includes("Update Movies") ?
                                <Link to={`/mainPage/editMember/${memberData._id}`}><button>Edit</button></Link>
                                : null}
                            &nbsp;
                            {user.permissions?.includes("Delete Movies")
                                ? <button onClick={() => deleteOne(membersURL, "members", memberData)}>Delete</button>

                                : null}
                        </CardActions>
                        <Subscriptions displayMoviesWatched={true} memberId={memberData._id} />
                    </Card>

                </div>
                : null}

            {userData
                ?
                <div >
                    <h2>{userData.firstName}&nbsp;{userData.lastName}</h2>
                    <h4>User Name: {userData.userName}</h4>
                    <h4>Created Date: {userData.createdDate}</h4>
                    <h4>Permissions:
                        {userData.permissions?.length > 0
                            ? userData.permissions.map((p, index) => <ul><li key={index}>{p}</li><br></br></ul>)
                            : " No Permissions"
                        }
                    </h4>

                    <Link to={`/mainPage/editUser/${userData._id}`}><button>Edit</button></Link>&nbsp;
                    <button onClick={() => deleteOne(usersURL, "users", userData)} >Delete</button>

                    <br></br><br></br>

                </div>
                : null}
        </div >
    )
}
