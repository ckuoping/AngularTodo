import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../class/task';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  serverURL:string = 'http://localhost:3000/tasks'

  constructor(private http : HttpClient) { }

  /** ADD A TASK */
  addTask(etask:Task):Observable<Task>{
    return this.http.post<Task>(this.serverURL,etask);
  }

  /** GET ALL TASKS */
  getAllTask():Observable<Task[]>{
    return this.http.get<Task[]>(this.serverURL);
  }

  /** REMOVE A TASK */
  deleteTask(etask:Task):Observable<Task>{
    return this.http.delete<Task>(this.serverURL+'/'+etask.id);
  }

  /** EDIT A TASK */
  editTask(etask:Task):Observable<Task>{
    return this.http.put<Task>(this.serverURL+'/'+etask.id,etask);
  }
}
