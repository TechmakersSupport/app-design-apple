// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../links.js';

Meteor.publish('linksNow.all', function (plantid) {
  return Links.now.find({s: plantid},{sort:{ts:-1},limit:200});
});

Meteor.publish('linksNow.allplants', function () {
  return Links.now.find({},{sort:{ts:-1},limit:500});
});

Meteor.publish('linksHour.all', function (plantid) {
  return Links.hour.find({s: plantid},{sort:{ts:-1},limit:100});
});

Meteor.publish('linksDay.all', function (plantid) {
  return Links.day.find({s: plantid},{sort:{ts:-1},limit:500});
});

Meteor.publish('linksMonth.all', function (plantid) {
  return Links.month.find({s: plantid},{sort:{ts:-1},limit:600});
});
