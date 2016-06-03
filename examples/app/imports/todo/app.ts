import {Component, provide, enableProdMode} from '@angular/core';

import {Tasks} from '../../tasks';

import {TaskList} from './components/task-list';

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
    return Tasks.find({
      checked: false
    }).count();
  };
}
