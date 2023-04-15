import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/class/task';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  /** A WHOLE NEW OBJECT READY FOR SEND  */
  taskObj : Task = new Task();
  
  /** ARRAY FOR SHOW ALL AFTER EACH ACTIONS */
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';
  editTaskIsDone : boolean = false;

  constructor(private crudservice : CrudService) { }

  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr = [];
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.editTaskIsDone = false;
    this.getAllTasks();
  }

  /* GET ALL TASKS */
  getAllTasks(){
    this.crudservice.getAllTask().subscribe(
      data=>{
        this.taskArr = data;
    },
    err=>{
        alert('Fail to get all tasks');
    })
  }

  /** ADD A TASK */
  addTask(){
    this.taskObj = new Task();
    this.taskObj.task_name = this.addTaskValue;
    this.crudservice.addTask(this.taskObj).subscribe(
      data=>{

        this.ngOnInit();
        this.addTaskValue = ''
      
      },
      err=>{
        alert('Fail to add a task');
      }
    )
  }

  /** REMOVE A TASK */
  removeTask(etask:Task){
    this.crudservice.deleteTask(etask).subscribe(
      data=>{
        this.ngOnInit();
      },
      err=>{
        alert('Fail to remove a task');
      }
    )
  }

  /** LET TASKOBG == SELECTED TASK && SHOW SELECTED TASK NAME*/
  call(etask:Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
    this.editTaskIsDone = etask.is_done;
  }

  /** UPDATE TASK NAME & STATUS */
  updateTask(){
    this.taskObj.task_name = this.editTaskValue;
    this.taskObj.is_done = this.editTaskIsDone;
    console.log(this.taskObj)
    this.crudservice.editTask(this.taskObj).subscribe(
      data=>{
        this.ngOnInit();
      },
      err=>{
        alert('Fail to update a task');
      }
    )
  }

  checkTask(etask:Task){
    etask.is_done = !etask.is_done;
    this.crudservice.editTask(etask).subscribe(
      data=>{
        this.ngOnInit();
      },
      err=>{
        alert('Fail to check a task');
      }
    )

  }



}
