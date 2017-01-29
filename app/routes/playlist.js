import Ember from 'ember';
//import SpotifyWebApi from "npm:spotify-web-api-node";

export default Ember.Route.extend({
  spotifyWebApi: Ember.inject.service('spotify-api'),

  model() {
    var artistList = [
      'Armin van Buuren',
      'Above and Beyond',
      'Hardwell',
      'Kaskade',
      'Marlo',
      'Photographer',
      'Martin Garrix',
      'Drake',
      'Justin Bieber',
      'Britney Spears',
      'Usher'
    ];




    // var scopes = ['user-read-private', 'user-read-email', 'user-follow-read'],
    //   redirectUri = 'http://localhost:4200/playlist',
    //   clientId = '4e2385394fb5461ebc0103cf7ba494de',
    //   state = '';
    //
    // var spotifyApi = new SpotifyWebApi({
    //   clientId: clientId,
    //   clientSecret: 'f8ec5a1146f04866a02bbb6120dab1ad',
    //   redirectUri: redirectUri
    // });
    //
    // // Create the authorization URL
    // var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    var spotifyApi = this.get('spotifyWebApi').getInstance();


    //console.log(authorizeURL);

    var modeledList = artistList.map(function(artistName) {
      return spotifyApi.searchArtists(artistName)
        .then(function(data) {
          // console.log('Search artists by ' + artistName, data.body.artists.items[0]);
          // console.log('images for ' + artistName, data.body.artists.items[0].images);
          return data.body.artists.items[0];
        })
        .then(function(artist) {
          var artistComposite = {
            name: artistName,
            profile: artist
          };

          if(artist){
            spotifyApi.getArtistTopTracks(artist.id, 'US')
              .then(function(data) {
                artist.topTracks = data.body.tracks;
            });
          }
          return artistComposite;

        })
        .then(function(data) {
          console.log("printing " + data);
          return data;
          // return artist.topTracks = data.body.tracks;
        })
        .catch(function(err) {
          console.error('Error' + err);

          //probably can't find
        });
    });

    console.log(modeledList);
    return Ember.RSVP.all(modeledList);
  }
});
