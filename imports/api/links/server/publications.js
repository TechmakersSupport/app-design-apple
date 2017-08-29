// All links-related publications

import { Meteor } from 'meteor/meteor';
import { LinksDay } from '../links.js';
import { LinksHour } from '../links.js';

Meteor.startup(function(){
  LinksDay.rawCollection().ensureIndex({
    _id:1
  }) ;
  LinksHour.rawCollection().ensureIndex({
    _id:1
  }) ;
});

Meteor.publish('linksDay.all', function () {
  return LinksDay.find({});
});

Meteor.publish('linksHour.all', function () {
  return LinksHour.find({});
});
