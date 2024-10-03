const readline = require("readline-sync");

let previousResult = null; // Menyimpan hasil kalkulasi sebelumnya
let history = []; // Menyimpan riwayat kalkulasi

function calculator() {
    let usePrevious = false;
    
    // Jika ada hasil sebelumnya, tanyakan apakah pengguna ingin menggunakannya
    if (previousResult !== null) {
        const usePrev = readline.question(`Ingin menggunakan hasil sebelumnya (${previousResult})? (ya/tidak): `).toLowerCase();
        if (usePrev === 'ya') {
            usePrevious = true;
        }
    }
    
    // Jika pengguna memilih untuk tidak menggunakan hasil sebelumnya, minta input angka pertama
    const angkaPertama = usePrevious ? previousResult : parseFloat(readline.question("Masukan Angka Pertama : "));
    const operator = readline.question("Pilih Operator (+, -, *, /, %) : ");
    const angkaKedua = parseFloat(readline.question("Masukan Angka Kedua : "));

    const requiredOperator = ["+", "-", "*", "/", "%"];

    if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
        console.log("Inputan anda tidak valid!");
    } else if (!requiredOperator.includes(operator)) {
        console.log("Pilih sesuai operator yang tersedia.");
    } else {
        const hasil = processHasil(angkaPertama, angkaKedua, operator);
        
        // Simpan hasil hanya jika berhasil dihitung (tidak ada kesalahan dalam pembagian 0)
        if (hasil !== null) {
            console.log(`Hasilnya Adalah ${hasil}`);
            previousResult = hasil;
            addToHistory(angkaPertama, operator, angkaKedua, hasil);
        }
    }
}

// Fungsi untuk memproses hasil kalkulasi
function processHasil(inputanPertama, inputanKedua, operator) {
    switch (operator) {
        case "+":
            return inputanPertama + inputanKedua;

        case "-":
            return inputanPertama - inputanKedua;
        
        case "*":
            return inputanPertama * inputanKedua;
        
        case "/":
            if (inputanKedua === 0) {
                console.log("Error: Angka Kedua tidak boleh bernilai 0");
                return null; // Mengembalikan null jika ada kesalahan
            }
            return inputanPertama / inputanKedua;

        case "%":
            return inputanPertama % inputanKedua;
    }
}

// Fungsi untuk menambah riwayat kalkulasi
function addToHistory(angkaPertama, operator, angkaKedua, hasil) {
    history.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
}

// Fungsi untuk menampilkan riwayat kalkulasi
function showHistory() {
    if (history.length === 0) {
        console.log("Belum ada riwayat kalkulasi.");
    } else {
        console.log("Riwayat Kalkulasi:");
        history.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
}

// Program utama
while (true) {
    calculator();
    
    // Tanyakan apakah ingin menghitung lagi
    const ulangi = readline.question("Apakah Anda ingin menghitung lagi? (ya/tidak/riwayat): ").toLowerCase();
    
    if (ulangi === 'riwayat') {
        showHistory(); // Tampilkan riwayat kalkulasi
    } else if (ulangi === 'tidak') {
        showHistory(); // Tampilkan riwayat sebelum keluar
        console.log("Terima kasih, program selesai.");
        break;
    }
}
