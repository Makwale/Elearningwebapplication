import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainPage } from './pages/main/main.page';

const routes: Routes = [

  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'featuredcourses',
        loadChildren: () => import('./pages/featuredcourses/featuredcourses.module').then(m => m.FeaturedcoursesPageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'popularinstructors',
        loadChildren: () => import('./pages/popularinstructors/popularinstructors.module').then(m => m.PopularinstructorsPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
      },
      {
        path: 'courseinrolled',
        loadChildren: () => import('./pages/courseinrolled/courseinrolled.module').then(m => m.CourseinrolledPageModule)
      },
      {
        path: 'latestcourses',
        loadChildren: () => import('./pages/latestcourses/latestcourses.module').then(m => m.LatestcoursesPageModule)
      },
      {
        path: 'popularcourses',
        loadChildren: () => import('./pages/popularcourses/popularcourses.module').then(m => m.PopularcoursesPageModule)
      },
      {
        path: 'coursedetails',
        loadChildren: () => import('./pages/coursedetails/coursedetails.module').then( m => m.CoursedetailsPageModule)
      },
     
       {
          path: 'leasons',
          loadChildren: () => import('./pages/leasons/leasons.module').then( m => m.LeasonsPageModule)
        },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'databasequiz',
    loadChildren: () => import('./pages/databasequiz/databasequiz.module').then( m => m.DatabasequizPageModule)
  },
  {
    path: 'tasklist',
    loadChildren: () => import('./pages/tasklist/tasklist.module').then( m => m.TasklistPageModule)
  },
  {
    path: 'forum',
    loadChildren: () => import('./pages/forum/forum.module').then( m => m.ForumPageModule)
  },  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'addcourse',
    loadChildren: () => import('./pages/addcourse/addcourse.module').then( m => m.AddcoursePageModule)
  },
  {
    path: 'editcourse',
    loadChildren: () => import('./pages/editcourse/editcourse.module').then( m => m.EditcoursePageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
