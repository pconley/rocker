import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    // console.log('routes::bands::band::model params=',params);
    return this.store.findRecord('band', params.id);
  },

});