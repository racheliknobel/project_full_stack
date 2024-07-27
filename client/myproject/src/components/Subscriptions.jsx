import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { addItem } from '../utils';

export default function Subscriptions(props) {

    const [isSubscribed, setIsSubscribed] = useState(false)
    const [newSubscription, setNewSubscription] = useState({
        movieId: "",
        date: "",
    })
    const [noSubscriptions, setNoSubscriptions] = useState(false)

    const allMovies = useSelector(store => store.movies);
    const allMembers = useSelector(store => store.members);

    // data for subscription by memberId
    const subscriptionByMember = useSelector(store => {
        const foundSubscription = store.subscriptions?.find(subscription => subscription.memberId === props.memberId);
        // console.log(foundSubscription)
        return foundSubscription !== undefined ? foundSubscription : null;
    })

    //return movies
    const moviesWatched = subscriptionByMember?.movies.map(movie => {
        const relevantMovie = allMovies?.find(m => m._id === movie.movieId);
        return relevantMovie ? { id: movie.movieId, name: relevantMovie.name, date: movie.date } : null;
    }).filter(m => m !== null);

    const moviesToWatch = allMovies?.map(movie => {
        const movieToWatch = !moviesWatched?.find(m => m.id === movie._id);
        return movieToWatch ? { id: movie._id, name: movie.name } : null;
    }).filter(m => m !== null);

    // data for subscription by movieId
    const subscriptionsByMovie = useSelector(store => {
        const foundSubscriptions = store.subscriptions?.filter(subscription => subscription.movies?.find(movie => movie.movieId === props.movieId));
        return foundSubscriptions !== undefined ? foundSubscriptions : null;
    })

    const membersWatched = subscriptionsByMovie?.map(subscription => {
        const date = subscription.movies?.find(movie => movie.movieId === props.movieId).date;
        const relevantMember = allMembers?.find(member => member._id === subscription.memberId);
        return relevantMember ? { id: relevantMember._id, name: relevantMember.name, date: date } : null;
    }).filter(m => m !== null);

    // console.log(membersWatched)



    const displayAddSubscribed = () => {
        setIsSubscribed(!isSubscribed)
    }

    const dispatch = useDispatch()


    //add subscription
    const addSubscription = async (event) => {

        event.preventDefault();

        const subscription = {
            memberId: props.memberId,
            movies: [{
                movieId: newSubscription.movieId,
                date: newSubscription.date,
            }]
        };

        const result = await addItem("http://127.0.0.1:5000/subscriptions/subscriptions", subscription);
        console.log(noSubscriptions);

        noSubscriptions
            ? dispatch({ type: "ADD", payload: result, entity: "subscriptions" })
            : dispatch({ type: "UPDATE", payload: result, entity: "subscriptions" });
    }


    return (
        <div className='moviesWatchedCard'>
            {props.displayMoviesWatched ?
                <div>

                    <button onClick={displayAddSubscribed}>Subscribe to new movie</button>
                    <br></br><br></br>

                    {isSubscribed ?
                        <form onSubmit={addSubscription}>

                            <select required value={newSubscription.movieId} onChange={e => setNewSubscription({ ...newSubscription, movieId: e.target.value })}>
                                <option disabled value={""} >Select Movie</option>
                                {moviesToWatch?.map(movie => <option key={movie.id} value={movie.id}>{movie.name}</option>)}
                            </select>

                            &nbsp;&nbsp;

                            <input required type='date' onChange={e => setNewSubscription({ ...newSubscription, date: e.target.value })} />
                            <br></br><br></br>

                            <button type='submit'>Subscribe</button>

                        </form>

                        : null
                    }

                    {
                        subscriptionByMember ?
                            <div>
                                <h3>Movies Watched</h3>
                                <ul>
                                    {moviesWatched?.map((movie) =>
                                        <div key={movie.id}>
                                            <li >
                                                <Link to={`/mainPage/editMovie/${movie.id}`}>{movie.name}</Link>
                                                &nbsp;{movie.date}
                                            </li>
                                            <br></br>
                                        </div>
                                    )}
                                </ul>
                            </div>
                            : null
                    }
                </div>

                :
                <div>
                    {subscriptionsByMovie ?
                        <div>
                            <h3>Subscriptions Watched</h3>
                            <ul>
                                {membersWatched?.map((member) =>
                                    <div key={member.id}>
                                        <li >
                                            {/* <Link to={`/mainPage/movie/${member.id}`}>{member.name}</Link> */}
                                            {member.name}
                                            &nbsp;{member.date}
                                        </li>
                                        <br></br>
                                    </div>
                                )}
                            </ul>
                        </div>
                        : null}

                </div>

            }
        </div >
    )
}
