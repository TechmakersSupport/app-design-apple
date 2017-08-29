// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const LinksDay = new Mongo.Collection('linksday');
export const LinksHour = new Mongo.Collection('linkshour');
