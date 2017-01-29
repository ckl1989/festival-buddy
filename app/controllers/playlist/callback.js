import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['code'],
  code: null,

  init() {
    this._super();
    //console.log("login code " + this.get('code'));
  },
});
