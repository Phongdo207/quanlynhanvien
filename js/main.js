var dsnv = new DSNV();
var validation = new Validation();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

function thongTinNV(isAdd) {
    var _taiKhoan = getEle("tknv").value;
    var _hoTen = getEle("name").value;
    var _eMail = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCoBan = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

    var isValid = true;

    if (isAdd) {
        isValid &=
            validation.kiemtraTaiKhoan(_taiKhoan, "tbTaiKhoan", "(*) Tài khoản từ 4-6 ký tự số", 4, 6) &&
            validation.taikhoanNVTonTai(_taiKhoan, "tbTaiKhoan","(*) Tài khoản đã tồn tại", dsnv.arr);

    }

    isValid &= validation.kiemtraTenNV(_hoTen, "tbTen", "(*)Tên không được bỏ trống");
    isValid &= validation.kiemtraPattern(_eMail, "tbEmail", "(*)Email sai định dạng", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    isValid &= validation.kiemtraPattern(_matKhau, "tbMatKhau", "(*) Mật khẩu từ 6-10 ký tự có ít nhất 1 ký tự số, viết hoa, ký tự đặt biệt", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/)
    isValid &= validation.kiemtraPattern(_ngayLam, "tbNgay", "(*) Ngày không được bỏ trống", /\[1-9]|0[1-9]|1[0-2]\/\d{1,2}\/19|20\d\d/);
    isValid &= validation.kiemtraLuongCB(_luongCoBan, "tbLuongCB", "(*) Lương cơ bản từ 1.000.000 đến 20.000.000, không được bỏ trống");
    isValid &= validation.kiemtraChucVu("chucvu", "tbChucVu", "(*) Chọn đúng chức vụ");
    isValid &= validation.kiemtraSoGL(_gioLam, "tbGiolam", "(*)Số giờ làm trong tháng từ 80 giờ đến 200 giờ, không được bỏ trống");


    if (!isValid) return null;

    var nhanVien = new NhanVien(_taiKhoan, _hoTen, _eMail, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam);

    nhanVien.tinhTongLuong();
    nhanVien.xepLoaiNV();
    // nhanVien.xepLoai();
    return nhanVien;
}

function renderTable(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nv = data[i];

        content += `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.eMail}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong}</td>
            <td>${nv.xepLoai}</td>
            <td>
                <button class="btn btn-danger" onclick = "xoaNhanVien('${nv.taiKhoan}')">Xoá</button>
            </td>
        </tr>
        `
    }
    getEle("tableDanhSach").innerHTML = content;
}

getEle("btnThemNV").addEventListener("click", function (event) {
    event.preventDefault();
    var nhanVien = thongTinNV(true);
    if (nhanVien) {
        console.log(nhanVien);
        dsnv.themNV(nhanVien);
        console.log(dsnv.arr);
        renderTable(dsnv.arr);
        setLocalStorage();
    }

});

getEle("btnCapNhat").addEventListener("click", function (event) {
    event.preventDefault();
    var nv = thongTinNV(false);
    dsnv.capNhatNV(nv);
    console.log(dsnv.arr);
    renderTable(dsnv.arr);
    setLocalStorage();
})

getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var timKiem = dsnv.timKiem(keyword);
    renderTable(timKiem)
})

function xoaNhanVien(taiKhoan) {
    dsnv.xoaNV(taiKhoan);
    renderTable(dsnv.arr);
    setLocalStorage();
}

function setLocalStorage() {
    var dataString = JSON.stringify(dsnv.arr);
    localStorage.setItem("DSNV", dataString);
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
        var dataString = localStorage.getItem("DSNV");
        dsnv.arr = JSON.parse(dataString);
        renderTable(dsnv.arr)
    }
}