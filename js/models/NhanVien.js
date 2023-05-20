function NhanVien(_taiKhoan, _hoTen, _eMail, _matKhau, _ngayLam, _luongCoBan, _chucVu, _gioLam) {
    this.taiKhoan = _taiKhoan;
    this.hoTen = _hoTen;
    this.eMail = _eMail;
    this.matKhau = _matKhau,
        this.ngayLam = _ngayLam;
    this.luongCoBan = _luongCoBan;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhTongLuong = function () {
        if (this.chucVu === "Sếp") {
            this.tongLuong = this.luongCoBan * 3;
        } else if (this.chucVu === "Trưởng phòng") {
            this.tongLuong = this.luongCoBan * 2;
        }
    }

    this.xepLoaiNV = function () {
        if (80 <= this.gioLam && this.gioLam < 160) {
            this.xepLoai = "Nhân viên trung bình";
        } else if (160 <= this.gioLam && this.gioLam < 176) {
            this.xepLoai = "Nhân viên khá";
        } else if (176 <= this.gioLam && this.gioLam < 192) {
            this.xepLoai = "Nhân viên giỏi";
        } else if (this.gioLam >= 192) {
            this.xepLoai = "Nhân viên xuất sắc";
        }
    }

    DSNV.prototype.timKiem = function (keyword) {
        var timKiem = [];

        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            var keywordToLowerCase = keyword.toLowerCase();
            var loaiNVToLowerCase = nv.xepLoai.toLowerCase();
            if (loaiNVToLowerCase.indexOf(keywordToLowerCase) !== -1) {
                timKiem.push(nv);
            }
        }
        return timKiem;
    }   
}

