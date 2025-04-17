function kiemTra(tu1, mau1, tu2, mau2) {
    // Kiểm tra mẫu số bằng 0
    if (mau1 === 0 || mau2 === 0) {
        return false;
    }

    // Rút gọn phân số bằng cách chia cả tử và mẫu cho UCLN
    let sFraction = (tu, mau) => {
        let gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        let ucln = gcd(Math.abs(tu), Math.abs(mau));
        return [tu / ucln, mau / ucln];
    };

    let [sTu1, sMau1] = sFraction(tu1, mau1);
    let [sTu2, sMau2] = sFraction(tu2, mau2);

    // So sánh tử và mẫu đã rút gọn
    return sTu1 === sTu2 && sMau1 === sMau2;
}

// Hàm xử lý khi nhấn nút kiểm tra
function kiemTraPhanSo() {
    // Lấy giá trị từ các ô input
    let tu1 = parseInt(document.getElementById('tu1').value);
    let mau1 = parseInt(document.getElementById('mau1').value);
    let tu2 = parseInt(document.getElementById('tu2').value);
    let mau2 = parseInt(document.getElementById('mau2').value);

    // Kiểm tra input hợp lệ
    if (isNaN(tu1) || isNaN(mau1) || isNaN(tu2) || isNaN(mau2)) {
        document.getElementById('result').innerHTML = "Vui lòng nhập đầy đủ các giá trị số";
        return;
    }

    if (mau1 === 0 || mau2 === 0) {
        document.getElementById('result').innerHTML = "Mẫu số không thể bằng 0";
        return;
    }

    // Kiểm tra phân số bằng nhau
    let ketQua = kiemTra(tu1, mau1, tu2, mau2);

    // Hiển thị kết quả
    let resultElement = document.getElementById('result');
    if (ketQua) {
        resultElement.innerHTML = `Hai phân số ${tu1}/${mau1} và ${tu2}/${mau2} BẰNG NHAU`;
    } else {
        resultElement.innerHTML = `Hai phân số ${tu1}/${mau1} và ${tu2}/${mau2} KHÔNG BẰNG NHAU`;
    }
}