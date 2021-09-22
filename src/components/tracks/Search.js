import { useContext, useState } from 'react';
import { TracksDispatch } from '../../context';
import axios from 'axios';
import { getURL } from '../../getURL';

export const Search = () => {
  const [trackTitle, setTrackTitle] = useState('');
  const dispatch = useContext(TracksDispatch);
  
  const findTrack = async e => {
    e.preventDefault();
    if (!trackTitle) return;
    try {
      dispatch({ type: 'LOADING' });
      let result = await axios.get(getURL({ type: 'SEARCH', payload: trackTitle }));
      let trackList = result.data.message.body.track_list;
      let heading = 'Search Results';
      if (trackList.length === 0) heading = 'No Search Results';
      dispatch({
        type: 'GET_TRACKS',
        payload: { trackList, heading }
      });
      setTrackTitle('');
    } catch (err) { console.log(err) }
  };
  
  const onChange = e => setTrackTitle(e.target.value);
  
  return (
    <div className="card card-body mb-4 pb-4">
      <h1 className="display-4 text-center">
        <i className="fas fa-music" /> Search For A Song
      </h1>
      <p className="lead text-center">Get the lyrics for any song</p>
      <form className="d-grid" onSubmit={findTrack}>
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