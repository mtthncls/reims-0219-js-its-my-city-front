import React from 'react';
import './AppMap.css';
import { connect } from 'react-redux';
import {
  Map, TileLayer, Marker, Popup,
} from 'react-leaflet';

const mapStateToProps = state => ({
  zoom: state.zoom,
  geolocCoordonnees: state.geolocCoordonnees,
  defaultCoordonnees: state.defaultCoordonnees,
  poiSampleDisplay: state.poiSampleDisplay,
  specificPoiInfos: state.specificPoiInfos,
});

const AppMap = ({
  geolocCoordonnees,
  defaultCoordonnees,
  zoom,
  poiSampleDisplay,
  showPoiInfos,
  dispatch,
}) => (
  <Map center={geolocCoordonnees.length ? geolocCoordonnees : defaultCoordonnees} zoom={zoom}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Marker position={geolocCoordonnees.length ? geolocCoordonnees : defaultCoordonnees}>
      <Popup>
        User
      </Popup>
    </Marker>
    {poiSampleDisplay.map(pin => (
      <Marker key={pin.id} onClick={() => showPoiInfos(pin.id)} position={pin.localisation} />
    ))}
  </Map>
);

export default connect(mapStateToProps)(AppMap);
