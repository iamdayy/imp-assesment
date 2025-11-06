# Asesmen Software Engineer - PT Informatika Media Pratama

Ini adalah repositori submisi untuk tes asesmen Software Engineer di PT Informatika Media Pratama.

Aplikasi ini adalah web app sederhana dengan fitur **Autentikasi** (Sign Up, Sign In, Sign Out) dan **Manajemen Post (CRUD)**, lengkap dengan paginasi.

Sesuai persyaratan, fungsionalitas yang sama diimplementasikan menggunakan dua tumpukan teknologi (stack) modern yang berbeda untuk mendemonstrasikan keserbagunaan.

---

## 🚀 Instalasi & Menjalankan (Metode Direkomendasikan: Docker)

Cara termudah dan tercepat untuk menjalankan **keseluruhan proyek** (kedua aplikasi dan database) adalah dengan menggunakan Docker.

**Prasyarat:** Anda harus menginstal **Docker Desktop**.

### 1. Persiapan Environment

Anda perlu membuat dua file `.env` (satu untuk Laravel, satu untuk Next.js) sebelum menjalankan Docker.

**A. Laravel:**
Salin file `.env` contoh di dalam folder `laravel`:

```bash
cp laravel/.env.example laravel/.env
```

Buat _application key_ (ini wajib untuk Docker):

```bash
# Jalankan di terminal Anda (di dalam folder /laravel)
cd laravel
php artisan key:generate
cd ..
```

_Catatan: Anda tidak perlu mengubah isi file `.env` ini, karena file `docker-compose.yml` akan menimpanya._

**B. Next.js:**
Buat file `.env` kosong di dalam folder `nextjs`:

```bash
touch nextjs/.env
```

_Catatan: File ini diperlukan agar build Docker tidak gagal. Variabel environment akan disuntik oleh `docker-compose.yml`._

### 2. Jalankan Docker Compose

Dari direktori **root** proyek (tempat file `docker-compose.yml` berada), jalankan:

```bash
docker-compose up --build
```

Ini akan memakan waktu beberapa menit saat pertama kali, karena akan mengunduh image (MySQL, Nginx, PHP) dan membangun kedua aplikasi Anda.

### 3. Jalankan Migrasi (Satu Kali)

Setelah semua _container_ berjalan, buka **terminal baru** dan jalankan perintah migrasi berikut untuk menyiapkan tabel database:

**A. Migrasi Laravel:**

```bash
docker-compose exec laravel-app php artisan migrate --force
```

_Catatan: Anda mungkin juga perlu menjalankan `docker-compose exec laravel-app php artisan config:cache`, `route:cache`, dan `view:cache` jika Anda mengubah file-file tersebut di mode produksi._

**B. Migrasi Next.js (Prisma):**

```bash
docker-compose exec nextjs-app npx prisma migrate dev
```

### Selesai! Aplikasi Anda Siap:

- **Aplikasi Laravel** berjalan di: `http://localhost:8000`
- **Aplikasi Next.js** berjalan di: `http://localhost:3000`
- Kedua aplikasi terhubung ke database MySQL **yang sama** (`imp_assessment_db`) yang berjalan di dalam Docker.

---

## Struktur Repositori

- `/laravel`: Implementasi full-stack menggunakan **Laravel (Blade)**.
- `/nextjs`: Implementasi full-stack menggunakan **Next.js (App Router)**.
- `docker-compose.yml`: File orkestrasi untuk menjalankan kedua _stack_ (Bonus).

---

## 1. Implementasi Laravel (Full-Stack)

Implementasi ini menggunakan pendekatan _server-rendered_ murni dengan Laravel, Blade, dan tumpukan TALL (Tailwind, Alpine.js) yang disediakan oleh Breeze.

### 📜 Teknologi yang Digunakan

- **Framework:** Laravel
- **Frontend:** Blade, Tailwind CSS
- **UI Components:** DaisyUI
- **Autentikasi:** Laravel Breeze (Blade Stack)
- **Database:** MySQL

### 🚀 Instalasi Manual (Laravel)

_(Instalasi manual jika Anda **tidak** menggunakan Docker)_

1.  `cd laravel`
2.  `cp .env.example .env`
3.  `composer install`
4.  `php artisan key:generate`
5.  Atur kredensial database MySQL Anda di `.env`.
6.  `php artisan migrate`
7.  `npm install`
8.  Jalankan `npm run dev` (di satu terminal) & `php artisan serve` (di terminal lain).

---

## 2. Implementasi Next.js (Full-Stack)

Implementasi ini menggunakan Next.js dengan App Router. Semua logika _backend_ (API Routes), _frontend_ (React Server & Client Components), dan _autentikasi_ ditangani dalam satu _codebase_.

### 📜 Teknologi yang Digunakan

- **Framework:** Next.js (App Router, Node.js 22)
- **Backend:** Next.js API Routes
- **Database & ORM:** MySQL dengan Prisma
- **Autentikasi:** NextAuth.js (Credentials Provider)
- **UI Components:** Tailwind CSS, DaisyUI
- **Struktur:** Semua kode aplikasi berada di dalam direktori `src/`.

### 🚀 Instalasi Manual (Next.js)

_(Instalasi manual jika Anda **tidak** menggunakan Docker)_

1.  `cd nextjs`
2.  `npm install`
3.  Buat file `.env` dan isi `DATABASE_URL`, `NEXTAUTH_SECRET`, dan `NEXTAUTH_URL`.
4.  `npx prisma migrate dev`
5.  `npm run dev`
6.  Aplikasi berjalan di `http://localhost:3000`.

---

## Catatan Khusus & Pilihan Teknologi

- **Pilihan Stack:** Dokumen asesmen menyebutkan "all three stacks" namun hanya mendaftar dua teknologi wajib: **Laravel** dan **Next.js**. Submisi ini berfokus pada dua _stack_ yang terdaftar secara eksplisit.
- **Implementasi Laravel:**
  - Autentikasi menggunakan **Laravel Breeze** untuk _scaffolding_ yang cepat dan bersih.
  - Rute non-esensial (seperti `/dashboard` dan `/profile`) telah dihapus untuk fokus pada fitur inti.
  - Pengguna yang login otomatis diarahkan ke halaman `/posts`.
- **Implementasi Next.js:**
  - Menggunakan **Prisma** sebagai ORM untuk manajemen database yang modern dan _type-safe_.
  - Autentikasi menggunakan **NextAuth.js** dengan _Credentials Provider_. API route kustom (`/api/register`) dibuat untuk menangani pendaftaran pengguna baru.
  - Konfigurasi `authOptions` dipisah ke `src/lib/auth.ts` untuk mematuhi aturan ketat Next.js Route Handler.
  - Halaman _root_ (`/`) secara otomatis mengarahkan pengguna ke `/login` (jika _logout_) atau `/posts` (jika _login_) menggunakan _server-side redirect_.
