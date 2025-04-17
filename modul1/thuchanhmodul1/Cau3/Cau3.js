class SOTIETKIEM {
    constructor(maSo, loaiTietKiem, hoTen, cmnd, ngayMoSo, soTien) {
        this.maSo = maSo;
        this.loaiTietKiem = loaiTietKiem;
        this.hoTen = hoTen;
        this.cmnd = cmnd;
        this.ngayMoSo = ngayMoSo;
        this.soTien = soTien;
    }
}

// Mảng lưu trữ các sổ tiết kiệm
let danhSachSoTietKiem = [];

// Hàm thêm sổ tiết kiệm
function themSoTietKiem() {
    let maSo = parseInt(document.getElementById('maSo').value);
    let loaiTietKiem = document.getElementById('loaiTietKiem').value;
    let hoTen = document.getElementById('hoTen').value;
    let cmnd = parseInt(document.getElementById('cmnd').value);
    let ngayMoSo = parseInt(document.getElementById('ngayMoSo').value);
    let soTien = parseInt(document.getElementById('soTien').value);

    // Kiểm tra dữ liệu nhập
    if (!maSo || !loaiTietKiem || !hoTen || !cmnd  || !soTien) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }
    if (!kiemTraDinhDangNgay(ngayMoSo)) {
        alert("Ngày không hợp lệ! Vui lòng nhập theo định dạng dd/mm/yyyy");
        return;
    }

    // Tạo đối tượng sổ tiết kiệm mới
    let soTietKiem = new SOTIETKIEM(maSo, loaiTietKiem, hoTen, cmnd, ngayMoSo, soTien);

    // Thêm vào mảng
    danhSachSoTietKiem.push(soTietKiem);

    // Reset form
    document.getElementById('maSo').value = '';
    document.getElementById('loaiTietKiem').value = '';
    document.getElementById('hoTen').value = '';
    document.getElementById('cmnd').value = '';
    document.getElementById('ngayMoSo').value = '';
    document.getElementById('soTien').value = '';

    // Cập nhật bảng
    capNhatBang();

    alert("Thêm sổ thành công!");
}

function kiemTraDinhDangNgay(ngay) {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(ngay)) return false;

    const [day, month, year] = ngay.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDate() === day && date.getMonth() + 1 === month && date.getFullYear() === year;
}

function capNhatBang() {
    const bangBody = document.getElementById('bangBody');
    bangBody.innerHTML = '';

    if (danhSachSoTietKiem.length === 0) {
        return;
    }

    danhSachSoTietKiem.forEach((so, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${so.maSo}</td>
        <td>${so.loaiTietKiem}</td>
        <td>${so.hoTen}</td>
        <td>${so.cmnd}</td>
        <td>${so.ngayMoSo}</td>
        <td>${so.soTien}</td>
        <td><button onclick="xoaSoTietKiem(${index})">Xóa</button></td>
      `;

        bangBody.appendChild(row);
    });
}

function xoaSoTietKiem(index) {
    if (confirm("Bạn có chắc chắn muốn xóa sổ này?")) {
        danhSachSoTietKiem.splice(index, 1);
        capNhatBang();
        alert("Đã xóa sổ thành công!");
    }
}

// Khởi tạo bảng khi trang được tải
window.onload = function() {
    capNhatBang();
};