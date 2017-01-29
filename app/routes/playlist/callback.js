import Ember from 'ember';

export default Ember.Route.extend({
  spotify: Ember.inject.service('spotify-api'),
  // queryParams: {'code'},
  // code: null,

  beforeModel(params){
        console.log("auth code: " + params.queryParams.code); //if the parameter contains test as the key
        //this.get('spotify').authorize(params.queryParams.code);
        this.transitionTo('playlist');

    }
});
