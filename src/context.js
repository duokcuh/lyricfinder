import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { getURL } from './getURL';

export const TrackList = createContext();
export const TracksDispatch = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_TRACKS':
      return {
        ...state,
        trackList: action.payload.trackList,
        heading: action.payload.heading,
        isLoading: false
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: true
      }
    default:
      return state;
  }
}

export const Provider = props => {
  const [trackList, dispatch] = useReducer(reducer, {
    trackList: [],
    heading: 'Top 10 Tracks',
    isLoading: true
  });
  
  useEffect(() => {
    
    const getTrackList = async () => {
      try {
        //set country=xw for worldwide
        const result = await axios.get(getURL({ type: 'GET_TOP', payload: 'us' }));
        dispatch({
          type: 'GET_TRACKS',
          payload: {
            trackList: result.data.message.body.track_list,
            heading: 'Top 10 Tracks'
          }
        });
      } catch (err) { console.log(err) }
    };
    
    getTrackList();
    
  }, []);
  
  return (
    <TrackList.Provider value={trackList}>
      <TracksDispatch.Provider value={dispatch}>
        {props.children}
      </TracksDispatch.Provider>
    </TrackList.Provider>
  );
}