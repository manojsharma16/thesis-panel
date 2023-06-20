import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiDomain = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  login(data : any){
    const httpOptions = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
      })
    }
    return this.http.post<any>(this.apiDomain+'login',data,httpOptions).pipe(map((res)=>{
      return res;
    }),
    catchError(err=>{
      return err.error;
    }))
  }
}
