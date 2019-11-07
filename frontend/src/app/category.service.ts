import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from './category/category';
import { Observable } from 'rxjs';

const apiUrl = 'http://localhost:3000/api/category/';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(apiUrl);
  }
}
