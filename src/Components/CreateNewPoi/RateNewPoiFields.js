import React from 'react';
import { connect } from 'react-redux';
import '../ComponentsCSS/createPoiForm.scss';
import PoiRating from './PoiRating';

const mapStateToProps = state => ({
  conditionRating: state.pois.conditionRating,
  operationRating: state.pois.operationRating,
  accessibilityRating: state.pois.accessibilityRating,
  canClickOnStars: state.pois.canClickOnStars,
});

const RateNewPoiFields = ({
  conditionRating, operationRating, accessibilityRating, dispatch, canClickOnStars,
}) => {
  const PoiEvaluations = [
    { title: 'Note d\'état:', type: 'RATING_CONDITION_CHANGE', rating: conditionRating },
    { title: 'Note de fonctionnement', type: 'RATING_OPERATION_CHANGE', rating: operationRating },
    { title: 'Note d\'accessibilité', type: 'RATING_ACCESSIBILITY_CHANGE', rating: accessibilityRating },
  ];
  return (
    <div className="poi-create">
      {PoiEvaluations.map(PoiEvaluation => (
        <PoiRating
          key={PoiEvaluation.title}
          title={PoiEvaluation.title}
          type={PoiEvaluation.type}
          rating={PoiEvaluation.rating}
          dispatch={dispatch}
          canClick={canClickOnStars}
        />
      )) }
    </div>
  );
};

export default connect(mapStateToProps)(RateNewPoiFields);