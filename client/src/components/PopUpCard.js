import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { deleteLogEntry } from '../API';

const PopUpCard = ({ entry, onSuccessfulEntry }) => {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteID, setDeleteID] = useState('');

  const { register, handleSubmit } = useForm();
  const { addToast } = useToasts();

  const handlePostDelete = async (data) => {
    try {
      setLoading(true);
      const response = await deleteLogEntry({ id: deleteID, ...data });
      onSuccessfulEntry();
      addToast(response.message, { appearance: 'success' });
    } catch (error) {
      setLoading(false);
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
        {toggleDelete && (
          <>
            <form
              className="entry-form"
              onSubmit={handleSubmit(handlePostDelete)}
            >
              <label htmlFor="apiKey">API Key:&nbsp;</label>
              <input
                type="password"
                name="apiKey"
                ref={register}
                disabled={loading}
                required
                aria-required
              />
              <button>Confirm</button>
            </form>
          </>
        )}
        <button
          onClick={() => {
            if (toggleDelete) {
              setDeleteID('');
              setToggleDelete(false);
            } else {
              setDeleteID(entry._id);
              setToggleDelete(true);
            }
          }}
        >
          {toggleDelete ? 'Cancel' : 'Delete Log'}
        </button>
      </div>
    </>
  );
};

export default PopUpCard;
