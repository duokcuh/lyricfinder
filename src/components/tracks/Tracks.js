import { useContext } from 'react';
import { TrackList } from '../../context';
import Spinner from '../layout/Spinner';
import { Track } from './Track';

export const Tracks = () => {
  const { trackList, heading, isLoading } = useContext(TrackList);
  
  if (isLoading) {
    return <Spinner />
  } else {
    return (
      <>
        <h3 className="text-center mb-4">{heading}</h3>
        <div className="row">
          {trackList.map(item => (
            <Track key={item.track.track_id} track={item.track} />
          ))}
        </div>
      </>
    )
  }
}