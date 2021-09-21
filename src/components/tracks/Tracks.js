import { useContext } from 'react';
import { TrackList } from '../../context';
import Spinner from '../layout/Spinner';
import { Track } from './Track';

export const Tracks = () => {
  const { state } = useContext(TrackList);
  const { track_list, heading } = state;
  
  if (track_list.length === 0) {
    return <Spinner />
  } else {
    return (
      <>
        <h3 className="text-center mb-4">{heading}</h3>
        <div className="row">
          {track_list.map(item => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
      </>
    )
  }
}