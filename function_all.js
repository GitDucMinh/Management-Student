const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const createElement = document.createElement.bind(document);

var validate = new Validation();

function xoaDuLieuNhapVao() {
    $('#masv').value = '';
    $('#hoten').value = '';
    $('#lop').value = '';
    $('#khoa').value = '';
    $('#toan').value = '';
    $('#ly').value = '';
    $('#hoa').value = '';
}

function TaoTheTD(className, value) {
    var td = createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;
}

//Kiểm tra dữ liệu đầu vào và set màu trạng thái theo kết quả trả về
function KiemTraDauVao(element, value) {
    if (validate.KiemTraRong(value)) {
        $('#' + element).style.borderColor = "red";
        return true;
    } else {
        $('#' + element).style.borderColor = "";
        return false;
    }
}