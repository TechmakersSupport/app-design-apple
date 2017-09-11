import { Template } from 'meteor/templating';
import { Links } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';


import './datiprincipali.html';
import '/imports/ui/drawing/donut3d.js'

var millis_in_hour =  60*60*1000;
var millis_in_day = 24*60*60*1000;
var millis_in_month = 30*60*60*1000;

Session.set("s","");

Template.datiprincipali.onCreated(function () {

  Session.set("timeMode", "Ultime 4h");
  Session.set("Produzione.totale", 0);
  Session.set("Consumo.totale", 0);

  Session.set("DatiProduzione",[
                                 {name:"autoconsumo",label:"Autoconsumo", color:"blue",value:0, absvalue:0},
                                 {name:"accumulo", label:"Accumulo", color:"grey",value:0, absvalue:0},
                                 {name:"scambio",label:"Venduta a Enel", color:"green",value:0, absvalue:0}
                               ]
  );

  Session.set("DatiConsumo",[
                                 {name:"autoconsumo",label:"Autoconsumo", color:"blue",value:0, absvalue:0},
                                 {name:"accumulo", label:"Accumulo", color:"grey",value:0, absvalue:0},
                                 {name:"scambio",label:"Acquistata", color:"red",value:0, absvalue:0}
                               ]
  );
  Tracker.autorun(function()
    {
      if(Session.get("s")!="")
      {
      	Meteor.subscribe('linksHour.all',Session.get("s"),function(){
      		console.log("linksHour.all ready");
      	});
        Meteor.subscribe('linksDay.all',Session.get("s"),function(){
          console.log("linksDay.all ready");
        });
        Meteor.subscribe('linksMonth.all',Session.get("s"),function(){
          console.log("linksMonth.all ready");
        });
        Meteor.subscribe('linksNow.all',Session.get("s"),function(){
          console.log("linksNow.all ready");
        });
      }
    }
  );
});

Template.datiprincipali.onRendered(function() {
      Tracker.autorun(updateUi);
  submit();
});

Template.datiprincipali.helpers({

  TitoloPeriodo() {return Session.get ("timeMode");},

  ColorConsumo() {
    var valore=Session.get("Consumo.totale");
    if(valore===0) return "grey";
    else if(valore>0) return "red";
  },
  ColorProduzione()
  {
    var valore=Session.get("Produzione.totale");
    if(valore===0) return "grey";
    else if(valore>0) return "green";
  },

  ConsumoTotale() {return Session.get("Consumo.totale")/1000;},
  ConsumoAccumuloT(){
      var dati=Session.get("DatiConsumo")[1];
      var ret=dati.label;
      return ret;},
  ConsumoScambioT(){
    var dati=Session.get("DatiConsumo")[2];
    var ret=dati.label;
    return ret;
  },

  ConsumoAccumuloV(){
      var dati=Session.get("DatiConsumo")[1];
      var ret=dati.absvalue;
      return ret;},
  ConsumoScambioV(){
    var dati=Session.get("DatiConsumo")[2];
    var ret=dati.absvalue;
    return ret;
  },


  ProduzioneTotale() {return Session.get("Produzione.totale")/1000;},

  ProduzioneAccumuloT(){
      var dati=Session.get("DatiProduzione")[1];
      var ret=dati.label;
      return ret;},
  ProduzioneScambioT(){
    var dati=Session.get("DatiProduzione")[2];
    var ret=dati.label;
    return ret;
  },

  AutoconsumoT(){
    var dati=Session.get("DatiProduzione")[0];
    var ret=dati.label;
    return ret;
  },
  ProduzioneAccumuloV(){
      var dati=Session.get("DatiProduzione")[1];
      var ret=dati.absvalue;
      return ret;},
  ProduzioneScambioV(){
    var dati=Session.get("DatiProduzione")[2];
    var ret=dati.absvalue;
    return ret;
  },
  AutoconsumoV(){
    var dati=Session.get("DatiProduzione")[0];
    var ret=dati.absvalue;
    return ret;
  }
});

Template.datiprincipali.events({
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
    if (event.target.value==="Altro Periodo..")
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
  var firstchart = d3.select("#chart3d-1").append("svg");
  var secondchart = d3.select("#chart3d-2").append("svg");
  firstchart.append("g").attr("id","salesDonut");
  secondchart.append("g").attr("id","quotesDonut");
  var timeMode=Session.get("timeMode");
  var info, links;
  var currentdate=new Date();
  console.log("checking in autorun..");
  console.log("CURRENT PLANT: ");
  console.log(Session.get("s"));
  if (timeMode==="Ultime 4h")
  {
    links=Links.hour.find({s: Session.get("s")},{sort:{ts:-1}, limit:4}).fetch();
  }
  else if (timeMode==="Giornata attuale")
  {
    links=Links.day.find({s: Session.get("s")},{sort:{ts:-1}, limit:1}).fetch();
  }
  else if (timeMode==="Giornata di ieri")
  {
    links=Links.day.find({s: Session.get("s")},{sort:{ts:-1}, skip:1,limit:1}).fetch();
  }
  else if (timeMode==="Settimanale")
  {
    links=Links.day.find({s: Session.get("s")},{sort:{ts:-1}, limit:7}).fetch();
  }
  else if (timeMode==="Mese attuale")
  {
    links=Links.month.find({s: Session.get("s")},{sort:{ts:-1}, limit:1}).fetch();
  }
  else if (timeMode==="Mese precedente")
  {
    links=Links.month.find({s: Session.get("s")},{sort:{ts:-1}, skip:1,limit:1}).fetch();
  }
  else if (timeMode==="Anno attuale")
  {
    links=Links.month.find({s: Session.get("s")},{sort:{ts:-1}, limit:12}).fetch();
  }
  else if (timeMode==="Anno precedente")
  {
    links=Links.month.find({s: Session.get("s")},{sort:{ts:-1}, skip:12,limit:12}).fetch();
  }


    console.log(links);

  if(links.length>0)
  {
  info=sumlinks(links);

  console.log(info);

  var autoconsumo=Math.abs(info.production-Math.abs(info.ssp_production));

  var produzione=Math.abs(info.production);
    var consumo=Math.abs(info.ssp)+produzione;

  var produzione_scambio=Math.abs(info.ssp_production);
  var produzione_accumulo=0;

  var consumo_scambio=Math.abs(info.ssp_absorption);
  var consumo_accumulo=0;


  Session.set("Produzione.totale", info.production);
  Session.set("Consumo.totale", info.ssp+info.production);

  var autoconsumo_perc, produzione_accumulo_perc, produzione_scambio_perc, consumo_accumulo_perc, consumo_scambio_perc;

  if (produzione===0) autoconsumo_perc=1; else autoconsumo_perc=(autoconsumo*100)/produzione;
  if (produzione===0) produzione_accumulo_perc=0; else produzione_accumulo_perc=(produzione_accumulo*100)/produzione;
  if (produzione===0) produzione_scambio_perc=0; else produzione_scambio_perc=(produzione_scambio*100)/produzione;
  if ((consumo)===0) consumo_accumulo_perc=0; else consumo_accumulo_perc=(consumo_accumulo*100)/(consumo);
  if ((consumo)===0) consumo_scambio_perc=0; else consumo_scambio_perc=(consumo_scambio*100)/(consumo);



  Session.set("DatiProduzione",[
                                 {name:"autoconsumo",label:"Autoconsumo", color:"blue",value:autoconsumo_perc, absvalue:autoconsumo},
                                 {name:"accumulo", label:"Accumulo", color:"grey",value:produzione_accumulo_perc, absvalue:produzione_accumulo},
                                 {name:"scambio",label:"Venduta a Enel", color:"green",value:produzione_scambio_perc, absvalue:produzione_scambio},
                               ]
  );

  Session.set("DatiConsumo",[
                                 {name:"autoconsumo",label:"Autoconsumo", color:"blue",value:autoconsumo_perc, absvalue:autoconsumo},
                                 {name:"accumulo", label:"Accumulo", color:"grey",value:consumo_accumulo_perc, absvalue:consumo_accumulo},
                                 {name:"scambio",label:"Acquistata", color:"red",value:consumo_scambio_perc, absvalue:consumo_scambio},
                               ]
  );
  drawCharts();
}
}

function drawCharts(){
  var height1=document.getElementById('chart3d-1').clientHeight;
  var width1=document.getElementById('chart3d-1').clientWidth;
  var dim1=Math.min(height1,width1);
  Donut3D.draw("salesDonut", Session.get("DatiProduzione"), width1/2, height1/2, (width1/2)+20,(height1/2),height1/10);
  var height2=document.getElementById('chart3d-2').clientHeight;
  var width2=document.getElementById('chart3d-2').clientWidth;
  var dim2=Math.min(height2,width2);
  Donut3D.draw("quotesDonut", Session.get("DatiConsumo"), width2/2, height2/2, (width2/2)+20,(height2/2),height2/10);
}

function changeData(){
  var height1=document.getElementById('chart3d-1').clientHeight;
  var width1=document.getElementById('chart3d-1').clientWidth;
    var dim1=Math.min(height1,width1);
	Donut3D.transition("salesDonut", Session.get("DatiProduzione"), (width1/2)+20,(height1/2),height1/10);
  var height2=document.getElementById('chart3d-2').clientHeight;
  var width2=document.getElementById('chart3d-2').clientWidth;
    var dim2=Math.min(height2,width2);
	Donut3D.transition("quotesDonut", Session.get("DatiConsumo"), (width2/2)+20,(height2/2),height2/10);
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
  if (user && Meteor.user().profile)
  {
    if (Meteor.user().profile.plants)
      newplants=user.profile.plants;
    else {
      newplants=[];
    }
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
