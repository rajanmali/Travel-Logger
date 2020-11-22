import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import { ToastProvider } from 'react-toast-notifications';

import { listLogEntries } from './API';
import {
  darkModeToggle,
  lightModeStyleUrl,
  darkModeStyleUrl,
} from './utils/preferences';

import VisitedMarker from './components/VisitedMarker';
import NewMarker from './components/NewMarker';
import MarkerSVG from './static/MarkerSVG';

export default function App() {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
    overflow: 'hidden',
  });
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState({});

  useEffect(() => {
    (() => {
      getEntries();
    })();
  }, []);

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  const onSuccessfulEntry = () => {
    closeVisitedPopUp();
    closeAddNewEntryPopUp();
    getEntries();
  };

  const closeVisitedPopUp = () => {
    setShowPopup({});
  };

  const closeAddNewEntryPopUp = () => {
    setAddEntryLocation({});
  };

  const showPopUpForVisitedMarker = (id) => {
    setShowPopup({ [id]: true });
    closeAddNewEntryPopUp();
  };

  const closeAllOpenPopUps = () => {
    Object.keys(showPopup).length > 0 && closeVisitedPopUp();
    Object.keys(addEntryLocation).length > 0 && closeAddNewEntryPopUp();
  };

  const showAddMarkerPopUp = (event) => {
    closeVisitedPopUp();
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude,
    });
  };

  return (
    <ToastProvider autoDismiss={true}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onClick={closeAllOpenPopUps}
        onDblClick={showAddMarkerPopUp}
        mapStyle={darkModeToggle ? darkModeStyleUrl : lightModeStyleUrl}
        doubleClickZoom={false}
      >
        {logEntries?.[0] &&
          logEntries.map((entry) => {
            return (
              <VisitedMarker
                key={entry._id}
                entry={entry}
                showPopup={showPopup}
                showPopUpForVisitedMarker={showPopUpForVisitedMarker}
                closeVisitedPopUp={closeVisitedPopUp}
                onSuccessfulEntry={onSuccessfulEntry}
              >
                <MarkerSVG viewport={viewport} />
              </VisitedMarker>
            );
          })}
        {Object.keys(addEntryLocation).length > 0 && (
          <NewMarker
            addEntryLocation={addEntryLocation}
            closeAddNewEntryPopUp={closeAddNewEntryPopUp}
            onSuccessfulEntry={onSuccessfulEntry}
          >
            <MarkerSVG viewport={viewport} altStroke={true} />
          </NewMarker>
        )}
      </ReactMapGL>
    </ToastProvider>
  );
}
