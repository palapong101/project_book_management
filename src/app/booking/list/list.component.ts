import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // แก้ไขเป็น Router
import { BookService } from '../services/book.service'; // Import service

// Interface สำหรับ Book
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-booking-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];  // เก็บรายการหนังสือในรูปแบบของ array ที่มี type Book

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBooks();  // ดึงข้อมูลหนังสือเมื่อ component ถูกสร้าง
  }

  // ฟังก์ชันสำหรับดึงข้อมูลหนังสือจาก BookService
  fetchBooks(): void {
    this.bookService.getBooks().subscribe(
      (data) => {
        // ตรวจสอบว่า data มีข้อมูลหรือไม่
        if (Array.isArray(data)) {
          this.books = data;  // หากเป็น array, กำหนดข้อมูลลงใน books
        } else {
          console.error('Received data is not an array');
        }
      },
      (error) => {
        console.error('Error fetching books', error);  // แสดง error หากเกิดปัญหาในการดึงข้อมูล
      }
    );
  }

  // ฟังก์ชันสำหรับแก้ไขข้อมูล
  editBook(id: number): void {
    this.router.navigate([`/edit/${id}`]);  // นำทางไปยังหน้าตัวแก้ไข
  }

  // ฟังก์ชันสำหรับลบหนังสือ
  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.fetchBooks();  // รีเฟรชข้อมูลหลังจากการลบ
      });
    }
  }
}
