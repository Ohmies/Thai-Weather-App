const express = require("express");
const axios = require("axios");
const router = express.Router();

// Mock weather data สำหรับการทดสอบ (ไม่ต้องใช้ API key)
const mockWeatherData = {
  // ภาคเหนือ
  เชียงใหม่: {
    temp: 28,
    humidity: 68,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.1,
    pressure: 1015,
    visibility: 15,
  },
  เชียงราย: {
    temp: 26,
    humidity: 72,
    description: "เมฆมาก",
    icon: "04d",
    wind: 2.8,
    pressure: 1016,
    visibility: 12,
  },
  ลำปาง: {
    temp: 27,
    humidity: 70,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.0,
    pressure: 1014,
    visibility: 13,
  },
  ลำพูน: {
    temp: 29,
    humidity: 65,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.2,
    pressure: 1015,
    visibility: 14,
  },
  แม่ฮ่องสอน: {
    temp: 24,
    humidity: 78,
    description: "หมอกเบา",
    icon: "50d",
    wind: 2.1,
    pressure: 1017,
    visibility: 8,
  },
  น่าน: {
    temp: 25,
    humidity: 74,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 2.5,
    pressure: 1016,
    visibility: 11,
  },
  พะเยา: {
    temp: 26,
    humidity: 73,
    description: "เมฆมาก",
    icon: "04d",
    wind: 2.7,
    pressure: 1015,
    visibility: 10,
  },
  แพร่: {
    temp: 27,
    humidity: 71,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 2.9,
    pressure: 1014,
    visibility: 12,
  },
  อุตรดิตถ์: {
    temp: 28,
    humidity: 69,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.1,
    pressure: 1013,
    visibility: 13,
  },

  // ภาคตะวันออกเหนือ (อีสาน)
  กาฬสินธุ์: {
    temp: 33,
    humidity: 67,
    description: "อากาศร้อน",
    icon: "01d",
    wind: 4.2,
    pressure: 1010,
    visibility: 12,
  },
  ขอนแก่น: {
    temp: 31,
    humidity: 73,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 4.1,
    pressure: 1012,
    visibility: 13,
  },
  นครพนม: {
    temp: 32,
    humidity: 75,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.8,
    pressure: 1011,
    visibility: 11,
  },
  นครราชสีมา: {
    temp: 30,
    humidity: 69,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.9,
    pressure: 1013,
    visibility: 10,
  },
  บึงกาฬ: {
    temp: 33,
    humidity: 68,
    description: "อากาศร้อน",
    icon: "01d",
    wind: 4.0,
    pressure: 1009,
    visibility: 14,
  },
  บุรีรัมย์: {
    temp: 32,
    humidity: 71,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.7,
    pressure: 1011,
    visibility: 9,
  },
  มหาสารคาม: {
    temp: 31,
    humidity: 72,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.9,
    pressure: 1012,
    visibility: 13,
  },
  มุกดาหาร: {
    temp: 33,
    humidity: 70,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.1,
    pressure: 1010,
    visibility: 12,
  },
  ยศธร: {
    temp: 32,
    humidity: 73,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.6,
    pressure: 1011,
    visibility: 10,
  },
  ร้อยเอ็ด: {
    temp: 31,
    humidity: 74,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.8,
    pressure: 1012,
    visibility: 11,
  },
  เลย: {
    temp: 29,
    humidity: 71,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.2,
    pressure: 1014,
    visibility: 12,
  },
  ศรีสะเกษ: {
    temp: 33,
    humidity: 69,
    description: "อากาศร้อน",
    icon: "01d",
    wind: 4.0,
    pressure: 1009,
    visibility: 13,
  },
  สกลนคร: {
    temp: 32,
    humidity: 72,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.7,
    pressure: 1011,
    visibility: 10,
  },
  สุรินทร์: {
    temp: 31,
    humidity: 74,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.5,
    pressure: 1012,
    visibility: 11,
  },
  หนองคาย: {
    temp: 33,
    humidity: 68,
    description: "อากาศร้อน",
    icon: "01d",
    wind: 4.1,
    pressure: 1010,
    visibility: 14,
  },
  หนองบัวลำภู: {
    temp: 32,
    humidity: 70,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.8,
    pressure: 1011,
    visibility: 12,
  },
  อำนาจเจริญ: {
    temp: 32,
    humidity: 73,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.6,
    pressure: 1011,
    visibility: 10,
  },
  อุดรธานี: {
    temp: 33,
    humidity: 69,
    description: "อากาศร้อน",
    icon: "01d",
    wind: 4.0,
    pressure: 1010,
    visibility: 13,
  },
  อุบลราชธานี: {
    temp: 32,
    humidity: 72,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.7,
    pressure: 1011,
    visibility: 11,
  },
  ชัยภูมิ: {
    temp: 30,
    humidity: 71,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.4,
    pressure: 1013,
    visibility: 10,
  },

  // ภาคกลาง
  กรุงเทพมหานคร: {
    temp: 32,
    humidity: 75,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 5.2,
    pressure: 1013,
    visibility: 10,
  },
  กำแพงเพชร: {
    temp: 30,
    humidity: 68,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.5,
    pressure: 1014,
    visibility: 12,
  },
  ชัยนาท: {
    temp: 31,
    humidity: 70,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.8,
    pressure: 1013,
    visibility: 11,
  },
  นครนายก: {
    temp: 29,
    humidity: 76,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.2,
    pressure: 1015,
    visibility: 9,
  },
  นครปฐม: {
    temp: 32,
    humidity: 74,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.1,
    pressure: 1012,
    visibility: 10,
  },
  นครสวรรค์: {
    temp: 31,
    humidity: 69,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.7,
    pressure: 1013,
    visibility: 13,
  },
  นนทบุรี: {
    temp: 33,
    humidity: 73,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.8,
    pressure: 1011,
    visibility: 9,
  },
  ปทุมธานี: {
    temp: 32,
    humidity: 75,
    description: "เมฆมาก",
    icon: "04d",
    wind: 4.5,
    pressure: 1012,
    visibility: 8,
  },
  พระนครศรีอยุธยา: {
    temp: 33,
    humidity: 71,
    description: "อากาศร้อน",
    icon: "01d",
    wind: 4.8,
    pressure: 1011,
    visibility: 11,
  },
  พิจิตร: {
    temp: 30,
    humidity: 68,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.6,
    pressure: 1014,
    visibility: 12,
  },
  พิษณุโลก: {
    temp: 29,
    humidity: 72,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.3,
    pressure: 1015,
    visibility: 10,
  },
  เพชรบูรณ์: {
    temp: 28,
    humidity: 74,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.1,
    pressure: 1016,
    visibility: 13,
  },
  ลพบุรี: {
    temp: 32,
    humidity: 70,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.2,
    pressure: 1012,
    visibility: 11,
  },
  สมุทรปราการ: {
    temp: 33,
    humidity: 77,
    description: "เมฆมาก",
    icon: "04d",
    wind: 5.1,
    pressure: 1010,
    visibility: 8,
  },
  สมุทรสงคราม: {
    temp: 32,
    humidity: 78,
    description: "ฝนเล็กน้อย",
    icon: "10d",
    wind: 4.7,
    pressure: 1011,
    visibility: 7,
  },
  สมุทรสาคร: {
    temp: 33,
    humidity: 76,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.9,
    pressure: 1010,
    visibility: 9,
  },
  สิงห์บุรี: {
    temp: 31,
    humidity: 69,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.8,
    pressure: 1013,
    visibility: 12,
  },
  สุโขทัย: {
    temp: 29,
    humidity: 71,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.4,
    pressure: 1015,
    visibility: 11,
  },
  สุพรรณบุรี: {
    temp: 32,
    humidity: 70,
    description: "เมฆมาก",
    icon: "04d",
    wind: 4.0,
    pressure: 1012,
    visibility: 10,
  },
  อ่างทอง: {
    temp: 31,
    humidity: 72,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.9,
    pressure: 1013,
    visibility: 12,
  },
  อุทัยธานี: {
    temp: 30,
    humidity: 68,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.5,
    pressure: 1014,
    visibility: 13,
  },
  ตาก: {
    temp: 28,
    humidity: 70,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.2,
    pressure: 1016,
    visibility: 11,
  },

  // ภาคตะวันออก
  จันทบุรี: {
    temp: 30,
    humidity: 79,
    description: "ฝนเล็กน้อย",
    icon: "10d",
    wind: 4.3,
    pressure: 1013,
    visibility: 8,
  },
  ฉะเชิงเทรา: {
    temp: 32,
    humidity: 74,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.1,
    pressure: 1012,
    visibility: 10,
  },
  ชลบุรี: {
    temp: 31,
    humidity: 78,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.3,
    pressure: 1012,
    visibility: 9,
  },
  ตราด: {
    temp: 29,
    humidity: 82,
    description: "ฝนปานกลาง",
    icon: "10d",
    wind: 4.8,
    pressure: 1011,
    visibility: 7,
  },
  ปราจีนบุรี: {
    temp: 31,
    humidity: 73,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.9,
    pressure: 1013,
    visibility: 10,
  },
  ระยอง: {
    temp: 30,
    humidity: 80,
    description: "ฝนเล็กน้อย",
    icon: "10d",
    wind: 4.5,
    pressure: 1012,
    visibility: 8,
  },
  สระแก้ว: {
    temp: 32,
    humidity: 72,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 3.8,
    pressure: 1013,
    visibility: 11,
  },

  // ภาคตะวันตก
  กาญจนบุรี: {
    temp: 29,
    humidity: 75,
    description: "เมฆมาก",
    icon: "04d",
    wind: 3.4,
    pressure: 1014,
    visibility: 9,
  },
  เพชรบุรี: {
    temp: 31,
    humidity: 77,
    description: "ฝนเล็กน้อย",
    icon: "10d",
    wind: 4.2,
    pressure: 1012,
    visibility: 8,
  },
  ประจวบคีรีขันธ์: {
    temp: 30,
    humidity: 79,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.6,
    pressure: 1013,
    visibility: 9,
  },
  ราชบุรี: {
    temp: 32,
    humidity: 73,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.9,
    pressure: 1012,
    visibility: 11,
  },

  // ภาคใต้
  กระบี่: {
    temp: 29,
    humidity: 84,
    description: "ฝนปานกลาง",
    icon: "10d",
    wind: 5.2,
    pressure: 1010,
    visibility: 6,
  },
  ชุมพร: {
    temp: 30,
    humidity: 81,
    description: "ฝนเล็กน้อย",
    icon: "10d",
    wind: 4.8,
    pressure: 1011,
    visibility: 7,
  },
  ตรัง: {
    temp: 28,
    humidity: 85,
    description: "ฝนหนัก",
    icon: "10d",
    wind: 5.5,
    pressure: 1009,
    visibility: 5,
  },
  นครศรีธรรมราช: {
    temp: 29,
    humidity: 82,
    description: "ฝนปานกลาง",
    icon: "10d",
    wind: 5.1,
    pressure: 1010,
    visibility: 6,
  },
  นราธิวาส: {
    temp: 27,
    humidity: 87,
    description: "ฝนหนัก",
    icon: "09d",
    wind: 5.8,
    pressure: 1008,
    visibility: 4,
  },
  ปัตตานี: {
    temp: 28,
    humidity: 86,
    description: "ฝนปานกลาง",
    icon: "10d",
    wind: 5.3,
    pressure: 1009,
    visibility: 5,
  },
  พังงา: {
    temp: 29,
    humidity: 83,
    description: "ฝนเล็กน้อย",
    icon: "10d",
    wind: 5.0,
    pressure: 1010,
    visibility: 7,
  },
  พัทลุง: {
    temp: 28,
    humidity: 84,
    description: "ฝนปานกลาง",
    icon: "10d",
    wind: 5.2,
    pressure: 1009,
    visibility: 6,
  },
  ภูเก็ต: {
    temp: 30,
    humidity: 82,
    description: "ฝนเล็กน้อย",
    icon: "10d",
    wind: 6.5,
    pressure: 1010,
    visibility: 8,
  },
  ยะลา: {
    temp: 27,
    humidity: 88,
    description: "ฝนหนัก",
    icon: "09d",
    wind: 5.6,
    pressure: 1008,
    visibility: 4,
  },
  ระนอง: {
    temp: 28,
    humidity: 89,
    description: "ฝนหนัก",
    icon: "09d",
    wind: 6.2,
    pressure: 1007,
    visibility: 3,
  },
  สงขลา: {
    temp: 29,
    humidity: 83,
    description: "ฝนปานกลาง",
    icon: "10d",
    wind: 5.4,
    pressure: 1009,
    visibility: 6,
  },
  สตูล: {
    temp: 28,
    humidity: 85,
    description: "ฝนหนัก",
    icon: "10d",
    wind: 5.7,
    pressure: 1008,
    visibility: 5,
  },
  สุราษฎร์ธานี: {
    temp: 30,
    humidity: 81,
    description: "ฝนเล็กน้อย",
    icon: "10d",
    wind: 4.9,
    pressure: 1010,
    visibility: 7,
  },

  // เมืองท่องเที่ยวพิเศษ
  พัทยา: {
    temp: 31,
    humidity: 78,
    description: "เมฆบางส่วน",
    icon: "02d",
    wind: 4.3,
    pressure: 1012,
    visibility: 9,
  },
  หัวหิน: {
    temp: 29,
    humidity: 76,
    description: "อากาศแจ่มใส",
    icon: "01d",
    wind: 3.7,
    pressure: 1014,
    visibility: 12,
  },
  เขาใหญ่: {
    temp: 24,
    humidity: 85,
    description: "เมฆมาก",
    icon: "04d",
    wind: 2.1,
    pressure: 1018,
    visibility: 7,
  },
  อยุธยา: {
    temp: 33,
    humidity: 71,
    description: "อากาศร้อน",
    icon: "01d",
    wind: 4.8,
    pressure: 1011,
    visibility: 11,
  },
};

// Flag สำหรับเปิด/ปิดการใช้ Mock Data
const USE_MOCK_DATA = false;

// Thai provinces data for location selection - ทั้งหมด 77 จังหวัด
const thaiProvinces = [
  // ภาคเหนือ (Northern Thailand)
  {
    name: "เชียงใหม่",
    en: "Chiang Mai",
    lat: 18.7883,
    lon: 98.9853,
    region: "ภาคเหนือ",
  },
  {
    name: "เชียงราย",
    en: "Chiang Rai",
    lat: 19.9105,
    lon: 99.8406,
    region: "ภาคเหนือ",
  },
  {
    name: "ลำปาง",
    en: "Lampang",
    lat: 18.2928,
    lon: 99.4908,
    region: "ภาคเหนือ",
  },
  {
    name: "ลำพูน",
    en: "Lamphun",
    lat: 18.5797,
    lon: 99.0103,
    region: "ภาคเหนือ",
  },
  {
    name: "แม่ฮ่องสอน",
    en: "Mae Hong Son",
    lat: 19.3014,
    lon: 97.9659,
    region: "ภาคเหนือ",
  },
  { name: "น่าน", en: "Nan", lat: 18.7838, lon: 100.7747, region: "ภาคเหนือ" },
  {
    name: "พะเยา",
    en: "Phayao",
    lat: 19.1923,
    lon: 99.8732,
    region: "ภาคเหนือ",
  },
  {
    name: "แพร่",
    en: "Phrae",
    lat: 18.1447,
    lon: 100.1409,
    region: "ภาคเหนือ",
  },
  {
    name: "อุตรดิตถ์",
    en: "Uttaradit",
    lat: 17.6204,
    lon: 100.0995,
    region: "ภาคเหนือ",
  },

  // ภาคตะวันออกเหนือ (Northeastern Thailand/Isan)
  {
    name: "กาฬสินธุ์",
    en: "Kalasin",
    lat: 16.4322,
    lon: 103.5063,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "ขอนแก่น",
    en: "Khon Kaen",
    lat: 16.4419,
    lon: 102.8359,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "นครพนม",
    en: "Nakhon Phanom",
    lat: 17.4054,
    lon: 104.7686,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "นครราชสีมา",
    en: "Nakhon Ratchasima",
    lat: 14.9799,
    lon: 102.0977,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "บึงกาฬ",
    en: "Bueng Kan",
    lat: 18.3563,
    lon: 103.6464,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "บุรีรัมย์",
    en: "Buriram",
    lat: 14.993,
    lon: 103.1028,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "มหาสารคาม",
    en: "Maha Sarakham",
    lat: 16.1851,
    lon: 103.2998,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "มุกดาหาร",
    en: "Mukdahan",
    lat: 16.5446,
    lon: 104.7233,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "ยศธร",
    en: "Yasothon",
    lat: 15.7881,
    lon: 104.1452,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "ร้อยเอ็ด",
    en: "Roi Et",
    lat: 16.0514,
    lon: 103.6537,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "เลย",
    en: "Loei",
    lat: 17.486,
    lon: 101.7223,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "ศรีสะเกษ",
    en: "Sisaket",
    lat: 15.1186,
    lon: 104.3221,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "สกลนคร",
    en: "Sakon Nakhon",
    lat: 17.1616,
    lon: 104.1486,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "สุรินทร์",
    en: "Surin",
    lat: 14.8818,
    lon: 103.4933,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "หนองคาย",
    en: "Nong Khai",
    lat: 17.8782,
    lon: 102.7412,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "หนองบัวลำภู",
    en: "Nong Bua Lam Phu",
    lat: 17.2042,
    lon: 102.4304,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "อำนาจเจริญ",
    en: "Amnat Charoen",
    lat: 15.8651,
    lon: 104.6296,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "อุดรธานี",
    en: "Udon Thani",
    lat: 17.4138,
    lon: 102.7877,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "อุบลราชธานี",
    en: "Ubon Ratchathani",
    lat: 15.2448,
    lon: 104.8472,
    region: "ภาคตะวันออกเหนือ",
  },
  {
    name: "ชัยภูมิ",
    en: "Chaiyaphum",
    lat: 15.8067,
    lon: 102.031,
    region: "ภาคตะวันออกเหนือ",
  },

  // ภาคกลาง (Central Thailand)
  {
    name: "กรุงเทพมหานคร",
    en: "Bangkok",
    lat: 13.7563,
    lon: 100.5018,
    region: "ภาคกลาง",
  },
  {
    name: "กำแพงเพชร",
    en: "Kamphaeng Phet",
    lat: 16.4827,
    lon: 99.5225,
    region: "ภาคกลาง",
  },
  {
    name: "ชัยนาท",
    en: "Chai Nat",
    lat: 15.1851,
    lon: 100.1251,
    region: "ภาคกลาง",
  },
  {
    name: "นครนายก",
    en: "Nakhon Nayok",
    lat: 14.2069,
    lon: 101.213,
    region: "ภาคกลาง",
  },
  {
    name: "นครปฐม",
    en: "Nakhon Pathom",
    lat: 13.8199,
    lon: 100.0449,
    region: "ภาคกลาง",
  },
  {
    name: "นครสวรรค์",
    en: "Nakhon Sawan",
    lat: 15.6958,
    lon: 100.1372,
    region: "ภาคกลาง",
  },
  {
    name: "นนทบุรี",
    en: "Nonthaburi",
    lat: 13.8621,
    lon: 100.5144,
    region: "ภาคกลาง",
  },
  {
    name: "ปทุมธานี",
    en: "Pathum Thani",
    lat: 14.0208,
    lon: 100.525,
    region: "ภาคกลาง",
  },
  {
    name: "พระนครศรีอยุธยา",
    en: "Phra Nakhon Si Ayutthaya",
    lat: 14.3692,
    lon: 100.5877,
    region: "ภาคกลาง",
  },
  {
    name: "พิจิตร",
    en: "Phichit",
    lat: 16.439,
    lon: 100.3491,
    region: "ภาคกลาง",
  },
  {
    name: "พิษณุโลก",
    en: "Phitsanulok",
    lat: 16.811,
    lon: 100.2559,
    region: "ภาคกลาง",
  },
  {
    name: "เพชรบูรณ์",
    en: "Phetchabun",
    lat: 16.4193,
    lon: 101.1603,
    region: "ภาคกลาง",
  },
  {
    name: "ลพบุรี",
    en: "Lopburi",
    lat: 14.7995,
    lon: 100.6533,
    region: "ภาคกลาง",
  },
  {
    name: "สมุทรปราการ",
    en: "Samut Prakan",
    lat: 13.5991,
    lon: 100.5998,
    region: "ภาคกลาง",
  },
  {
    name: "สมุทรสงคราม",
    en: "Samut Songkhram",
    lat: 13.4096,
    lon: 100.0023,
    region: "ภาคกลาง",
  },
  {
    name: "สมุทรสาคร",
    en: "Samut Sakhon",
    lat: 13.5475,
    lon: 100.2744,
    region: "ภาคกลาง",
  },
  {
    name: "สิงห์บุรี",
    en: "Sing Buri",
    lat: 14.8937,
    lon: 100.3967,
    region: "ภาคกลาง",
  },
  {
    name: "สุโขทัย",
    en: "Sukhothai",
    lat: 17.0061,
    lon: 99.823,
    region: "ภาคกลาง",
  },
  {
    name: "สุพรรณบุรี",
    en: "Suphan Buri",
    lat: 14.4745,
    lon: 100.1218,
    region: "ภาคกลาง",
  },
  {
    name: "อ่างทอง",
    en: "Ang Thong",
    lat: 14.5896,
    lon: 100.4549,
    region: "ภาคกลาง",
  },
  {
    name: "อุทัยธานี",
    en: "Uthai Thani",
    lat: 15.3794,
    lon: 100.0244,
    region: "ภาคกลาง",
  },
  { name: "ตาก", en: "Tak", lat: 16.884, lon: 99.126, region: "ภาคกลาง" },

  // ภาคตะวันออก (Eastern Thailand)
  {
    name: "จันทบุรี",
    en: "Chanthaburi",
    lat: 12.6107,
    lon: 102.1038,
    region: "ภาคตะวันออก",
  },
  {
    name: "ฉะเชิงเทรา",
    en: "Chachoengsao",
    lat: 13.6904,
    lon: 101.0779,
    region: "ภาคตะวันออก",
  },
  {
    name: "ชลบุรี",
    en: "Chonburi",
    lat: 13.3611,
    lon: 100.9847,
    region: "ภาคตะวันออก",
  },
  {
    name: "ตราด",
    en: "Trat",
    lat: 12.2436,
    lon: 102.515,
    region: "ภาคตะวันออก",
  },
  {
    name: "ปราจีนบุรี",
    en: "Prachin Buri",
    lat: 14.0459,
    lon: 101.3675,
    region: "ภาคตะวันออก",
  },
  {
    name: "ระยอง",
    en: "Rayong",
    lat: 12.6807,
    lon: 101.2538,
    region: "ภาคตะวันออก",
  },
  {
    name: "สระแก้ว",
    en: "Sa Kaeo",
    lat: 13.824,
    lon: 102.0683,
    region: "ภาคตะวันออก",
  },

  // ภาคตะวันตก (Western Thailand)
  {
    name: "กาญจนบุรี",
    en: "Kanchanaburi",
    lat: 14.0227,
    lon: 99.5328,
    region: "ภาคตะวันตก",
  },
  {
    name: "เพชรบุรี",
    en: "Phetchaburi",
    lat: 13.1115,
    lon: 99.9395,
    region: "ภาคตะวันตก",
  },
  {
    name: "ประจวบคีรีขันธ์",
    en: "Prachuap Khiri Khan",
    lat: 11.8127,
    lon: 99.7973,
    region: "ภาคตะวันตก",
  },
  {
    name: "ราชบุรี",
    en: "Ratchaburi",
    lat: 13.5282,
    lon: 99.8133,
    region: "ภาคตะวันตก",
  },

  // ภาคใต้ (Southern Thailand)
  { name: "กระบี่", en: "Krabi", lat: 8.0863, lon: 98.9063, region: "ภาคใต้" },
  { name: "ชุมพร", en: "Chumphon", lat: 10.493, lon: 99.18, region: "ภาคใต้" },
  { name: "ตรัง", en: "Trang", lat: 7.5563, lon: 99.6114, region: "ภาคใต้" },
  {
    name: "นครศรีธรรมราช",
    en: "Nakhon Si Thammarat",
    lat: 8.4304,
    lon: 99.9631,
    region: "ภาคใต้",
  },
  {
    name: "นราธิวาส",
    en: "Narathiwat",
    lat: 6.4254,
    lon: 101.8253,
    region: "ภาคใต้",
  },
  {
    name: "ปัตตานี",
    en: "Pattani",
    lat: 6.8687,
    lon: 101.2502,
    region: "ภาคใต้",
  },
  {
    name: "พังงา",
    en: "Phang Nga",
    lat: 8.4519,
    lon: 98.5198,
    region: "ภาคใต้",
  },
  {
    name: "พัทลุง",
    en: "Phatthalung",
    lat: 7.6167,
    lon: 100.0737,
    region: "ภาคใต้",
  },
  { name: "ภูเก็ต", en: "Phuket", lat: 7.8804, lon: 98.3923, region: "ภาคใต้" },
  { name: "ยะลา", en: "Yala", lat: 6.541, lon: 101.2802, region: "ภาคใต้" },
  { name: "ระนอง", en: "Ranong", lat: 9.9558, lon: 98.6348, region: "ภาคใต้" },
  {
    name: "สงขลา",
    en: "Songkhla",
    lat: 7.2057,
    lon: 100.5951,
    region: "ภาคใต้",
  },
  { name: "สตูล", en: "Satun", lat: 6.6238, lon: 100.0673, region: "ภาคใต้" },
  {
    name: "สุราษฎร์ธานี",
    en: "Surat Thani",
    lat: 9.1382,
    lon: 99.3215,
    region: "ภาคใต้",
  },

  // เมืองท่องเที่ยวพิเศษ
  {
    name: "พัทยา",
    en: "Pattaya",
    lat: 12.9236,
    lon: 100.8825,
    region: "ภาคตะวันออก",
  },
  {
    name: "หัวหิน",
    en: "Hua Hin",
    lat: 12.5706,
    lon: 99.9576,
    region: "ภาคตะวันตก",
  },
  {
    name: "เขาใหญ่",
    en: "Khao Yai",
    lat: 14.4297,
    lon: 101.3717,
    region: "ภาคกลาง",
  },
];

// Get current weather by city name or coordinates
router.get("/current", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    let weatherData;

    if (city) {
      // Find city in Thai provinces
      const province = thaiProvinces.find(
        (p) =>
          p.name.includes(city) ||
          p.en.toLowerCase().includes(city.toLowerCase())
      );

      if (province) {
        weatherData = await getWeatherByCoordinates(province.lat, province.lon);
        weatherData.location = province.name;
      } else {
        return res.status(404).json({ error: "ไม่พบข้อมูลจังหวัดที่ค้นหา" });
      }
    } else if (lat && lon) {
      weatherData = await getWeatherByCoordinates(
        parseFloat(lat),
        parseFloat(lon)
      );
    } else {
      // Default to Bangkok
      const bangkok = thaiProvinces[0];
      weatherData = await getWeatherByCoordinates(bangkok.lat, bangkok.lon);
      weatherData.location = bangkok.name;
    }

    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({
      error: "ไม่สามารถดึงข้อมูลสภาพอากาศได้",
      details: error.message,
    });
  }
});

// Get weather forecast
router.get("/forecast", async (req, res) => {
  try {
    const { city, lat, lon } = req.query;

    let coordinates;

    if (city) {
      const province = thaiProvinces.find(
        (p) =>
          p.name.includes(city) ||
          p.en.toLowerCase().includes(city.toLowerCase())
      );

      if (province) {
        coordinates = {
          lat: province.lat,
          lon: province.lon,
          name: province.name,
        };
      } else {
        return res.status(404).json({ error: "ไม่พบข้อมูลจังหวัดที่ค้นหา" });
      }
    } else if (lat && lon) {
      coordinates = {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        name: "ตำแหน่งที่เลือก",
      };
    } else {
      const bangkok = thaiProvinces[0];
      coordinates = { lat: bangkok.lat, lon: bangkok.lon, name: bangkok.name };
    }

    const forecastData = await getForecastByCoordinates(
      coordinates.lat,
      coordinates.lon
    );
    forecastData.location = coordinates.name;

    res.json(forecastData);
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    res.status(500).json({
      error: "ไม่สามารถดึงข้อมูลพยากรณ์อากาศได้",
      details: error.message,
    });
  }
});

// Get list of Thai provinces
router.get("/provinces", (req, res) => {
  res.json(thaiProvinces);
});

// Helper function to get weather by coordinates
async function getWeatherByCoordinates(lat, lon) {
  // ใช้ Mock Data หากเปิดใช้งาน
  if (USE_MOCK_DATA) {
    return getMockWeatherData(lat, lon);
  }

  // ใช้ OpenWeatherMap API
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeatherMap API key ไม่ได้ถูกตั้งค่า");
  }

  const url = `${process.env.OPENWEATHER_API_URL}/weather`;
  const params = {
    lat: lat,
    lon: lon,
    appid: apiKey,
    units: "metric",
    lang: "th",
  };

  const response = await axios.get(url, { params });
  const data = response.data;

  return {
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    visibility: data.visibility ? data.visibility / 1000 : null,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    main: data.weather[0].main,
    coordinates: { lat, lon },
    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString("th-TH"),
    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString("th-TH"),
    timestamp: new Date().toISOString(),
  };
}

// Helper function สำหรับ Mock Weather Data
function getMockWeatherData(lat, lon) {
  // หาจังหวัดที่ใกล้เคียงที่สุดจากพิกัด
  let closestProvince = thaiProvinces[0]; // default เป็นกรุงเทพ
  let minDistance = Infinity;

  thaiProvinces.forEach((province) => {
    const distance = Math.sqrt(
      Math.pow(lat - province.lat, 2) + Math.pow(lon - province.lon, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestProvince = province;
    }
  });

  const mockData = mockWeatherData[closestProvince.name];

  // สร้างข้อมูลสภาพอากาศจำลอง
  const currentTime = new Date();
  const sunrise = new Date(currentTime);
  sunrise.setHours(6, 30, 0); // 6:30 AM
  const sunset = new Date(currentTime);
  sunset.setHours(18, 45, 0); // 6:45 PM

  return {
    temperature: mockData.temp,
    feelsLike: mockData.temp + (Math.random() * 4 - 2), // ±2 องศา
    humidity: mockData.humidity,
    pressure: mockData.pressure,
    windSpeed: mockData.wind,
    windDirection: Math.floor(Math.random() * 360),
    visibility: mockData.visibility,
    description: mockData.description,
    icon: mockData.icon,
    main: getMainWeatherFromIcon(mockData.icon),
    coordinates: { lat, lon },
    sunrise: sunrise.toLocaleTimeString("th-TH"),
    sunset: sunset.toLocaleTimeString("th-TH"),
    timestamp: new Date().toISOString(),
  };
}

// Helper function เพื่อแปลง icon เป็น main weather
function getMainWeatherFromIcon(icon) {
  const iconMap = {
    "01d": "Clear",
    "01n": "Clear",
    "02d": "Clouds",
    "02n": "Clouds",
    "03d": "Clouds",
    "03n": "Clouds",
    "04d": "Clouds",
    "04n": "Clouds",
    "09d": "Rain",
    "09n": "Rain",
    "10d": "Rain",
    "10n": "Rain",
    "11d": "Thunderstorm",
    "11n": "Thunderstorm",
    "13d": "Snow",
    "13n": "Snow",
    "50d": "Mist",
    "50n": "Mist",
  };
  return iconMap[icon] || "Clear";
}

// Helper function to get forecast by coordinates
async function getForecastByCoordinates(lat, lon) {
  // ใช้ Mock Data หากเปิดใช้งาน
  if (USE_MOCK_DATA) {
    return getMockForecastData(lat, lon);
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeatherMap API key ไม่ได้ถูกตั้งค่า");
  }

  const url = `${process.env.OPENWEATHER_API_URL}/forecast`;
  const params = {
    lat: lat,
    lon: lon,
    appid: apiKey,
    units: "metric",
    lang: "th",
  };

  const response = await axios.get(url, { params });
  const data = response.data;

  // Group forecast by days (next 5 days)
  const dailyForecasts = [];
  const processedDates = new Set();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toDateString();

    if (!processedDates.has(dateStr) && dailyForecasts.length < 5) {
      processedDates.add(dateStr);

      dailyForecasts.push({
        date: date.toLocaleDateString("th-TH", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }),
        temperature: {
          min: Math.round(item.main.temp_min),
          max: Math.round(item.main.temp_max),
          avg: Math.round(item.main.temp),
        },
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed,
        timestamp: item.dt,
      });
    }
  });

  return {
    forecasts: dailyForecasts,
    coordinates: { lat, lon },
    timestamp: new Date().toISOString(),
  };
}

// Helper function สำหรับ Mock Forecast Data
function getMockForecastData(lat, lon) {
  // หาจังหวัดที่ใกล้เคียงที่สุด
  let closestProvince = thaiProvinces[0];
  let minDistance = Infinity;

  thaiProvinces.forEach((province) => {
    const distance = Math.sqrt(
      Math.pow(lat - province.lat, 2) + Math.pow(lon - province.lon, 2)
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestProvince = province;
    }
  });

  const baseMockData = mockWeatherData[closestProvince.name];
  const forecasts = [];

  // สร้างพยากรณ์ 5 วัน
  for (let i = 1; i <= 5; i++) {
    const forecastDate = new Date();
    forecastDate.setDate(forecastDate.getDate() + i);

    // สร้างความแปรผันของสภาพอากาศ
    const tempVariation = Math.random() * 6 - 3; // ±3 องศา
    const humidityVariation = Math.floor(Math.random() * 20 - 10); // ±10%

    const weatherIcons = ["01d", "02d", "03d", "04d", "10d"];
    const weatherDescriptions = [
      "อากาศแจ่มใส",
      "เมฆบางส่วน",
      "เมฆมาก",
      "เมฆมาก",
      "ฝนเล็กน้อย",
    ];
    const randomIndex = Math.floor(Math.random() * weatherIcons.length);

    forecasts.push({
      date: forecastDate.toLocaleDateString("th-TH", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }),
      temperature: {
        min: Math.round(baseMockData.temp + tempVariation - 3),
        max: Math.round(baseMockData.temp + tempVariation + 3),
        avg: Math.round(baseMockData.temp + tempVariation),
      },
      humidity: Math.max(
        30,
        Math.min(90, baseMockData.humidity + humidityVariation)
      ),
      description: weatherDescriptions[randomIndex],
      icon: weatherIcons[randomIndex],
      windSpeed: baseMockData.wind + (Math.random() * 2 - 1), // ±1 m/s
      pressure: baseMockData.pressure + (Math.random() * 10 - 5), // ±5 hPa
      timestamp: Math.floor(forecastDate.getTime() / 1000),
    });
  }

  return {
    forecasts: forecasts,
    coordinates: { lat, lon },
    timestamp: new Date().toISOString(),
  };
}

module.exports = router;
