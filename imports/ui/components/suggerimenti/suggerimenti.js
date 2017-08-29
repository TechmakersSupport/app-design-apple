import { Template } from 'meteor/templating';
import { LinksDay } from '/imports/api/links/links.js';
import { LinksHour } from '/imports/api/links/links.js';


import './suggerimenti.html';

Template.suggerimenti.onCreated(function () {

  Session.set("timeMode", "Stato Attuale");
  Session.set("produzione", 0);
  Session.set("rete", 0);
  Session.set("consumo", 0);
  Session.set("batteria", 0);

	Meteor.subscribe('linksDay.all',function(){
		console.log("linksDay.all ready");
        updateUi();
	});
  Meteor.subscribe('linksHour.all',function(){
		console.log("linksHour.all ready");
        updateUi();
	});
});

Template.suggerimenti.onRendered(function() {
  submit();
});

Template.suggerimenti.helpers({

  TitoloPeriodo() {return Session.get ("timeMode");},

  ValConsumo() {return Session.get("consumo")/1000;},
  ArrowConsumo(){
    var valore=Session.get("consumo");
    if(valore==0) return "";
    else if(valore>0) return "uscita";
  },
  ColorConsumo() {
    var valore=Session.get("consumo");
    if(valore==0) return "";
    else if(valore>0) return "red";
  },

  ValProduzione() {return Session.get("produzione")/1000;},
  ArrowProduzione()
  {
    var valore=Session.get("produzione");
    if(valore==0) return "";
    else if(valore>0) return "entrata";
  },
  ColorProduzione()
  {
    var valore=Session.get("produzione");
    if(valore==0) return "";
    else if(valore>0) return "green";
  },

  ValRete() {return Session.get("rete")/1000;},
  ArrowRete()
  {
    var valore=Session.get("rete");
    if(valore==0) return "";
    else if(valore<0) return "entrata";
    else return "uscita";
  },
  ColorRete()
  {
    var valore=Session.get("rete");
    if(valore==0) return "grey";
    else if(valore>0) return "red";
    else return "green";
  },

  ValBatteria() {return Session.get("batteria")/1000;},
  ArrowBatteria(){
    var valore=Session.get("batteria");
    if(valore==0) return "grey";
    else if(valore>0) return "entrata";
    else return "uscita";
  },
  ColorBatteria() {
    var valore=Session.get("batteria");
    if(valore==0) return "grey";
    else if(valore>0) return "green";
    else return "red";
  }
});

Template.suggerimenti.events({
  'click #confirm'(event, instance) {
    submit();
  },
  'click .top-bar'(event, instance)
  {
    display('window');
    display('overflow');
  },
  'click #overflow'(event, instance)
  {
    hide('window');
    hide('overflow');
  },
  'click .radio'(event, instance)
  {
    var new_timeMode;
    var radios=document.getElementsByClassName("radio");
    [...radios].forEach (function(radioElement){
      radioElement.checked=false;
    })
    event.target.checked=true;
    if (event.target.value=="ALTRO PERIODO")
      new_timeMode=document.getElementById("datestart").value.substring(5,7)+ "/" + document.getElementById("datestart").value.substring(8) + " - " + document.getElementById("dateend").value.substring(5,7)+ "/" + document.getElementById("dateend").value.substring(8);
    else
      new_timeMode=event.target.value;
    Session.set("timeMode", new_timeMode);
    updateUi();
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
  var timeMode=Session.get("timeMode");
  var link;
  var currenttime=new Date();
  console.log("checking in autorun..");
  console.log("CURRENT TIME: ");
  console.log(currenttime);
  if (timeMode=="Stato Attuale")
  {
    link=LinksHour.findOne({Ora: currenttime.getHours()});
    console.log(link);
  }
  else if (timeMode=="Ultime 24h")
  {
    link=LinksDay.findOne({Giorno: currenttime.getUTCDate()});
    console.log(link);
  }


  Session.set("produzione", link.Produzione);
  Session.set("rete", link.Scambio);
  Session.set("consumo", link.Scambio+link.Produzione);
}
