import Controller from '@ember/controller';
import { action } from '@ember/object';
import { empty } from '@ember/object/computed';
import Song from 'rocker/models/song';

export default Controller.extend({

  isAddingSong: false,
  isSongNameEmpty: empty('newSongName'),
  newSongName: '',
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
    // this.set('isAddingSong',false);
  }),
});