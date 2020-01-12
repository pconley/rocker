import { Promise as EmberPromise } from 'rsvp';

export default function wait(delay) {
  return new EmberPromise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, delay);
  });
}