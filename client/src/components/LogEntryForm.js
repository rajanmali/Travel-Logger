import { useForm } from 'react-hook-form';

const LogEntryForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <h3>Add your log entry here</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
        <label htmlFor="title">Title:&nbsp;</label>
        <input type="text" name="title" ref={register} required aria-required />
        <label htmlFor="comments">Comments:&nbsp;</label>
        <textarea name="comments" rows={3} ref={register} />
        <label htmlFor="description">Description:&nbsp;</label>
        <textarea name="description" rows={3} ref={register} />
        <label htmlFor="image">Image:&nbsp;</label>
        <input type="file" name="image" ref={register} />
        <label htmlFor="visitDate">Visit Date:&nbsp;</label>
        <input
          type="date"
          name="visitDate"
          required
          aria-required
          ref={register}
        />
        <button>Register Travel Log</button>
      </form>
    </>
  );
};

export default LogEntryForm;
