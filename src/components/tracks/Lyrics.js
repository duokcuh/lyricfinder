import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';
import { getURL } from '../../getURL';

export const Lyrics = props => {
  const [state, setState] = useState({
    track: {},
    lyrics: '',
    isLoading: true
  });
  
  useEffect(() => {
    
    const getTracks = async () => {
      try {
        let result = await axios.get(getURL({type: 'GET_TRACK', payload: props.match.params.id}));
        let track = result.data.message.body.track;
        let lyrics = 'Unfortunately the lyrics are not available';
        if (track.has_lyrics) {
          result = await axios.get(getURL({type: 'GET_LYRICS', payload: props.match.params.id}));
          lyrics = result.data.message.body.lyrics.lyrics_body;
        }
        setState({ track, lyrics, isLoading: false });
      } catch (err) { console.log(err) }
    };
    
    getTracks();
    
  }, [props]);
  
  const { track, lyrics, isLoading } = state;
  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
        <Link to="/" className="btn btn-dark btn-sm mb-4">Go Back</Link>
        <div className="card">
          <h5 className="card-header">
            {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
          </h5>
          <div className="card-body">
            <p className="card-text">{lyrics}</p>
          </div>
        </div>
        
        <ul className="list-group mt-3">
          <li className="list-group-item">
            <strong>Album ID</strong>: {track.album_id}
          </li>
          <li className="list-group-item">
            <strong>Song Genre</strong>:{' '}
            {track.primary_genres.music_genre_list[0]?.music_genre.music_genre_name || 'No info'}
          </li>
          <li className="list-group-item">
            <strong>Explicit Words</strong>: {track.explicit === 0 ? 'No' : 'Yes'}
          </li>
          <li className="list-group-item">
            {/*use module Moment for date format*/}
            <strong>Updated Time</strong>: <Moment format="DD.MM.YYYY">{track.updated_time}</Moment>
          </li>
        </ul>
      </>
    );
  }
}