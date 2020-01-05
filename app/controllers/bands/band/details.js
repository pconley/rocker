import Controller from '@ember/controller';
import { action } from '@ember/object';

export default Controller.extend({
  isEditing: false,

  toggleIsEditing: action(function() {
    this.toggleProperty('isEditing');
  }),

  edit: action(function() {
    this.set('isEditing', true);
  }),

  save: action(async function() {
    let band = this.model;
    await band.save();
    this.set('isEditing', false);
  })
});