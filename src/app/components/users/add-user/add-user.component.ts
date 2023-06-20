import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public userForm! : FormGroup;
  public submitted : boolean = false;
  constructor(
    public fb : FormBuilder,
    public userService : UserService,
    public toastr : ToastrService,
    public router : Router
  ){}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      'username':['',Validators.required],
      'password':['',Validators.required]
    })
  }

  addUser(){
    this.submitted = true;
    console.log(this.userForm)
    if(this.userForm.status=='VALID'){
      const requestData = {'username':this.userForm.get('username')?.value,'password':this.userForm.get('password')?.value}
      this.userService.addUser(requestData).subscribe(res=>{
        if(res.status){
          this.toastr.success(res.message)
          this.router.navigate(['user-list']);
        }else{
          this.toastr.error(res.message)
        }
      },(err)=>{
        this.toastr.error('Something went wrong.')
      })
    }
  }

}
