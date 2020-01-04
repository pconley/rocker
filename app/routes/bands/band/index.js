import Route from '@ember/routing/route';

import { inject as service } from '@ember/service';

export default Route.extend({

  router: service(),
  redirect(band) {
    const target = band.description ? 'details' : 'songs';
    this.router.transitionTo(`bands.band.${target}`);
  }

});
