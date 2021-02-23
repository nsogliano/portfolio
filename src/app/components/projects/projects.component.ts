import { Global } from './../../services/global';
import { ProjectService } from './../../services/project.service';
import { Project } from './../../models/project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  providers: [ProjectService]
})
export class ProjectsComponent implements OnInit {
  public projects: Array<Project>;
  public apiUrl: string;

  constructor(private _projectService:ProjectService) { 
    this.apiUrl = Global.apiUrl;
  }

  ngOnInit(): void {
    this.getProjects()
  }

  // Método para traer todos los proyectos desde la API (servicio _projectService)
  getProjects(){
    this._projectService.getProjects().subscribe(
      res => {
        if (res.projects) this.projects = res.projects 
      },
      err => {
        console.log(<any>err)
      }
    )
  }
}
