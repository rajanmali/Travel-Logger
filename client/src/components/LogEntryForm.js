const LogEntryForm = () => {
  return (
    <>
      <h3>Add your log entry here</h3>
      <form className="entry-form">
        <label htmlFor="title">Title:&nbsp;</label>
        <input type="text" name="title" />
        <label htmlFor="comments">Comments:&nbsp;</label>
        <textarea name="comments" rows={3} />
        <label htmlFor="description">Description:&nbsp;</label>
        <textarea name="description" rows={3} />
        <label htmlFor="image">Image:&nbsp;</label>
        <input type="file" name="image" />
        <label htmlFor="visitDate">Visit Date:&nbsp;</label>
        <input type="date" name="visitDate" />
      </form>
    </>
  );
};

export default LogEntryForm;
