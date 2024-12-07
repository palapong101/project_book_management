import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class BookService {
    private baseUrl = 'http://localhost:3000/books';
  
    constructor(private http: HttpClient) {}
  
    // ฟังก์ชันสำหรับดึงข้อมูลทั้งหมด
    getBooks(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl);
    }
  
    // ฟังก์ชันสำหรับดึงข้อมูลหนังสือที่ต้องการด้วย id
    getBook(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/${id}`);
    }
  
    // ฟังก์ชันอื่น ๆ สำหรับเพิ่ม, อัปเดต, ลบ
    addBook(book: any): Observable<any> {
      return this.http.post(this.baseUrl, book);
    }
  
    updateBook(id: number, book: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/${id}`, book);
    }
  
    deleteBook(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`);
    }
  }
