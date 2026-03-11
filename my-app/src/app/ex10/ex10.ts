import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
// LunarYear Class
class LunarYear {
  constructor(
    public day: number,
    public month: number,
    public year: number
  ) {}

  findLunarYearDetail(): {
    dayOfWeek: string;
    lunarDate: string;
    zodiacYear: string;
    monthCanChi: string;
    dayCanChi: string;
  } {
    const lunar = this.convertSolar2Lunar(this.day, this.month, this.year);
    
    const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const date = new Date(this.year, this.month - 1, this.day);
    const dayOfWeek = dayNames[date.getDay()];
    
    // Can Chi năm
    const cans = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
    const chis = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    
    const namCan = cans[(lunar.year + 6) % 10];
    const namChi = chis[(lunar.year + 8) % 12];
    const zodiacYear = `${namCan} ${namChi}`;
    
    // Can Chi tháng
    const jd = this.jdFromDate(this.day, this.month, this.year);
    const monthCanIndex = ((lunar.year + 6) % 10 * 2 + lunar.month) % 10;
    const monthChiIndex = (lunar.month + 1) % 12;
    const monthCanChi = `${cans[monthCanIndex]} ${chis[monthChiIndex]}`;
    
    // Can Chi ngày
    const dayCanIndex = (jd + 9) % 10;
    const dayChiIndex = (jd + 1) % 12;
    const dayCanChi = `${cans[dayCanIndex]} ${chis[dayChiIndex]}`;
    
    return {
      dayOfWeek,
      lunarDate: `${lunar.day}/${lunar.month}/${lunar.year}`,
      zodiacYear,
      monthCanChi,
      dayCanChi
    };
  }

  private jdFromDate(dd: number, mm: number, yy: number): number {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    let jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + 
             Math.floor(y / 4) - Math.floor(y / 100) + 
             Math.floor(y / 400) - 32045;
    if (jd < 2299161) {
      jd = dd + Math.floor((153 * m + 2) / 5) + 365 * y + 
           Math.floor(y / 4) - 32083;
    }
    return jd;
  }

  private getNewMoonDay(k: number, timeZone: number): number {
    const T = k / 1236.85;
    const T2 = T * T;
    const T3 = T2 * T;
    const dr = Math.PI / 180;
    let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
    const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
    let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    const deltat = (T < -11) ? 
        (0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3) : 
        (-0.000278 + 0.000265 * T + 0.000262 * T2);
    const JdNew = Jd1 + C1 - deltat;
    return Math.floor(JdNew + 0.5 + timeZone / 24);
  }

  private getSunLongitude(jdn: number, timeZone: number): number {
    const T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    const T2 = T * T;
    const dr = Math.PI / 180;
    const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
    let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 
         0.000290 * Math.sin(dr * 3 * M);
    let L = L0 + DL;
    L = L * dr;
    L = L - Math.PI * 2 * (Math.floor(L / (Math.PI * 2)));
    return Math.floor(L / Math.PI * 6);
  }

  private getLunarMonth11(yy: number, timeZone: number): number {
    const off = this.jdFromDate(31, 12, yy) - 2415021;
    const k = Math.floor(off / 29.530588853);
    let nm = this.getNewMoonDay(k, timeZone);
    const sunLong = this.getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
      nm = this.getNewMoonDay(k - 1, timeZone);
    }
    return nm;
  }

  private getLeapMonthOffset(a11: number, timeZone: number): number {
    const k = Math.floor((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;
    let arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    do {
      last = arc;
      i++;
      arc = this.getSunLongitude(this.getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
  }

  private convertSolar2Lunar(dd: number, mm: number, yy: number): {
    day: number;
    month: number;
    year: number;
    leap: number;
  } {
    const timeZone = 7;
    const dayNumber = this.jdFromDate(dd, mm, yy);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = this.getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
      monthStart = this.getNewMoonDay(k, timeZone);
    }
    let a11 = this.getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear: number;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = this.getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = this.getLunarMonth11(yy + 1, timeZone);
    }
    const lunarDay = dayNumber - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      const leapMonthDiff = this.getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff === leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap };
  }
}

@Component({
  selector: 'app-ex10',
  standalone: false,
  templateUrl: './ex10.html',
  styleUrls: ['./ex10.css']
})
export class Ex10Component {
  // Dữ liệu cho Dropdown
  days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  years = Array.from({ length: 151 }, (_, i) => (1950 + i).toString());

  // Two-way binding
  day: string = "15";
  month: string = "5";
  year: string = "1986";

  result: any = null;

  constructor() {
    // Chuyển đổi ngay khi khởi tạo
    this.chuyenDoi();
  }

  chuyenDoi() {
    const d = parseInt(this.day);
    const m = parseInt(this.month);
    const y = parseInt(this.year);

    const lunarYear = new LunarYear(d, m, y);
    const details = lunarYear.findLunarYearDetail();

    this.result = {
      thuTrongTuan: details.dayOfWeek,
      ngayThangNamAm: details.lunarDate,
      nam: details.zodiacYear,
      thang: details.monthCanChi,  // Can Chi tháng
      ngay: details.dayCanChi      // Can Chi ngày
    };
  }
}