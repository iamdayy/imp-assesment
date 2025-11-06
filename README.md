# Asesmen Software Engineer - PT Informatika Media Pratama

Ini adalah repositori submisi untuk tes asesmen Software Engineer di PT Informatika Media Pratama.

Aplikasi ini adalah web app sederhana dengan fitur **Autentikasi** (Sign Up, Sign In, Sign Out) dan **Manajemen Post (CRUD)**, lengkap dengan paginasi.

[cite_start]Sesuai persyaratan [cite: 5, 6, 11][cite_start], fungsionalitas yang sama diimplementasikan menggunakan dua tumpukan teknologi (stack) modern yang berbeda untuk mendemonstrasikan keserbagunaan[cite: 25].

---

## Struktur Repositori

[cite_start]Semua implementasi berada di dalam satu repositori Git ini, yang diorganisir ke dalam direktori terpisah[cite: 40]:

- `/laravel`: Implementasi full-stack menggunakan **Laravel (Blade)**.
- `/nextjs`: Implementasi full-stack menggunakan **Next.js (App Router)**.

---

## 1. Implementasi Laravel (Full-Stack)

Implementasi ini menggunakan pendekatan _server-rendered_ murni dengan Laravel, Blade, dan tumpukan TALL (Tailwind, Alpine.js) yang disediakan oleh Breeze.

### 📜 Teknologi yang Digunakan

- **Framework:** Laravel
- **Frontend:** Blade, Tailwind CSS
- **UI Components:** DaisyUI
- **Autentikasi:** Laravel Breeze (Blade Stack)
- **Database:** MySQL

### 🚀 Instalasi dan Cara Menjalankan (Laravel)

1.  Masuk ke direktori:
    ```bash
    cd laravel
    ```
2.  Salin file _environment_:
    ```bash
    cp .env.example .env
    ```
3.  Install dependensi Composer:
    ```bash
    composer install
    ```
4.  Buat _application key_:
    ```bash
    php artisan key:generate
    ```
5.  **Konfigurasi Database:** Buka file `.env` dan atur kredensial **MySQL** Anda. Pastikan Anda sudah membuat database (misal: `imp_assessment_laravel`).
    ```.env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=imp_assessment_laravel
    DB_USERNAME=root
    DB_PASSWORD=
    ```
6.  Jalankan migrasi database (ini akan membuat tabel `users`, `password_resets`, dan `posts`):
    ```bash
    php artisan migrate
    ```
7.  Install dependensi NPM:
    ```bash
    npm install
    ```
8.  Jalankan _development server_:

    ```bash
    # Terminal 1: Jalankan Vite (Frontend)
    npm run dev

    # Terminal 2: Jalankan Laravel (Backend)
    php artisan serve
    ```

9.  Aplikasi sekarang berjalan di `http://127.0.0.1:8000`.

---

## 2. Implementasi Next.js (Full-Stack)

[cite_start]Implementasi ini menggunakan Next.js dengan App Router[cite: 22]. Semua logika _backend_ (API Routes), _frontend_ (React Server & Client Components), dan _autentikasi_ ditangani dalam satu _codebase_.

### 📜 Teknologi yang Digunakan

- **Framework:** Next.js (App Router)
- **Backend:** Next.js API Routes
- **Database & ORM:** MySQL dengan Prisma
- **Autentikasi:** NextAuth.js (Credentials Provider)
- **UI Components:** Tailwind CSS, DaisyUI
- **Struktur:** Semua kode aplikasi berada di dalam direktori `src/`.

### 🚀 Instalasi dan Cara Menjalankan (Next.js)

1.  Masuk ke direktori:
    ```bash
    cd nextjs
    ```
2.  Install dependensi NPM:
    ```bash
    npm install
    ```
3.  **Konfigurasi Environment:** Buat file `.env` di _root_ folder `nextjs/`.
    ```bash
    touch .env
    ```
4.  Isi file `.env` dengan koneksi database **MySQL** dan _secret_ untuk NextAuth.

    ```.env
    # Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
    # Pastikan database (misal: imp_assessment_next) sudah dibuat.
    DATABASE_URL="mysql://root:password@localhost:3306/imp_assessment_next"

    # Secret untuk NextAuth.js (bisa digenerate dengan: openssl rand -base64 32)
    NEXTAUTH_SECRET=your-super-secret-key
    NEXTAUTH_URL=http://localhost:3000
    ```

5.  **Migrasi Database:** Jalankan Prisma untuk menerapkan skema (`schema.prisma`) ke database MySQL Anda:
    ```bash
    npx prisma migrate dev
    ```
6.  Jalankan _development server_:
    ```bash
    npm run dev
    ```
7.  Aplikasi sekarang berjalan di `http://localhost:3000`.

---

## [cite_start]Catatan Khusus & Pilihan Teknologi [cite: 38]

- [cite_start]**Pilihan Stack:** Dokumen asesmen menyebutkan "all three stacks" [cite: 23] [cite_start]namun hanya mendaftar dua teknologi wajib: **Laravel** [cite: 21] [cite_start]dan **Next.js**[cite: 22]. Submisi ini berfokus pada dua _stack_ yang terdaftar secara eksplisit.
- **Implementasi Laravel:**
  - Autentikasi menggunakan **Laravel Breeze** untuk _scaffolding_ yang cepat dan bersih.
  - Rute non-esensial (seperti `/dashboard` dan `/profile`) telah dihapus untuk fokus pada fitur inti.
  - Pengguna yang login otomatis diarahkan ke halaman `/posts`.
- **Implementasi Next.js:**
  - Menggunakan **Prisma** sebagai ORM untuk manajemen database yang modern dan _type-safe_.
  - Autentikasi menggunakan **NextAuth.js** dengan _Credentials Provider_. Karena itu, API route kustom (`/api/register`) dibuat untuk menangani pendaftaran pengguna baru.
  - Semua API _endpoint_ (`/api/posts` dan `/api/posts/[id]`) dilindungi dan memvalidasi kepemilikan data berdasarkan sesi pengguna.
  - Halaman _root_ (`/`) secara otomatis mengarahkan pengguna ke `/login` (jika _logout_) atau `/posts` (jika _login_) menggunakan _server-side redirect_.

## (Bonus) [cite_start]Docker Compose [cite: 41]

_(TODO: Instruksi untuk menjalankan kedua stack secara bersamaan menggunakan Docker Compose dapat ditambahkan di sini.)_
