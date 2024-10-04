const readline = require("readline-sync");

let previousResult = null; // Menyimpan hasil kalkulasi sebelumnya
let history = []; // Menyimpan riwayat kalkulasi

function mainMenu() {
    console.log("\n--- Menu Utama ---");
    console.log("1. Kalkulasi");
    console.log("2. Lihat Riwayat");
    console.log("3. Keluar");
    const choice = readline.question("Pilih menu: ");
    
    switch (choice) {
        case '1':
            calculationSubMenu();
            break;
        case '2':
            showHistory();
            break;
        case '3':
            exitConfirmation();
            break;
        default:
            console.log("Pilihan tidak valid, silakan pilih lagi.");
            mainMenu();
    }
}

function calculationSubMenu(usePreviousResult = null) {
    console.log("\n--- Sub Menu Kalkulasi ---");
    console.log("1. Pertambahan");
    console.log("2. Pengurangan");
    console.log("3. Perkalian");
    console.log("4. Pembagian");
    console.log("5. Modulus");
    console.log("6. Akar");
    console.log("7. Sin");
    console.log("8. Cos");
    console.log("9. Tan");
    console.log("0. Kembali ke Menu Utama");
    const choice = readline.question("Pilih operasi: ");

    switch (choice) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
            calculator(choice, usePreviousResult);
            break;
        case '6':
            squareRoot();
            break;
        case '7':
            trigonometry('sin');
            break;
        case '8':
            trigonometry('cos');
            break;
        case '9':
            trigonometry('tan');
            break;
        case '0':
            mainMenu();
            break;
        default:
            console.log("Pilihan tidak valid, silakan pilih lagi.");
            calculationSubMenu(usePreviousResult);
    }
}

function calculator(operation, usePreviousResult = null) {
    let angkaPertama;
    if (usePreviousResult !== null) {
        angkaPertama = usePreviousResult;
        console.log(`Menggunakan hasil sebelumnya: ${angkaPertama}`);
    } else {
        angkaPertama = parseFloat(readline.question("Masukan Angka Pertama: "));
    }
    const angkaKedua = parseFloat(readline.question("Masukan Angka Kedua: "));

    let hasil;
    switch (operation) {
        case '1':
            hasil = angkaPertama + angkaKedua;
            break;
        case '2':
            hasil = angkaPertama - angkaKedua;
            break;
        case '3':
            hasil = angkaPertama * angkaKedua;
            break;
        case '4':
            if (angkaKedua === 0) {
                console.log("Error: Angka Kedua tidak boleh bernilai 0");
                return;
            }
            hasil = angkaPertama / angkaKedua;
            break;
        case '5':
            hasil = angkaPertama % angkaKedua;
            break;
    }
    console.log(`Hasilnya Adalah: ${hasil}`);
    previousResult = hasil;
    addToHistory(angkaPertama, operationSymbol(operation), angkaKedua, hasil);

    // Tanyakan apakah ingin melanjutkan kalkulasi
    const lanjut = readline.question("Apakah Anda ingin melanjutkan kalkulasi? (ya/tidak): ").toLowerCase();
    if (lanjut === 'ya') {
        calculationSubMenu(previousResult); // Menggunakan hasil sebelumnya
    } else {
        mainMenu(); // Kembali ke menu utama jika pengguna memilih "tidak"
    }
}

function operationSymbol(operation) {
    switch (operation) {
        case '1': return '+';
        case '2': return '-';
        case '3': return '*';
        case '4': return '/';
        case '5': return '%';
    }
}

function squareRoot() {
    const angka = parseFloat(readline.question("Masukkan Angka: "));
    const hasil = Math.sqrt(angka);
    console.log(`Hasil Akar dari ${angka} adalah: ${hasil}`);
    previousResult = hasil;
    addToHistory(`√(${angka})`, '=', hasil);
    
    // Tanyakan apakah ingin melanjutkan kalkulasi
    const lanjut = readline.question("Apakah Anda ingin melanjutkan kalkulasi? (ya/tidak): ").toLowerCase();
    if (lanjut === 'ya') {
        calculationSubMenu(previousResult);
    } else {
        mainMenu(); // Kembali ke menu utama jika pengguna memilih "tidak"
    }
}

function trigonometry(type) {
    const angka = parseFloat(readline.question("Masukkan Angka (dalam derajat): "));
    const radian = angka * (Math.PI / 180); // Konversi derajat ke radian
    let hasil;
    switch (type) {
        case 'sin':
            hasil = Math.sin(radian);
            break;
        case 'cos':
            hasil = Math.cos(radian);
            break;
        case 'tan':
            hasil = Math.tan(radian);
            break;
    }
    console.log(`Hasil ${type}(${angka}°) adalah: ${hasil}`);
    previousResult = hasil;
    addToHistory(`${type}(${angka}°)`, '=', hasil);
    
    // Tanyakan apakah ingin melanjutkan kalkulasi
    const lanjut = readline.question("Apakah Anda ingin melanjutkan kalkulasi? (ya/tidak): ").toLowerCase();
    if (lanjut === 'ya') {
        calculationSubMenu(previousResult);
    } else {
        mainMenu(); // Kembali ke menu utama jika pengguna memilih "tidak"
    }
}

function addToHistory(angkaPertama, operator, angkaKedua, hasil) {
    history.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
}

function showHistory() {
    if (history.length === 0) {
        console.log("Belum ada riwayat kalkulasi.");
    } else {
        console.log("Riwayat Kalkulasi:");
        history.forEach((item, index) => {
            console.log(`${index + 1}. ${item}`);
        });
    }
    mainMenu(); // Kembali ke menu utama setelah melihat riwayat
}

function exitConfirmation() {
    const confirm = readline.question("Apakah Anda yakin ingin keluar? (yes/no): ").toLowerCase();
    if (confirm === 'yes') {
        console.log("Terima kasih, program selesai.");
        process.exit();
    } else {
        mainMenu();
    }
}

// Mulai program dengan menampilkan menu utama
mainMenu();
