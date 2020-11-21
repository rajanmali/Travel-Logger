import React from 'react';
import { Marker } from 'react-map-gl';
import PopUpToolTip from './PopUpToolTip';
import PopUpCard from './PopUpCard';

const VisitedMarker = ({
  children,
  entry,
  showPopup,
  showPopUpForVisitedMarker,
  closeVisitedPopUp,
  onSuccessfulEntry,
}) => (
  <React.Fragment key={entry._id}>
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
        <PopUpCard entry={entry} onSuccessfulEntry={onSuccessfulEntry} />
      </PopUpToolTip>
    )}
  </React.Fragment>
);

export default VisitedMarker;
