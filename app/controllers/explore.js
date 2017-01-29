import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['code'],
  init() {
    console.log("login code" + this.get('code'));
  },

  selectedArtist: "",
  filteredArtists: Ember.computed('model', function() {
    return this.get('model');
  }),

  actions: {
    changeSelectedArtist(artist) {
      this.set('selectedArtist', artist);
    }
  }
});
