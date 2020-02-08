import React from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class PlaylistList extends React.Component {
  state = {
    myPlaylist: []
  }
  
  componentDidMount() {
    this.getMyPlaylist()
  }

  getMyPlaylist(){
    spotifyApi.getUserPlaylists({ limit: 50 })
      .then((response) => {
        const playlistArray = []
        response.items.forEach(element => {
          playlistArray.push(element);
        });
        this.setState({
          myPlaylist: playlistArray
        });
      })
      .catch((err) => {
        console.log(JSON.stringify(err, null, 2));
      })
  }

  render() {
    return (
      <div id='playlist-list'>
        <ul>
          {this.state.myPlaylist.map((element, index) => (
            <li 
              key={index}
              className='playlist-grid'
              onClick={() => this.props.setPlaylist(element)}>
              {element.images.map((img, index) => {
                if (index === 0) {
                  return <img src={img.url} alt='' 
                    style={{width: 50, height: 50}}/> 
                }
              })}
              <p>
                {element.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PlaylistList;