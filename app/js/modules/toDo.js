import _ from 'lodash';
import $ from 'jquery';

export class ToDo {
    constructor(name, formElm, tableElm) {
        this.name = name;
        this.data = [];
        this.$formElm = $(formElm);
        this.$tableElm = $(tableElm);
        this.$taskField = this.$formElm.find('#task');
        this.sortOrder = true;
        this.initEvents();
    }
    initEvents() {
        this.$formElm.off('submit.addTask').on('submit.addTask', this.addTask.bind(this));
        this.$tableElm.off('click.removeTask').on('click.removeTask', 'tbody .remove-task', this.removeTask.bind(this));
        this.$tableElm.off('click.updateTask').on('click.updateTask', 'tbody .update-task', this.updateTaskStatus.bind(this));
        this.$tableElm.find('.sort-task').off('click.sortByTask').on('click.sortByTask', this.sortByTask.bind(this));
        this.$tableElm.find('.sort-status').off('click.sortByStatus').on('click.sortByStatus', this.sortByStatus.bind(this));
    }
    addToData(obj) {
        return new Promise((resolve, reject) => {
            this.data.push(obj);
            resolve(obj);
        });
    }
    removeFromData(id) {
        return new Promise((resolve, reject) => {
            const reqTaskIdx = this.findIdxById(id);
            if (reqTaskIdx !== -1) {
                this.data.splice(reqTaskIdx, 1);
                resolve();
            } else {
                reject();
            }
        });
    }
    sortDataBy(param) {
        if (this.sortOrder) {
            this.sortOrder = !this.sortOrder;
            return this.data.sort((currVal, nextVal) => currVal[param] > nextVal[param])
        } else {
            this.sortOrder = !this.sortOrder;
            return this.data.sort((currVal, nextVal) => currVal[param] < nextVal[param])
        }
    }
    findIdxById(id) {
        return _.findIndex(this.data, ['id', id]);
    }
    addTask(event) {
        event.preventDefault();
        this.addToData({
            task: this.$taskField.val(),
            id: (new Date()).getTime(),
            done: false
        }).then((obj) => {
            this.renderTableRow(obj);
            this.$formElm.get(0).reset();
        });
    }
    removeTask(event) {
        const $tableRow = $(event.target).closest('tr'),
            id = $tableRow.data('id');
        this.removeFromData(id).then(() => {
            $tableRow.remove();
        });
    }
    updateTaskStatus(event) {
        const $tableRow = $(event.target).closest('tr'),
            id = $tableRow.data('id'),
            reqTaskIdx = this.findIdxById(id);
        this.data[reqTaskIdx].done = true;
        $(event.target).addClass('disabled')
        $tableRow.addClass('success').find('.status').html('Done');
    }
    sortByTask() {
        this.renderTable(this.sortDataBy('task'));
    }
    sortByStatus() {
        this.renderTable(this.sortDataBy('done'));
    }
    renderTableRow(obj) {
        this.$tableElm.find('tbody').append(`<tr class="${obj.done ? 'success' : ''}"  data-id="${obj.id}"><td>${obj.task}</td><td class="status">${obj.done ? 'Done' : 'Pending'}</td><td><button class="btn btn-xs btn-info update-task ${obj.done ? 'disabled' : ''}">Done</button></td><td><button class="btn btn-xs btn-danger remove-task">Remove</button></td></tr>`);
    }
    renderTable(arr) {
        const len = arr.length;
        let str = '';
        for (let i = 0; i < len; i++) {
            str += `<tr class="${arr[i].done ? 'success' : ''}"  data-id="${arr[i].id}"><td>${arr[i].task}</td><td class="status">${arr[i].done ? 'Done' : 'Pending'}</td><td><button class="btn btn-xs btn-info update-task ${arr[i].done ? 'disabled' : ''}">Done</button></td><td><button class="btn btn-xs btn-danger remove-task">Remove</button></td></tr>`;
        }
        this.$tableElm.find('tbody').html(str);
    }
}