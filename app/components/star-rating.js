import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import _ from 'lodash';

export default class StarRating extends Component {
  //tagName = 'div'; div is the default
  classNames = ['rr-rating-panel'];
  @tracked rating = 0;
  @tracked maxRating = 5;

  onClick = ()=>{}; // external function

  get stars() {
    // array of bools... show full (true) or empty (false) star
    return  _.range(1,this.maxRating+1).map( x=>this.rating >= x);
  }
  
  @action setRating(newRating) {
    this.onClick(newRating);
  }
}
