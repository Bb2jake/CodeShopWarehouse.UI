import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { env } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {
	private apiUrl = env.apiUrl;
	public orders$ = new Subject<Order[]>();

	constructor(private http: HttpClient) { }

	public getAllOpenOrders(): void {
		console.log(`${this.apiUrl}orders/`);
		this.http.get<Order[]>(`${this.apiUrl}orders/`).subscribe(orders => {
			this.orders$.next(orders);
		}, err => {
			console.error(err);
		});
	}
}
