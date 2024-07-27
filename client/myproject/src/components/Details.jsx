import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addItem, updateItem } from '../utils';

export default function Details(props) {

    const params = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const moviesURL = "http://127.0.0.1:5000/subscriptions/movies"
    const membersURL = "http://127.0.0.1:5000/subscriptions/members"
    const usersURL = "http://127.0.0.1:5000/users"

    const permissions = [
        "View Subscriptions",
        "Create Subscriptions",
        "Update Subscriptions",
        "Delete Subscriptions",
        "View Movies",
        "Create Movies",
        "Update Movies",
        "Delete Movies"]


    const itemToUpdate = useSelector((store) => {
        if (props.addMovie || props.addMember || props.addUser) {
            return;
        }
        else if (props.editMovie) {
            return store.movies?.find((movie) => movie._id == params.id);
        }
        else if (props.editMember) {
            return store.members?.find((member) => member._id == params.id);
        }
        else { //props.editUser
            return store.users?.find((user) => user._id == params.id);
        }
    });

    const [obj, setObj] = useState({})
    const [checkedPermissions, setCheckedPermissions] = useState(itemToUpdate?.permissions || []);


    useEffect(() => {
        setCheckedPermissions(itemToUpdate?.permissions || []);
    }, [itemToUpdate]);


    const handleCheckboxChange = (e, permission) => {
        const newCheckedPermissions = [...checkedPermissions];
        const index = newCheckedPermissions.indexOf(permission);

        if (e.target.checked && index === -1) {
            newCheckedPermissions.push(permission);
        } else if (!e.target.checked && index !== -1) {
            newCheckedPermissions.splice(index, 1);
        }

        setCheckedPermissions(newCheckedPermissions);
        setObj({ ...obj, permissions: newCheckedPermissions })
    };


    //add item
    const add = async (event, url, entity) => {
        event.preventDefault(); // Prevent default form submission

        const newItem = await addItem(url, obj);
        console.log(newItem)

        // Dispatch action to update list in Redux store
        dispatch({ type: "ADD", payload: newItem, entity: entity });
        alert(`"${newItem.name}" at ${entity} created successfully`);
        navigate(`/mainPage/${entity}`)
    };

    //update item
    const update = async (event, url, entity) => {
        event.preventDefault(); // Prevent default form submission

        const updatedItem = await updateItem(`${url}/${params.id}`, obj);
        console.log(updatedItem);

        // Dispatch action to update list in Redux store
        dispatch({ type: 'UPDATE', payload: updatedItem, entity: entity });
        navigate(`/mainPage/${entity}`)
    };


    return (
        <div>

            {/* add or edit MOVIE: */}
            {props.addMovie || props.editMovie ?
                <div>
                    {props.addMovie ? <h2>New Movie: </h2> : <h2>Edit Movie "{itemToUpdate?.name}" </h2>}

                    <form onSubmit={props.addMovie
                        ? () => add(event, moviesURL, "movies")
                        : () => update(event, moviesURL, "movies")}>
                        <div>
                            Name: <input required
                                type="text"
                                defaultValue={props.editMovie ? itemToUpdate?.name : ''}
                                onChange={e => setObj({ ...obj, name: e.target.value })} />
                            <br></br>
                            Genres: <input required
                                type="text"
                                defaultValue={props.editMovie ? itemToUpdate?.genres : ''}
                                onChange={e => setObj({ ...obj, genres: e.target.value })} />
                            <br></br>
                            Image url: <input required
                                type="text"
                                defaultValue={props.editMovie ? itemToUpdate?.image : ''}
                                onChange={e => setObj({ ...obj, image: e.target.value })} />
                            <br></br>
                            Premiered: <input required
                                type="text"
                                defaultValue={props.editMovie ? itemToUpdate?.premiered : ''}
                                onChange={e => setObj({ ...obj, premiered: e.target.value })} />
                            <br></br><br></br>
                        </div>

                        {props.addMovie
                            ? <button type="submit">Save</button>
                            : <button type="submit">Update</button>
                        }

                        <Link to={'/mainPage/movies'}><button >Cancel</button></Link>

                    </form>
                </div>
                : null}


            {/* add or edit MEMBER: */}
            {props.addMember || props.editMember ?
                <div>
                    {props.addMember ? <h2>New Member: </h2> : <h2>Edit Member "{itemToUpdate?.name}" </h2>}

                    <form onSubmit={props.addMember
                        ? () => add(event, membersURL, 'members')
                        : () => update(event, membersURL, 'members')}>

                        <div>
                            Name: <input required
                                type="text"
                                defaultValue={props.editMember ? itemToUpdate?.name : ''}
                                onChange={e => setObj({ ...obj, name: e.target.value })} />
                            <br></br>
                            Email: <input required
                                type="text"
                                defaultValue={props.editMember ? itemToUpdate?.email : ''}
                                onChange={e => setObj({ ...obj, email: e.target.value })} />
                            <br></br>
                            City: <input required
                                type="text"
                                defaultValue={props.editMember ? itemToUpdate?.city : ''}
                                onChange={e => setObj({ ...obj, city: e.target.value })} />
                            <br></br><br></br>
                        </div>

                        {props.addMember
                            ? <button type="submit">Save</button>
                            : <button type="submit">Update</button>
                        }

                        <Link to={'/mainPage/subscriptions/members'}><button >Cancel</button></Link>

                    </form>
                </div>
                : null}


            {/* add or edit USER: */}
            {props.addUser || props.editUser ?
                <div>
                    {props.addUser ? <h2>New User: </h2> : <h2>{`Edit User: ${itemToUpdate?.firstName} ${itemToUpdate?.lastName}`} </h2>}

                    <form onSubmit={props.addUser
                        ? () => add(event, usersURL, 'users')
                        : () => update(event, usersURL, 'users')}>

                        <div>
                            First Name: <input type="text" required
                                defaultValue={props.editUser ? itemToUpdate?.firstName : ''}
                                onChange={e => setObj({ ...obj, firstName: e.target.value })} />
                            <br></br>
                            Last Name: <input type="text" required
                                defaultValue={props.editUser ? itemToUpdate?.lastName : ''}
                                onChange={e => setObj({ ...obj, lastName: e.target.value })} />
                            <br></br>
                            Created Date: <input type="text" required
                                defaultValue={props.editUser ? itemToUpdate?.createdDate : ''}
                                onChange={e => setObj({ ...obj, createdDate: e.target.value })} />
                            <br></br>
                            UserName: <input type="text" required
                                defaultValue={props.editUser ? itemToUpdate?.userName : ''}
                                onChange={e => setObj({ ...obj, userName: e.target.value })} />
                            <br></br>
                            Permissions:
                            {permissions
                                .map((permission, index) => <div>
                                    <input
                                        key={index}
                                        type="checkbox"
                                        checked={checkedPermissions.includes(permission)}
                                        onChange={(e) => handleCheckboxChange(e, permission)}
                                    />
                                    {permission}
                                    <br></br>
                                </div>)
                            }
                            <br></br><br></br>
                        </div>

                        {props.addUser
                            ? <button type="submit">Save</button>
                            : <button type="submit">Update</button>
                        }

                        <Link to={'/mainPage/users'}><button >Cancel</button></Link>

                    </form>
                </div>
                : null}
        </div>
    );
}