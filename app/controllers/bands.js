import Controller from '@ember/controller';
import { action } from '@ember/object';
import { empty } from '@ember/object/computed';
import { inject as service } from '@ember/service';

import Band from 'rocker/models/band';

export default Controller.extend({
  router: service(),
  isAddingBand: false,
  isBandNameEmpty: empty('newBandName'),
  newBandName: '',
  addBand: action(function() {this.set('isAddingBand',true);}),
  cancelAddBand: action(function() {this.set('isAddingBand',false);}),
  saveBand: action(function(event) {
    event.preventDefault();
    let newBand = Band.create({ name: this.newBandName });
    this.model.pushObject(newBand);
    this.setProperties({
      newBandName: '',
      isAddingBand: false
    });
    newBand.set('slug', dasherize(newBand.name));
    this.router.transitionTo('bands.band.songs', newBand.slug);
  }),
});
