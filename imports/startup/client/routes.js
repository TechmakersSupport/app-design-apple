import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/not-found/not-found.js';
import '/imports/ui/components/navigazione/navigazione.js';
import '/imports/ui/components/statoattuale/statoattuale.js';
import '/imports/ui/components/datiprincipali/datiprincipali.js';
import '/imports/ui/components/datisecondari/datisecondari.js';
import '/imports/ui/components/suggerimenti/suggerimenti.js';
import '/imports/ui/components/altro/altro.js';

// 	Set up all routes in the app
//		calling blazelayout and passing to the App-body dynamic template
//		the content template

FlowRouter.route('/', {
  name: 'statoattuale',
  action() {
    BlazeLayout.render('App_body', { main: 'statoattuale' });
  }
});

FlowRouter.route('/datiprincipali', {
  name: 'datiprincipali',
  action(params) {
    BlazeLayout.render('App_body', { main: 'datiprincipali' });
  }
});

FlowRouter.route('/datisecondari', {
  name: 'datisecondari',
  action(params) {
    BlazeLayout.render('App_body', { main: 'datisecondari' });
  }
});

FlowRouter.route('/suggerimenti', {
  name: 'suggerimenti',
  action(params) {
    BlazeLayout.render('App_body', { main: 'suggerimenti' });
  }
});

FlowRouter.route('/altro', {
  name: 'altro',
  action(params) {
    BlazeLayout.render('App_body', { main: 'altro' });
  }
});

//If dir doesn't exists, show 404 page in not-found.html
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  }
};
