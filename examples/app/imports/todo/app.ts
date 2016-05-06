import {Component, provide, enableProdMode} from '@angular/core';

import {Tasks} from '../../tasks';

import './components/task-list.ts';

import {TaskList} from './components/task-list';

enableProdMode();

@Component({
  selector: 'todo',
  templateUrl: 'imports/todo/app.html',
  directives: [TaskList]
})
export class Todos {
  addTask(text) {
    Tasks.insert({
      text: text,
      checked: false,
      private: false
    });
  }

  get todoCount() {
    let count = () => {
      let result = Tasks.find({
        checked: false
      }).count();
      if (Meteor.isServer) {
        const Fiber = require('fibers');
        Fiber.yield(result);
      }
      return result;
    }

    if (Meteor.isServer) {
      const Fiber = require('fibers');
      let fiber = Fiber(count);
      return fiber.run.bind(fiber)();
    }

    return count();
  };
}
