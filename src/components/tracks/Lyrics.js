import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

const Lyrics = props => {
  const [state, setState] = useState({
    track: {},
    lyrics: ''
  });
  
  useEffect(() => {
    let track;
    //api: https://developer.musixmatch.com/documentation
    //set country=xw for worldwide
    axios.get(
      `https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}
&apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => {
        track = res.data.message.body.track;
        return axios.get(
          `https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}
&apikey=${process.env.REACT_APP_API_KEY}`
        );
      })
      .then(res => {
        setState({
          track,
          lyrics: res.data.message.body.lyrics?.lyrics_body || 'Unfortunately the lyrics are not available'
        });
      })
      .catch(err => console.log(err))
  }, [props]);
  
  const { track, lyrics } = state;
  if (track === undefined || lyrics === undefined || Object.keys(track).length === 0) {
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

export default Lyrics;