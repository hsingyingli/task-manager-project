import {useState, useEffect} from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import 'react-circular-progressbar/dist/styles.css';
import {Container} from './card_style';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import Input_panel from '../UI/input_panel';
import Popup from '../UI/popup';

export default function Card(props) {
  const [popup, setPopup] = useState(false);
  const [description, setDescription] = useState(props.description);
  const [progress, setProgress] = useState(props.progress);
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(()=> {
    setDescription(props.description)
    setProgress(props.progress)
  }, [popup])



  const handleDelete = async () => {
    window.location.reload()
    try {
      await axiosPrivate.delete(`/task/${props._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSumit = async (event) => {
    event.preventDefault();
    window.location.reload()
    try {
      await axiosPrivate.patch(`/task/${props._id}`, {description, progress});
    } catch (error) {
      console.log(error);
    }

    setPopup(false);
  };

  return (
    <Container>
      <div className="edit">
        <AiOutlineEdit className="update" onClick={() => setPopup(true)} />
        <AiOutlineDelete className="delete" onClick={handleDelete} />
      </div>
      <div className="description">{props.description}</div>
      <div className="progress-container">
        <div className="progress-bar">
          <CircularProgressbar
            value={props.progress}
            text={`${props.progress}%`}
          />
        </div>
      </div>

      <Popup trigger={popup} setTrigger={setPopup}>
        <h2>Edit</h2>
        <form onSubmit={handleSumit}>
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
          <button> Update </button>
        </form>
      </Popup>
    </Container>
  );
}
