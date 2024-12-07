import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class BookEditComponent implements OnInit {
  book: any = {}; // เก็บข้อมูลหนังสือที่จะแก้ไข
  bookId: number | null = null;

  constructor(
    public route: ActivatedRoute,
    public router: Router, 
    public http: HttpClient
  ) {}

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.bookId); // เพิ่มการแสดงค่าใน console เพื่อตรวจสอบ
    if (this.bookId) {
      this.loadBook(this.bookId); // ดึงข้อมูลหนังสือที่ต้องการแก้ไข
    } else {
      console.error('No book ID found');
    }
  }

  loadBook(id: number): void {
    this.http.get(`http://localhost:3000/books/${id}`).subscribe(
      (data) => {
        console.log('Book data:', data);  // ตรวจสอบข้อมูลที่ได้รับ
        this.book = data;
        if (this.book.status === null) {
          this.book.status = 'available';
        }
      },
      (error) => {
        console.error('Error loading book data', error); // ตรวจสอบข้อผิดพลาด
      }
    );
  }

  saveBook(): void {
    // ตรวจสอบว่า status ของหนังสือถูกต้องหรือไม่
    if (!['available', 'checked_out', 'unavailable'].includes(this.book.status)) {
      alert('Invalid status! Please choose a valid status (available, checked_out, unavailable).');
      return;
    }

    if (this.bookId) {
      // ส่งข้อมูลหนังสือที่แก้ไขแล้วไปยัง backend
      this.http.put(`http://localhost:3000/books/${this.bookId}`, this.book).subscribe(
        (response) => {
          alert('Book updated successfully!');
          this.router.navigate(['/']); // กลับไปที่หน้ารายการหลังบันทึกสำเร็จ
        },
        (error) => {
          console.error('Error updating book', error);
          alert('Failed to update book. Please try again.');
        }
      );
    }
  }
}
