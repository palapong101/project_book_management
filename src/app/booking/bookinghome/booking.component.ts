import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  books: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.http.get<any[]>('http://localhost:3000/books')
      .subscribe(
        data => {
          this.books = data;
        },
        error => {
          console.error('Error fetching books', error);
        }
      );
  }

  addBook(): void {
    this.router.navigate(['/create']);
  }

  showBook(bookId: number): void {
    this.router.navigate([`/view/${bookId}`]); // ไปที่หน้ารายละเอียดของหนังสือที่เลือก
  }

  showAllBooks(): void {
    this.router.navigate(['/detail']); // ไปที่หน้ารวมหนังสือทั้งหมด
  }

  editBook(bookId: number): void {
    this.router.navigate([`/edit/${bookId}`]);
  }

  deleteBook(bookId: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.http.delete(`http://localhost:3000/books/${bookId}`)
        .subscribe(() => {
          this.fetchBooks(); // อัปเดตรายการหนังสือหลังจากลบ
        });
    }
  }
}
