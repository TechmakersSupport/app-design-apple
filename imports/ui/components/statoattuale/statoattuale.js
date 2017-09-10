import { Template } from 'meteor/templating';
import { Links } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';

import './statoattuale.html';

Template.statoattuale.onCreated(function () {
  Session.set("produzione", 0);
  Session.set("rete", 0);
  Session.set("consumo", 0);
  Session.set("batteria", 0);

  Meteor.subscribe('linksNow.all',Session.get("s"),function(){
    console.log("linksNow.all ready");
            Tracker.autorun(updateUi);
  });
});

Template.statoattuale.onRendered(function() {
});

Template.statoattuale.helpers({

  km(){
    link=Links.day.findOne({s:Session.get("s")},{sort:{ts:-1},skip:1});
    var ret=parseInt((link.v.ENERGIASCAMBIO[3]*6)/1000);
    return ret;
  },

  money(){
    link=Links.day.findOne({s:Session.get("s")},{sort:{ts:-1},skip:1});
      var ret=parseInt((link.v.ENERGIASCAMBIO[3]*6)*1.5/1000);
      return ret;},

  ValConsumo() {return (Session.get("consumo") || 0);},
  ColorConsumo() {
    var valore=Session.get("consumo");
    if(valore==0 || !valore) return "grey";
    else if(valore>0) return "red";
  },

  ValProduzione() {return (Session.get("produzione") || 0);},
  ColorProduzione()
  {
    var valore=Session.get("produzione");
    if(valore==0 || !valore) return "grey";
    else if(valore>0) return "green";
  },

  ValRete() {return (Session.get("rete") || 0);},
  ColorRete()
  {
    var valore=Session.get("rete");
    if(valore==0 || !valore) return "grey";
    else if(valore>0) return "red";
    else return "green";
  },

  ValBatteria() {return (Session.get("batteria") || 0);},
  ColorBatteria() {
    var valore=Session.get("batteria");
    if(valore==0 || !valore) return "grey";
    else if(valore>0) return "green";
    else return "red";
  }
});


function display(id) {
  document.getElementById("section").className="blur";
  var el = document.getElementById(id);
  el.className = id+"-show";
}

function hide(id) {
    document.getElementById("section").className="";
  var el = document.getElementById(id);
    el.className = id+"-hide";
}

function submit()
{
  hide('window');
  hide('overflow');
}

function updateUi(timeMode)
{
  updateplants();
  var link;
  var currenttime=new Date();
  console.log("checking in autorun..");
  console.log("CURRENT PLANT");
  console.log(Session.get("s"));
  link=Links.now.findOne({s:Session.get("s")},{sort:{ts:-1}});
  console.log(link);


  Session.set("produzione", link.v.ENERGIAPRODOTTA[3]);
  Session.set("rete", link.v.ENERGIASCAMBIO[3]);
  Session.set("consumo", link.v.ENERGIAPRODOTTA[3]+link.v.ENERGIASCAMBIO[3]);
}


function getplants()
{
  var user = Meteor.user();
  var newplants;
  if (user)
  {
    newplants=user.profile.plants;
  }
  else
  {
    newplants=getdemoplants();
  }
  return newplants;
}

function updateplants()
{
  var selectedId;
  var user = Meteor.user();
  if (user)
  {
    getplants().forEach(function(plant){if (plant.selected) selectedId=plant.id});
  }
  else
  {
    if (!Session.get("demoId"))
      Session.set("demoId", getplants()[0].id);
    selectedId=Session.get("demoId");
  }
  Session.set("s", selectedId);
}

function getdemoplants()
{
  var impianti = [];
  var links =  Links.now.find({s:"AICARDI_001"});
  impianti.push({id:"AICARDI_001"});
  return impianti;
}
