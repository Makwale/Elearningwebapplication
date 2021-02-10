import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'featuredcourses',
    loadChildren: () => import('./pages/featuredcourses/featuredcourses.module').then( m => m.FeaturedcoursesPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'popularinstructors',
    loadChildren: () => import('./pages/popularinstructors/popularinstructors.module').then( m => m.PopularinstructorsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./pages/contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'courseinrolled',
    loadChildren: () => import('./pages/courseinrolled/courseinrolled.module').then( m => m.CourseinrolledPageModule)
  },
  {
    path: 'latestcourses',
    loadChildren: () => import('./pages/latestcourses/latestcourses.module').then( m => m.LatestcoursesPageModule)
  },
  {
    path: 'popularcourses',
    loadChildren: () => import('./pages/popularcourses/popularcourses.module').then( m => m.PopularcoursesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
