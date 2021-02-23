import { from } from "rxjs";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService {
    public url: string;
    public headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.apiUrl
    }

    testService(){
        return 'Probando service'
    }

    saveProject(project: Project):Observable<any>{
        let params = JSON.stringify(project)
        return this._http.post(this.url+'/save-project', params, {headers: this.headers});
    }

    getProjects():Observable<any>{
        return this._http.get(this.url+'projects', {headers: this.headers})
    }

    getProject(id):Observable<any>{
        return this._http.get(this.url+'project/'+id, {headers: this.headers})
    }

    deleteProject(id):Observable<any>{
        return this._http.delete(this.url+'project/'+id, {headers: this.headers})
    }

    updateProject(project):Observable<any>{
        let params = JSON.stringify(project)
        return this._http.put(this.url + 'project/'+project._id, params, {headers: this.headers})
    }
}