import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

export const TrackList = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results'
      };
    case 'GET_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Top 10 Tracks'
      }
    default:
      return state;
  }
}

export const Provider = props => {
  const [state, dispatch] = useReducer(reducer, {
    track_list: [],
    heading: ''
  });
  
  useEffect(() => {
    //api: https://developer.musixmatch.com/documentation
    //set country=xw for worldwide
    axios.get(
      `https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => {
        dispatch({
          type: 'GET_TRACKS',
          payload: res.data.message.body.track_list
        });
      })
      .catch(err => console.log(err))
  }, []);
  
  return (
    <TrackList.Provider value={{ state, dispatch }}>
      {props.children}
    </TrackList.Provider>
  );
}