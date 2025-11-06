FROM node:22-alpine

# Setel direktori kerja di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin sisa kode aplikasi
# (Kita pisahkan agar Docker bisa cache 'npm install' jika package.json tidak berubah)
COPY . .

# Penting: Generate Prisma Client di dalam container
RUN npx prisma generate

# Build aplikasi Next.js untuk produksi
RUN npm run build

# Expose port 3000 (port default Next.js)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi saat container dimulai
CMD ["npm", "run", "start"]