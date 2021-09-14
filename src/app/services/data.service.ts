import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class DataService extends BaseService {
  constructor(http: HttpClient, msgSvc: MessageService) {
    super(http, msgSvc);
  }
  apiRoot: string = `https://6139e9371fcce10017e78ca3.mockapi.io/api/v1/`;
  getMerchantList(): Observable<any> {
    const apiURL = `${this.apiRoot}merchant`;
    return this.http.get<any[]>(apiURL).pipe(
      tap((_) => this.log('fetched merchant list')),
      catchError(this.handleError<any[]>('getMerchantList'))
    );
  }
  createMerchant(merchant: object): Observable<any> {
    const apiURL = `${this.apiRoot}merchant`;
    return this.http.post<any>(apiURL, merchant).pipe(
      tap((_) => this.log('created merchant')),
      catchError(this.handleError<any>('createMerchant'))
    );
  }
  updateMerchant(merchant: object): Observable<any> {
    const apiURL = `${this.apiRoot}merchant/${merchant['id']}`;
    return this.http.put<any>(apiURL, merchant).pipe(
      tap((_) => this.log('updated merchant')),
      catchError(this.handleError<any>('updateMerchant'))
    );
  }
  deleteMerchant(id: number): Observable<any> {
    const apiURL = `${this.apiRoot}merchant/${id}`;
    return this.http.delete<any>(apiURL).pipe(
      tap((_) => this.log('deleted merchant')),
      catchError(this.handleError<any>('deleteMerchant'))
    );
  }
}
