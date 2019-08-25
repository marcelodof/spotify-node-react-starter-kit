import React from 'react';

class PlaylistList extends React.Component {
  state = {
    myPlaylist: []
  }
  
  componentDidMount() {
    this.getMyPlaylist()
  }

  getMyPlaylist(){
    this.props.spotifyApi.getUserPlaylists({ limit: 50 })
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
      <div>
        <ul>
          {this.state.myPlaylist.map((element, index) => (
            <li key={index}> {element.name} </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default PlaylistList;