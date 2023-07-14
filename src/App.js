import React from "react";

import {getUsers, createUser, updateUser, deleteUser} from './api'

const App = () => {
    const [users, setUsers] = React.useState(null)

    React.useEffect(() => {
        const doGetUsers = async () => {
            const result = await getUsers();
            setUsers(result)
        }

        doGetUsers()
    }, [])

    return <div>Hello Sntaks</div>
}

export default App;
