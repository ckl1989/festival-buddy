import Ember from 'ember';

export default Ember.Component.extend({
  bioFull: false,

  actions: {
    toggleBioFull: function(){
      this.set('bioFull', !this.get('bioFull'));
    }
  }
});
