import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

export const routes: Routes = [
    {path: "", pathMatch: "full", component: HomeComponent},
    {path: "search", component: SearchPageComponent}
];
