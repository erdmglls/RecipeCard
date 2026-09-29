

let aktifKategori = "";
let suankiAdim = -1;
let sayacInterval;

document.getElementById("temaButonu").onclick = function() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        this.innerHTML = "☀️ Aydınlık Mod";
    } else {
        this.innerHTML = "🌙 Karanlık Mod";
    }
};

document.getElementById("baslaBtn").onclick = function() {
    let isim = document.getElementById("kullaniciAdi").value;
    if (isim.trim() === "") {
        alert("Lütfen mutfağa girmeden önce adını gir!");
        return;
    }
    
    document.getElementById("hosgeldinMesaji").innerHTML = "Harika gidiyorsun, " + isim + "!";
    
    document.getElementById("girisEkrani").classList.add("d-none");
    document.getElementById("kategoriEkrani").classList.remove("d-none");
};

let kategoriButonlari = document.querySelectorAll(".kategori-btn");
for (let i = 0; i < kategoriButonlari.length; i++) {
    kategoriButonlari[i].onclick = function() {
        aktifKategori = this.getAttribute("data-kategori");
        suankiAdim = -1;
        
        document.getElementById("kategoriEkrani").classList.add("d-none");
        document.getElementById("tarifEkrani").classList.remove("d-none");
        
        ekraniGuncelle();
    };
}

function ekraniGuncelle() {
    let secilenTarif = tarifVeritabani[aktifKategori];
    
    if (suankiAdim === -1) {
        document.getElementById("ozetAlani").classList.remove("d-none");
        document.getElementById("adimAlani").classList.add("d-none");
        document.getElementById("sayacAlani").classList.add("d-none");
        
        document.getElementById("secilenTarifBaslik").innerHTML = secilenTarif.baslik;
        document.getElementById("ozetPorsiyon").innerHTML = secilenTarif.porsiyon;
        document.getElementById("ozetHazirlama").innerHTML = secilenTarif.hazirlama;
        document.getElementById("ozetPisirme").innerHTML = secilenTarif.pisirme;
        document.getElementById("ozetKalori").innerHTML = secilenTarif.kalori;
        
        let mList = "";
        for (let i = 0; i < secilenTarif.malzemeler.length; i++) {
            mList += "<li>" + secilenTarif.malzemeler[i] + "</li>";
        }
        document.getElementById("ozetMalzemeler").innerHTML = mList;
        
        document.getElementById("adimGorsel").src = secilenTarif.kapakGorseli;
        document.getElementById("adimIpucu").innerHTML = "Tarife başlamadan önce tüm malzemeleri tezgahınızda hazırlayın.";
        document.getElementById("tarifProgress").value = 0;
        document.getElementById("ileriBtn").innerHTML = "Tarife Başla ➔";
    } else {
        document.getElementById("ozetAlani").classList.add("d-none");
        document.getElementById("adimAlani").classList.remove("d-none");
        document.getElementById("ileriBtn").innerHTML = "Sonraki Adım ❯";
        
        let adimVerisi = secilenTarif.adimlar[suankiAdim];
        
        document.getElementById("secilenTarifBaslik").innerHTML = secilenTarif.baslik;
        document.getElementById("adimBaslik").innerHTML = "Adım " + (suankiAdim + 1) + ": " + adimVerisi.baslik;
        document.getElementById("adimMetin").innerHTML = adimVerisi.metin;
        document.getElementById("adimGorsel").src = adimVerisi.gorsel;
        document.getElementById("adimIpucu").innerHTML = adimVerisi.ipucu;
        
        let yuzde = ((suankiAdim + 1) / secilenTarif.adimlar.length) * 100;
        document.getElementById("tarifProgress").value = yuzde;
        
        clearInterval(sayacInterval);
        let sayacAlani = document.getElementById("sayacAlani");
        
        if (adimVerisi.sure > 0) {
            sayacAlani.classList.remove("d-none");
            sayaciBaslat(adimVerisi.sure);
        } else {
            sayacAlani.classList.add("d-none");
        }
    }
}

function sayaciBaslat(saniye) {
    let kalan = saniye;
    let baslangicDegeri = saniye;
    let sureOlcer = document.getElementById("sureOlcer");
    sureOlcer.max = baslangicDegeri;
    
    document.getElementById("kalanSure").innerHTML = kalan;
    sureOlcer.value = kalan;
    
    sayacInterval = setInterval(function() {
        kalan--;
        document.getElementById("kalanSure").innerHTML = kalan;
        sureOlcer.value = kalan;
        
        if (kalan <= 0) {
            clearInterval(sayacInterval);
            document.getElementById("kalanSure").innerHTML = "SÜRE BİTTİ!";
            document.getElementById("basariSesi").play();
        }
    }, 1000);
}

document.getElementById("ileriBtn").onclick = function() {
    let secilenTarif = tarifVeritabani[aktifKategori];
    
    if (suankiAdim < secilenTarif.adimlar.length - 1) {
        suankiAdim++;
        ekraniGuncelle();
    } else {
        document.getElementById("adimAlani").classList.remove("d-none");
        document.getElementById("ozetAlani").classList.add("d-none");
        document.getElementById("adimBaslik").innerHTML = "Tebrikler! 🎉";
        document.getElementById("adimMetin").innerHTML = "Bu harika lezzeti başarıyla tamamladın. Afiyet olsun!";
        document.getElementById("sayacAlani").classList.add("d-none");
        document.getElementById("basariSesi").play();
        this.innerHTML = "Mutfağa Dön";
        this.onclick = function() {
            location.reload();
        };
    }
};

document.getElementById("geriBtn").onclick = function() {
    if (suankiAdim > -1) {
        suankiAdim--;
        ekraniGuncelle();
    } else {
        document.getElementById("tarifEkrani").classList.add("d-none");
        document.getElementById("kategoriEkrani").classList.remove("d-none");
    }
};

document.getElementById("kategoriGeriBtn").onclick = function() {
    document.getElementById("kategoriEkrani").classList.add("d-none");
    document.getElementById("girisEkrani").classList.remove("d-none");
};

document.getElementById("tariftenCikBtn").onclick = function() {
    clearInterval(sayacInterval); 
    document.getElementById("tarifEkrani").classList.add("d-none");
    document.getElementById("kategoriEkrani").classList.remove("d-none");
};