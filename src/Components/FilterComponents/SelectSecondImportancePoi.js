import React from 'react';
import { connect } from 'react-redux';
import '../ComponentsCSS/FilterComponent.scss';
import axios from 'axios';


const mapStateToProps = state => ({
  isKeywordOneChoosen: state.pois.poiKeywordsDisplay,
  specificSecondKeywords: state.pois.specificSecondKeywords,
  isKeywordTwoChoosen: state.pois.isKeywordTwoChoosen,
  filteredPoiByKeyword: state.pois.filteredPoiByKeyword,
  secondIndicationIsDisplayed: state.pois.secondIndicationIsDisplayed,
  secondKeyword: state.pois.secondKeyword,
});

const SelectSecondImportancePoi = ({
  dispatch, isKeywordOneChoosen, secondIndicationIsDisplayed, specificSecondKeywords,
  isKeywordTwoChoosen, secondKeyword,
}) => (
  <div className="secondFilterPage">

    <button
      type="button"
      className="closeButton"
      onClick={() => dispatch({ type: 'CLOSE_SECOND_IMPORTANCE_KEYWORDS' })}
    >
        X
    </button>

    <div className="selectSecondTheme">
      {secondIndicationIsDisplayed && <p>Affinez votre recherche</p>}
    </div>

    <div className="keywordsOfSecondImportance">
      {isKeywordOneChoosen && specificSecondKeywords.map(keyword => (
        <button
          type="button"
          className="buttonStyle"
          key={keyword.name}
          onClick={() => dispatch({ type: 'APPLY_BUTTON', secondKeyword: keyword.name })
      }
        >
          {keyword.name}

        </button>
      ))}
    </div>

    <div>
      <button
        className="previousButton"
        type="button"
        onClick={() => dispatch({ type: 'GO_BACK_TO_FIRST_IMPORTANCE_KEYWORDS' })}
      >
      Précédent
      </button>
      <div className="applyButton">
        {isKeywordTwoChoosen === true && (
        <button
          type="button"
          className="applyButtonStyle"
          onClick={() => axios.get(`${process.env.REACT_APP_API_URL}/pois/filter/${secondKeyword}`)
            .then(res => dispatch({ type: 'HANDLE_KEYWORD_FILTERING', filteredPoiByKeyword: res.data, poiSampleDisplay: [] }))
      }
        >
        Appliquer
        </button>
        )
        }
      </div>
    </div>
  </div>
);


export default connect(mapStateToProps)(SelectSecondImportancePoi);
