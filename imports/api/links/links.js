// Definition of the links collection

import { Mongo } from 'meteor/mongo';

const Links={};
Links.now = new Mongo.Collection('iotsitetimepoints.min');
Links.hour = new Mongo.Collection('iotsitetimepoints.hour');
//LinksHistory.halfhour = new Mongo.Collection('linkshistory_halfhour');
Links.day = new Mongo.Collection('iotsitetimepoints.day');
Links.month = new Mongo.Collection('iotsitetimepoints.month');
Links.year = new Mongo.Collection('iotsitetimepoints.year');

export {Links};
