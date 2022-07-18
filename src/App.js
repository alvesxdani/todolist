import './global.css'
import './style.css'
import { BiPlus } from "react-icons/bi";
import { BiXCircle } from "react-icons/bi";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleCreateTask() {
    if (task === "") {
      toast.error("Digite alguma task!");
    } else {
      toast.success("Adicionado com sucesso!");

      const idRandom = (num) => Math.floor(Math.random() * num);
      const newTask = {
        id: idRandom(123456),
        title: task,
        isComplete: false,
      }

      setTasks([...tasks, newTask]);
    }
  }

  function handleToggleTaskCompletion(id) {
    const taskComplete = tasks.map(task => {
      if (task.id === id) {
        return {...task, isComplete: !task.isComplete} 
      }
      return task;
    })
    setTasks(taskComplete);
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter(remove => remove.id !== id))
  }


  return (
    <div className="app">

      <ToastContainer />

      <div className='todo'>
        <header>
          <input type="text" placeholder="Digite sua tarefa" value={task} onChange={(ev) => setTask(ev.target.value)} />
          <button onClick={handleCreateTask}><BiPlus /></button>
        </header>

        {tasks.map(task => (
          <div key={task.id} className={task.isComplete ? 'task-container completed' : 'task-container'}>
            <div className='check-and-title'>
              <label className='checkbox-container'>
                <input onClick={() => handleToggleTaskCompletion(task.id)} type="checkbox" />

                <span className='checkmark'></span>
              </label>

              <p>{task.title}</p>
            </div>

            <div>
              <BiXCircle onClick={() => handleDeleteTask(task.id)} />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
