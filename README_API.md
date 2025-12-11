# E-Commerce REST API

REST API untuk aplikasi E-Commerce yang dibangun dengan Laravel. API ini menyediakan endpoint untuk mengelola produk, user, transaksi, detail transaksi, dan pembayaran.

## 🚀 Fitur

-   ✅ Authentication dengan Laravel Sanctum (Token-based)
-   ✅ CRUD Produk
-   ✅ CRUD Users
-   ✅ CRUD Transaksi
-   ✅ CRUD Detail Transaksi
-   ✅ CRUD Pembayaran
-   ✅ CORS enabled untuk frontend integration
-   ✅ Response format JSON standar
-   ✅ Error handling yang komprehensif

## 📋 Prerequisites

-   PHP 8.3+
-   Composer
-   MySQL Database
-   Laravel 12.x

## 🔧 Instalasi

1. Clone repository

```bash
git clone <repository-url>
cd ecommerce-app-sister
```

2. Install dependencies

```bash
composer install
```

3. Copy .env file

```bash
cp .env.example .env
```

4. Generate application key

```bash
php artisan key:generate
```

5. Configure database di `.env`

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=db_transaksi
DB_USERNAME=root
DB_PASSWORD=
```

6. Run migrations

```bash
php artisan migrate
```

7. (Optional) Seed database

```bash
php artisan db:seed
```

8. Start development server

```bash
php artisan serve
```

API akan berjalan di `http://localhost:8000`

## 📚 Dokumentasi API

Dokumentasi lengkap API tersedia di file [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

### Base URL

```
http://localhost:8000/api
```

### Authentication

API menggunakan Laravel Sanctum untuk autentikasi. Untuk mengakses endpoint yang protected, Anda perlu:

1. Register atau Login untuk mendapatkan token
2. Sertakan token di header request:

```
Authorization: Bearer {your-token}
```

### Quick Start

**1. Register User Baru**

```bash
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**2. Get All Products (Public)**

```bash
GET /api/produk
```

**3. Create Transaction (Protected)**

```bash
POST /api/transaksi
Authorization: Bearer {token}
Content-Type: application/json

{
  "user_id": 1,
  "total_harga": 100000,
  "alamat_pengiriman": "Jl. Example No. 123",
  "status": "pending",
  "details": [
    {
      "produk_id": 1,
      "jumlah": 2,
      "harga_satuan": 50000,
      "subtotal": 100000
    }
  ]
}
```

## 📌 Available Endpoints

### Authentication

-   `POST /api/register` - Register user baru
-   `POST /api/login` - Login user
-   `POST /api/logout` - Logout user (Protected)

### Produk

-   `GET /api/produk` - Get all products (Public)
-   `GET /api/produk/{id}` - Get single product (Public)
-   `POST /api/produk` - Create product (Protected)
-   `PUT /api/produk/{id}` - Update product (Protected)
-   `DELETE /api/produk/{id}` - Delete product (Protected)

### Users

-   `GET /api/users` - Get all users (Protected)
-   `GET /api/users/{id}` - Get single user (Protected)
-   `PUT /api/users/{id}` - Update user (Protected)
-   `DELETE /api/users/{id}` - Delete user (Protected)

### Transaksi

-   `GET /api/transaksi` - Get all transactions (Protected)
-   `GET /api/transaksi/{id}` - Get single transaction (Protected)
-   `POST /api/transaksi` - Create transaction (Protected)
-   `PUT /api/transaksi/{id}` - Update transaction (Protected)
-   `DELETE /api/transaksi/{id}` - Delete transaction (Protected)

### Detail Transaksi

-   `GET /api/detail-transaksi` - Get all detail transactions (Protected)
-   `GET /api/transaksi/{transaksi_id}/details` - Get details by transaction (Protected)
-   `GET /api/detail-transaksi/{id}` - Get single detail (Protected)
-   `POST /api/detail-transaksi` - Create detail (Protected)
-   `PUT /api/detail-transaksi/{id}` - Update detail (Protected)
-   `DELETE /api/detail-transaksi/{id}` - Delete detail (Protected)

### Pembayaran

-   `GET /api/pembayaran` - Get all payments (Protected)
-   `GET /api/pembayaran/{id}` - Get single payment (Protected)
-   `POST /api/pembayaran` - Create payment (Protected)
-   `PUT /api/pembayaran/{id}` - Update payment (Protected)
-   `DELETE /api/pembayaran/{id}` - Delete payment (Protected)

## 🧪 Testing

### Menggunakan cURL

Lihat file [API_EXAMPLES.sh](API_EXAMPLES.sh) untuk contoh request menggunakan cURL.

### Menggunakan Postman/Insomnia

1. Import collection dari dokumentasi API
2. Set environment variable untuk `base_url` dan `token`
3. Test endpoints sesuai kebutuhan

### Contoh Response

**Success Response:**

```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": { ... }
}
```

**Error Response:**

```json
{
  "success": false,
  "message": "Error message",
  "errors": { ... }
}
```

## 🔒 CORS Configuration

CORS sudah dikonfigurasi untuk menerima request dari semua origin. Untuk production, sebaiknya ubah `config/cors.php`:

```php
'allowed_origins' => [
    'https://your-frontend-domain.com'
],
```

## 📖 Database Schema

### Tabel Utama:

-   `users` - Data user/pelanggan
-   `produk` - Data produk
-   `transaksi` - Data transaksi
-   `detail_transaksi` - Detail item per transaksi
-   `pembayaran` - Data pembayaran

## 🛠️ Technology Stack

-   **Framework**: Laravel 12.x
-   **Authentication**: Laravel Sanctum
-   **Database**: MySQL
-   **PHP**: 8.3+

## 📝 Notes

-   Pastikan `SESSION_DRIVER` di `.env` diset ke `file` atau `database`
-   Token autentikasi akan expire sesuai konfigurasi Sanctum
-   Semua response menggunakan format JSON
-   API mendukung filtering pada beberapa endpoint (contoh: `/api/transaksi?user_id=1`)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.

## 👥 Author

Haikal23095

## 📞 Support

Untuk bantuan atau pertanyaan, silakan buka issue di repository ini.

---

**Happy Coding! 🚀**
