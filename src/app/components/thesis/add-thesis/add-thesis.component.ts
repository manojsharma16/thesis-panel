import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThesisService } from '../thesis.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    public router : Router
  ){}

  ngOnInit(): void {
    this.thesisForm = this.fb.group({
      'title':['',Validators.required],
      'author':['',Validators.required],
      'department':['',Validators.required],
      'year':['',Validators.required],
      'course':['',Validators.required],
    })
  }

  addUser(){
    this.submitted = true;
    console.log(this.thesisForm)
    if(this.thesisForm.status=='VALID'){
      const requestData = {'username':this.thesisForm.get('username')?.value,'password':this.thesisForm.get('password')?.value}
      // this.thesisService.addUser(requestData).subscribe(res=>{
      //   if(res.status){
      //     this.toastr.success(res.message)
      //     this.router.navigate(['user-list']);
      //   }else{
      //     this.toastr.error(res.message)
      //   }
      // })
    }
  }

}

