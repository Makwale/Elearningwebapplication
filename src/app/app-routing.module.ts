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
    path: 'html-quiz',
    loadChildren: () => import('./pages/html-quiz/html-quiz.module').then( m => m.HtmlQuizPageModule)
  },
  {
    path: 'instructor-application',
    loadChildren: () => import('./pages/Instructors-Page/instructor-application/instructor-application.module').then( m => m.InstructorApplicationPageModule)
  },
  {
    path: 'instructor-profile',
    loadChildren: () => import('./pages/Instructors-Page/instructor-profile/instructor-profile.module').then( m => m.InstructorProfilePageModule)
  },
  {
    path: 'instructor-instructors',
    loadChildren: () => import('./pages/Instructors-Page/instructor-instructors/instructor-instructors.module').then( m => m.InstructorInstructorsPageModule)
  },
  {
    path: 'instructor-dashboard',
    loadChildren: () => import('./pages/Instructors-Page/instructor-dashboard/instructor-dashboard.module').then( m => m.InstructorDashboardPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./pages/student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'instructors',
    loadChildren: () => import('./pages/instructors/instructors.module').then( m => m.InstructorsPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
