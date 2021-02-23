import { Global } from './../../services/global';
import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'
import { ProjectService } from '../../services/project.service'
import { UploadService } from './../../services/upload.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project;
  public status: boolean;
  public filesToUpload: Array<File>;
  public saveProject: any;
  public apiUrl: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService
  ) { 
    this.title = "Create project"
    this.project = new Project('', '', '', '', null, '', '')
    this.apiUrl = Global.apiUrl;
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    // Guardar los datos
    this._projectService.saveProject(this.project).subscribe(
      res => {
        if(res.project){
          
          // Subir imagen
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.apiUrl+"upload-image/"+res.project._id, [], this.filesToUpload, 'image')
            .then((result:any) => {
              this.status = true
              this.saveProject = result.project;
              form.reset()
            })
          }else{
            this.status = true
            this.saveProject = res.project;
            form.reset()
          }

          
          
        }else{
          this.status = false;
        }
      },
      err => {
        console.log(<any>err)
      }
    )
  }

  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
