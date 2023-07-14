import {v4 as uuidv4} from 'uuid';

const idOne = uuidv4()
const idTwo = uuidv4()

/**DB*/
let users = {
    [idOne]: {
        id: idOne,
        firstName: 'Robin',
        lastName: 'Wieruch',
        isDeveloper: true,
    },
    [idTwo]: {
        id: idTwo,
        firstName: 'Vincent',
        lastName: 'Kioko',
        isDeveloper: false,
    },
}

//Returns object of items as a converted array
const getUsers = () =>
    new Promise((resolve, reject) => {
        if(!users){
            return setTimeout(
                () => reject(new Error('Users not found')),
                250
            )
        }
        setTimeout(() => resolve(Object.values(users)), 250)
    })

const loadUsers = async () => {
    try{
        const result = await getUsers()
        console.log(result)
    } catch(error){
        console.log(error)
    }
}

loadUsers();

const getUser = (id) =>
    new Promise((resolve, reject) => {
        const user = users[id]

        if(!user){
            return setTimeout(
                () => reject(new Error('User not found')),
                250
            )
        }

        setTimeout(() => resolve(users[id]), 250)
    })

const createUser = (data) =>
    new Promise((resolve, reject) => {
        if(!data.firstName || !data.lastName){
            reject(new Error('Not all info provided'))
        }

        const id = uuidv4()
        const newUser = { id, ...data }

        users = { ...users, [id]: newUser}

        setTimeout(() => resolve(true), 250)
    })

const updateUser = (id, data) =>
    new Promise((resolve, reject) => {
        if(!users[id]){
            return setTimeout(
                () => reject(new Error('User not found')),
                250
            )
        }

        users[id] = { ...users[id], ...data };

        return setTimeout(() => resolve(true), 250)
    })

const deleteUser = (id) =>
    new Promise((resolve, reject) => {
        const { [id]: user, ...rest } = users

        if(!user){
            setTimeout(
                () => reject(new Error('User not found')),
                250
            )
        }
        users = { ...rest }

        return setTimeout(() => resolve(true), 250)
    })

export {getUsers, getUser, createUser, updateUser, deleteUser}