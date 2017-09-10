import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { Links } from '/imports/api/links/links.js';


import './datisecondari.html';
import '/imports/ui/drawing/donut3d.js'

var millis_in_hour =  60*60*1000;
var millis_in_day = 24*60*60*1000;
var millis_in_month = 30*60*60*1000;

Template.datisecondari.onCreated(function () {

  Session.set("timeMode", "Giornata attuale");
  Session.set("Rete.totale", 0);
  Session.set("Accumulo.totale", 0);

  Meteor.subscribe('linksHour.all',Session.get("s"),function(){
		console.log("linksHour.all ready");
    Meteor.subscribe('linksDay.all',Session.get("s"),function(){
      console.log("linksDay.all ready");
      Meteor.subscribe('linksMonth.all',Session.get("s"),function(){
        console.log("linksMonth.all ready");
        Meteor.subscribe('linksNow.all',Session.get("s"),function(){
          console.log("linksNow.all ready");
            Tracker.autorun(updateUi);
            });
      });
    });
	});
});

Template.datisecondari.onRendered(function() {
  submit();
  var firstchart = d3.select("#chart3d-1").append("svg");
  var secondchart = d3.select("#chart3d-2").append("svg");
  firstchart.append("g").attr("id","salesDonut");
  secondchart.append("g").attr("id","quotesDonut");
});

Template.datisecondari.helpers({

  TitoloPeriodo() {return Session.get ("timeMode");},

  ColorAccumulo() {
    var valore=Session.get("Accumulo.totale");
    if(valore==0) return "grey";
    else if(valore>0) return "blue";
    else return "lightblue";
  },
  ColorRete()
  {
    var valore=Session.get("Rete.totale");
    if(valore==0) return "grey";
    else if(valore>0) return "red";
    else return "green";
  },

  AccumuloTotale() {return Session.get("Accumulo.totale")/1000;},

  AccumuloScambioV(){
      var dati=Session.get("DatiAccumulo")[0];
      var ret=dati.absvalue;
      return ret;},
  AccumuloScambioT(){
    var dati=Session.get("DatiAccumulo")[0];
    var ret=dati.label;
    return ret;
  },

  ScambioAccumuloV(){
      var dati=Session.get("DatiRete")[0];
      var ret=dati.absvalue;
      return ret;},
  ScambioAccumuloT(){
    var dati=Session.get("DatiRete")[0];
    var ret=dati.label;
    return ret;
  },


  ReteTotale() {return Session.get("Rete.totale")/1000;},

  ReteProduzioneT(){
      var dati=Session.get("DatiRete")[1];
      var ret=dati.label;
      return ret;},
  ReteConsumoT(){
    var dati=Session.get("DatiRete")[2];
    var ret=dati.label;
    return ret;
  },
  ReteProduzioneV(){
      var dati=Session.get("DatiRete")[1];
      var ret=dati.absvalue;
      return ret;},
  ReteConsumoV(){
    var dati=Session.get("DatiRete")[2];
    var ret=dati.absvalue;
    return ret;
  },


  AccumuloProduzioneV(){
      var dati=Session.get("DatiAccumulo")[1];
      var ret=dati.absvalue;
      return ret;},
  AccumuloConsumoV(){
    var dati=Session.get("DatiAccumulo")[2];
    var ret=dati.absvalue;
    return ret;
  },
  AccumuloProduzioneT(){
      var dati=Session.get("DatiAccumulo")[1];
      var ret=dati.label;
      return ret;},
  AccumuloConsumoT(){
    var dati=Session.get("DatiAccumulo")[2];
    var ret=dati.label;
    return ret;
  },

});

Template.datisecondari.events({
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
    if (event.target.value=="Altro Periodo..")
      new_timeMode=document.getElementById("datestart").value.substring(5,7)+ "/" + document.getElementById("datestart").value.substring(8) + " - " + document.getElementById("dateend").value.substring(5,7)+ "/" + document.getElementById("dateend").value.substring(8);
    else
      new_timeMode=event.target.value;
    Session.set("timeMode", new_timeMode);
    hide('window');
    hide('overflow');
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
  var timeMode=Session.get("timeMode");
  var info, links;
  var currentdate=new Date();
  if (timeMode=="Ultime 4h")
  {
    links=Links.hour.find({s: Session.get("s")},{sort:{ts:-1}, limit:4});
  }
  else if (timeMode=="Giornata attuale")
  {
    links=Links.day.find({s: Session.get("s")},{sort:{ts:-1}, limit:1});
  }
  else if (timeMode=="Giornata precendente")
  {
    links=Links.day.find({s: Session.get("s")},{sort:{ts:-1}, skip:1,limit:1});
  }
  else if (timeMode=="Settimanale")
  {
    links=Links.day.find({s: Session.get("s")},{sort:{ts:-1}, limit:7});
  }
  else if (timeMode=="Mese attuale")
  {
    links=Links.month.find({s: Session.get("s")},{sort:{ts:-1}, limit:1});
  }
  else if (timeMode=="Mese precedente")
  {
    links=Links.month.find({s: Session.get("s")},{sort:{ts:-1}, skip:1,limit:1});
  }
  else if (timeMode=="Anno attuale")
  {
    links=Links.month.find({s: Session.get("s")},{sort:{ts:-1}, limit:12});
  }
  else if (timeMode=="Anno precedente")
  {
    links=Links.month.find({s: Session.get("s")},{sort:{ts:-1}, skip:12,limit:12});
  }

    info=sumlinks(links);

  console.log(links);
  console.log(info);

  var scambio_accumulo=0;

  var scambio_produzione=Math.abs(info.ssp_production);
  var scambio_consumo=Math.abs(info.ssp_absorption);

  var scambio=Math.abs(info.ssp);
    var accumulo=0;

  var accumulo_produzione=0;
  var accumulo_consumo=0;

  var scambio_accumulo_perc, scambio_produzione_perc, scambio_consumo_perc, accumulo_produzione_perc, accumulo_consumo_perc;

  if (scambio==0) scambio_accumulo_perc=1; else scambio_accumulo_perc=(scambio_accumulo*100)/scambio;
  if (scambio==0) scambio_produzione_perc=0; else scambio_produzione_perc=(scambio_produzione*100)/scambio;
  if (scambio==0) scambio_consumo_perc=0; else scambio_consumo_perc=(scambio_consumo*100)/scambio;
  if ((accumulo)==0) accumulo_produzione_perc=0; else accumulo_produzione_perc=(accumulo_produzione*100)/(accumulo);
  if ((accumulo)==0) accumulo_consumo_perc=0; else accumulo_consumo_perc=(accumulo_consumo*100)/(accumulo);


  Session.set("DatiRete",[
                                 {name:"accumulo",label:"Vendita accumulo", color:"blue",value:(scambio_accumulo*100)/scambio, absvalue:scambio_accumulo},
                                 {name:"produzione", label:"Vendita diretta", color:"green",value:(scambio_produzione*100)/scambio, absvalue:scambio_produzione},
                                 {name:"consumo",label:"Acquisto per consumo", color:"red",value:(scambio_consumo*100)/scambio, absvalue:scambio_consumo},
                               ]
  );

  Session.set("DatiAccumulo",[
                                 {name:"scambio",label:"Vendita Enel", color:"blue",value:(scambio_accumulo*100)/(accumulo), absvalue:scambio_accumulo},
                                 {name:"produzione", label:"Da produzione", color:"green",value:(accumulo_produzione*100)/(accumulo), absvalue:accumulo_produzione},
                                 {name:"consumo",label:"A consumo", color:"lightblue",value:(accumulo_consumo*100)/(accumulo), absvalue:accumulo_consumo},
                               ]
  );
  drawCharts();

}

function drawCharts(){
  var height1=document.getElementById('chart3d-1').clientHeight;
  var width1=document.getElementById('chart3d-1').clientWidth;
  var dim1=Math.min(height1,width1);
  Donut3D.draw("salesDonut", Session.get("DatiRete"), width1/2, height1/2, (width1/2)+20,(height1/2),height1/10);
  var height2=document.getElementById('chart3d-2').clientHeight;
  var width2=document.getElementById('chart3d-2').clientWidth;
  var dim2=Math.min(height2,width2);
  Donut3D.draw("quotesDonut", Session.get("DatiAccumulo"), width2/2, height2/2, (width2/2)+20,(height2/2),height2/10);
}

function changeData(){
  var height1=document.getElementById('chart3d-1').clientHeight;
  var width1=document.getElementById('chart3d-1').clientWidth;
    var dim1=Math.min(height1,width1);
	Donut3D.transition("salesDonut", Session.get("DatiRete"), (width1/2)+20,(height1/2),height1/10);
  var height2=document.getElementById('chart3d-2').clientHeight;
  var width2=document.getElementById('chart3d-2').clientWidth;
    var dim2=Math.min(height2,width2);
	Donut3D.transition("quotesDonut", Session.get("DatiAccumulo"), (width2/2)+20,(height2/2),height2/10);
}


function sumlinks(links)
{
  var info = {
    production:0,
    ssp:0,
    ssp_production:0,
    ssp_absorption:0
  };
  links.forEach(function(link){
    info.production+=link.v.ENERGIAPRODOTTA[3];
    info.ssp+=link.v.ENERGIASCAMBIO[3];
    info.ssp_production+=link.v.ENERGIAVENDUTA[3];
    info.ssp_absorption+=link.v.ENERGIAACQUISTATA[3];
  });
  return info;
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
  impianti.push({id:"AICARDI_001"});
  return impianti;
}
