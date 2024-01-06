import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private apiService: ApiService) {}

  createBooking(body): Observable<any> {
    return this.apiService.postLogged('/bookings', body);
  }
}
