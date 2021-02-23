import { Component, OnInit } from '@angular/core';
import { Global } from './../../services/global';
import { ProjectService } from './../../services/project.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Project } from './../../models/project';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public apiUrl: string;
  public project: Project;
  public confirm: boolean;

  constructor(
    private _projectService:ProjectService, 
    private _router: Router, 
    private _route: ActivatedRoute) {
      
      this.apiUrl = Global.apiUrl
      this.confirm = false;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params.id
      this.getProject(id)
    })
  }

  getProject(id){
    this._projectService.getProject(id).subscribe(
      res => {
        this.project = res.project;
      },
      err => {
        console.log(err)
      }
    )
  }

  deleteProject(id){
    this._projectService.deleteProject(id).subscribe(
      res => {
        if(res.project){
          this._router.navigate(['/projects'])
        }
      },
      err => {
        console.log(<any>err)
      }
    )
  }

  setConfirm(confirm:boolean){
    this.confirm = confirm;
  }
}
