import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThesisRoutingModule } from './thesis-routing.module';
import { MscThesisListComponent } from './msc-thesis-list/msc-thesis-list.component';
import { PhdThesisListComponent } from './phd-thesis-list/phd-thesis-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddThesisComponent } from './add-thesis/add-thesis.component';
import { EditThesisComponent } from './edit-thesis/edit-thesis.component';

@NgModule({
  declarations: [
    MscThesisListComponent,
    PhdThesisListComponent,
    AddThesisComponent,
    EditThesisComponent
  ],
  imports: [
    CommonModule,
    ThesisRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule
  ]
})
export class ThesisModule { }
