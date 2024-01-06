import { Pipe, PipeTransform } from '@angular/core';
import {OrderStatus} from 'src/app/models/orders-history.model';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

	transform( value: OrderStatus ): unknown {
		switch( value ){
			case OrderStatus.Rejected:
				return "Pago rechazado";
			case OrderStatus.Pending:
				return "Pendiente de pago"
			case OrderStatus.Paid:
				return "Pagado"
		}
  }

}
