import EmberObject from '@ember/object';

export default EmberObject.extend({
  name: '',
  description: '',

  init() {
    // allow create w/ and w/out array arg
    this._super(...arguments);
    if (!this.songs) { this.set('songs', []); }
  },
});