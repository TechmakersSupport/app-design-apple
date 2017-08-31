// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { LinksDay } from '/imports/api/links/links.js';
import { LinksHour } from '/imports/api/links/links.js';

Meteor.startup(() => {
  LinksDay.remove({});
  LinksHour.remove({});

  LinksDay.insert([
          /* 1 */
          {
              "_id" : ObjectId("59a3ccc086fdfebe23772c46"),
              "Name" : "Stefano Casa",
              "Produzione" : 18919,
              "Scambio" : -10109,
              "Giorno" : 22
          },


          /* 2 */
          {
              "_id" : ObjectId("599d4bcc9ea2ccbb5190137c"),
              "Name" : "Stefano Casa",
              "Produzione" : 19560,
              "Scambio" : -12402,
              "Giorno" : 21
          },


          /* 3 */
          {
              "_id" : ObjectId("599d4bcc9ea2ccbb5190137d"),
              "Name" : "Stefano Casa",
              "Produzione" : 19409,
              "Scambio" : -6352,
              "Giorno" : 20
          },


          /* 4 */
          {
              "_id" : ObjectId("599d4bcc9ea2ccbb5190137e"),
              "Name" : "Stefano Casa",
              "Produzione" : 15515,
              "Scambio" : -7550,
              "Giorno" : 19
          },


          /* 5 */
          {
              "_id" : ObjectId("599d4bcc9ea2ccbb5190137f"),
              "Name" : "Stefano Casa",
              "Produzione" : 21567,
              "Scambio" : -14328,
              "Giorno" : 18
          },


          /* 6 */
          {
              "_id" : ObjectId("599d4bcc9ea2ccbb51901380"),
              "Name" : "Stefano Casa",
              "Produzione" : 19576,
              "Scambio" : -7002,
              "Giorno" : 17
          },


          /* 7 */
          {
              "_id" : ObjectId("599d4bcc9ea2ccbb51901381"),
              "Name" : "Stefano Casa",
              "Produzione" : 18864,
              "Scambio" : -10197,
              "Giorno" : 16
          },


          /* 8 */
          {
              "_id" : ObjectId("599d4bcc9ea2ccbb51901382"),
              "Name" : "Stefano Casa",
              "Produzione" : 20541,
              "Scambio" : -11168,
              "Giorno" : 15
          },


          /* 9 */
          {
              "_id" : ObjectId("599d80500d794136e18598dc"),
              "Name" : "Stefano Casa",
              "Produzione" : 19052,
              "Scambio" : -13382,
              "Giorno" : 23
          }
  ]);


  LinksHour.insert([
          /* 1 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901363"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 423,
              "Ora" : 0
          },

          /* 2 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901364"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 216,
              "Ora" : 1
          },

          /* 3 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901365"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 297,
              "Ora" : 2
          },

          /* 4 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901366"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 231,
              "Ora" : 3
          },

          /* 5 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901367"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 215,
              "Ora" : 4
          },

          /* 6 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901368"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 353,
              "Ora" : 5
          },

          /* 7 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901369"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 285,
              "Ora" : 6
          },

          /* 8 */
          {
              "_id" : ObjectId("599d49569ea2ccbb5190136a"),
              "Name" : "Stefano Casa",
              "Produzione" : 536,
              "Scambio" : -316,
              "Ora" : 7
          },

          /* 9 */
          {
              "_id" : ObjectId("599d49569ea2ccbb5190136b"),
              "Name" : "Stefano Casa",
              "Produzione" : 1601,
              "Scambio" : -1325,
              "Ora" : 8
          },

          /* 10 */
          {
              "_id" : ObjectId("599d49569ea2ccbb5190136c"),
              "Name" : "Stefano Casa",
              "Produzione" : 2198,
              "Scambio" : -1913,
              "Ora" : 9
          },

          /* 11 */
          {
              "_id" : ObjectId("599d49569ea2ccbb5190136d"),
              "Name" : "Stefano Casa",
              "Produzione" : 2787,
              "Scambio" : -2517,
              "Ora" : 10
          },

          /* 12 */
          {
              "_id" : ObjectId("599d49569ea2ccbb5190136e"),
              "Name" : "Stefano Casa",
              "Produzione" : 2937,
              "Scambio" : -2637,
              "Ora" : 11
          },

          /* 13 */
          {
              "_id" : ObjectId("599d49569ea2ccbb5190136f"),
              "Name" : "Stefano Casa",
              "Produzione" : 2884,
              "Scambio" : -2536,
              "Ora" : 12
          },

          /* 14 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901370"),
              "Name" : "Stefano Casa",
              "Produzione" : 2381,
              "Scambio" : -1786,
              "Ora" : 13
          },

          /* 15 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901371"),
              "Name" : "Stefano Casa",
              "Produzione" : 2419,
              "Scambio" : -1536,
              "Ora" : 14
          },

          /* 16 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901372"),
              "Name" : "Stefano Casa",
              "Produzione" : 2059,
              "Scambio" : -1296,
              "Ora" : 15
          },

          /* 17 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901373"),
              "Name" : "Stefano Casa",
              "Produzione" : 1138,
              "Scambio" : -879,
              "Ora" : 16
          },

          /* 18 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901374"),
              "Name" : "Stefano Casa",
              "Produzione" : 570,
              "Scambio" : -264,
              "Ora" : 17
          },

          /* 19 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901375"),
              "Name" : "Stefano Casa",
              "Produzione" : 150,
              "Scambio" : 141,
              "Ora" : 18
          },

          /* 20 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901376"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 1103,
              "Ora" : 19
          },

          /* 21 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901377"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 2150,
              "Ora" : 20
          },

          /* 22 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901378"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 540,
              "Ora" : 21
          },

          /* 23 */
          {
              "_id" : ObjectId("599d49569ea2ccbb51901379"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 415,
              "Ora" : 22
          },

          /* 24 */
          {
              "_id" : ObjectId("599d49569ea2ccbb5190137a"),
              "Name" : "Stefano Casa",
              "Produzione" : 0,
              "Scambio" : 540,
              "Ora" : 23
          }
  ])

});
