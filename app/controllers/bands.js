import Controller from '@ember/controller';
import { action } from '@ember/object';
import { empty } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),
  isAddingBand: false,
  isBandNameEmpty: empty('newBandName'),
  newBandName: '',
  addBand: action(function() {this.set('isAddingBand',true);}),
  cancelAddBand: action(function() {this.set('isAddingBand',false);}),

  saveBand: action(async function(event) {
    event.preventDefault();
    let newBand = this.store.createRecord('band', { name: this.newBandName });
    await newBand.save();
    this.setProperties({ newBandName: '', isAddingBand: false });
    this.router.transitionTo('bands.band.songs', newBand.id);
  })

});
