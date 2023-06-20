import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    PageNotFoundComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    PageNotFoundComponent,
    NavbarComponent,
    RouterModule
  ]
})
export class CommonComponentsModule { }
