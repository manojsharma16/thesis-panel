import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['sl.no','username', 'password', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public userService : UserService,
    public toastr : ToastrService  
  ) {
    // Create 100 users
    const users = '';

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(){
    this.getUserList();
  }
  getUserList(){
    this.userService.getUserList().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(res)
    },(err)=>{
      this.toastr.error('Something went wrong.')
    })
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id:any){
    if(confirm("Are you sure you want to delete this user")){
      this.userService.deleteUser(id).subscribe((res)=>{
        if(res.status){
          this.getUserList();
          this.toastr.success(res.message)
        }else{
          this.toastr.error(res.message)
        }
      },(err)=>{
        this.toastr.error('Something went wrong.')
      })
    }
  }
}


