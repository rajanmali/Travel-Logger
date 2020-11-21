import { useToasts } from 'react-toast-notifications';
import { deleteLogEntry } from '../API';

const PopUpCard = ({ entry, onSuccessfulEntry }) => {
  const { addToast } = useToasts();

  const handlePostDelete = async (id) => {
    try {
      const response = await deleteLogEntry({ id });
      onSuccessfulEntry();
      addToast(response.message, { appearance: 'success' });
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
    }
  };
  return (
    <>
      <div className="card-details">
        {entry.image && (
          <img src={entry.image} alt="Card" className="card-image" />
        )}
        <h3>{entry.title}</h3>
        <p>{entry.comments}</p>
        <p>
          Visited On:&nbsp;
          <em>{new Date(entry.visitDate).toLocaleDateString()}</em>
        </p>
        <button onClick={() => handlePostDelete(entry._id)}>Delete Log</button>
      </div>
    </>
  );
};

export default PopUpCard;
