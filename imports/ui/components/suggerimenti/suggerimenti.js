import { Template } from 'meteor/templating';
import { Links } from '/imports/api/links/links.js';

import './suggerimenti.html';

Template.suggerimenti.onCreated(function () {
  Meteor.subscribe('linksNow.all',Session.get("s"),function(){
    console.log("linksNow.all ready");
  });
});

Template.suggerimenti.onRendered(function() {
});

Template.suggerimenti.helpers({
  plantStatus() {
    var link=Links.now.findOne({s: Session.get("s")});
    return link.status;
  }
});

Template.suggerimenti.events({

});
