import Route from '@ember/routing/route';
// import wait from 'rocker/utils/wait';

export default Route.extend({
  
  // async model() {
  //   await wait(3000);
  //   return this.store.findAll('band');
  // }

  model() {
    return this.store.findAll('band');
  }
});
