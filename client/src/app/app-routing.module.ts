import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainersComponent } from './containers/containers.component';
import { CreateContainerComponent } from './create-container/create-container.component';
import { PullImageComponent } from './pull-image/pull-image.component';

const routes: Routes = [
  { path: '', component: ContainersComponent },
  { path: 'create', component: CreateContainerComponent },
  { path: 'pull', component: PullImageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
