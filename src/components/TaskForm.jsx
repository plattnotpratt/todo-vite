import { useState } from "react";
import { URI_TASK_ENDPOINT } from "../lib/Constants";

// eslint-disable-next-line react/prop-types
function TaskForm({setTasks, tasks}){
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URI_TASK_ENDPOINT}tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          mode: 'cors',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(tasks, data);
        setTasks([...tasks, data]);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error(error)
    }
  };
  return(
    <div className="task-form">
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add Task</button>
    </form>
    </div>
  );
}

export default TaskForm