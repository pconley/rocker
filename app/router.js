import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { capitalize } from '@ember/string';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  init() {
    this._super();
    this.setDocumentTitle();
  },

setDocumentTitle() {
  this.on('routeDidChange', (transition) => {
    let slug = transition.to.parent.params.slug; 
    let band = slug ? ": "+slug.split('-').map(w=>capitalize(w)).join(' ') : ": Bands"; 
    document.title = "Rocker"+band;
  });
}
});

Router.map(function() {
  this.route('bands', function() {
    this.route('band', { path: ':slug' }, function() {
      this.route('songs');
      this.route('details');
    });
  });
});

export default Router;
