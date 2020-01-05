import Controller from '@ember/controller';
import { action } from '@ember/object';
import { empty } from '@ember/object/computed';

export default Controller.extend({

  isAddingSong: false,
  newSongName: '',
  
  isSongNameEmpty: empty('newSongName'),
  
  addSong: action(function() {
    this.set('isAddingSong',true);
  }),

  cancelAddSong: action(function() {
    this.set('isAddingSong',false);
  }),

  saveSong: action(async function(event) {
    event.preventDefault();
    console.log("controllers::songs::saveSong model=",this.model)
    let newSong = this.store.createRecord('song', {
      title: this.get('newSongName'),
      band: this.model // the relationship, not the name!
    });
    await newSong.save();
    this.set('newSongName', '');
  }),

  updateRating: action(function(song, rating) {
    song.set('rating', song.rating === rating ? rating-1 : rating);
    song.save();
  }),

  reset: function(){
    this.setProperties({
      isAddingSong: false,
      newSongTitle: ''
    });
  }
});