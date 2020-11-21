import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import { createLogEntry } from '../API';

const LogEntryForm = ({ longitude, latitude, onSuccessfulEntry }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();
  const { addToast } = useToasts();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = latitude;
      data.longitude = longitude;
      const created = await createLogEntry(data);
      addToast(created.message, { appearance: 'success' });
      onSuccessfulEntry();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      {error && <h3 className="error">{error}</h3>}
      <label htmlFor="title">Title:&nbsp;</label>
      <input
        type="text"
        name="title"
        ref={register}
        disabled={loading}
        required
        aria-required
      />
      <label htmlFor="rating">Rating:&nbsp;</label>
      <input
        type="number"
        name="rating"
        min={0}
        max={10}
        defaultValue={0}
        ref={register}
        disabled={loading}
      />
      <label htmlFor="comments">Comments:&nbsp;</label>
      <textarea name="comments" rows={3} ref={register} disabled={loading} />
      <label htmlFor="description">Description:&nbsp;</label>
      <textarea name="description" rows={3} ref={register} disabled={loading} />
      <label htmlFor="image">Image:&nbsp;</label>
      <input type="text" name="image" ref={register} disabled={loading} />
      <label htmlFor="visitDate">Visit Date:&nbsp;</label>
      <input
        type="date"
        name="visitDate"
        required
        aria-required
        ref={register}
        disabled={loading}
      />
      <button disabled={loading}>
        {loading ? 'Loading...' : 'Register Travel Log'}
      </button>
    </form>
  );
};

export default LogEntryForm;
