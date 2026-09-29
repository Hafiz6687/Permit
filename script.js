document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Logik Pengiraan Automatik Jadual Pekerja
    const calcInputs = document.querySelectorAll('.calc');
    calcInputs.forEach(input => {
        input.addEventListener('input', calculateTotals);
    });

    function calculateTotals() {
        const lelakiTemp = parseInt(document.getElementById('lelaki_temp').value) || 0;
        const lelakiAsing = parseInt(document.getElementById('lelaki_asing').value) || 0;
        const perTemp = parseInt(document.getElementById('perempuan_temp').value) || 0;
        const perAsing = parseInt(document.getElementById('perempuan_asing').value) || 0;

        document.getElementById('lelaki_jum').value = lelakiTemp + lelakiAsing;
        document.getElementById('perempuan_jum').value = perTemp + perAsing;
    }

    // 2. Logik Paparan Dinamik Bahagian C Berdasarkan Lampiran 5
    const jenisPermohonan = document.getElementById('jenis_permohonan');
    const dinamikContainer = document.getElementById('soalan_dinamik_container');

    // Data dari Lampiran 5
    const panduanLampiran5 = {
        perlanjutan_upah: [
            "i. Alasan permohonan lewat bayar upah",
            "ii. Tempoh pembayaran upah kerja lebih masa dan bayaran lain sebelum permohonan",
            "iii. Tempoh pembayaran upah pokok yang dicadangkan",
            "iv. Tempoh pembayaran upah kerja lebih masa yang dicadangkan",
            "v. Pengiraan bayaran kadar upah biasa",
            "vi. Cadangan alternatif sekiranya permohonan ditolak"
        ],
        pendahuluan_upah: [
            "i. Alasan permohonan pendahuluan upah",
            "ii. Tujuan pendahuluan dibuat",
            "iii. Tempoh bayaran balik pendahuluan upah yang dipohon",
            "iv. Kadar faedah (setahun) yang dikenakan terhadap pendahuluan (jika ada)",
            "v. Kebaikan kepada pekerja",
            "vi. Jumlah pendahuluan upah & Kaedah pembayaran balik"
        ],
        potongan_upah: [
            "i. Jenis potongan dan jumlah potongan sedia ada",
            "ii. Amaun subsidi yang diberikan majikan (jika ada)",
            "iii. Alasan permohonan potongan",
            "iv. Amaun dan tempoh potongan akan dibuat (pembayaran penuh/ansuran)",
            "v. Permohonan secara bertulis daripada pekerja untuk membenarkan majikan memotong upah"
        ],
        waktu_kerja: [
            "i. Waktu kerja yang diamalkan (sekarang)",
            "ii. Alasan permohonan pengecualian sekatan / kelonggaran waktu",
            "iii. Maklumat kerja lebih masa bagi setiap pekerja yang terlibat",
            "iv. Jumlah jam tertinggi kerja lebih masa yang pernah dilakukan oleh pekerja",
            "v. Waktu rehat yang dijadualkan"
        ]
    };

    jenisPermohonan.addEventListener('change', (e) => {
        const value = e.target.value;
        dinamikContainer.innerHTML = ''; // Kosongkan container

        if (panduanLampiran5[value]) {
            const soalanList = panduanLampiran5[value];
            
            soalanList.forEach((soalan, index) => {
                const div = document.createElement('div');
                div.className = 'dynamic-item';
                
                const label = document.createElement('label');
                label.textContent = soalan;
                
                const textarea = document.createElement('textarea');
                textarea.name = `dinamik_${value}_${index}`;
                textarea.placeholder = "Sila isi butiran siasatan di sini...";
                
                div.appendChild(label);
                div.appendChild(textarea);
                dinamikContainer.appendChild(div);
            });
        } else {
            dinamikContainer.innerHTML = '<em>Sila pilih Jenis Permohonan di Bahagian A untuk memaparkan panduan siasatan di sini.</em>';
        }
    });
});
