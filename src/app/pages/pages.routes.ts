import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';
import { ListComponent } from './users/list/list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Starter Page' },
      ],
    },
  },
  {
    path: "invitation",
    component: InvitationFormComponent
  },
  {
    path: "users",
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'add',
        component: AddUserComponent
      },
      {
        path: 'edit/:id',
        component: UpdateUserComponent
      }
    ]
  }
];
