import { Marker } from 'react-map-gl';

import LogEntryForm from './LogEntryForm';
import PopUpToolTip from './PopUpToolTip';

const NewMarker = ({
  children,
  addEntryLocation,
  closeAddNewEntryPopUp,
  onSuccessfulEntry,
}) => (
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
      <h3>Add your log entry here</h3>
      <LogEntryForm
        {...addEntryLocation}
        onSuccessfulEntry={onSuccessfulEntry}
      />
    </PopUpToolTip>
  </>
);

export default NewMarker;
