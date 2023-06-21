import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThesisService } from '../thesis.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-thesis',
  templateUrl: './add-thesis.component.html',
  styleUrls: ['./add-thesis.component.css']
})
export class AddThesisComponent {
  public thesisForm! : FormGroup;
  public submitted : boolean = false;
  public course : any;
  constructor(
    public fb : FormBuilder,
    public thesisService : ThesisService,
    public toastr : ToastrService,
    public router : Router,
    public activatedroute: ActivatedRoute
  ){
    this.activatedroute.params.subscribe((params:any)=>{
      if(params.course){
        this.course = params.course
      }
    })
  }

  ngOnInit(): void {
    this.thesisForm = this.fb.group({
      'title':['',Validators.required],
      'author':['',Validators.required],
      'department':['',Validators.required],
      'year':['',Validators.required],
      'course':[this.course,Validators.required],
      'file': ['',Validators.required],
      'fileSource' : ['',Validators.required]
    })
  }

  addUser(){
    this.submitted = true;
    if(this.thesisForm.status=='VALID'){
      const formData = new FormData();
      formData.append('title', this.thesisForm.value.title);
      formData.append('author', this.thesisForm.value.author);
      formData.append('department', this.thesisForm.value.department);
      formData.append('year', this.thesisForm.value.year);
      formData.append('course', this.thesisForm.value.course);
      formData.append('pdf', this.thesisForm.value.fileSource);
      
      this.thesisService.addThesis(formData).subscribe((res:any)=>{
        if(res.status){
          this.toastr.success(res.message)
          if(this.course=='msc'){
            this.router.navigate(['msc-thesis-list']);
          }else{
            this.router.navigate(['phd-thesis-list']);
          }
          
        }else{
          this.toastr.error(res.message)
        }
      })
    }
  }

  onFileChange(event: any): void {

    if (event.target.files.length > 0) {
      const pdfFiles = event.target.files;
      const file = pdfFiles.item(0);
      this.thesisForm.patchValue({
        fileSource: file
      });
    }
  }

}

