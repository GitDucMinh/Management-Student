class DanhSachSinhVien {

    SV = [];
    
    ThemSinhVien = function(svThem) {
       this.SV.push(svThem);
    }

    XoaSinhVien = function(lstSVXoa) {
        lstSVXoa.forEach(element => {
            this.SV.forEach((sv, i) => {
                if(element == sv.__masv) {
                    this.SV.splice(i, 1);
                }
            });
        });
    }

    SuaSinhVien = function(svCapNhat) {
        for(var i = 0; i < this.SV.length; i++) {
            var svUpdate = this.SV[i];
            if(svUpdate.__masv === svCapNhat.__masv) {
                svUpdate.__hoten = svCapNhat.__hoten;
                svUpdate.__lop = svCapNhat.__lop;
                svUpdate.__khoa = svCapNhat.__khoa;
                svUpdate.__toan = svCapNhat.__toan;
                svUpdate.__ly = svCapNhat.__ly;
                svUpdate.__hoa = svCapNhat.__hoa;
                svUpdate.__status = svCapNhat.__status;
                svUpdate.__dtb = svCapNhat.__dtb;
            }
        }
    }

    TimKiemTenSinhVien = function (tukhoa) { 
        const dataFilter = this.SV.filter(value => {
            return value.__hoten.toLowerCase().includes(tukhoa.toLowerCase());
        });
        return dataFilter;
    }

    TimKiemKhoaSinhVien = function (tukhoa) { 
        const dataFilter = this.SV.filter(value => {
            return value.__khoa.toLowerCase().includes(tukhoa.toLowerCase());
        });
        return dataFilter;
    }

    TimKiemLopSinhVien = function (tukhoa) { 
        const dataFilter = this.SV.filter(value => {
            return value.__lop.toLowerCase().includes(tukhoa.toLowerCase());
        });
        return dataFilter;
    }

    TimSinhVienTheoMa = function(MaSV) {
        for(var i = 0; i < this.SV.length; i++) {
            var sv = this.SV[i];
            if(sv.__masv === MaSV) {
                return sv;
            }
        }
        return null;
    }
}

var danhSachSinhVien = new DanhSachSinhVien();

var deleteDom = $('#delete');
var addDom = $('#addsv');
var saveDom = $('#save');
var getDom = $('#get');

addDom.onclick = function () {
    masv = $('#masv').value;
    hoten = $('#hoten').value;
    lop = $('#lop').value;
    khoa = $('#khoa').value;
    toan = $('#toan').value;
    ly = $('#ly').value;
    hoa = $('#hoa').value;
    stt = $('#status').value;
    error = 0;

    //Kiểm tra (Validate) giá trị nhập vào
    if (KiemTraDauVao('masv', masv)) { error++; }
    if (KiemTraDauVao('hoten', hoten)) { error++; }
    if (KiemTraDauVao('lop', lop)) { error++; }
    if (KiemTraDauVao('khoa', khoa)) { error++; }
    if (KiemTraDauVao('toan', toan)) { error++; }
    if (KiemTraDauVao('ly', ly)) { error++; }
    if (KiemTraDauVao('hoa', hoa)) { error++; }
    if (KiemTraDauVao('status', stt)) { error++; }
    if (error != 0) { return; }

    dtb = avg(parseFloat(toan),parseFloat(ly),parseFloat(hoa)).toFixed(2);

    //Thực hiện thêm sinh viên
    sinhvien = new SinhVien(masv, hoten, lop, khoa, toan, ly, hoa, dtb, stt);
    danhSachSinhVien.ThemSinhVien(sinhvien);
    InRaDanhSachSV(danhSachSinhVien);
    xoaDuLieuNhapVao()
}

//Lưu các đối tượng sinh viên vào localStorage
saveDom.onclick = function () {
    jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.SV);
    localStorage.setItem("DanhSachSV", jsonDanhSachSinhVien);
}

function getStorage() {
    jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
    mangDSSV = JSON.parse(jsonDanhSachSinhVien);
    danhSachSinhVien.SV = mangDSSV;
    InRaDanhSachSV(danhSachSinhVien);
}

//In ra màn hình danh sách sinh viên từ localStorage
getDom.onclick = () => { getStorage(); }

function InRaDanhSachSV(DanhSachSinhVien) {
    lstTabelSV = $('#tbodySinhVien');
    lstTabelSV.innerHTML = '';

    for (let i = 0; i < danhSachSinhVien.SV.length; i++) {
        //Lấy thông tin trong mảng sinh viên
        sv = danhSachSinhVien.SV[i];

        //Tao thẻ tr
        tr = createElement('tr');
        tr.id = sv.__masv;
        tr.className = 'trRow';
        tr.setAttribute('onclick', 'chinhsua("' + sv.__masv + '")');

        //Tạo các thẻ td phù hợp với màn hình xuất ra danh sách
        tdCheckbox = createElement('td');
        checkboxMaSV = createElement('input');
        checkboxMaSV.setAttribute('type', 'checkbox');
        checkboxMaSV.setAttribute('class', 'checkboxMasv');
        checkboxMaSV.setAttribute('value', sv.__masv);
        tdCheckbox.appendChild(checkboxMaSV);

        tdMaSV = TaoTheTD('MaSV', sv.__masv);
        tdHoten = TaoTheTD('Hoten', sv.__hoten);
        tdLop = TaoTheTD('Lop', sv.__lop);
        tdKhoa = TaoTheTD('Khoa', sv.__khoa);
        tdToan = TaoTheTD('Toan', sv.__toan);
        tdLy = TaoTheTD('Ly', sv.__ly);
        tdHoa = TaoTheTD('Hoa', sv.__hoa);
        tdDtb = TaoTheTD('dtb', sv.__dtb);
        tdStatus = createElement('td');
        tdStatus.setAttribute('class', 'status');
        if(sv.__status === '1') {
            tdStatus.innerHTML = 'Đang học';
            tdStatus.setAttribute('class', 'text-success');
        } else if(sv.__status === '2') {
            tdStatus.innerHTML = 'Chưa nộp HP';
            tdStatus.setAttribute('class', 'text-warning');
        } else if(sv.__status === '3') {
            tdStatus.innerHTML = 'Không xác định';
            tdStatus.setAttribute('class', 'text-muted');
        }
        //Append td vào tr
        tr.appendChild(tdCheckbox);
        tr.appendChild(tdMaSV);
        tr.appendChild(tdHoten);
        tr.appendChild(tdLop);
        tr.appendChild(tdKhoa);
        tr.appendChild(tdStatus);
        tr.appendChild(tdToan);
        tr.appendChild(tdLy);
        tr.appendChild(tdHoa);
        tr.appendChild(tdDtb);

        //Append các tr vào tbodySinhVien
        lstTabelSV.appendChild(tr);
    }
}

//Method tính trung bình
function avg(a, b, c) { return (a + b + c)/3; }

//Hàm in danh sách các sinh viên được tìm kiếm
function print(list) {
    var lstTabelSV = $('#tbodySinhVien');
    lstTabelSV.innerHTML = '';

    for (var i = 0; i < list.length; i++) {

        //Lấy thông tin trong mảng sinh viên
        sv = list[i];

        //Tạo thẻ tr
        tr = createElement('tr');
        tr.id = sv.__masv;
        tr.className = 'trRow';
        tr.setAttribute('onclick', 'chinhsua("' + sv.__masv + '")');

        //Tạo các thẻ td phù hợp với màn hình xuất ra danh sách
        tdCheckbox = createElement('td');
        checkboxMaSV = createElement('input');
        checkboxMaSV.setAttribute('type', 'checkbox');
        checkboxMaSV.setAttribute('class', 'checkboxMasv');
        checkboxMaSV.setAttribute('value', sv.__masv);
        tdCheckbox.appendChild(checkboxMaSV);

        tdMaSV = TaoTheTD('MaSV', sv.__masv);
        tdHoten = TaoTheTD('Hoten', sv.__hoten);
        tdLop = TaoTheTD('Lop', sv.__lop);
        tdKhoa = TaoTheTD('Khoa', sv.__khoa);
        tdToan = TaoTheTD('Toan', sv.__toan);
        tdLy = TaoTheTD('Ly', sv.__ly);
        tdHoa = TaoTheTD('Hoa', sv.__hoa);
        tdDtb = TaoTheTD('dtb', sv.__dtb);
        tdStatus = createElement('td');
        tdStatus.setAttribute('class', 'status');
        if(sv.__status === '1') {
            tdStatus.innerHTML = 'Đang học';
            tdStatus.setAttribute('class', 'text-success');
        } else if(sv.__status === '2') {
            tdStatus.innerHTML = 'Chưa nộp HP';
            tdStatus.setAttribute('class', 'text-warning');
        } else if(sv.__status === '3') {
            tdStatus.innerHTML = 'Không xác định';
            tdStatus.setAttribute('class', 'text-muted');
        }

        //Append td vào tr
        tr.appendChild(tdCheckbox);
        tr.appendChild(tdMaSV);
        tr.appendChild(tdHoten);
        tr.appendChild(tdLop);
        tr.appendChild(tdKhoa);
        tr.appendChild(tdStatus);
        tr.appendChild(tdToan);
        tr.appendChild(tdLy);
        tr.appendChild(tdHoa);
        tr.appendChild(tdDtb);

        //Append cac tr vào tbodySinhVien
        lstTabelSV.appendChild(tr);
    }
}

//Method xóa sinh viên 
function XoaSinhVien() {
    //Mảng checkbox 
    lstMaSV = document.getElementsByClassName('checkboxMasv');

    //Mảng sinh viên được chọn 
    lstMaSVDuocChon = [];

    for (let i = 0; i < lstMaSV.length; i++) {
        if (lstMaSV[i].checked) {
            lstMaSVDuocChon.push(lstMaSV[i].value);
        }
    }
    danhSachSinhVien.XoaSinhVien(lstMaSVDuocChon);
    InRaDanhSachSV(danhSachSinhVien);
    xoaDuLieuNhapVao()
}


//Sự kiện click vào button delete
deleteDom.onclick = () => { XoaSinhVien(); }

function chinhsua(masv) {
    sinhvien = danhSachSinhVien.TimSinhVienTheoMa(masv);
    if (sinhvien != null) {
        $('#masv').value = sinhvien.__masv;
        $('#hoten').value = sinhvien.__hoten;
        $('#lop').value = sinhvien.__lop;
        $('#khoa').value = sinhvien.__khoa;
        $('#toan').value = sinhvien.__toan;
        $('#ly').value = sinhvien.__ly;
        $('#hoa').value = sinhvien.__hoa;
        $('#status').value = sinhvien.__status;
        $('#capNhatSV').style.display = 'block';
        $('#addsv').style.display = 'none';
    }
}

function CapNhatSV() {
    //Khởi tạo các element để lấy giá trị
    masv = $('#masv').value;
    hoten = $('#hoten').value;
    lop = $('#lop').value;
    khoa = $('#khoa').value;
    toan = $('#toan').value;
    ly = $('#ly').value;
    hoa = $('#hoa').value;
    stt = $('#status').value;
    error = 0;

    //Kiểm tra (Validate) giá trị nhập vào
    if (KiemTraDauVao('masv', masv)) { error++; }
    if (KiemTraDauVao('hoten', hoten)) { error++; }
    if (KiemTraDauVao('lop', lop)) { error++; }
    if (KiemTraDauVao('khoa', khoa)) { error++; }
    if (KiemTraDauVao('toan', toan)) { error++; }
    if (KiemTraDauVao('ly', ly)) { error++; }
    if (KiemTraDauVao('hoa', hoa)) { error++; }
    if (KiemTraDauVao('status', stt)) { error++; }
    if (error != 0) { return; }

    dtb = avg(parseFloat(toan),parseFloat(ly),parseFloat(hoa)).toFixed(2);

    //Thực hiện thêm sinh viên
    list = new SinhVien(masv, hoten, lop, khoa, toan, ly, hoa, dtb, stt);
    dssv = danhSachSinhVien.SuaSinhVien(list);
    InRaDanhSachSV(dssv);
    $('#capNhatSV').style.display = 'none';
    $('#addsv').style.display = 'block';
}

function sortName(array) {
    array.sort(function(a, b) {
        let x = a.__hoten.toLowerCase();
        let y = b.__hoten.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
    InRaDanhSachSV(array);
}

function sortLop(array) {
    array.sort(function(a, b) {
        let x = a.__lop.toLowerCase();
        let y = b.__lop.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
    InRaDanhSachSV(array);
}

function sortKhoa(array) {
    array.sort(function(a, b) {
        let x = a.__khoa.toLowerCase();
        let y = b.__khoa.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
    InRaDanhSachSV(array);
}

function sortToan(array) {
    array.sort(function(a, b) {
        return b.__toan - a.__toan;
    });
    InRaDanhSachSV(array);
}

function sortLy(array) {
    array.sort(function(a, b) {
        return b.__ly - a.__ly;
    });
    InRaDanhSachSV(array);
}

function sortHoa(array) {
    array.sort(function(a, b) {
        return b.__hoa - a.__hoa;
    });
    InRaDanhSachSV(array);
}

function sortDTB(array) {
    array.sort(function(a, b) {
        return b.__dtb - a.__dtb;
    });
    InRaDanhSachSV(array);
}

$('#sort').onclick = () => { sortName(danhSachSinhVien.SV); }

$('#capNhatSV').onclick = () => { CapNhatSV(); }

function Loc() {
    select_status = $('#select_status').value;
    result = danhSachSinhVien.SV.filter(value => {
        if(value.__status === select_status) {
            return value;
        }
    });
    print(result);
}

$('#filter').onclick = () => { Loc(); }