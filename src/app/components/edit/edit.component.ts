import { Global } from './../../services/global';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'
import { ProjectService } from '../../services/project.service'
import { UploadService } from './../../services/upload.service'
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: boolean;
  public filesToUpload: Array<File>;
  public saveProject: any;
  public apiUrl: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _route: ActivatedRoute
  ) { 
    this.title = "Edit project"
    this.apiUrl = Global.apiUrl;
    this.project = new Project('', '', '', '', null, '', '')
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

  onSubmit(form){
    // Guardar los datos
    this._projectService.updateProject(this.project).subscribe(
      res => {
        if(res.project){
          // Subir imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.apiUrl+"upload-image/"+res.project._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              this.status = true
              this.saveProject = result.project;
            })
          }else{
            this.status = true
            this.saveProject = res.project;
          }
        }else{
          this.status = false;
        }
      },
      err => {
        console.log(err)
      }
    )
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
