import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-book-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class BookCreateComponent {
  book = {
    title: '',
    author: '',
    description: '',
    status: 'available',  
    imageUrl: '' 
  };

  constructor(
    public router: Router,
    private http: HttpClient // Inject HttpClient
  ) {}

  // Create book method
  createBook() {
    if (!this.book.title || !this.book.author || !this.book.description) {
      alert('Please fill all required fields!');
      return;
    }
  
    // ตรวจสอบค่าของ book ก่อนส่งคำขอ
    console.log('Sending book data: ', this.book);
  
    this.http.post('http://localhost:3000/books', this.book)
      .subscribe(
        (response) => {
          console.log('Book created successfully', response);
          this.router.navigate(['/']);  // กลับไปที่หน้ารายการหนังสือ
        },
        (error) => {
          console.error('Error creating book', error);
        }
      );
  }  
}
