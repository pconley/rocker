import Route from '@ember/routing/route';
// import wait from 'rocker/utils/wait';

export default Route.extend({
  // async model() {
  //   await wait(2000);
  //   return this.modelFor('bands.band');
  // },

  model() {
    return this.modelFor('bands.band');
  },

  resetController(controller) {
    controller.reset(); // my own reset function
  },
});
