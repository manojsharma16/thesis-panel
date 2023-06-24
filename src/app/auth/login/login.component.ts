import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm!: FormGroup;
  public submitted : boolean = false;
  public showPassword : boolean = false;
  constructor(private router : Router, 
    private fb : FormBuilder,
    public authService : AuthService,
    public toastrService : ToastrService
  ) {
    this.loginForm = this.fb.group({
      'username' : ['',Validators.required],
      'password' : ['',Validators.required]
    })
  }

  signIn(){
    this.submitted = true;
    console.log(this.loginForm)
    if(this.loginForm.status=="VALID"){
      console.log("hello")
      const requetData = {'username':this.loginForm.get('username')?.value,'password':this.loginForm.get('password')?.value}
      this.authService.login(requetData).subscribe(res=>{
        if(res.status){
          this.toastrService.success(res.message)
          localStorage.setItem('username',requetData?.username)
          this.router.navigate(['/msc-thesis-list']); 
        }else{
          this.toastrService.error(res.message)
        }
      },(err)=>{
        
      })
      
    }
    
  }
}
