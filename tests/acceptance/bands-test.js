import { module, test } from 'qunit';
// import { pauseTest } from '@ember/test-helpers';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

import { createBand } from 'rocker/tests/helpers/custom-helpers';

module('Acceptance | Bands', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('Home shows all bands', async function(assert) {
    this.server.logging = true
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
})