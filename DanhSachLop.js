class DanhSachLop {
    LOP = [];

    ThemLop = function(addlop) {
        this.LOP.push(addlop);
    }

    XoaLop = function(listLop) {
        listLop.forEach(element => {
            this.LOP.forEach((lop, i) => {
                if(element === lop.__malop) {
                    this.LOP.splice(i, 1);
                }
            });
        });
    }

    TimKiemLop = function (tulhoa) { 
        const dataFilter = this.LOP.filter(value => {
            return value.__tenlop.toLowerCase().includes(tulhoa.toLowerCase());
        });
        return dataFilter;
    }

    TimLopTheoMa = function(MaLop) {
        for(var i = 0; i < this.LOP.length; i++) {
            var lop = this.LOP[i];
            if(lop.__malop === MaLop) {
                return lop;
            }
        }
        return null;
    }

    SuaLop = function(lCapNhat) {
        for(var i = 0; i < this.LOP.length; i++) {
            var lUpdate = this.LOP[i];
            if(lUpdate.__malop === lCapNhat.__malop) {
                lUpdate.__tenlop = lCapNhat.__tenlop;
            }
        }
    }
}

/**********
 * 
 * CRUD, tìm kiếm Lop
 * 
 */

 var danhSachLop = new DanhSachLop();

 var lopDom = $('#addlop');
 
 lopDom.onclick = function() {
     var malop = $('#malop').value;
     var tenlop = $('#tenlop').value;
     var error = 0;
 
     if (KiemTraDauVao('malop', malop)) { error++; }
     if (KiemTraDauVao('tenlop', tenlop)) { error++; }
     if(error != 0) { return; }
 
     var lop = new LOP(malop,tenlop);
     danhSachLop.ThemLop(lop);
     var jsonDanhSachLop = JSON.stringify(danhSachLop.LOP);
     localStorage.setItem("dsLop", jsonDanhSachLop);
     InRaDanhSachLop(danhSachLop);
}

function getListLop() {
    var jsonLop = localStorage.getItem("dsLop");
    var mangLop = JSON.parse(jsonLop);
    danhSachLop.LOP = mangLop;
    InRaDanhSachLop(danhSachLop);
}

function InRaDanhSachLop() {
    var lstTableLop = $('#tbodylop');
    lstTableLop.innerHTML = '';

    for(var i = 0; i < danhSachLop.LOP.length; i++) {
        var lop = danhSachLop.LOP[i];

        var tr = createElement('tr');
        tr.id = lop.__malop;
        tr.className = 'trLop';
        tr.setAttribute('onclick', 'chinhsuaLop("' + lop.__malop + '")');
        // Tạo các thẻ td phù hợp với màn hình xuất ra danh sách
        var tdCheckbox = createElement('td');
        var checkboxLop = createElement('input');
        checkboxLop.setAttribute('type', 'checkbox');
        checkboxLop.setAttribute('class', 'checkboxLop');
        checkboxLop.setAttribute('value', lop.__malop);
        tdCheckbox.appendChild(checkboxLop);

        var tdMaLop = TaoTheTD('malop', lop.__malop);
        var tdTenLop = TaoTheTD('tenlop', lop.__tenlop);

        // Append td vào tr
        tr.appendChild(tdCheckbox);
        tr.appendChild(tdMaLop);
        tr.appendChild(tdTenLop);

        //Append cac tr vào tbodySinhVien
        lstTableLop.appendChild(tr);
    }
}

function InRaLop(list) {
    var lstTableLop = $('#tbodylop');
    lstTableLop.innerHTML = '';

    for(var i = 0; i < list.length; i++) {
        var lop = list[i];

        var tr = createElement('tr');

        // Tạo các thẻ td phù hợp với màn hình xuất ra danh sách
        var tdCheckbox = createElement('td');
        var checkboxLop = createElement('input');
        checkboxLop.setAttribute('type', 'checkbox');
        checkboxLop.setAttribute('class', 'checkboxLop');
        checkboxLop.setAttribute('value', lop.__malop);
        tdCheckbox.appendChild(checkboxLop);

        var tdMaLop = TaoTheTD('malop', lop.__malop);
        var tdTenLop = TaoTheTD('tenlop', lop.__tenlop);

        // Append td vào tr
        tr.appendChild(tdCheckbox);
        tr.appendChild(tdMaLop);
        tr.appendChild(tdTenLop);

        //Append cac tr vào tbodySinhVien
        lstTableLop.appendChild(tr);
    }
}

function XoaLop() {
    var lstLop = document.getElementsByClassName('checkboxLop');

    //Mảng sinh viên được chọn 
    var lstLopDcChon = [];

    for (let i = 0; i < lstLop.length; i++) {
        if (lstLop[i].checked) {
            lstLopDcChon.push(lstLop[i].value);
        }
    }

    danhSachLop.XoaLop(lstLopDcChon);
    InRaDanhSachLop(danhSachLop);
}



$('#deleteLop').onclick = () => { XoaLop(); }

var realtimeSearchLop = $('#tukhoa_lop');
realtimeSearchLop.oninput = () => { InRaLop(danhSachLop.TimKiemLop(realtimeSearchLop.value)); }

$('#searching_lop').onclick = () => { InRaLop(danhSachLop.TimKiemLop(realtimeSearchLop.value)); }

function chinhsuaLop(malop) {
    var lop = danhSachLop.TimLopTheoMa(malop);
    if (lop != null) {
        $('#malop').value = lop.__malop;
        $('#tenlop').value = lop.__tenlop;
    }
}

function LuuThongTinLop() {
    var malop = $('#malop').value;
    var tenlop = $('#tenlop').value;
    var error = 0;

    if (KiemTraDauVao('malop', malop)) { error++; }
    if (KiemTraDauVao('tenlop', tenlop)) { error++; }
    if(error != 0) { return; }

    var lop = new LOP(malop,tenlop);
    danhSachLop.SuaLop(lop);
    InRaDanhSachLop(danhSachLop);
}

function selectLop() {
    var jsonLop = localStorage.getItem("dsLop");
    var mangLop = JSON.parse(jsonLop);
    danhSachLop.LOP = mangLop;

    for(var i = 0; i < danhSachLop.LOP.length; i++) {
        var lop = $('#lop');
        var element_lop = danhSachLop.LOP[i];
        var option = createElement('option');
        option.setAttribute('value', element_lop.__tenlop);
        option.innerHTML = element_lop.__tenlop;
        lop.appendChild(option);
    }
}

$('#deleteDataLop').onclick = () => { getListLop(); }
