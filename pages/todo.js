import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Todo.module.css'

const Todo = ({ avatar_url, login }) => {

    const [firstnames, setFirstnames] = useState([])
    // { id: 1, name: 'Do homework' },
    // { id: 2, name: 'Read book' }])

    const [age, setAge] = useState('')

    const [name, setName] = useState('')

    const [idEdit, setIdEdit] = useState(0)

    useEffect(async () => {
        let ts = await getFirstnames();
        console.log(ts)
        setFirstnames(ts)
    }, [])


    const renderFirstnames = () => {
        if (firstnames && firstnames.length)
            return firstnames.map((firstname, index) => (
                <li key={index} className={styles.listItem}>
                    {firstname.id})
                    {(idEdit !== firstname.id) ?
                        firstname.name :
                        (<input
                            className={styles.text}
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />)
                    }
                    <br></br>&nbsp; &nbsp; Age : &nbsp;{
                        (idEdit !== firstname.id) ?
                            firstname.age : (
                                <input
                                    className={styles.text}
                                    type="text"
                                    name="age"
                                    value={age}
                                    onChange={(e) => (setAge(e.target.value))}
                                />)
                    }
                    <div className={styles.buttonContainer}>
                        <button
                            className={`${styles.button} ${styles.btnEdit}`}
                            onClick={() => editFirstname(firstname.id)}>
                            Edit
                       </button>
                        <button
                            className={`${styles.button} ${styles.btnDelete}`}
                            onClick={() => deleteFirstname(firstname.id)}>
                            Delete
                       </button>
                    </div>
                </li>))
    }

    const editFirstname = (id) => {
        setIdEdit(id)
        let t = firstnames.find((firstname) => +firstname.id === +id)
        setName(t.name)
        setAge(t.age)
        if (+idEdit === +id) { //Press Edit again
            let newFirstnames = firstnames.map((firstname, index) => {
                if (+firstname.id === +id){
                    firstnames[index].name = name
                    firstnames[index].age = age
                }
                //  console.log("show =>", firstname)
                return firstname
            })
            setFirstnames(newFirstnames)
            setIdEdit(0)
        }
    }

    const deleteFirstname = (id) => {
        console.log('delete id: ', id)
        let newFirstnames = firstnames.filter((firstname) => firstname.id !== +id)
        setFirstnames(newFirstnames)
    }

    const addFirstname = (name) => {
        setFirstnames([...firstnames, { id: firstnames[firstnames.length - 1].id + 1, name, age }])
        console.log(firstnames)
    }

    return (
        <div className={styles.container}>
            <div className={styles.topRight}>
                <Link href="/"><a>Home</a></Link>
            </div>
            <h1 className={styles.title}>

                <img src={avatar_url} width="80" />
                Todo  for <span>{login} </span>

            </h1>

            <div className="addContainer">
                <input
                    className={styles.text}
                    placeholder="Name"
                    type="text"
                    name="addFirstname"
                    onChange={(e) => (setName(e.target.value))}
                />
                <input
                    className={styles.text}
                    placeholder="Enter age"
                    type="text"
                    name="addAge"
                    onChange={(e) => (setAge(e.target.value))}
                />
                <button
                    className={`${styles.button} ${styles.btnAdd}`}
                    onClick={() => addFirstname(name)}>Add</button>
            </div>
            <ul className={styles.list}>
                {renderFirstnames()}
            </ul>
        </div>
    )
}

const getFirstnames = async () => {
    const res = await fetch('http://localhost:8000/')
    const json = await res.json()
    console.log(json)
    return json;
}

Todo.getInitialProps = async (ctx) => {
    const res = await fetch('https://api.github.com/users/Surawee-Ruanjan')
    const json = await res.json()
    return { login: json.login, avatar_url: json.avatar_url }
}

export default Todo