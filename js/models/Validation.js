function Validation() {
    this.kiemtraTaiKhoan = function (value, errorId, mess, min, max) {
        if (min <= value.length && value.length <= max) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemtraTenNV = function (value, errorId, mess) {
        if (!value) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    }

    this.kiemtraPattern = function (value, errorId, mess, pattern) {
        if (value.match(pattern)) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemtraLuongCB = function (value, errorId, mess) {

        if (1000000 <= value && value <= 20000000) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemtraChucVu = function (idselect, errorId, mess) {
        if (getEle(idselect).selectedIndex !== 0) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.kiemtraSoGL = function (value, errorId, mess) {
        if (80 <= value && value <= 200) {
            getEle(errorId).style.display = "none";
            getEle(errorId).innerHTML = "";
            return true;
        }
        getEle(errorId).style.display = "block";
        getEle(errorId).innerHTML = mess;
        return false;
    }

    this.taikhoanNVTonTai = function (value, errorId, mess, arr) {
        var esc = false;

        for (var i = 0; i < arr.length; i++) {
            var nv = arr[i];
            if (nv.taiKhoan === value) {
                esc = true;
                break;
            }
        }
        if (esc) {
            getEle(errorId).style.display = "block";
            getEle(errorId).innerHTML = mess;
            return false;
        }
        getEle(errorId).style.display = "none";
        getEle(errorId).innerHTML = "";
        return true;
    }
}