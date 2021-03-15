import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminpanelPage } from './pages/admin/adminpanel/adminpanel.page';
import { InstructorPagePageModule } from './pages/instructor-page/instructor-page.module';
import { InstructorPagePage } from './pages/instructor-page/instructor-page.page';
import { InstructorpanelPage } from './pages/instructorpages/instructorpanel/instructorpanel.page';
import { MainPage } from './pages/main/main.page';
export const routes: Routes = [

  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
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
        {
          path: 'studentannouncement',
          loadChildren: () => import('./pages/studentannouncement/studentannouncement.module').then( m => m.StudentannouncementPageModule)
        },
        {
          path: 'quiz',
          loadChildren: () => import('./pages/quiz/quiz.module').then( m => m.QuizPageModule)
        },
        {
          path: 'quizresults',
          loadChildren: () => import('./pages/quizresults/quizresults.module').then( m => m.QuizresultsPageModule)
        },
        {
          path: 'quizhistory',
          loadChildren: () => import('./pages/quizhistory/quizhistory.module').then( m => m.QuizhistoryPageModule)
        },
        {
          path: 'quizmarks',
          loadChildren: () => import('./pages/quizmarks/quizmarks.module').then( m => m.QuizmarksPageModule)
        },
    ]
  },
  
  {
    path: 'forum',
    loadChildren: () => import('./pages/forum/forum.module').then( m => m.ForumPageModule)
  },
  {
    path: 'addcourse',
    loadChildren: () => import('./pages/admin/addcourse/addcourse.module').then( m => m.AddcoursePageModule)
  },
  {
    path: 'editcourse',
    loadChildren: () => import('./pages/admin/editcourse/editcourse.module').then( m => m.EditcoursePageModule)
  },
  {
    path: 'addinstructor',
    loadChildren: () => import('./pages/admin/addinstructor/addinstructor.module').then( m => m.AddinstructorPageModule)
  },
  {
    path: 'adminpanel',
    component: AdminpanelPage,
    children:[
      {
        path: 'student',
        loadChildren: () => import('./pages/admin/student/student.module').then( m => m.StudentPageModule)
      },
      {
        path: 'instructors',
        loadChildren: () => import('./pages/admin/instructors/instructors.module').then( m => m.InstructorsPageModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/admin/courses/courses.module').then( m => m.CoursesPageModule)
      },
      {
        path: '',
        redirectTo: 'courses',
        pathMatch: 'full'
      },
      {
        path: 'instructroprofileadmin',
        loadChildren: () => import('./pages/admin/instructroprofileadmin/instructroprofileadmin.module').then( m => m.InstructroprofileadminPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./pages/admin/events/events.module').then( m => m.EventsPageModule)
      },
      {
        path: 'coursestudents',
        loadChildren: () => import('./pages/admin/coursestudents/coursestudents.module').then( m => m.CoursestudentsPageModule)
      },
      {
        path: 'studentenrolledcourse',
        loadChildren: () => import('./pages/admin/studentenrolledcourse/studentenrolledcourse.module').then( m => m.StudentenrolledcoursePageModule)
      },
    ]
  },
  {
    path: 'createannouncement',
    loadChildren: () => import('./pages/admin/createannouncement/createannouncement.module').then( m => m.CreateannouncementPageModule)
  },
  {
    path: 'createannouncementi',
    loadChildren: () => import('./pages/instructorpages/createannouncement/createannouncement.module').then( m => m.CreateannouncementPageModule)
  },
  {
    path: 'instructorpanel',
    component: InstructorpanelPage,
    children: [ {
      path: 'student',
      loadChildren: () => import('./pages/instructorpages/student/student.module').then( m => m.StudentPageModule)
    },
    {
      path: 'account',
      loadChildren: () => import('./pages/instructorpages/account/account.module').then( m => m.AccountPageModule)
    },  
    {
    path: 'dashboard',
    loadChildren: () => import('./pages/instructor-page/instructor-page.module').then( m => m.InstructorPagePageModule)
    },
    {
      path: 'profile',
      loadChildren: () => import('./pages/instructor-page/profile/profile.component').then( m => m.ProfileComponent)
    },
    {
      path: 'courses',
      loadChildren: () => import('./pages/instructorpages/courses/courses.module').then( m => m.CoursesPageModule)
    },
    {
      path: '',
      redirectTo: 'courses',
      pathMatch: 'full'
    },
    {
      path: 'events',
      loadChildren: () => import('./pages/instructorpages/events/events.module').then( m => m.EventsPageModule)
    },
    {
      path: 'coursestudents',
      loadChildren: () => import('./pages/instructorpages/coursestudents/coursestudents.module').then( m => m.CoursestudentsPageModule)
    },
    {
      path: 'studentenrolledcourse',
      loadChildren: () => import('./pages/instructorpages/studentenrolledcourse/studentenrolledcourse.module').then( m => m.StudentenrolledcoursePageModule)
    },
    ]
  },



  

  
  

  


  

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
