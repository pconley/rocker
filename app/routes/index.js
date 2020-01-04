import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service(),

  beforeModel() {
    console.log("index: before model");
    this.router.transitionTo('bands');
  }
});
