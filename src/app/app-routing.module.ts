import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'course-edit',
    loadChildren: () => import('./course-edit/course-edit.module').then( m => m.CourseEditPageModule)
  },
  {
    path: 'course-view',
    loadChildren: () => import('./course-view/course-view.module').then( m => m.CourseViewPageModule)
  },
  {
    path: 'folders',
    loadChildren: () => import('./folders/folders.module').then( m => m.FoldersPageModule)
  },
  {
    path: 'instructor-sign-in',
    loadChildren: () => import('./instructor-sign-in/instructor-sign-in.module').then( m => m.InstructorSignInPageModule)
  },
  {
    path: 'instructor-sign-up',
    loadChildren: () => import('./instructor-sign-up/instructor-sign-up.module').then( m => m.InstructorSignUpPageModule)
  },
  {
    path: 'instructor-upload-video',
    loadChildren: () => import('./instructor-upload-video/instructor-upload-video.module').then( m => m.InstructorUploadVideoPageModule)
  },
  {
    path: 'instructorcalendar',
    loadChildren: () => import('./instructorcalendar/instructorcalendar.module').then( m => m.InstructorcalendarPageModule)
  },
  {
    path: 'instructorhome',
    loadChildren: () => import('./instructorhome/instructorhome.module').then( m => m.InstructorhomePageModule)
  },
  {
    path: 'manage-courses',
    loadChildren: () => import('./manage-courses/manage-courses.module').then( m => m.ManageCoursesPageModule)
  },
  {
    path: 'purchasedcourses',
    loadChildren: () => import('./purchasedcourses/purchasedcourses.module').then( m => m.PurchasedcoursesPageModule)
  },
  {
    path: 'user-sign-in',
    loadChildren: () => import('./user-sign-in/user-sign-in.module').then( m => m.UserSignInPageModule)
  },
  {
    path: 'user-sign-up',
    loadChildren: () => import('./user-sign-up/user-sign-up.module').then( m => m.UserSignUpPageModule)
  },
  {
    path: 'usergallery',
    loadChildren: () => import('./usergallery/usergallery.module').then( m => m.UsergalleryPageModule)
  },
  {
    path: 'userhome',
    loadChildren: () => import('./userhome/userhome.module').then( m => m.UserhomePageModule)
  },
  {
    path: 'usersearch',
    loadChildren: () => import('./usersearch/usersearch.module').then( m => m.UsersearchPageModule)
  },
  {
    path: 'video-edit',
    loadChildren: () => import('./video-edit/video-edit.module').then( m => m.VideoEditPageModule)
  },
  {
    path: 'zoom-meeting',
    loadChildren: () => import('./zoom-meeting/zoom-meeting.module').then( m => m.ZoomMeetingPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'emailcomposer',
    loadChildren: () => import('./emailcomposer/emailcomposer.module').then( m => m.EmailcomposerPageModule)
  },  {
    path: 'useremailcomposer',
    loadChildren: () => import('./useremailcomposer/useremailcomposer.module').then( m => m.UseremailcomposerPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
