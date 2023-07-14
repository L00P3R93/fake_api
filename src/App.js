import React from "react";

import {getUsers, createUser, updateUser, deleteUser} from './api'

const getDeveloperText = (isDeveloper) => `is ${isDeveloper ? 'a' : 'not a'} Developer`;

const App = () => {
    const [users, setUsers] = React.useState(null)

    const doGetUsers = React.useCallback(async () => {
        try{
            const result = await getUsers();
            setUsers(result)
        }catch(error) {
            console.log(error)
        }
    }, []) ;

    React.useEffect(() => {
        doGetUsers()
    }, [doGetUsers]);

    const refetchUsers = async () => {
        await doGetUsers()
    }

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')

    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value)
    }

    const handleChangeLastName = (event) => {
        setLastName(event.target.value)
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        try{
            await createUser({firstName, lastName, isDeveloper: false })
            await refetchUsers()
        }catch(error){
            console.log(error)
        }
    }

    const handleEdit = async (id) => {
        const user = users.find((user) => user.id === id)
        const isDeveloper = !user.isDeveloper

        try{
            await updateUser(id, { isDeveloper })
            await refetchUsers()
        }catch(error){
            console.log(error)
        }
    }

    const handleRemove = async (id) => {
        try{
            await deleteUser(id)
            await refetchUsers()
        }catch(error){
            console.log(error)
        }
    }

    if(!users) return null

    return (
        <div>
            <ul>
                {users.map((user)=>{
                    const developerText = getDeveloperText(user.isDeveloper)

                    return (
                        <li key={user.id}>
                            {user.firstName}&nbsp;{user.lastName}&nbsp;{developerText} &nbsp;
                            <button
                                type="button"
                                onClick={() => handleEdit(user.id)}
                            >
                                Toggle Developer (Update)
                            </button> &nbsp;
                            <button
                                type="button"
                                onClick={()=> handleRemove(user.id)}
                            >
                                Remove User (Delete)
                            </button>
                        </li>
                    )
                })}
            </ul>
            <hr />
            <h4>Create User:</h4>
            <form onSubmit={handleCreate}>
                <label>
                    <strong>First Name:</strong>&nbsp;
                    <input type="input" onChange={handleChangeFirstName} />
                </label>
                <br />
                <br />
                <label>
                    <strong>Last Name:</strong>&nbsp;
                    <input type="input" onChange={handleChangeLastName} />
                </label>
                <br />
                <br />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default App;
