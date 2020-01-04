import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    console.log('routes::bands::band Model hook called for `bands.band` called with slug=',params.slug);
    let bands = this.modelFor('bands');
    return bands.find(band => band.slug === params.slug);
  },

});