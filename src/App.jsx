import { useState, useEffect } from 'react'
import './App.css';
import { URI_VALIDATE_ENDPOINT } from "./lib/Constants";
import Login from './components/Login'
import Header from './components/Header';
import Footer from './components/Footer';
import TaskList from './components/TaskList';
// import { URI_TASK_ENDPOINT } from './lib/Constants'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  // const [tasks, setTasks] = useState([]);

  const validateToken = async () => {
    const response = await fetch(`${URI_VALIDATE_ENDPOINT}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "mode": 'cors',
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok){
      setIsLogin(true);
    } else{
      setIsLogin(false);
    }
  };
  useEffect(() => {
    validateToken();

  },[isLogin]);  

  if(!isLogin){
    return (
      <>
        <Login></Login>
      </>
    )
  }else{
    return (
      <>
      <Header/>
        <div className="task-list-wrapper">
          <TaskList></TaskList>
        </div>
        <Footer/>
      </>
    );
  }

  
}

export default App
