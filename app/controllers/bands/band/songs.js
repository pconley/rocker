import Controller from '@ember/controller';
import { action, computed } from '@ember/object';
import { empty, sort } from '@ember/object/computed';

export default Controller.extend({

  queryParams: {
    sortBy: 's',
    searchTerm: 'q',
  },

  isAddingSong: false,
  newSongTitle: '',
  sortBy: 'ratingDesc',
  searchTerm: '',

  matchingSongs: computed('model.songs.@each.title', 'searchTerm',
    function() {
      let searchTerm = this.searchTerm.toLowerCase();
      return this.model.get('songs').filter((song) => {
        return song.title.toLowerCase().includes(searchTerm);
      });
  }),

  sortProperties: computed('sortBy', function() {
    let options = {
      ratingDesc: ['rating:desc', 'title:asc'],
      ratingAsc: ['rating:asc', 'title:asc'],
      titleDesc: ['title:desc'],
      titleAsc: ['title:asc']
    };
    return options[this.sortBy];
  }),

  sortedSongs: sort('matchingSongs', 'sortProperties'),
  
  isSongTitleEmpty: empty('newSongTitle'),
  
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
      title: this.get('newSongTitle'),
      band: this.model // the relationship, not the name!
    });
    await newSong.save();
    this.set('newSongTitle', '');
  }),

  updateSortBy: action(function(sortBy) {
    this.set('sortBy', sortBy);
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