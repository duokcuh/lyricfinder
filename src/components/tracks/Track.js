import { Link } from 'react-router-dom';

export const Track = ({ track }) => {
  
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body d-grid">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong><i className="fas fa-play" /> Track</strong>: {track.track_name}
            <br />
            <strong><i className="fas fa-compact-disc" /> Album</strong>: {track.album_name}
          </p>
          <Link to={`lyrics/track/${track.track_id}`} className="btn btn-dark">
            <i className="fas fa-chevron-right" /> View Lyrics
          </Link>
        </div>
      </div>
    </div>
  );
};
