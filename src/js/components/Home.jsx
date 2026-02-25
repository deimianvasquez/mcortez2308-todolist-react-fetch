import React, { useState, useEffect } from "react";

/* Este codigo es con API */
const Home = () => {
	const [tarea, setTarea] = useState({
		label: "",
		is_done: false
	});

	const [todolist, setTodoList] = useState([]);

	const getTareas = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/mcortez");
			const data = await response.json();
			if (response.ok) {
				setTodoList(data.todos);
			}
			if (response.status === 404) {
				console.log("Usuario no encontrado");
				// Crear un nuevo usuario
			}

		} catch (error) {
			console.error("Error al obtener las tareas:", error);
		}

	}

	function handleChange(event) {
		setTarea({
			...tarea,
			[event.target.name]: event.target.value
		});
	}

	async function agregarTarea(event) {
		try {
			if (event.key === "Enter") {
				if (tarea.label.trim() === "") {
					alert("Por favor, ingresa una tarea válida.");
					return;
				}

				const response = await fetch("https://playground.4geeks.com/todo/todos/mcortez", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tarea)
				});

				setTarea({
					label: "",
					is_done: false
				});

				if (response.ok) {
					getTareas();
				}
			}
		} catch (error) {

		}
	}

	const eliminarTarea = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
				method: "DELETE"
			});

			if (response.ok) {
				getTareas();
			}
		}
		catch (error) {
			console.error("Error al eliminar la tarea:", error);
		}
	}

	useEffect(() => {
		getTareas();
	}, []);

	return (
		<div className="container display-flex justify-content-center">
			<div className="row">
				<div className="col-12 col-md-6">
					<h1>Mi Lista de Tareas</h1>
					<input className="inputtext"
						type="text"
						name="label"
						placeholder="Agrega la tarea"
						value={tarea.label}
						onChange={handleChange}
						onKeyDown={agregarTarea} />
				</div>

				<ul>
					{
						todolist.length <= 0 ? (
							<li>No hay tareas</li>
						) : (
							todolist.map((tarea, index) => (
								<li key={index}>
									{tarea.label}
									<span>{tarea.is_done ? "✔️" : "❌"}</span>
									<span className="delete-signal" onClick={() => eliminarTarea(tarea.id)}>
										<i className="fa-regular fa-trash-can"></i>
									</span>
								</li>
							))
						)
					}
				</ul>
			</div>
		</div>
	)

}



/* Este codigo es Sin llamado a API
const Home = () => {
	
	const [inputValue, setInputValue] = useState("");
	const [todolist, setTodoList] = useState([]);

	function handleChange(event) {
		setInputValue(event.target.value)
	}

	function addTask(event) {
		if (event.key == "Enter") {
			if (inputValue.trim() === "") {
				alert("Por favor, ingresa una tarea válida.");
				return
			};

			setTodoList([
				...todolist,
				inputValue
			]
			)

			setInputValue("");
		}

	}

	function removeTask(index) {
		const newTodoList = [...todolist];
		newTodoList.splice(index, 1);
		setTodoList(newTodoList);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<input className="inputtext"
						type="text"
						placeholder="Agregar Tarea"
						value={inputValue}
						onChange={handleChange}
						onKeyDown={addTask} />
					<ul>
						{
							todolist.map((task, index) => {
								return <li key={index}>
									{task}
									<span className="remove-task"
										onClick={() => removeTask(index)}>
										X
									</span>
								</li>
							})
						}
					</ul>
				</div>
			</div>
		</div>
	);
	
};
*/

export default Home;