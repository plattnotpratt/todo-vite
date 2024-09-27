/* eslint-disable react/prop-types */
import { useState } from "react";
import { URI_TASK_ENDPOINT } from "../lib/Constants";



function Task({content, deleteTask}) {

  const [message, setMessage] = useState("");
  const [completed, setCompleted] = useState(content.completed);
  const [task, setTask] = useState(content);
  const [updated, setUpdated] = useState(new Date(content.updatedAt));
  
  const toggleTask = async (id) => {
    try{
      const response = await fetch(`${URI_TASK_ENDPOINT}tasks/toggle/${id}`, {
        method: "PUT",
        headers:{
          "Content-Type": "application/json",
          mode: 'cors',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });
      if(response.ok){
        const task = await response.json();
        setCompleted(task.completed);
        setUpdated(new Date(task.updatedAt))
        setTask(task);
      }else{
        //do nothing  
      }
    }catch(error){
      console.error(error.message);
      setMessage("Network Error: Unable to toggle. Please Try again later.")
    }

  }
  return (
    <>
      <div className="task-item">
        <div className="task-item-content" onClick={()=>{toggleTask(task.id);}}>
          <span className={completed ? 'strike':''}><strong>{task.title}</strong>: {task.description}</span>
          <div className="updated-at">{updated.toLocaleDateString()} {updated.toLocaleTimeString()}</div>
        </div>
        
        <div><button className="delete-button" onClick={() => {deleteTask(task.id)}}>Delete</button></div>

      </div>
      <p>{message}</p>
    </>
  );
}

export default Task