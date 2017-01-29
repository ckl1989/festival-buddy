import Ember from 'ember';
import SpotifyWebApi from "npm:spotify-web-api-node";

export default Ember.Service.extend({
  api: null,
  isAuthenticated: false,
  authorizeURL: "",

  init(){
    console.log("initializine spotify service");
    this._super(...arguments);
    //need to secure all this
    var scopes = ['user-read-private', 'user-read-email', 'user-follow-read'],
      redirectUri = 'http://localhost:4200/playlist/callback',
      clientId = '4e2385394fb5461ebc0103cf7ba494de',
      state = '';

    var spotifyApi = new SpotifyWebApi({
      clientId: clientId,
      clientSecret: 'f8ec5a1146f04866a02bbb6120dab1ad',
      redirectUri: redirectUri
    });

    // Create the authorization URL
    this.set("authorizeURL", spotifyApi.createAuthorizeURL(scopes, state));

    this.set('api', spotifyApi);

  },

  getInstance(){
    console.log('getting spotify api instance');
    return this.get('api');
  },

  performLogin(){
    //try to login, then set isAuthenticated to true;
    window.location.replace(this.get('authorizeURL'));
  },

  getAuthorizeURL(){
    return this.get('authorizeURL');
  },

  authorize(code){
    console.log("setting authentication");
    var spotifyApi = this.get('api');

    //set authorization
    spotifyApi.authorizationCodeGrant(code)
      .then(function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        this.set('isAuthenticated', true);
      }, function(err) {
        console.log('Something went wrong!', err);
      });
  }
});
