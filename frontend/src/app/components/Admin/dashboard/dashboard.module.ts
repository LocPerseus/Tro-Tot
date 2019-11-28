import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '../Blocks/layout.module';
import { CategoryComponent } from './Pages/category/category.component';
import { MemberComponent } from './Pages/member/member.component';
import { NewsComponent } from './Pages/news/news.component';
import { HomeDashboardComponent } from './Pages/home-dashboard/home-dashboard.component';
import { ModalCategoryComponent } from './Pages/modal-category/modal-category.component';


@NgModule({
  declarations: [DashboardComponent, CategoryComponent, MemberComponent, NewsComponent, HomeDashboardComponent, ModalCategoryComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule
  ]
})
export class DashboardModule { }
