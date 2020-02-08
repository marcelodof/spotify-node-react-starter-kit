import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistList from './components/PlaylistList';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      playlist: {}
    }
  }

  setPlaylist(playlist) {
    this.setState({playlist});
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div>
        <a href='http://localhost:8888' > Login to Spotify </a>
        <PlaylistList setPlaylist={this.setPlaylist.bind(this)}/>
        <p>Choosen playlist: {this.state.playlist.name}</p>
      </div>
    );
  }
}

export default App;
