import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  itemName: string;
  quantity: number;
  mrp: number;
  gst: number;
  batchNo: string;
  hsn: string;
  expiryDate: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `http://localhost:3000/api/products`;  
  private apiUrl2 =`http://localhost:3000/api/bills`;

  constructor(private http: HttpClient) { }

  addProduct(productData: any): Observable<any> {
    return this.http.post(this.apiUrl, productData,{ responseType: 'text' });
  }

  searchProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?q=${query}`);
  }

  addBill(billData: any): Observable<any> {
    return this.http.post(`${this.apiUrl2}`, billData);
  }

  reduceProductQuantities(items: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/reduce-quantity`, { items });
  }

  getBilledData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}`);
  }

  getLowStockItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/low-stock`);
  }
  
  getMonthlyTotal(): Observable<any> {
    return this.http.get(`${this.apiUrl2}/monthly-total`);
  }
  
}
