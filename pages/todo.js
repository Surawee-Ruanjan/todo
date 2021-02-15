import { useState } from 'react'
import styles from '../styles/Todo.module.css'

const Todo = () => {

    const [tasks, setTasks] = useState(
        [
            { id: 1, name: 'Reading a book' },
            { id: 2, name: 'Sleep at night' }
        ])

    const [name, setName] = useState('')
    const [idEdit, setIdEdit] = useState(0)

    const renderTask = () => {
        return tasks.map((task, index) =>
        (<li key={index} className={styles.listItem}>
            {index + 1} {(+idEdit !== +task.id) ?
                task.name :
                (<input type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />)
            }
            <div className={styles.buttonContainer}>
                <button
                    className={`${styles.button} ${styles.btnEdit}`}
                    onClick={() => editTask(task.id)}>Edit</button>
                <button
                    className={`${styles.button} ${styles.btnDelete}`}
                    onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
        </li>)
        )
    }

    const editTask = (id) => {
        setIdEdit(id)
        let t = tasks.find((task) => +task.id === +id)
        setName(t.name)
        if (+idEdit === +id) {
            let newTasks = tasks.map((task, index) => {
                if (+task.id === +id)
                    tasks[index].name = name
                return task
            })
            setTasks(newTasks)
            setIdEdit(0)
        }
    }

    const deleteTask = (id) => {
        console.log('Delete', id)
        let newTasks = tasks.filter((task) => task.id !== +id)
        setTasks(newTasks)

    }
    const addTask = () => {
        const id = tasks[tasks.length - 1].id + 1;
        if (tasks.length <= 9 && name !== '') {
            setTasks([...tasks, { id, name }])
        }
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Todo</h1>

            <div className="addContainer">
                <input
                    className={styles.text}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    className={`${styles.button} ${styles.btnAdd}`}
                    onClick={addTask}>Add</button>
            </div>
            <ul className={styles.list}>
                {
                    renderTask()
                }
            </ul>
        </div>
    )

}
export default Todo