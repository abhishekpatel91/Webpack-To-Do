import {ToDo} from './modules/toDo';
import $ from 'jquery';
var css = require('../less/main.less');
let toDo = new ToDo('myApp', $('.task-form'), $('.table'));
