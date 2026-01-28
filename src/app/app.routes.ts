import { Routes } from '@angular/router';
import { Home } from './component/shared/home/home';
import { CategoriaAdminPlistRouted } from './component/categoria/categoria-plist/categoria-plist';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'categoria', component: CategoriaAdminPlistRouted }
];
