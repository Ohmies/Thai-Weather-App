# 🌤️ Thai Weather App - พยากรณ์อากาศไทย

Web Application สำหรับแสดงข้อมูลสภาพอากาศและพยากรณ์อากาศของประเทศไทย พัฒนาด้วย Node.js, Express.js และ TailwindCSS

## ✨ คุณสมบัติ

- 🌡️ แสดงสภาพอากาศปัจจุบัน (อุณหภูมิ, ความชื้น, ความกดอากาศ, ความเร็วลม)
- 📅 พยากรณ์อากาศ 5 วันข้างหน้า
- 🗺️ เลือกสภาพอากาศตามจังหวัดต่างๆ ในประเทศไทย
- 📍 ใช้ตำแหน่งปัจจุบันของผู้ใช้ (Geolocation)
- 🎨 UI/UX ที่สวยงามด้วย TailwindCSS และ Font Awesome
- 📱 Responsive Design รองรับทุกอุปกรณ์
- 🔄 อัปเดตข้อมูลแบบ Real-time

## 🚀 การติดตั้ง

### ข้อกำหนดเบื้องต้น
- Node.js (version 14 หรือใหม่กว่า)
- npm หรือ yarn
- OpenWeatherMap API Key

### ขั้นตอนการติดตั้ง

1. **Clone repository**
   ```bash
   git clone <your-repo-url>
   cd OpenWeatherJS
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **สร้าง CSS จาก TailwindCSS**
   ```bash
   npm run build:css
   ```

4. **ตั้งค่า Environment Variables**
   
   สร้างไฟล์ `.env` และเพิ่มข้อมูลต่อไปนี้:
   ```env
   PORT=3000
   OPENWEATHER_API_KEY=your_openweather_api_key_here
   OPENWEATHER_API_URL=https://api.openweathermap.org/data/2.5
   ```

   **⚠️ สำคัญ:** 
   - ไม่เคยใส่ API key จริงในไฟล์ `.env.example`
   - ตรวจสอบว่าไฟล์ `.env` อยู่ใน `.gitignore`
   - API key ควรเก็บเป็นความลับเสมอ

   **การรับ OpenWeatherMap API Key:**
   - ไปที่ [OpenWeatherMap](https://openweathermap.org/api)
   - สมัครสมาชิกฟรี
   - ไปที่ API Keys section
   - คัดลอก API key ของคุณ

5. **เริ่มใช้งาน**
   ```bash
   npm start
   ```

   เปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

## 📂 โครงสร้างไฟล์

```
OpenWeatherJS/
├── public/
│   ├── css/
│   │   ├── input.css      # TailwindCSS input
│   │   └── output.css     # CSS ที่ compile แล้ว
│   ├── js/
│   │   └── app.js         # Frontend JavaScript
│   └── index.html         # หน้าเว็บหลัก
├── routes/
│   └── weather.js         # API routes สำหรับสภาพอากาศ
├── server.js              # Express server
├── package.json
├── tailwind.config.js     # TailwindCSS configuration
├── postcss.config.js      # PostCSS configuration
└── .env                   # Environment variables
```

## 🛠️ NPM Scripts

- `npm start` - เริ่มใช้งาน server
- `npm run dev` - เริ่มใช้งาน server (เหมือน start)
- `npm run build:css` - สร้าง CSS จาก TailwindCSS
- `npm run watch:css` - สร้าง CSS และ watch สำหรับการเปลี่ยนแปลง

## 🗺️ API Endpoints

### GET `/api/weather/current`
ดึงข้อมูลสภาพอากาศปัจจุบัน

**Parameters:**
- `city` (string) - ชื่อจังหวัด
- `lat` (number) - ละติจูด  
- `lon` (number) - ลองจิจูด

### GET `/api/weather/forecast`
ดึงข้อมูลพยากรณ์อากาศ

**Parameters:**
- `city` (string) - ชื่อจังหวัด
- `lat` (number) - ละติจูด
- `lon` (number) - ลองจิจูด

### GET `/api/weather/provinces`
ดึงรายชื่อจังหวัดที่รองรับ

## 🌍 จังหวัดที่รองรับ

แอปพลิเคชันรองรับจังหวัดหลักๆ ของประเทศไทย:
- กรุงเทพมหานคร
- เชียงใหม่
- เชียงราย
- ภูเก็ต
- พัทยา
- หัวหิน
- เขาใหญ่
- อยุธยา
- นครราชสีมา
- ขอนแก่น

## 💡 การใช้งาน

1. **ค้นหาสภาพอากาศ:** เลือกจังหวัดจาก dropdown แล้วกด "ค้นหา"
2. **ใช้ตำแหน่งปัจจุบัน:** กดปุ่ม 📍 ที่มุมขวาบน
3. **รีเฟรชข้อมูล:** กดปุ่ม 🔄 ที่มุมขวาบน

## 🎨 เทคโนโลยีที่ใช้

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Axios** - HTTP client สำหรับเรียก API
- **dotenv** - จัดการ environment variables
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **HTML5** - โครงสร้างหน้าเว็บ
- **TailwindCSS** - CSS framework
- **JavaScript (ES6+)** - ตัวจัดการ frontend
- **Font Awesome** - ไอคอน
- **Google Fonts (Sarabun)** - ฟอนต์ภาษาไทย

### API
- **OpenWeatherMap API** - ข้อมูลสภาพอากาศ

## 🔧 การพัฒนาเพิ่มเติม

### เพิ่มจังหวัดใหม่
แก้ไขไฟล์ `routes/weather.js` ในส่วน `thaiProvinces` array:

```javascript
const thaiProvinces = [
  { name: 'ชื่อจังหวัด', en: 'Province Name', lat: ละติจูด, lon: ลองจิจูด },
  // ...
];
```

### การปรับแต่ง UI
แก้ไขไฟล์ `public/css/input.css` และรัน `npm run build:css`

## 🐛 การแก้ปัญหา

### ปัญหาที่พบบ่อย

1. **API Key ไม่ทำงาน**
   - ตรวจสอบว่าได้ใส่ API key ในไฟล์ `.env` ถูกต้อง
   - ตรวจสอบว่า API key ยังใช้งานได้

2. **CSS ไม่แสดงผล**
   - รัน `npm run build:css` เพื่อสร้าง CSS ใหม่

3. **ไม่สามารถหาตำแหน่งได้**
   - ให้อนุญาตการเข้าถึงตำแหน่งในเบราว์เซอร์
   - ตรวจสอบว่าใช้ HTTPS (สำหรับ production)

## 📄 License

MIT License - ดูรายละเอียดในไฟล์ LICENSE

## 🤝 การมีส่วนร่วม

ยินดีรับ Pull Requests และ Issues ทุกชนิด!

1. Fork project
2. สร้าง feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## 📞 ติดต่อ

หากมีคำถามหรือข้อเสนอแนะ กรุณาติดต่อผ่าน:
- Issues ในโปรเจคนี้
- Email: [Ohmperapatsingpan.15@gmail.com]

---

🌤️ **Thai Weather App** - รู้สภาพอากาศ รู้ล่วงหน้า!
