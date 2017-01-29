import Ember from 'ember';

export default Ember.Route.extend({
  spotify: Ember.inject.service('spotify-api'),

  model(){
    // return this.get('spotify').getInstance()
  }
});
