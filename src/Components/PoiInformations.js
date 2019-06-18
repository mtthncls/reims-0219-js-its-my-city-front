import React from 'react';
import './ComponentsCSS/PoiInformation.scss';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  specificPoiInfos: state.specificPoiInfos,
  InformationPoiInfos: state.InformationPoiInfos,
});

const PoiInformation = ({ dispatch, specificPoiInfos, InformationPoiInfos }) => (
  <div
    className={InformationPoiInfos ? 'informationPage' : 'informationPages'}
    onClick={() => dispatch({ type: 'TRANSITION_POI_INFOS', InformationPoiInfos: !InformationPoiInfos })}
    onKeyPress={this.handleKeyPress}
    role="button"
    tabIndex={0}
  >
    <button
      className="closeButton"
      type="button"
      onClick={() => {
        dispatch({ type: 'CLOSE_POI_INFOS', specificPoiInfos: [] });
        dispatch({ type: 'TRANSITION_POI_INFOS', InformationPoiInfos: true });
      }}
    >
X
    </button>
    <h1>{specificPoiInfos.name}</h1>
    <hr />
    <p>Adresse</p>
    <p>code postal ville</p>
    <p>Distance</p>
    <div>
      <img src={specificPoiInfos.picture_url} alt="table ping pong" />
    </div>
    <div className="informationUser">
      <p>{specificPoiInfos.author}</p>
      <p>
          le
        {specificPoiInfos.creation_date}
      </p>
    </div>
    <div className="grades">
      <hr />
      <h2>Informations complémentaires</h2>
      <p>
        Note moyenne :
        {specificPoiInfos.grades.average}
      </p>
      <p>
        Accessibilité :
        {specificPoiInfos.grades.accessibility}
      </p>
      <p>
        Etat :
        {specificPoiInfos.grades.condition}
      </p>
      <p>
        Fonctionnalité :
        {specificPoiInfos.grades.functional}
      </p>
    </div>
  </div>
);

export default connect(mapStateToProps)(PoiInformation);
