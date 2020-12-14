import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:4000/produtos`);
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:4000/produtos/${id}`);
  }
}
