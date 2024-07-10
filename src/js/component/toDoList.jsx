import React, { useState, useEffect } from "react";
import Tasks from "./tasks";
//create your first component


const ToDoList = () => {

	const [tasksList, setTasksList] = useState([])
	const [task, setTasks] = useState('')
	const [user, setUser] = useState('Agustin')

	const addTasks = (e) => {
		if (e.key === 'Enter' && task !== '') {
			console.log('Inició el fetch de addTask')
			fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(
					{
						"label": task,
						"is_done": false
					}
				)
			}).then((response) => {
				console.log(`staus:`, response.status)
				if(response.status === 201){
					getList()
				}
			})
			console.log('Finalizó el fetch de addTask')
			setTasks('')
		}
	}

	const readTask = (e) => {
		setTasks(e.target.value)
	}
	const createUser = () => {
		console.log('Inició el fetch de createUser')
		fetch(`https://playground.4geeks.com/todo/users/${user}`, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => {
			console.log(`staus:`, res.status)
		})
		console.log('Finalizó el fetch de createUser')
	}

	const getList = () => {
		console.log('Inicio del fetch de getList')
		fetch(`https://playground.4geeks.com/todo/users/${user}`, {})
			.then((res) => {
				console.log(`staus:`, res.status)
				if (res.status === 404) {
					console.log('La lista de ese usuario no existe')
					createUser()
				} else if (res.status === 200) {
					return res.json()
				}
			})
			.then((data) => {
				setTasksList(data.todos)
			}).catch((error) => console.log(error))
			console.log('Finalizó el fetch de getList')
	}
	useEffect(() => {
		getList()
	}, [])

	return (

		<div className="container col-6 mt-5">
			<h1 className="display-1 text-secondary">ToDoList</h1>
			<input className="form-control mb-1" type="text" placeholder="Add tasks" onChange={readTask} onKeyDown={addTasks} value={task} />
			<Tasks tasksList={tasksList} getList={getList}/>
			<div className="items-left">
				{tasksList.length} item{tasksList.length !== 1 ? 's' : ''} left
			</div>
		</div>

	);
};

export default ToDoList;


