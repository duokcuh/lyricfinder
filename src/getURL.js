//api: https://developer.musixmatch.com/documentation

export const getURL = ({ type, payload }) => {
  const root = 'https://api.musixmatch.com/ws/1.1/';
  const proxy = 'https://cors-access-allow.herokuapp.com/';
  let apikey = process.env.REACT_APP_API_KEY;
  let query, params;
  
  
  switch (type) {
    case 'GET_TOP':
      query = 'chart.tracks.get';
      params = {
        chart_name: 'top',
        page: 1,
        page_size: 10,
        country: payload,
        f_has_lyrics: 1,
        apikey
      };
      break;
    case 'SEARCH':
      query = 'track.search';
      params = {
        q_track: payload,
        page: 1,
        page_size: 10,
        s_track_rating: 'desc',
        apikey
      };
      break;
    case 'GET_TRACK':
      query = 'track.get';
      params = {
        track_id: payload,
        apikey
      };
      break;
    case 'GET_LYRICS':
      query = 'track.lyrics.get';
      params = {
        track_id: payload,
        apikey
      };
      break;
    default:
      throw new Error('Unrecognized url request')
  }
  
  let urlWithParams = new URL(proxy + root + query);
  for (let key in params) urlWithParams.searchParams.append(key, params[key]);
  
  return urlWithParams.href;
}
