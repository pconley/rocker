import Controller from '@ember/controller';
import { action } from '@ember/object';
import { empty } from '@ember/object/computed';
import Song from 'rocker/models/song';

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
  saveSong: action(function(event) {
    event.preventDefault();
    let newSong = Song.create({ title: this.newSongName, band: this.model.name, rating: 3 });
    console.log("songs controller. model...",this.model);
    this.model.songs.pushObject(newSong);
    this.set('newSongName', '');
  }),
  updateRating: action(function(song, rating) {
    song.set('rating', song.rating === rating ? rating-1 : rating);
  }),
  reset: function(){
    this.setProperties({
      isAddingSong: false,
      newSongTitle: ''
    });
  }
});