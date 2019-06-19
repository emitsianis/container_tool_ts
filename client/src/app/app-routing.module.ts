import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { CreateContainerComponent } from './create-container/create-container.component';

const routes: Routes = [
  { path: '', component: ContainersComponent },
  { path: 'create', component: CreateContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
