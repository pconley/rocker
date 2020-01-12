import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | bands/band/songs', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:bands/band/songs');
    assert.ok(controller);
  });

  test('isSongTitleEmpty', function(assert) {
    let controller = this.owner.lookup('controller:bands/band/songs');
    controller.set('newSongTitle', 'Belenos');
    assert.notOk(controller.get('isSongTitleEmpty'), 'The button is not disabled when there is a title');
    controller.set('newSongTitle', '');
    assert.ok(controller.get('isSongTitleEmpty'), 'The button is disabled when the title is empty');
  });

});
