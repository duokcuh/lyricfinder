import { useContext, useState } from 'react';
import { Context } from '../../context';
import axios from 'axios';

const Search = () => {
  const [trackTitle, setTrackTitle] = useState('');
  const { dispatch } = useContext(Context);
  
  const findTrack = e => {
    e.preventDefault();
    
    axios.get(
      `https://cors-access-allow.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        })
        setTrackTitle('');
      })
      .catch(err => console.log(err))
  }
  
  const onChange = e => setTrackTitle(e.target.value);
  
  return (
    <div className="card card-body mb-4 pb-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form
        className="d-grid"
        onSubmit={findTrack}
      >
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Song title..."
            name="trackTitle"
            value={trackTitle}
            onChange={onChange}
          />
        </div>
        <button className="btn btn-primary btn-lg mb-5" type="submit">
          Get Track Lyrics
        </button>
      </form>
    </div>
  );
}

export default Search;