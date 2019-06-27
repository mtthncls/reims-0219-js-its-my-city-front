import React from 'react';
import './ComponentsCSS/FilterComponent.scss';
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
  specificPoiInfos: state.specificPoiInfos,
  poiKeywordsDisplay: state.poiKeywordsDisplay,
  filterKeywordPageDisplay: state.filterKeywordPageDisplay,
  isKeywordOneChoosen: state.isKeywordOneChoosen,
  specificSecondKeyword: state.specificSecondKeyword,
  isDisplayedFirstIndication: state.isDisplayedFirstIndication,
  isDisplayedSecondIndication: state.isDisplayedSecondIndication,
  isKeywordTwoChoosen: state.isKeywordTwoChoosen,
  secondKeyword: state.secondKeyword,
});

const onlyKeywordsFirstImportance = keywords => keywords.filter(
  keyword => keyword.importance === 1,
);

const selectRightKeywordChildren = (specificKeyword, poiKeywordsDisplay) => poiKeywordsDisplay.filter(keyword => keyword.parent_id === specificKeyword.id);


const FilterComponent = ({
  dispatch, poiKeywordsDisplay, isKeywordOneChoosen, specificSecondKeyword,
  isDisplayedFirstIndication, isDisplayedSecondIndication, isKeywordTwoChoosen,
  secondKeyword,
}) => (
  <div className="filterComponent">
    <button onClick={() => dispatch({ type: 'CLOSE_FILTER_COMPONENT' })} type="button">X</button>
    <h1 className="categories">Catégories</h1>
    <div className="buttonContainer">
      <button className="filterButton1 buttonStyle" type="button">Points d'intérêts</button>
      <button className="filterButton2 buttonStyle" type="button">Événements</button>
    </div>
    <h1 className="themes">Thèmes</h1>
    {isDisplayedFirstIndication === true && <p className="selectTheme">Veuillez selectionner un thème</p>}

    <div className="allKeywords">
      <div className="keywordsOfFirstImportance">
        {onlyKeywordsFirstImportance(poiKeywordsDisplay).map(keyword => (
          <button
            type="button"
            className="buttonStyle"
            key={keyword.name}
            onClick={() => dispatch({
              type: 'SHOW_SECOND_IMPORTANCE_KEYWORD',
              specificSecondKeyword: selectRightKeywordChildren(keyword, poiKeywordsDisplay),
            })}
          >
            {keyword.name}

          </button>
        ))}
      </div>


      <div>
        {isDisplayedSecondIndication === true && <p className="selectSecondTheme">Affinez votre recherche</p>}
      </div>

      <div className="keywordsOfSecondImportance">
        {isKeywordOneChoosen === true && specificSecondKeyword.map(keyword => (
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
    </div>

    <div className="applyButton">
      {isKeywordTwoChoosen === true && (
        <button
          type="button"
          className="buttonStyle"
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
);


export default connect(mapStateToProps)(FilterComponent);
