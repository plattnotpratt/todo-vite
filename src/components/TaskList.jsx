import { URI_TASK_ENDPOINT } from "../lib/Constants";
import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";


import Task from "./Task";

function TaskList(){
  const [tasks, setTasks] = useState([]);

  useEffect( () => {
    async function fetchData(){
      setTasks( await getTasks());
    }
    fetchData();
    console.log(tasks);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const deleteTask = async (id) =>{
    try{
      const response = await fetch(`${URI_TASK_ENDPOINT}tasks/${id}`, {
        method: "DELETE",
        headers:{
          "Content-Type": "application/json",
          mode: 'cors',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if(response.ok){
        console.log(response.json());
        setTasks( await getTasks());
      }else{
        //do nothing  
      }
    }catch(error){
      console.error(error.message);
    }
  }

  const getTasks = async () => {
    try {
      const response = await fetch(`${URI_TASK_ENDPOINT}tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          mode: 'cors',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        return data;
      } else {
        const errorData = await response.json();
        
        console.log(errorData);
      }
    } catch (error) {
      console.error(error)
    }
  };
  return(
    <>
      <TaskForm setTasks={setTasks} tasks={tasks}></TaskForm>
      <div className="task-list">
        {tasks.map((task) => <Task key={task.id} content={task} deleteTask={deleteTask}></Task>)}
      </div>
    </>
  );
}

export default TaskList;