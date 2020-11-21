import { Popup } from 'react-map-gl';

const PopUpToolTip = ({
  children,
  data,
  form,
  closeVisitedPopUp,
  closeAddNewEntryPopUp,
}) => {
  return (
    <Popup
      latitude={data.latitude}
      longitude={data.longitude}
      closeButton={true}
      closeOnClick={false}
      onClose={form ? closeAddNewEntryPopUp : closeVisitedPopUp}
      anchor="top"
    >
      <div className="popup-card">{children}</div>
    </Popup>
  );
};

export default PopUpToolTip;
