import { OrderService } from './../services/order.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Order } from '../models/order';
import 'rxjs';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	private orders: Order[] = [];
	private orderSubscription: Subscription;

	public productIdFilterInput: number;
	public filteredOrders: Order[] = [];

	constructor(private orderService: OrderService) {
		this.orderSubscription = this.orderService.orders$.subscribe(orders => {
			this.orders = orders;
			this.filterOrders();
		});
	}

	filterOrders(): void {
		if (!this.productIdFilterInput) {
			this.filteredOrders = this.orders;
		} else {
			this.filteredOrders = this.orders.filter(o => o.productId === this.productIdFilterInput);
		}
	}

	createOrder(): void {
		this.orderService.createOrder();
	}

	processOrder(order: Order): void {
		this.orderService.processOrder(order);
	}

	ngOnInit(): void {
		this.orderService.getAllOpenOrders();
	}

	ngOnDestroy(): void {
		this.orderSubscription.unsubscribe();
	}
}
