import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ThesisService {
  public apiDomain = environment.apiBaseUrl;
  constructor(
    private http: HttpClient
  ) { }

  addThesis(data: any) {

    console.log(data.entites)
    return this.http.post<any>(this.apiDomain + 'add-thesis', data).pipe(map(res => {
      return res;
    }),
      catchError(err => {
        return err;
      }));
  }
  editThesis(_id:any,data: any) {
    const httpOptions={
      params : {'_id':_id}
    }
    console.log(data.entites)
    return this.http.put<any>(this.apiDomain + 'edit-thesis', data,httpOptions).pipe(map(res => {
      return res;
    }),
      catchError(err => {
        return err;
      }));
  }

  getThesis(type:any) {
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
      params : {'course':type}
    }
    return this.http.get<any>(this.apiDomain + 'get-thesis',httpOptions).pipe(map(res => {
      return res;
    }),
      catchError(err => {
        return err;
      }));
  }

  getThesisById(thesisId:any) {
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
      params: {'_id': thesisId}
    }
    return this.http.get<any>(this.apiDomain + 'get-thesis-by-id',httpOptions).pipe(map(res => {
      return res;
    }),
      catchError(err => {
        return err;
      }));
  }
  deleteThesis(id:any){
    const httpOptions={
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
      }),
      params: {'_id': id}
    }
    return this.http.delete<any>(this.apiDomain+'delete-thesis',httpOptions).pipe(map(res=>{
      return res;
    }),
    catchError(err=>{
      return err;
    }))
  }


}
