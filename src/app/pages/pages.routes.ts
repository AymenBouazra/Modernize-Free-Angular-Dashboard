import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { InvitationFormComponent } from './invitation-form/invitation-form.component';
import { ListComponent as ListUserComponent } from './users/list/list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { ListComponent as ListBusinessUnitComponent } from './business-units/list/list.component';
import { AddComponent as AddBusinessUnitComponent } from './business-units/add/add.component';
import { EditComponent as UpdateBusinessUnitComponent } from './business-units/edit/edit.component';

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
        component: ListUserComponent,
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
  },
  {
    path: "users",
    children: [
      {
        path: '',
        component: ListUserComponent,
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
  },
  {
    path: "business-units",
    children: [
      {
        path: '',
        component: ListBusinessUnitComponent,
      },
      {
        path: 'add',
        component: AddBusinessUnitComponent
      },
      {
        path: 'edit/:id',
        component: UpdateBusinessUnitComponent
      }
    ]
  }
];
