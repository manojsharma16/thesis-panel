import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiDomain = environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  getUserList(){
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      })
    }
    return this.http.get<any>(this.apiDomain+'get-user',httpOptions).pipe(map((res)=>{
      return res;
    }),
    catchError(err=>{
      return err.error;
    }))
  }
  getUserById(userId : any){
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
      params: {'_id': userId}
    }
    return this.http.get<any>(this.apiDomain+'getUserById',httpOptions).pipe(map((res)=>{
      return res;
    }),
    catchError(err=>{
      return err.error;
    }))
  }
  addUser(data : any){
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
    }
    return this.http.post<any>(this.apiDomain+'add-user',data,httpOptions).pipe(map((res)=>{
      return res;
    }),
    catchError(err=>{
      return err.error;
    }))
  }
  editUser(userId : any,data : any){
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
      params: {'_id': userId}
    }
    return this.http.put<any>(this.apiDomain+'edit-user',data,httpOptions).pipe(map((res)=>{
      return res;
    }),
    catchError(err=>{
      return err.error;
    }))
  }
  deleteUser(userId : any){
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
      params: {'_id': userId}
    }
    return this.http.delete<any>(this.apiDomain+'delete-user/',httpOptions).pipe(map((res)=>{
      return res;
    }),
    catchError(err=>{
      return err.error;
    }))
  }

}
