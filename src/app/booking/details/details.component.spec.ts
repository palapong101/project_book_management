import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class BookDetailComponent implements OnInit {
  books: any[] = []; // ตัวแปรเก็บข้อมูลหนังสือทั้งหมด

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks(); // ดึงข้อมูลหนังสือเมื่อ component โหลด
  }

  fetchBooks(): void {
    this.http.get<any[]>('http://localhost:3000/books').subscribe(
      (data) => {
        this.books = data; // เก็บข้อมูลหนังสือในตัวแปร books
      },
      (error) => {
        console.error('Error fetching books', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/']); // กลับไปที่หน้า Home
  }
}
