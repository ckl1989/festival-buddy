import Ember from 'ember';

export default Ember.Controller.extend({
  // queryParams: ['code'],
  // code: null,
  //
  // init() {
  //   console.log("login code " + this.get('code'));
  // },

  spotify: Ember.inject.service('spotify-api'),
  selectedArtist: "",
  filteredArtists: Ember.computed('model', function() {
    return this.get('model');
  }),

  actions: {
    changeSelectedArtist(artist) {
      this.set('selectedArtist', artist);
    },

    login(){
      var spotifyApi = this.get('spotify');
      spotifyApi.performLogin();
    }
  }
});
