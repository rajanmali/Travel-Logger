const PopUpCard = ({ entry }) => {
  return (
    <div className="popup-card">
      <h3>{entry.title}</h3>
      <p>{entry.comments}</p>
      <small>
        Visited On:&nbsp;
        <em>{new Date(entry.visitDate).toLocaleDateString()}</em>
      </small>
    </div>
  );
};

export default PopUpCard;
