import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './Pages/category/category.component';
import { MemberComponent } from './Pages/member/member.component';
import { NewsComponent } from './Pages/news/news.component';
import { HomeDashboardComponent } from './Pages/home-dashboard/home-dashboard.component';

const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent, children: [
    {path: 'category', component: CategoryComponent},
    {path: '', component: HomeDashboardComponent },
    {path: 'member', component: MemberComponent},
    {path: 'news', component: NewsComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
