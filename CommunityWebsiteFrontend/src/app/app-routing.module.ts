import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { GetreviewsComponent } from './Components/getreviews/getreviews.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { PostproductComponent } from './Components/postproduct/postproduct.component';
import { PostreviewComponent } from './Components/postreview/postreview.component';
import { ProductsComponent } from './Components/products/products.component';
import { RegisterComponent } from './Components/register/register.component';
import { AuthGuard } from './Services/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '',redirectTo:'home', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard/:id', component:DashboardComponent,pathMatch:'full',canActivate:[AuthGuard]},
  {path: 'products/:id/:productcodes', component:ProductsComponent,pathMatch:'full',canActivate:[AuthGuard]},
  {path: 'postreview/:id/:productcode/:productcodes', component:PostreviewComponent,pathMatch:'full',canActivate:[AuthGuard]},
  {path: 'getreviews/:id/:username/:productcodes', component:GetreviewsComponent,pathMatch:'full',canActivate:[AuthGuard]},
  {path: 'postproduct/:id/:code', component:PostproductComponent,pathMatch:'full',canActivate:[AuthGuard]},
  {path: 'admin/:id', component:AdminComponent,pathMatch:'full',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
