import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('playlist', function() {
    this.route('callback');
    this.route('custom');
    this.route('recommended');
  });
  this.route('explore');
});

export default Router;
