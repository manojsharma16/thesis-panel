import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  public userForm! : FormGroup;
  public submitted : boolean = false;
  public userId : any;
  public password: string = '';
  public showPassword: boolean = false;
  
  constructor(
    public fb : FormBuilder, 
    public activatedRoute : ActivatedRoute,
    public userService : UserService,
    public toastr : ToastrService,
    public router : Router
  ){
    this.activatedRoute.queryParams.subscribe((params :any) => {
      if(params.id){
        this.userId = params.id
        this.getUserById()
      }
    })
  }

  getUserById(){
    this.userService.getUserById(this.userId).subscribe((res:any)=>{
      if(res.username)
        this.userForm.get('username')?.setValue(res.username)
      if(res.password)
        this.userForm.get('password')?.setValue(res.password)
    },(err)=>{
      this.toastr.error('Something went wrong.')
    })
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      'username':['',Validators.required],
      'password':['',Validators.required]
    })
  }

  editUser(){
    this.submitted = true;
    if(this.userForm.status=='VALID'){
      const dataRequest = {'username': this.userForm.get('username')?.value, password : this.userForm.get('password')?.value}
      this.userService.editUser(this.userId,dataRequest).subscribe((res:any)=>{
        if(res.status){
          this.toastr.success(res.message)
          this.router.navigate(['user-list'])
        }else{
          this.toastr.error(res.message)
        }
      },(err)=>{
        this.toastr.error('Something went wrong.')
      })
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
