import { useEffect, useState } from 'react';
import Card from '../../components/Home/card';
import Input_panel from '../../components/UI/input_panel';
import Popup from '../../components/UI/popup';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {Container, Info, Main, Tasks, Loading} from './../../styles/home';

export default function Home() {
  const [tasks, setTasks] = useState(null);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);
  const user = localStorage.getItem('username')
  const axiosPrivate = useAxiosPrivate();

  useEffect(()=> {
    setDescription('')
    setProgress(0)
  }, [popup])

  useEffect(async ()=> {
    try{
      const res = await axiosPrivate.get('/task')
      setTasks(res.data)
      setLoading(false)
    }
    catch(error){
      console.log(error)

    }
  }, [])
  
  const handleSumit = async (event) => {
    event.preventDefault();
    window.location.reload()
    try {
      await axiosPrivate.post('/task', {
        description, progress
      })
    } 
    catch (error) {
      console.log(error)
    }

  }
  return (
    loading ? <Loading> loading </Loading> : (
    <Container>
      <Main>
        <Info>
          <p className='name'>Welcome back, {user}</p>
          <p className='caption'>There are {tasks.filter(task=>task.progress<100).length} tasks not finished yet!</p>
        </Info>
      <button className='create-task'onClick={()=> setPopup(true)}>Create Task</button>
      <br/>
      <Tasks>
      {tasks.map((task, index)=> {
        return <Card key={index} _id={task._id} description={task.description} progress={task.progress}/>
      })}
      </Tasks>
      </Main>

      <Popup trigger={popup} setTrigger={setPopup}>
        <form onSubmit={handleSumit}>
          <h2>Create</h2>
          <Input_panel
            text="Description"
            htmlFor="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type="text"
          />
          <Input_panel
            text="Progress"
            htmlFor="Progress"
            type="range"
            value={progress}
            onChange={(event) => setProgress(event.target.value)}
            min="0"
            max="100"
          />
          <button> Create </button>
        </form>
      </Popup>
    </Container>)
  );
}
