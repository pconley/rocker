import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import EmberObject from '@ember/object';

module('Integration | Component | star-rating', function(hooks) {
  
  setupRenderingTest(hooks);

  test('Renders the full and empty stars correctly', async function(assert) {
    function checker(full, empty){
      assert.dom('.fa-star').exists({ count: full }, 'The right amount of full stars is rendered');
      assert.dom('.fa-star-o').exists({ count: empty }, 'The right amount of empty stars is rendered');
    }
    this.set('rating', 4);
    this.set('maxRating', 5);
    await render(hbs`<StarRating @rating={{this.rating}} @maxRating={{this.maxRating}} />`);
    checker(4, 5-4);
    this.set('maxRating', 10);
    checker(4, 10-4);
    this.set('rating', 2);
    checker(2, 10-2);
  });

  test('The setRating action', async function(assert) {
    this.set('song', EmberObject.create({ rating: 3 }));
    this.set('actions', { updateRating(song, rating) { song.set('rating', rating); } });
    this.set('updateRating', function(song, rating) { song.set('rating', rating); }); 
    await render(hbs`<StarRating @rating={{song.rating}} @onClick={{fn this.updateRating song}} />`);
    // await this.pauseTest();
    await click('[data-test-rr=star-rating-5]');
    assert.equal(this.get('song.rating'), 5, "The clicked star's rating is correctly sent");
  });

});