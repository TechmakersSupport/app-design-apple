// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '/imports/api/links/links.js';

Meteor.startup(() => {
  /*
  var linksTest;


  Links.now.remove({});
  linksTest = [
    {
      s: "demoid1",
      s:"AICARDI_001",
      ssp:-600,
      production:800
    },
    {
      s: "demoid2",
      s:"AICARDI_001",
      ssp:-100,
      production:800
    },
    {
      s: "demoid3",
      s:"AICARDI_001",
      ssp:0,
      production:0
    },
    {
      s: "demoid4",
      s:"AICARDI_001",
      ssp:0,
      production:800
    },
    {
      s: "luigiid1",
      ssp:-500,
      production:800
    },
    {
      s: "luigiid2",
      ssp:600,
      production:800
    },
    {
      s: "luigiid3",
      ssp:600,
      production:800
    },
    {
      s: "demoid4",
      ssp:600,
      production:800
    }
  ];
  _.each(linksTest, function(doc) {
    Links.now.insert(doc);
  })

  Links.hour.remove({});
  linksTest = [
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 1*60*60000),
      ssp:-400,
      ssp_production:-600,
      ssp_absorption:200,
      production:800
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 2*60*60000),
      ssp:-400,
      ssp_production:-600,
      ssp_absorption:200,
      production:800
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 3*60*60000),
      ssp:-400,
      ssp_production:-600,
      ssp_absorption:200,
      production:800
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 4*60*60000),
      ssp:-400,
      ssp_production:-600,
      ssp_absorption:200,
      production:800
    }

  ];
  _.each(linksTest, function(doc) {
    Links.hour.insert(doc);
  })

  Links.day.remove({});
  linksTest = [
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 1*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 2*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:7000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 3*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:9000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 4*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8500
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 5*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 6*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:7000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 7*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:9000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 8*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8500
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 9*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 10*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:7000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 11*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:9000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 12*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8500
    }
  ];
  _.each(linksTest, function(doc) {
    Links.day.insert(doc);
  })

  Links.month.remove({});
  linksTest = [
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 1*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 2*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:7000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 3*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:9000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 4*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8500
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 5*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 6*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:7000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 7*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:9000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 8*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8500
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 9*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 10*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:7000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 11*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:9000
    },
    {
      s: "demoid1",
      s:"AICARDI_001",
      createdAt: new Date(Date.now() - 12*30*24*60*60000),
      ssp:-4000,
      ssp_production:-6000,
      ssp_absorption:2000,
      production:8500
    }
  ];
  _.each(linksTest, function(doc) {
    Links.month.insert(doc);
  })
  */

});
