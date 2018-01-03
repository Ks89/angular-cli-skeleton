import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiceWorkerComponent } from './pages/sw/sw.component';
import { NotFoundComponent } from './pages/404/not-found.component';
import { AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
  {path: '',             component: HomeComponent},                             // `http://localhost:3300/`
  {path: 'home',         component: HomeComponent},                             // `http://localhost:3300/home`
  {path: 'lazy',         loadChildren: './pages/lazy/lazy.module#LazyModule', canActivate: [AuthGuard]},  // `http://localhost:3300/lazy`
  {path: 'sw',           component: ServiceWorkerComponent},                    // `http://localhost:3300/sw`
  {path: '**',           component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: Boolean(history.pushState) === false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
