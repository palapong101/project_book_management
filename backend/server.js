const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // ใช้ promise-based MySQL client

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
let db;
const connectDB = async () => {
    try {
        db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'book_management'
        });
        console.log('Connected to database!');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1); // ปิดเซิร์ฟเวอร์ถ้าเชื่อมต่อไม่ได้
    }
};

// API Routes
// Get all books
app.get('/books', async (req, res) => {
    try {
        const [results] = await db.query('SELECT * FROM books');
        res.json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});

// เส้นทางดึงข้อมูลหนังสือเฉพาะ
app.get('/books/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [results] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch book' });
    }
});

// Add a new book
app.post('/books', async (req, res) => {
    const { title, author, description, status } = req.body;
    console.log('Received book data: ', req.body); // ตรวจสอบข้อมูลที่ได้รับจาก frontend
    
    try {
      // ถ้าไม่มีค่า status ให้ใช้ 'available' เป็นค่าเริ่มต้น
      const [results] = await db.query(
        'INSERT INTO books (title, author, description, status) VALUES (?, ?, ?, ?)', 
        [title, author, description, status || 'available']  // กำหนดค่า default เป็น 'available'
      );
  
      res.status(201).json({
        id: results.insertId,
        title,
        author,
        description,
        status: status || 'available'  // ส่งค่ากลับไปพร้อมกับสถานะ
      });
    } catch (err) {
      console.error('Error creating book', err);
      res.status(500).json({ error: 'Failed to create book' });
    }
  });

// Update book by ID
app.put('/books/:id', async (req, res) => {
    const { id } = req.params; // ดึง id จาก URL
    const { title, author, description, status } = req.body; // ดึงข้อมูลจาก body

    // ตรวจสอบว่ามีข้อมูลที่ต้องการอัปเดตครบหรือไม่
    if (!title || !author || !description) {
        return res.status(400).json({ error: 'Title, author, and description are required' });
    }

    // ถ้าไม่มีค่า status ให้ใช้ 'available' เป็นค่าเริ่มต้น
    const updatedStatus = status || 'available'; // กำหนดค่า default เป็น 'available'

    try {
        // อัปเดตข้อมูลในฐานข้อมูล
        const [result] = await db.query(
            'UPDATE books SET title = ?, author = ?, description = ?, status = ? WHERE id = ?',
            [title, author, description, updatedStatus, id]  // เพิ่ม status ใน query
        );

        if (result.affectedRows === 0) {
            // ถ้าไม่มีแถวใดที่ถูกอัปเดต
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ message: 'Book updated successfully!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to update book' });
    }
});

// Delete book by ID
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params; // ดึง id จาก URL

    try {
        // ลบข้อมูลจากฐานข้อมูล
        const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            // ถ้าไม่มีแถวใดที่ถูกลบ
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json({ message: 'Book deleted successfully!' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete book' });
    }
});

// Default Route (สำหรับกรณีไม่พบเส้นทาง)
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start Server
const startServer = async () => {
    await connectDB();
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
};

startServer();
