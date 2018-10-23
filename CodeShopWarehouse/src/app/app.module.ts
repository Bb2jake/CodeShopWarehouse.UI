import { OrderService } from './../services/order.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule, HttpClientModule, FormsModule
	],
	providers: [OrderService],
	bootstrap: [AppComponent]
})
export class AppModule { }
