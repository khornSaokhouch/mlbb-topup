import crypto from 'crypto';

export class BakongService {
  /**
   * Helper to compute CRC16 CCITT (0xFFFF)
   */
  static calculateCrc16(data: string): string {
    let crc = 0xFFFF;
    const jf = 0x1021;
    const bytes = Buffer.from(data, 'ascii');

    for (const b of bytes) {
      for (let i = 0; i < 8; i++) {
        const bit = ((b >> (7 - i)) & 1) === 1;
        const c15 = ((crc >> 15) & 1) === 1;
        crc <<= 1;
        if (c15 !== bit) {
          crc ^= jf;
        }
      }
    }
    crc &= 0xFFFF;
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }

  /**
   * Helper to compute TLV
   */
  static generateTlv(tag: string, value: string): string {
    if (!value) return '';
    const length = value.length.toString().padStart(2, '0');
    return tag + length + value;
  }

  /**
   * Generate KHQR directly matching the validated structure
   */
  static generateKhqrString({
    bankAccount,
    merchantName,
    merchantCity = 'Phnom Penh',
    amount,
    currency = 'USD',
    billNumber
  }: {
    bankAccount: string;
    merchantName: string;
    merchantCity?: string;
    amount: number;
    currency?: 'USD' | 'KHR';
    billNumber: string;
  }): string {
    let qr = "";
    qr += this.generateTlv("00", "01"); // Payload Format Indicator
    qr += this.generateTlv("01", "12"); // Point of Initiation (Dynamic)
    
    // Tag 29: Individual Bakong Account
    qr += this.generateTlv("29", this.generateTlv("00", bankAccount));
    
    qr += this.generateTlv("52", "5999"); // MCC
    qr += this.generateTlv("53", currency === 'KHR' ? "116" : "840"); // Transaction Currency
    
    if (amount) {
      const amountStr = currency === 'USD' ? amount.toFixed(2) : Math.round(amount).toString();
      qr += this.generateTlv("54", amountStr);
    }
    
    qr += this.generateTlv("58", "KH");
    qr += this.generateTlv("59", merchantName);
    qr += this.generateTlv("60", merchantCity);
    
    // Tag 99: Timestamp
    const now = Date.now();
    const expiry = now + (86400000 * 1); // 1 day
    const tag99inner = this.generateTlv("00", now.toString()) + this.generateTlv("01", expiry.toString());
    qr += this.generateTlv("99", tag99inner);
    
    if (billNumber) {
      qr += this.generateTlv("62", this.generateTlv("01", billNumber));
    }
    
    qr += "6304";
    qr += this.calculateCrc16(qr);
    
    return qr;
  }

  static getMd5(qrString: string): string {
    return crypto.createHash('md5').update(qrString).digest('hex');
  }
}
