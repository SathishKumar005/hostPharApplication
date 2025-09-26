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

  private storageKey = 'pharmacy_items';

 private jsonUrl = 'assets/bills.json';
 private jsonUrl2 = 'assets/products.json';

  constructor(private http: HttpClient) {
     if (!localStorage.getItem(this.storageKey)) {
      fetch('assets/data/pharmacy.json')
        .then(res => res.json())
        .then(data => {
          localStorage.setItem(this.storageKey, JSON.stringify(data.pharmacy_items));
        });
    }
   }

  // addProduct(productData: any): Observable<any> {
  //   return this.http.post(this.apiUrl, productData,{ responseType: 'text' });
  // }
    getProducts(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
   addProduct(product: any): void {
    const products = this.getProducts();

    // Assign new ID automatically
    product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

    products.push(product);
    localStorage.setItem(this.storageKey, JSON.stringify(products));
  }
//////////////////////////////////////////////////////
  // searchProducts(query: string): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/search?q=${query}`);
  // }
  
  searchProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?q=${query}`);
  }

  addBill(billData: any): Observable<any> {
    return this.http.post(`${this.apiUrl2}`, billData);
  }

  reduceProductQuantities(items: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/reduce-quantity`, { items });
  }

  // getBilledData(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl2}`);
  // }
    getBilledData(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl);
  }

 getLowStockItems(): Observable<any> {
    return this.http.get<any[]>(this.jsonUrl2);
  }
  
  getMonthlyTotal(): Observable<any> {
    return this.http.get(`${this.apiUrl2}/monthly-total`);
  }
  
}
