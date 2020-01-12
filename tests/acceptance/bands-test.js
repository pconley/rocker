import { module, test } from 'qunit';
import { visit, click, currentURL, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

import { createBand } from 'rocker/tests/helpers/custom-helpers';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Home shows all bands', async function(assert) {
    // this.server.logging = true; // log mirage
    const name1 = 'Radiohead';
    const name2 = 'Long Distance Calling';
    this.server.create('band', { name: name1 });
    this.server.create('band', { name: name2 });
    await visit('/');
    assert.equal(currentURL(), '/bands', "Correct URL found");
    let bandLinks = document.querySelectorAll('[data-test-rr=band-link]');
    assert.equal(bandLinks.length, 2, 'All band links are rendered');
    assert.ok(bandLinks[0].textContent.includes(name1), 'First band link contains the band name');
    assert.ok(bandLinks[1].textContent.includes(name2), 'The other band link contains the band name');

    // alternative assertion style...

    assert.dom('[data-test-rr=band-link]').exists({ count: 2 }, 'All band links are rendered');
    assert.dom('[data-test-rr=band-list-item]:first-child').hasText(name1, 'The first band link contains the band name');
    assert.dom('[data-test-rr=band-list-item]:last-child').hasText(name2, 'The other band link contains the band name');
  });

  test('Create a band', async function(assert) {
    this.server.create('band', { name: 'Royal Blood' });
    await visit('/');

    await createBand('Caspian');
    // await pauseTest();

    let bandLinks = document.querySelectorAll('[data-test-rr=band-link]');
    assert.equal(bandLinks.length, 2, 'All band links are rendered','A new band link is rendered');
    assert.ok(bandLinks[1].textContent.includes('Caspian'), 'The new band link is rendered as the last item');
    const item = document.querySelector('[data-test-rr=songs-nav-item] > .active');
    assert.ok(item, 'The Songs tab is active');
    // not sure why the new version dropped the text check; but left it here
    assert.ok(item.textContent.includes('Songs'), 'The Songs tab is active and has text');

    // alternative assert style...

    assert.dom('[data-test-rr=band-list-item]').exists({ count: 2 }, 'A new band link is rendered');
    assert.dom('[data-test-rr=band-list-item]:last-child').hasText('Caspian', 'The new band link is rendered as the last item');
    assert.dom('[data-test-rr=songs-nav-item] > .active').exists('The Songs tab is active');
  });

  test('Sort songs in various ways', async function(assert) {
    this.server.logging = true; // log mirage
    let band = this.server.create('band', { name: 'Them Crooked Vultures' });
    console.log("test band",band);
    this.server.create('song', { title: 'Elephants', rating: 5, band });
    this.server.create('song', { title: 'New Fang', rating: 4, band });
    this.server.create('song', { title: 'Mind Eraser, No Chaser', rating: 4, band });
    this.server.create('song', { title: 'Spinning in Daffodils', rating: 5, band });
    await visit('/');
    await click('[data-test-rr=band-link]');
    assert.equal(currentURL(), '/bands/1/songs?q=&s=ratingDesc');

    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('Elephants', 'The first song is the highest ranked, first one in the alphabet');
    assert.dom('[data-test-rr=song-list-item]:last-child').hasText('New Fang', 'The last song is the lowest ranked, last one in the alphabet');
  
    // PART 2... change the sort

    await click('[data-test-rr=sort-by-title-desc]');
    assert.equal(currentURL(), '/bands/1/songs?s=titleDesc');
    assert.dom('[data-test-rr=song-list-item]:first-child').hasText('Spinning In Daffodils', 'The first song is the one that comes last in the alphabet');
    assert.dom('[data-test-rr=song-list-item]:last-child').hasText('Elephants', 'The last song is the one that comes first in the alphabet');
  });

  test('Search songs', async function(assert) {
    let band = this.server.create('band', { name: 'Them Crooked Vultures' });
    this.server.create('song', { title: 'Elephants', rating: 5, band });
    this.server.create('song', { title: 'New Fang', rating: 4, band });
    this.server.create('song', { title: 'Mind Eraser, No Chaser', rating: 4, band });
    this.server.create('song', { title: 'Spinning in Daffodils', rating: 5, band });
    this.server.create('song', { title: 'No One Loves Me & Neither Do I', rating: 5, band });
    await visit('/');
    await click('[data-test-rr=band-link]');
    await fillIn('[data-test-rr=search-box]', 'no');
    assert.equal(currentURL(), '/bands/1/songs?q=no');
    assert.dom('[data-test-rr=song-list-item]')
      .exists({ count: 2 }, 'The songs matching the search term are displayed');

    await click('[data-test-rr=sort-by-title-desc]');
    assert.ok(currentURL().includes('q=no'));
    assert.ok(currentURL().includes('s=titleDesc'));
    
    assert.dom('[data-test-rr=song-list-item]:first-child')
      .hasText('No One Loves Me & Neither Do I', 'A matching song that comes later in the alphabet appears on top');
    
    assert.dom('[data-test-rr=song-list-item]:last-child')
      .hasText('Mind Eraser, No Chaser', 'A matching song that comes sooner in the alphabet appears at the bottom');
  });
})
