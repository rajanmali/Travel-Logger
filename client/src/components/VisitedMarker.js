import { Marker } from 'react-map-gl';
import PopUpToolTip from './PopUpToolTip';
import PopUpCard from './PopUpCard';

const VisitedMarker = ({
  children,
  entry,
  showPopup,
  showPopUpForVisitedMarker,
  closeVisitedPopUp,
}) => (
  <div key={entry._id}>
    <Marker latitude={entry.latitude} longitude={entry.longitude}>
      <div
        onClick={() => {
          showPopUpForVisitedMarker(entry._id);
        }}
        style={{ cursor: 'pointer' }}
      >
        {children}
      </div>
    </Marker>
    {showPopup[entry._id] && (
      <PopUpToolTip data={entry} closeVisitedPopUp={closeVisitedPopUp}>
        <PopUpCard entry={entry} />
      </PopUpToolTip>
    )}
  </div>
);

export default VisitedMarker;
