var cvLop = $('#convert-lop');
var cvKhoa = $('#convert-khoa');
var disLop = $$('.dis-lop');
var disKhoa = $$('.dis-khoa');
var info = $$('.information');
var cvSV = $('#convert-sv');
console.log(disKhoa)
cvLop.onclick = function() {
    for(let i = 0; i < disLop.length; i++ ) {
        disLop[i].style.display = 'block';
    }
    
    for(let i = 0; i < disKhoa.length; i++ ) {
        disKhoa[i].style.display = 'none';
    }
    for(let i = 0; i < info.length; i++ ) {
        info[i].style.display = 'none';
    }
}

cvKhoa.onclick = function() {
    for(let i = 0; i < disLop.length; i++ ) {
        disLop[i].style.display = 'none';
    }
    for(let i = 0; i < disKhoa.length; i++ ) {
        disKhoa[i].style.display = 'block';
    }
    for(let i = 0; i < info.length; i++ ) {
        info[i].style.display = 'none';
    }
}

cvSV.onclick = function() {
    for(let i = 0; i < disLop.length; i++ ) {
        disLop[i].style.display = 'none';
    }
    for(let i = 0; i < disKhoa.length; i++ ) {
        disKhoa[i].style.display = 'none';
    }
    for(let i = 0; i < info.length; i++ ) {
        info[i].style.display = 'block';
    }
}


var tukhoa = $('#tukhoa');

$('#searching').onclick = function () {
    topic = $('#topic').value;
    switch(topic) {
        case 'lop':
            list = danhSachSinhVien.TimKiemLopSinhVien(tukhoa.value);
            print(list);
            break;
        case 'khoa':
            var list = danhSachSinhVien.TimKiemKhoaSinhVien(tukhoa.value);
            print(list)
            break;
        case 'sinhvien':
            var list = danhSachSinhVien.TimKiemTenSinhVien(tukhoa.value);
            print(list);
    }
}

var btnSort = $('#sort');
btnSort.onclick = function() {
    array = danhSachSinhVien.SV;
    select_sort = $('#select_sort').value;
    switch(select_sort) {
        case 'lop':
            sortLop(array);
            break;
        case 'khoa':
            sortKhoa(array);
            break;
        case 'ten':
            sortName(array);
            break;
        case 'dtb':
            sortDTB(array);
            break;
        case 'toan':
            sortToan(array);
            break;
        case 'ly':
            sortLy(array);
            break;
        case 'hoa':
            sortHoa(array);
            break;
    }
}

window.onload = function() {
    //Hiển thị danh sách các khoa
    getListLop();
    //Hiển thị danh sách các lớp
    getListKhoa();
    //Hiển thị danh sách chọn các khoa
    selectKhoa();
    //Hiển thị danh sách chọn các lớp
    selectLop();
    // In ra màn hình danh sách sinh viên
    getStorage();
}