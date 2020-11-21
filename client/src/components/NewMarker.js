import { Marker } from 'react-map-gl';

import LogEntryForm from './LogEntryForm';
import PopUpToolTip from './PopUpToolTip';

const NewMarker = ({ children, addEntryLocation, closeAddNewEntryPopUp }) => (
  <>
    <Marker
      latitude={addEntryLocation.latitude}
      longitude={addEntryLocation.longitude}
    >
      {children}
    </Marker>
    <PopUpToolTip
      form={true}
      data={addEntryLocation}
      closeAddNewEntryPopUp={closeAddNewEntryPopUp}
    >
      <LogEntryForm />
    </PopUpToolTip>
  </>
);

export default NewMarker;
