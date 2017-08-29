import { Template } from 'meteor/templating';

import './navigazione.html';

Template.navigazione.helpers({

  isAltro() {
    var ret;
    if (FlowRouter.getRouteName()=="altro" ) ret="selected";
    else ret="";
    return ret
  },
  isConsigli() {
    var ret;
    if (FlowRouter.getRouteName()=="suggerimenti" ) ret="selected";
    else ret="";
    return ret
  },
  isPrincipali() {
    var ret;
    if (FlowRouter.getRouteName()=="datiprincipali" ) ret="selected";
    else ret="";
    return ret
  },
  isSecondari() {
    var ret;
    if (FlowRouter.getRouteName()=="datisecondari" ) ret="selected";
    else ret="";
    return ret
  },
  isAttuale() {
    var ret;
    if (FlowRouter.getRouteName()=="statoattuale" ) ret="selected";
    else ret="";
    return ret
  }

});



Template.navigazione.events({

  'click #altroLink'(event){
        //Session.set("countlinkid",this._id) ;
        FlowRouter.go("/altro") ;
    },

  'click #attualeLink'(event){
        //Session.set("countlinkid",this._id) ;
        FlowRouter.go("/") ;
        console.log(FlowRouter.getRouteName());
    },

  'click #principaliLink'(event){
        //Session.set("countlinkid",this._id) ;
        FlowRouter.go("/datiprincipali") ;
    },

  'click #secondariLink'(event){
        //Session.set("countlinkid",this._id) ;
        FlowRouter.go("/datisecondari") ;
    },

  'click #suggerimentiLink'(event){
        //Session.set("countlinkid",this._id) ;
        FlowRouter.go("/suggerimenti") ;
    }
});
