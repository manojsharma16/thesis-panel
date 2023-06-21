import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ThesisService } from '../thesis.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-msc-thesis-list',
  templateUrl: './msc-thesis-list.component.html',
  styleUrls: ['./msc-thesis-list.component.css']
})
export class MscThesisListComponent implements AfterViewInit {
  displayedColumns: string[] = ['sl.no', 'title', 'author', 'department', 'year','file', 'action',];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private thesisService : ThesisService,
    public toastrService : ToastrService
  ) {
    this.getThesis()
    this.dataSource = new MatTableDataSource();
  }
  
  getThesis(){
    this.thesisService.getThesis('msc').subscribe(res=>{
      if(res.status){
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    },(err)=>{
      console.log(err)
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
    if(confirm("Are you sure you want to delete this thesis")){
      this.thesisService.deleteThesis(id).subscribe(res=>{
        if(res.status){
          this.toastrService.success(res.message)
          this.getThesis();
        }else{
          this.toastrService.success(res.message)
        }
        
      })
    }
  }
}
