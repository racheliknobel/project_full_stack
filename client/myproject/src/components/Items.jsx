import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Item from './Item'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function Items({ displayMovies, displayMembers, displayUsers }) {
    const [searchResults, setSearchResults] = useState([]);

    const movies = useSelector((store) => displayMovies ? store.movies : []);
    const members = useSelector((store) => displayMembers ? store.members : []);
    const users = useSelector((store) => displayUsers ? store.users : []);

    const user = useSelector((store) => store.user);

    // console.log(params.id);

    const search = (e, entity) => {
        const searchQuery = entity?.filter((ent) => ent.name.toLowerCase().includes(e.toLowerCase()))
        setSearchResults(searchQuery)
    }

    return (
        <div>

            <br></br>



            {displayMovies &&
                (
                    <div>

                        <Box
                            // component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                onChange={(e) => { search(e.target.value, movies) }} />
                        </Box>

                        <br></br><br></br>

                        {/* {user.data.permissions?.includes("Create Movies")
                            ? < Link to={'/mainPage/addMovie'}><button >Add Movie</button><br></br></Link>
                            : null} */}

                        {(searchResults.length > 0
                            ? searchResults
                            : movies)
                            ?.map((movie) => <Item key={movie._id} movieData={movie} />).reverse()}

                    </div>
                )
            }


            {displayMembers &&
                (
                    <div>

                        <Box
                            // component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label="Search"
                                variant="outlined"
                                onChange={(e) => { search(e.target.value, members) }} />
                        </Box>
                        <br></br>

                        < Link to={'/mainPage/addMember'}><button >Add Member</button><br></br></Link>

                        {(searchResults.length > 0
                            ? searchResults
                            : members)
                            ?.map((member) => <Item key={member._id} memberData={member} />).reverse()}

                    </div>
                )
            }


            {displayUsers &&
                (
                    <div>

                        {/* search <input type='text' onChange={(e) => { search(e.target.value, users) }} /> */}

                        {/* <br></br><br></br> */}

                        < Link to={'/mainPage/addUser'}><button >Add User</button><br></br></Link>

                        {(searchResults.length > 0
                            ? searchResults
                            : users)
                            ?.map((user) => <Item key={user._id} userData={user} />).reverse()}

                    </div>
                )
            }

        </div >
    )
}
