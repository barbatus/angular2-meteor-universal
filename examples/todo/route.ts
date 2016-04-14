import {AngularUni} from 'angular2-meteor-universal';
import {Todos} from './imports/app';

FlowRouter.route('/', {
  action: function(params) {
    AngularUni.render(Todos);
  }
});
