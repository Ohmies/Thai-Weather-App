# 🌤️ Thai Weather App

เว็บแอปพลิเคชันพยากรณ์อากาศสำหรับประเทศไทย ครอบคลุม 77 จังหวัด ใช้เทคโนโลยี Node.js, Express และ Frontend แบบ Responsive

[![GitHub stars](https://img.shields.io/github/stars/Ohmies/Thai-Weather-App.svg)](https://github.com/Ohmies/Thai-Weather-App/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Ohmies/Thai-Weather-App.svg)](https://github.com/Ohmies/Thai-Weather-App/network)
[![GitHub issues](https://img.shields.io/github/issues/Ohmies/Thai-Weather-App.svg)](https://github.com/Ohmies/Thai-Weather-App/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🌍 **แอปพลิเคชันพยากรณ์อากาศ**: เว็บแอปที่แสดงข้อมูลสภาพอากาศและพยากรณ์อากาศของประเทศไทยแบบ Real-time

## 📋 คุณสมบัติ

- ✅ **พยากรณ์อากาศปัจจุบัน** และพยากรณ์ 5 วันข้างหน้า
- 🌏 **ครอบคลุม 77 จังหวัด** ทั่วประเทศไทย
- 📊 **กราฟแนวโน้มอากาศ** แสดงข้อมูลเป็นแผนภูมิที่เข้าใจง่าย
- 🌡️ **ข้อมูลครบถ้วน** อุณหภูมิ, ความชื้น, ความเร็วลม, ปริมาณฝน
- 📱 **Responsive Design** รองรับการใช้งานบนอุปกรณ์ทุกขนาด
- 🎨 **UI ที่สวยงาม** ใช้ Tailwind CSS และ Font Sarabun
- ⚡ **Real-time Data** ข้อมูลจาก OpenWeatherMap API
- 🔍 **ค้นหาสะดวก** เลือกจังหวัดได้ง่ายผ่าน Dropdown

## 🏗️ โครงสร้างโปรเจกต์

```
Thai-Weather-App/
├── server.js               # Main Server (Express.js)
├── package.json            # Dependencies และ Scripts
├── vercel.json            # Vercel Deployment Config
├── tailwind.config.js     # Tailwind CSS Configuration
├── postcss.config.js      # PostCSS Configuration
├── routes/
│   └── weather.js         # Weather API Routes
└── public/
    ├── index.html         # หน้าเว็บหลัก
    ├── css/
    │   ├── input.css      # Tailwind Input CSS
    │   └── output.css     # Compiled CSS
    └── js/
        └── app.js         # Frontend JavaScript Logic
```

## �️ เทคโนโลยีที่ใช้

### Backend
- **Node.js** - JavaScript Runtime Environment
- **Express.js** - Web Application Framework
- **Axios** - HTTP Client สำหรับเรียก API
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment Variables Management

### Frontend
- **HTML5, CSS3, JavaScript** - Core Web Technologies
- **Tailwind CSS** - Utility-first CSS Framework
- **Chart.js** - JavaScript Charting Library
- **Font Awesome** - Icon Library
- **Google Fonts (Sarabun)** - Thai-friendly Typography

### External API
- **OpenWeatherMap API** - Weather Data Provider

## 🚀 Quick Start (เริ่มใช้งานเร็ว)

```bash
# 1. Clone repository
git clone https://github.com/Ohmies/Thai-Weather-App.git
cd Thai-Weather-App

# 2. ติดตั้ง dependencies
npm install

# 3. ตั้งค่า Environment Variables
cp .env.example .env
# แก้ไข .env และใส่ OPENWEATHER_API_KEY

# 4. รันแอปพลิเคชัน
npm start

# 5. เปิดเบราว์เซอร์ไปที่
http://localhost:3000
```

## 📦 การติดตั้งแบบละเอียด

### ข้อกำหนดเบื้องต้น

- ✅ **Node.js** (เวอร์ชัน 14.0 หรือสูงกว่า) - [ดาวน์โหลด](https://nodejs.org/)
- ✅ **npm** หรือ **yarn** (มาพร้อม Node.js)
- ✅ **Git** - [ดาวน์โหลด](https://git-scm.com/)
- ✅ **OpenWeatherMap API Key** - [สมัครฟรี](https://openweathermap.org/api)

### 1. Clone Repository

```bash
git clone https://github.com/Ohmies/Thai-Weather-App.git
cd Thai-Weather-App
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. การตั้งค่า API Key

#### 🔑 ขั้นตอนการสมัคร OpenWeatherMap API

1. เข้าไปที่ [OpenWeatherMap](https://openweathermap.org/api)
2. คลิก **"Sign Up"** เพื่อสร้างบัญชีใหม่ (ฟรี)
3. ยืนยันอีเมลจากลิงก์ที่ส่งมา
4. เข้าสู่ระบบและไปที่ **"My API Keys"**
5. คัดลอก API Key ที่ได้

#### 🔧 การตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์หลัก:

```bash
# สร้างไฟล์ .env
touch .env
```

เพิ่มเนื้อหาในไฟล์ `.env`:

```env
OPENWEATHER_API_KEY=your_api_key_here
PORT=3000
```

**⚠️ หมายเหตุ**: แทนที่ `your_api_key_here` ด้วย API Key ที่ได้จากการสมัคร

### 4. การรันแอปพลิเคชัน

#### การรันแบบ Development

```bash
npm run dev
# หรือ
npm start
```

แอปพลิเคชันจะรันที่: `http://localhost:3000`

#### การรันแบบ Production

```bash
npm run build
npm start
```

## 🚀 การใช้งาน

1. เปิดเว็บเบราว์เซอร์และไปที่ `http://localhost:3000`
2. เลือกจังหวัดที่ต้องการจาก **Dropdown Menu**
3. ดูข้อมูลสภาพอากาศปัจจุบัน:
   - **อุณหภูมิ** (°C)
   - **ความชื้น** (%)
   - **ความเร็วลม** (m/s)
   - **ปริมาณฝน** (mm)
   - **สภาพอากาศ** (แสงแดด, ฝน, เมฆ)
4. ดูพยากรณ์อากาศ **5 วันข้างหน้า**
5. ดูกราฟแนวโน้ม:
   - **กราฟอุณหภูมิ**
   - **กราฟความชื้น**
   - **กราฟความเร็วลม**

## � API Endpoints

### Weather API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/weather/:province` | ดึงข้อมูลสภาพอากาศตามจังหวัด |
| `GET` | `/api/weather/forecast/:province` | ดึงพยากรณ์อากาศ 5 วัน |

### ตัวอย่าง API Response

```json
{
  "success": true,
  "data": {
    "province": "กรุงเทพมหานคร",
    "temperature": 32,
    "humidity": 65,
    "windSpeed": 3.2,
    "description": "แสงแดดจัด",
    "icon": "01d",
    "forecast": [...]
  }
}
```

## 🌍 จังหวัดที่รองรับ (77 จังหวัด)

### ภาคเหนือ
- เชียงใหม่, เชียงราย, ลำปาง, ลำพูน, แม่ฮ่องสอน, น่าน, พะเยา, แพร่, อุตรดิตถ์

### ภาคตะวันออกเฉียงเหนือ
- กาฬสินธุ์, ขอนแก่น, ชัยภูมิ, นครพนม, นครราชสีมา, บึงกาฬ, บุรีรัมย์ และอื่นๆ

### ภาคกลาง
- กรุงเทพมหานคร, กาญจนบุรี, ฉะเชิงเทรา, ชัยนาท, นครนายก, นครปฐม และอื่นๆ

### ภาคตะวันออก
- จันทบุรี, ฉะเชิงเทรา, ชลบุรี, ตราด, ปราจีนบุรี, ระยอง, สระแก้ว

### ภาคใต้
- กระบี่, ชุมพร, ตรัง, นครศรีธรรมราช, นราธิวาส, ปัตตานี, พังงา, ภูเก็ต และอื่นๆ

## 🔧 การกำหนดค่า

### การเปลี่ยน Port

แก้ไขในไฟล์ `.env`:
```env
PORT=3001  # เปลี่ยนเป็นพอร์ตที่ต้องการ
```

### การปรับแต่ง UI

แก้ไขไฟล์ `tailwind.config.js` สำหรับการปรับแต่งสี:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',    // เปลี่ยนสีหลัก
        secondary: '#10B981'   // เปลี่ยนสีรอง
      }
    }
  }
}
```

### การเพิ่มจังหวัดใหม่

แก้ไขในไฟล์ `public/js/app.js`:
```javascript
const provinces = [
    // เพิ่มจังหวัดใหม่ที่นี่
    'จังหวัดใหม่'
];
```

## �️ ความปลอดภัย

### Best Practices ที่ใช้:

1. **Environment Variables**: ซ่อน API Keys ใน .env files
2. **CORS Protection**: จำกัดการเข้าถึงจากโดเมนอื่น
3. **Input Validation**: ตรวจสอบข้อมูลที่รับเข้ามา
4. **Error Handling**: จัดการข้อผิดพลาดอย่างเหมาะสม

### การรักษาความปลอดภัยเพิ่มเติม:

- ไม่เปิดเผย API Key ใน Frontend
- ใช้ HTTPS สำหรับ Production
- ตั้งค่า Rate Limiting สำหรับ API

## ❓ FAQ (คำถามที่พบบ่อย)

### Q: ข้อมูลอัปเดตบ่อยแค่ไหน?
**A:** ข้อมูลจาก OpenWeatherMap อัปเดตทุก 10 นาที สำหรับข้อมูลปัจจุบัน

### Q: ทำไมข้อมูลบางจังหวัดไม่แสดง?
**A:** ตรวจสอบ API Key และการเชื่อมต่ออินเทอร์เน็ต หรือลองรีเฟรชหน้าเว็บ

### Q: สามารถใช้งานแบบ Offline ได้ไหม?
**A:** ไม่ได้ เพราะต้องเรียกข้อมูลจาก API แบบ Real-time

### Q: รองรับภาษาอื่นไหม?
**A:** ปัจจุบันรองรับเฉพาะภาษาไทย แต่สามารถเพิ่มภาษาอังกฤษได้

### Q: Deploy ขึ้น Cloud ได้ไหม?
**A:** ได้ รองรับ Vercel, Netlify, Heroku และ Cloud Platforms อื่นๆ

### Q: ใช้ API อื่นแทน OpenWeatherMap ได้ไหม?
**A:** ได้ แต่ต้องแก้ไขโค้ดในส่วน API integration

## 🔍 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

1. **API Key ไม่ทำงาน**
   ```bash
   # ตรวจสอบ API Key ในไฟล์ .env
   cat .env
   
   # ตรวจสอบว่า API Key ถูกต้อง
   curl "https://api.openweathermap.org/data/2.5/weather?q=Bangkok&appid=YOUR_API_KEY"
   ```

2. **Port already in use**
   ```bash
   # หา process ที่ใช้พอร์ต
   lsof -i :3000
   
   # ปิด process
   kill -9 <PID>
   ```

3. **Module not found**
   ```bash
   # ลบ node_modules และติดตั้งใหม่
   rm -rf node_modules
   npm install
   ```

4. **CORS Error**
   - ตรวจสอบว่ามี CORS middleware ใน server.js
   - ตรวจสอบ URL ที่เรียก API

## 🎯 คำแนะนำสำหรับมือใหม่

### เริ่มต้นศึกษา
1. **เริ่มจาก Frontend**: ดูโครงสร้างใน `public/index.html`
2. **ศึกษา API**: ดู endpoint ใน `routes/weather.js`
3. **เข้าใจ Express**: ศึกษา `server.js`
4. **ทดลองแก้ไข**: เปลี่ยนสี, เพิ่มฟีเจอร์, แก้ไข UI

### ลำดับการศึกษา
```
1. HTML/CSS/JavaScript พื้นฐาน
2. Node.js และ Express.js
3. API Integration
4. Responsive Web Design
5. Chart.js Library
```

## 🤝 การพัฒนาร่วมกัน (Contributing)

เราต้อนรับการมีส่วนร่วมจากทุกคน!

### วิธีการมีส่วนร่วม

1. **Fork** โปรเจกต์นี้
2. **Clone** โปรเจกต์ไปยังเครื่องของคุณ
3. **สร้าง Branch** ใหม่: `git checkout -b feature/amazing-feature`
4. **Commit** การเปลี่ยนแปลง: `git commit -m 'Add some AmazingFeature'`
5. **Push** ไปยัง Branch: `git push origin feature/amazing-feature`
6. **สร้าง Pull Request**

### Code Style

- ใช้ **2 spaces** สำหรับ indentation
- ใส่ **semicolon** ท้ายทุกบรรทัด JavaScript
- ใช้ **camelCase** สำหรับตัวแปร
- เขียน **comment** ภาษาไทยหรืออังกฤษก็ได้

## 🚀 การพัฒนาต่อ

### Features ที่สามารถเพิ่มได้:

- [ ] ระบบแจ้งเตือนสภาพอากาศแปรปรวน
- [ ] การบันทึกจังหวัดโปรด
- [ ] แผนที่แสดงสภาพอากาศ
- [ ] Dark/Light Mode
- [ ] การส่งออกข้อมูลเป็น PDF
- [ ] ข้อมูลสภาพอากาศรายชั่วโมง
- [ ] การแปลงหน่วยอุณหภูมิ (°C/°F)
- [ ] Mobile App (React Native)
- [ ] Push Notifications
- [ ] Historical Weather Data

## ⚡ Performance Tips

### การปรับปรุงประสิทธิภาพ

1. **Frontend Optimization**
   ```javascript
   // ใช้ debounce สำหรับ search
   const debounce = (func, wait) => {
     let timeout;
     return function executedFunction(...args) {
       const later = () => {
         clearTimeout(timeout);
         func(...args);
       };
       clearTimeout(timeout);
       timeout = setTimeout(later, wait);
     };
   };
   ```

2. **API Caching**
   ```javascript
   // เพิ่ม cache สำหรับ API response
   const cache = new Map();
   const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes
   ```

3. **Image Optimization**
   - ใช้ WebP format สำหรับรูปภาพ
   - Lazy loading สำหรับไอคอนสภาพอากาศ

## 📊 การตรวจสอบประสิทธิภาพ

```bash
# ตรวจสอบ memory usage
node --inspect server.js

# ทดสอบ load บน API
curl -w "@curl-format.txt" -o /dev/null http://localhost:3000/api/weather/กรุงเทพมหานคร

# ตรวจสอบ response time
time curl http://localhost:3000/api/weather/เชียงใหม่
```

## 🔧 Advanced Configuration

### Environment Variables (ขั้นสูง)

```env
# .env file
PORT=3000
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
API_CACHE_DURATION=600000
REQUEST_TIMEOUT=10000
```

### Docker Support

```dockerfile
# Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# การรันด้วย Docker
docker build -t thai-weather-app .
docker run -p 3000:3000 --env-file .env thai-weather-app
```

## 🌐 การ Deploy

### Vercel (แนะนำ)

```bash
# ติดตั้ง Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
public
```

### Heroku

```bash
# เพิ่ม Heroku remote
heroku create thai-weather-app

# Deploy
git push heroku main
```

---

## 📄 License

MIT License - ดูรายละเอียดใน [LICENSE](LICENSE) file

## 👨‍💻 ผู้พัฒนา

- **ผู้สร้าง**: Perapat & Phirawit
- **GitHub**: [@Ohmies](https://github.com/Ohmies)
- **Repository**: [Thai-Weather-App](https://github.com/Ohmies/Thai-Weather-App)

## 📞 การติดต่อ

หากมีคำถามหรือต้องการความช่วยเหลือ สามารถ:

- เปิด Issue ใน GitHub
- ติดต่อผ่าน GitHub Profile
- ส่งอีเมลถึงผู้พัฒนา

## 🙏 ขอบคุณ

ขอบคุณ:
- [OpenWeatherMap](https://openweathermap.org/) สำหรับ Weather API
- [Tailwind CSS](https://tailwindcss.com/) สำหรับ CSS Framework
- [Chart.js](https://www.chartjs.org/) สำหรับ Charting Library
- [Font Awesome](https://fontawesome.com/) สำหรับ Icons
- [Google Fonts](https://fonts.google.com/) สำหรับ Font Sarabun

---

⭐ หากโปรเจกต์นี้มีประโยชน์ อย่าลืม Star ให้กัน!
