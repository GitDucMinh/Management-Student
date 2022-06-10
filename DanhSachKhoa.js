class DanhSachKhoa {
    KHOA = [];
    ThemKhoa = function(addKhoa) {
        this.KHOA.push(addKhoa);
    }

    XoaKhoa = function(listKhoa) {
        listKhoa.forEach(element => {
            this.KHOA.forEach((khoa, i) => {
                if(element === khoa.__makhoa) {
                    this.KHOA.splice(i, 1);
                }
            });
        });
    }

    TimKiemKhoa = function (tukhoa) { 
        const dataFilter = this.KHOA.filter(value => {
            return value.__tenkhoa.toLowerCase().includes(tukhoa.toLowerCase());
        });
        return dataFilter;
    }

    TimKhoaTheoMa = function(MaKhoa) {
        for(var i = 0; i < this.KHOA.length; i++) {
            var khoa = this.KHOA[i];
            if(khoa.__makhoa === MaKhoa) {
                return khoa;
            }
        }
        return null;
    }

    SuaKhoa = function(kCapNhat) {
        for(var i = 0; i < this.KHOA.length; i++) {
            var kUpdate = this.KHOA[i];
            if(kUpdate.__makhoa === kCapNhat.__makhoa) {
                kUpdate.__tenkhoa = kCapNhat.__tenkhoa;
            }
        }
    }
}

/**********
 * 
 * CRUD, tìm kiếm Khoa
 * 
 */

 var danhSachKhoa = new DanhSachKhoa();

 var khoaDom = $('#addkhoa');
 
 khoaDom.onclick = function() {
     var makhoa = $('#makhoa').value;
     var tenkhoa = $('#tenkhoa').value;
     var error = 0;
 
     if (KiemTraDauVao('makhoa', makhoa)) { error++; }
     if (KiemTraDauVao('tenkhoa', tenkhoa)) { error++; }
     if(error != 0) { return; }
 
     var khoa = new KHOA(makhoa,tenkhoa);
     danhSachKhoa.ThemKhoa(khoa);
     console.log(danhSachKhoa)
     var jsonDanhSachKhoa = JSON.stringify(danhSachKhoa.KHOA);
     localStorage.setItem("dsKhoa", jsonDanhSachKhoa);
     InRaDanhSachKhoa(danhSachKhoa);
 }
 

 
 function getListKhoa() {
     var jsonKhoa = localStorage.getItem("dsKhoa");
     var mangKhoa = JSON.parse(jsonKhoa);
     danhSachKhoa.KHOA = mangKhoa;
     InRaDanhSachKhoa(danhSachKhoa);
 }
 
 function InRaDanhSachKhoa() {
     var lstTableKhoa = $('#tbodykhoa');
     lstTableKhoa.innerHTML = '';
 
     for(var i = 0; i < danhSachKhoa.KHOA.length; i++) {
 
         var khoa = danhSachKhoa.KHOA[i];
         var tr = createElement('tr');
         tr.id = khoa.__makhoa;
         tr.className = 'trKhoa';
         tr.setAttribute('onclick', 'chinhsuaKhoa("' + khoa.__makhoa + '")');
         // Tạo các thẻ td phù hợp với màn hình xuất ra danh sách
         var tdCheckbox = createElement('td');
         var checkboxKhoa = createElement('input');
         checkboxKhoa.setAttribute('type', 'checkbox');
         checkboxKhoa.setAttribute('class', 'checkboxKhoa');
         checkboxKhoa.setAttribute('value', khoa.__makhoa);
         tdCheckbox.appendChild(checkboxKhoa);
 
         var tdMaKhoa = TaoTheTD('makhoa', khoa.__makhoa);
         var tdTenKhoa = TaoTheTD('tenkhoa', khoa.__tenkhoa);
 
         // Append td vào tr
         tr.appendChild(tdCheckbox);
         tr.appendChild(tdMaKhoa);
         tr.appendChild(tdTenKhoa);
 
         //Append cac tr vào tbodySinhVien
         lstTableKhoa.appendChild(tr);
     }
 }
 
 function InRaKhoa(list) {
     var lstTableKhoa = $('#tbodykhoa');
     lstTableKhoa.innerHTML = '';
 
     for(var i = 0; i < list.length; i++) {
         var khoa = list[i];
 
         var tr = createElement('tr');
 
         // Tạo các thẻ td phù hợp với màn hình xuất ra danh sách
         var tdCheckbox = createElement('td');
         var checkboxKhoa = createElement('input');
         checkboxKhoa.setAttribute('type', 'checkbox');
         checkboxKhoa.setAttribute('class', 'checkboxKhoa');
         checkboxKhoa.setAttribute('value', khoa.__makhoa);
         tdCheckbox.appendChild(checkboxKhoa);
 
         var tdMaKhoa = TaoTheTD('makhoa', khoa.__makhoa);
         var tdTenKhoa = TaoTheTD('tenkhoa', khoa.__tenkhoa);
 
         // Append td vào tr
         tr.appendChild(tdCheckbox);
         tr.appendChild(tdMaKhoa);
         tr.appendChild(tdTenKhoa);
 
         //Append cac tr vào tbodySinhVien
         lstTableKhoa.appendChild(tr);
     }
 }
 
 function selectKhoa() {
     var jsonKhoa = localStorage.getItem("dsKhoa");
     var mangKhoa = JSON.parse(jsonKhoa);
     danhSachKhoa.KHOA = mangKhoa;
     for(var i = 0; i < danhSachKhoa.KHOA.length; i++) {
         var khoa = $('#khoa');
         var element_khoa = danhSachKhoa.KHOA[i];
         var option = createElement('option');
         option.setAttribute('value', element_khoa.__tenkhoa);
         option.innerHTML = element_khoa.__tenkhoa;
         khoa.appendChild(option);
     }
 }
 

 
 function Xoa_khoa() {
     var lstKhoa = document.getElementsByClassName('checkboxKhoa');
 
     //Mảng sinh viên được chọn 
     var lstKhoaDcChon = [];
 
     for (let i = 0; i < lstKhoa.length; i++) {
         if (lstKhoa[i].checked) {
             lstKhoaDcChon.push(lstKhoa[i].value);
         }
     }
 
     danhSachKhoa.XoaKhoa(lstKhoaDcChon);
     InRaDanhSachKhoa(danhSachKhoa);
 }

 var deleteKhoa = $('#deleteKhoa');
 deleteKhoa.onclick = function() {
     Xoa_khoa();
 }
 
 
 
 var realtimeSearchKhoa = $('#tukhoa_khoa');
 realtimeSearchKhoa.oninput = function () {
     var list = danhSachKhoa.TimKiemKhoa(realtimeSearchKhoa.value);
     InRaKhoa(list)
 }
 
 var searching_khoa = $('#searching_khoa');
 
 searching_khoa.onclick = function () {
     var list = danhSachKhoa.TimKiemKhoa(realtimeSearchKhoa.value);
     InRaKhoa(list)
 }
 
 function chinhsuaKhoa(makhoa) {
     var khoa = danhSachKhoa.TimKhoaTheoMa(makhoa);
 
     if (khoa != null) {
         $('#makhoa').value = khoa.__makhoa;
         $('#tenkhoa').value = khoa.__tenkhoa;
     }
 }
 
 function LuuThongTinKhoa() {
     var makhoa = $('#makhoa').value;
     var tenkhoa = $('#tenkhoa').value;
     var error = 0;
 
     if (KiemTraDauVao('makhoa', makhoa)) { error++; }
     if (KiemTraDauVao('tenkhoa', tenkhoa)) { error++; }
     if(error != 0) { return; }
 
     var khoa = new KHOA(makhoa,tenkhoa);
     danhSachKhoa.SuaKhoa(khoa);
     InRaDanhSachKhoa(danhSachKhoa);
 }
 
 $('#deleteDataKhoa').onclick = () => { getListKhoa(); } 