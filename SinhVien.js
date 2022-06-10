class SinhVien {
    constructor(masv, hoten, lop, khoa, toan, ly, hoa, dtb, status) {
        this.__masv = masv;
        this.__hoten = hoten;
        this.__lop = lop;
        this.__khoa = khoa;
        this.__toan = toan;
        this.__ly = ly;
        this.__hoa = hoa;
        this.__dtb = dtb;
        this.__status = status;
    }

    set masv(value) { this.__masv = value; }
    get masv() { return this.__masv; }

    set hoten(value) { this.__hoten = value; }
    get hoten() { return this.__hoten; }

    set lop(value) { this.__lop = value; }
    get lop() { return this.__lop; }

    set khoa(value) { this.__khoa = value; }
    get khoa() { return this.__khoa; }

    set toan(value) { this.__toan = value; }
    get toan() { return this.__toan; }

    set ly(value) { this.__ly = value; }
    get ly() { return this.__ly; }

    set hoa(value) { this.__hoa = value; }
    get hoa() { return this.__hoa; }

    set dtb(value) { this.__dtb = value; }
    get dtb() { return this.__dtb; }

    set status(value) { this.__status = value; }
    get status() { return this.__status; }
}

