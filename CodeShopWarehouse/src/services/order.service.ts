import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { env } from '../environments/environment';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderUploadDto } from '../models/order-upload-dto';

@Injectable()
export class OrderService {
	private apiUrl = env.apiUrl;
	public orders$ = new Subject<Order[]>();

	constructor(private http: HttpClient) { }

	public getAllOpenOrders(): void {
		this.http.get<Order[]>(`${this.apiUrl}orders/`).subscribe(orders => {
			this.orders$.next(orders);
		}, err => {
			console.error(err);
		});
	}

	public createOrder(): void {
		this.http.post(`${this.apiUrl}orders/`, this.getNewOrder).subscribe(() => {
			this.getAllOpenOrders();
		}, err => {
			console.error(err);
		});
	}

	public processOrder(order: Order): void {
		order.processedAt = new Date();
		this.http.put(`${this.apiUrl}orders/${order.id}`, order).subscribe(() => {
			this.getAllOpenOrders();
		}, err => {
			console.error(err);
		});
	}

	private get getNewOrder(): OrderUploadDto {
		const uploadDto = new OrderUploadDto;
		uploadDto.productId = Math.floor(Math.random() * 10000);
		uploadDto.quantity = Math.floor(Math.random() * 100);
		return uploadDto;
	}
}
