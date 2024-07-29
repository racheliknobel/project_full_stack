import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Item from './Item'; // Ensure you have the Item component imported correctly

export default function Items({ displayMovies, displayMembers, displayUsers }) {
    const [searchResults, setSearchResults] = useState([]);

    const movies = displayMovies ? useSelector((store) => store.movies) : [];
    const members = displayMembers ? useSelector((store) => store.members) : [];
    const users = displayUsers ? useSelector((store) => store.users) : [];


    // const search = (e, entity) => {
    //     const searchQuery = entity?.filter((ent) => ent.name.toLowerCase().includes(e.toLowerCase()))
    //     setSearchResults(searchQuery)
    // }
    // console.log(searchResults)
    const search = (e, entity, entityType) => {
        const searchQuery = entity.filter((ent) => ent.name.toLowerCase().includes(e.toLowerCase()));
        setSearchResults((prevResults) => ({
            ...prevResults,
            [entityType]: searchQuery,
        }));
    };

    return (
        <div>
            <br />

            {displayMovies && (
                <div>
                    <Box
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
                            onChange={(e) => { search(e.target.value, movies, "movies"); }}
                        />
                    </Box>

                    <br /><br />

                    {searchResults.movies?.length > 0 ? searchResults.movies.map((movie) => (
                        <Item key={movie._id} movieData={movie} />
                    )).reverse() : movies?.map((movie) => (
                        <Item key={movie._id} movieData={movie} />
                    )).reverse()}
                </div>
            )}

            {displayMembers && (
                <div>
                    <Box
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
                            onChange={(e) => { search(e.target.value, members, 'members'); }}
                        />
                    </Box>
                    <br />
                    <Link to={'/mainPage/addMember'}><button>Add Member</button></Link>
                    <br />

                    {searchResults.members?.length > 0 ? searchResults.members.map((member) => (
                        <Item key={member._id} memberData={member} />
                    )).reverse() : members?.map((member) => (
                        <Item key={member._id} memberData={member} />
                    )).reverse()}
                </div>
            )}

            {displayUsers && (
                <div>
                    <Link to={'/mainPage/addUser'}><button>Add User</button></Link>
                    <br />

                    {searchResults.users.length > 0 ? searchResults.users.map((user) => (
                        <Item key={user._id} userData={user} />
                    )).reverse() : users?.map((user) => (
                        <Item key={user._id} userData={user} />
                    )).reverse()}
                </div>
            )}
        </div>
    );
}

