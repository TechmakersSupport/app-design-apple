// Methods related to links
import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


const Links={};
Links.now = new Mongo.Collection('iotsitetimepoints.min');
Links.hour = new Mongo.Collection('iotsitetimepoints.hour');
//LinksHistory.halfhour = new Mongo.Collection('linkshistory_halfhour');
Links.day = new Mongo.Collection('iotsitetimepoints.day');
Links.month = new Mongo.Collection('iotsitetimepoints.month');
Links.year = new Mongo.Collection('iotsitetimepoints.year');

export {Links};

Meteor.methods({
	//metodo di aggiunta impianti
    'updateuserplants'(userid, newplants)
    {
      Meteor.users.update(userid, {$set: {"profile.plants": newplants}}, { upsert: true });
    }
});
