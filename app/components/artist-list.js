import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    selectArtist(artist) {
      this.attrs.selectArtist(artist);
    }
  }
});
