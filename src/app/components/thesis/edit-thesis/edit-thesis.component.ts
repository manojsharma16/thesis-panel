import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThesisService } from '../thesis.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-thesis',
  templateUrl: './edit-thesis.component.html',
  styleUrls: ['./edit-thesis.component.css']
})
export class EditThesisComponent {


  public thesisForm! : FormGroup;
  public submitted : boolean = false;
  public course : any;
  public thesisId : any;
  public thesisData : any;
  constructor(
    public fb : FormBuilder,
    public thesisService : ThesisService,
    public toastr : ToastrService,
    public router : Router,
    public activatedroute: ActivatedRoute
  ){
    this.setForm();
    this.activatedroute.params.subscribe((params:any)=>{
      if(params.course){
        this.course = params.course
      }
    })
    this.activatedroute.queryParams.subscribe((params:any)=>{
      console.log(params)
      if(params.id){
        this.thesisId = params.id;
        this.getThesisById();
      }
    })
  }

  getThesisById(){
    this.thesisService.getThesisById(this.thesisId).subscribe((res)=>{
      if(res.status){
        this.thesisData = res.data
        this.thesisForm.get('title')?.setValue(this.thesisData.title)
        this.thesisForm.get('author')?.setValue(this.thesisData.author)
        this.thesisForm.get('department')?.setValue(this.thesisData.department)
        this.thesisForm.get('year')?.setValue(this.thesisData.year)
        this.thesisForm.get('course')?.setValue(this.thesisData.course)
      }
    })
  }

  ngOnInit(): void {
    
  }
  setForm(){
    this.thesisForm = this.fb.group({
      'title':['',Validators.required],
      'author':['',Validators.required],
      'department':['',Validators.required],
      'year':['',Validators.required],
      'course':[this.course,Validators.required],
      'pdf': [''],
      'fileSource' : ['']
    })
  }

  addUser(){
    this.submitted = true;
    console.log('hello',this.thesisForm)
    if(this.thesisForm.status=='VALID'){
      const formData = new FormData();
      formData.append('title', this.thesisForm.value.title);
      formData.append('author', this.thesisForm.value.author);
      formData.append('department', this.thesisForm.value.department);
      formData.append('year', this.thesisForm.value.year);
      formData.append('course', this.thesisForm.value.course);
      if(this.thesisForm.value.fileSource){
        formData.append('pdf', this.thesisForm.value.fileSource);
      }
      
      
      console.log('hello')
      
      this.thesisService.editThesis(this.thesisId,formData).subscribe((res:any)=>{
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
    console.log("onFileChange",this.thesisForm)
    if (event.target.files.length > 0) {
      const pdfFiles = event.target.files;
      const file = pdfFiles.item(0);
      this.thesisForm.patchValue({
        fileSource: file
      });
    }else{
      this.thesisForm.get('pdf')?.setValue('')
    }
  }

}

