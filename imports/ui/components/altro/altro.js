import {Meteor} from 'meteor/meteor';
import {Template} from 'meteor/templating';
import {Links} from '/imports/api/links/links.js';
//import {Plants};

//MODIFICA FARE I CALCOLI DELLA MACCHININA

import './altro.html';

Template.altro.onCreated(function () {
  Meteor.subscribe('linksNow.allplants',function(){
    console.log("linksNow.allplants ready");
  });
});

Template.altro.onRendered(function() {
  submit();
});

Template.altro.helpers({
  Useraction() {
    if (Meteor.user())
      return "Logout";
    else {
      return "Login";
    }
  },

  Username() {
    var user = Meteor.user();
    if (user)
      {
        var email = user && user.emails && user.emails[0].address;
        return email;
      }
    else return "Demo";
  },

  impianti()
  {
    updateplants();
    console.log(Session.get("s"));
    return getplants();
  },

  hidetodemo()
  {
    if (!Meteor.user())
      return "hidetodemo";
    else {
      return "";
    }
  }

});

Template.altro.events({
  'click .Logout'(event){
     event.preventDefault();
  		//esegue il logout forzando il reload in base dir
          Meteor.logout(function() {
              updateplants();
          });
      },
  'click .Login'(event, instance)
    {
      event.preventDefault();
      display('window');
      display('overflow');
      document.getElementById("fallbacklabel").className="hide";
    },
    'click .Conferma'(event, instance)
      {
         event.preventDefault();
         var email=document.getElementById("username").value;
         var password=document.getElementById("password").value;
          Meteor.loginWithPassword(email, password, function(error) {
            if (error) {
              console.log(error);
              document.getElementById("fallbacklabel").innerHTML="Errore nell'autenticazione";
              document.getElementById("fallbacklabel").className="show";
            }
            else {
              hide('window');
              hide('overflow');
            }
          });
      },

      'click .Register'(event, instance)
        {
          event.preventDefault();
          var email=document.getElementById("username").value;
          var password=document.getElementById("password").value;
          var newuser={
          email: email,
          password: password,
          profile: {
                impianti: []
            }
          };
          console.log(newuser);
          Accounts.createUser(
              newuser,
              function(error){
                if (error) {
                  console.log(error);
                  document.getElementById("fallbacklabel").innerHTML="Errore nella registrazione";
                  document.getElementById("fallbacklabel").className="show";
                }
                else {
                  document.getElementById("fallbacklabel").innerHTML="Registrazione avvenuta con successo";
                  document.getElementById("fallbacklabel").className="show";
                  hide('window');
                  hide('overflow');
                }
              }
          );
        },
  'click #overflow'(event, instance)
    {
       event.preventDefault();
      hide('window');
      hide('overflow');
    },

  'click .plant'(event, instance)
  {
    var newid = this.id;
    if(Meteor.user())
    {
      var impianti =  getplants();
      impianti.forEach(function(impianto){impianto.selected=(newid===impianto.id);});
      Meteor.users.update(Meteor.userId(), {$set: {"profile.plants": impianti}}, { upsert: true });
    }
    else
    {
      Session.set("demoId", newid);
    }
    updateplants();
    FlowRouter.go('/');
  },

  'click .plus-impianti'(event, instance)
  {
    var newid=document.getElementById("id-nuovi-impianti").value;
    console.log(newid);
    var isidreal=Links.now.find({s: newid}).fetch().length>0;
    console.log(isidreal)
    validid = ((newid!="") && isidreal);
    if(validid)
      console.log("validid");
    console.log(Meteor.user());
    if(Meteor.user() && Meteor.user().profile && validid)
    {
      var impianti;
      if (Meteor.user().profile.plants)
         impianti=Meteor.user().profile.plants;
      else impianti=[];
      impianti.forEach(function(impianto){impianto.selected=false;});
      impianti.push({id:newid, selected:true});
      console.log("listaimpianti:");
      console.log(impianti);
      Meteor.call("updateuserplants",Meteor.userId(), impianti)
      updateplants();
      FlowRouter.go('/');
    }
    else
    {
      event.target.id="";
      void event.target.offsetWidth;
      event.target.id="plusrotating";
      console.log("adding failed");
    }
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
  var links =  Links.now.find({s:"AICARDI_001"});
  impianti.push({id:"AICARDI_001"});
  return impianti;
}
