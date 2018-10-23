import { OrderService } from './../services/order.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order';
import 'rxjs';
import { Subscription } from 'rxjs';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	public orders: Order[] = [];
	private orderSubscription: Subscription;

	constructor(private orderService: OrderService) {
		this.orderSubscription = this.orderService.orders$.subscribe(orders => {
			this.orders = orders;
		});
	}

	ngOnInit(): void {
		this.orderService.getAllOpenOrders();
	}

	ngOnDestroy(): void {
		this.orderSubscription.unsubscribe();
	}
}
