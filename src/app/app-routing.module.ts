import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MerchantsComponent } from './components/merchants/merchants.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: '', component: MerchantsComponent },
  { path: 'merchant', component: MerchantsComponent },
  { path: 'product', component: ProductsComponent },
  { path: '**', component: MerchantsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
