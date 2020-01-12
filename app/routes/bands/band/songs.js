import Route from '@ember/routing/route';
// import wait from 'rocker/utils/wait';
// import { reject } from 'rsvp';

export default Route.extend({
  // async model() {
  //   await wait(2000);
  //   return this.modelFor('bands.band');
  // },

  model() {
    // demo error with a reject
    // return reject(this.modelFor('bands.band'));
    return this.modelFor('bands.band');
  },

  resetController(controller) {
    controller.reset(); // my own reset function
  },
});
