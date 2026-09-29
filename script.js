const tarifVeritabani = {
    anayemek: {
        baslik: "Baget",
        adimlar: [
            { baslik: "Patlıcanları Hazırlama", metin: "Patlıcanları alacalı soyup tavada hafifçe kızartın.", gorsel: "https://picsum.photos/id/292/800/400", ipucu: "Acısını almak için kızartmadan önce 15 dk tuzlu suda bekletebilirsin.", sure: 0 },
            { baslik: "İç Harcı Kavurma", metin: "Kıymayı, doğranmış soğan ve biberlerle kavurup salça ekleyin.", gorsel: "https://picsum.photos/id/425/800/400", ipucu: "İç harca çok az tarçın eklemek lezzeti derinleştirir.", sure: 5 },
            { baslik: "Fırınlama", metin: "Kıyma harcını patlıcanların içine doldurup fırına verin.", gorsel: "https://picsum.photos/id/429/800/400", ipucu: "Fırın tepsisinin dibine biraz salçalı su eklersen kurumaz.", sure: 0 }
        ]
    },
    arasicak: {
        baslik: "Paçanga Böreği",
        adimlar: [
            { baslik: "Yufka ve İç Harç", metin: "Yufkayı üçgen kesin. İçine pastırma, kaşar ve domates koyun.", gorsel: "https://picsum.photos/id/1080/800/400", ipucu: "Domatesin çekirdekli sulu kısmını kullanmamaya özen göster.", sure: 0 },
            { baslik: "Sarma İşlemi", metin: "Malzemeleri koyduktan sonra kenarlarını içe katlayarak kalın bir sigara böreği gibi sarın.", gorsel: "https://picsum.photos/id/112/800/400", ipucu: "Çok sıkı sararsan pişerken patlayabilir.", sure: 0 },
            { baslik: "Kızartma", metin: "Kızgın yağda arkalı önlü nar gibi kızarana kadar pişirin.", gorsel: "https://picsum.photos/id/425/800/400", ipucu: "Fazla yağını alması için havlu kağıt üzerine çıkar.", sure: 3 }
        ]
    },
    meze: {
        baslik: "Haydari",
        adimlar: [
            { baslik: "Süzme Yoğurt", metin: "Süzme yoğurdu bir kaba alıp içine ezilmiş sarımsakları ekleyin.", gorsel: "https://picsum.photos/id/312/800/400", ipucu: "Sarımsakları ezerken biraz tuz kullanırsan daha pürüzsüz olur.", sure: 0 },
            { baslik: "Tereyağı ve Nane", metin: "Ufak bir tavada tereyağını eritip kuru naneyi hafifçe kavurun.", gorsel: "https://picsum.photos/id/326/800/400", ipucu: "Naneyi yakmamaya dikkat et, sadece kokusu çıksın yeter.", sure: 1 },
            { baslik: "Birleştirme", metin: "Naneli yağı yoğurdun üzerine döküp iyice karıştırın. Soğuk servis yapın.", gorsel: "https://picsum.photos/id/429/800/400", ipucu: "Birkaç saat dolapta dinlenirse lezzeti tam oturur.", sure: 0 }
        ]
    },
    salata: {
        baslik: "Gavurdağı Salatası",
        adimlar: [
            { baslik: "Doğrama", metin: "Domates, salatalık, soğan ve sivri biberleri çok küçük küpler halinde doğrayın.", gorsel: "https://picsum.photos/id/393/800/400", ipucu: "Malzemelerin minik doğranması bu salatanın en büyük sırrıdır.", sure: 0 },
            { baslik: "Ceviz ve Sos", metin: "İri kırılmış cevizleri ekleyin. Zeytinyağı, nar ekşisi ve tuzu karıştırıp dökün.", gorsel: "https://picsum.photos/id/429/800/400", ipucu: "Hakiki nar ekşisi kullanmak lezzeti zirveye taşır.", sure: 0 }
        ]
    },
    tatli: {
        baslik: "Fırın Sütlaç",
        adimlar: [
            { baslik: "Pirinçleri Haşlama", metin: "Pirinçleri yıkayıp yumuşayana kadar suda haşlayın.", gorsel: "https://picsum.photos/id/292/800/400", ipucu: "Pirinçlerin çok lapa olmamasına dikkat et.", sure: 15 },
            { baslik: "Süt ve Şeker", metin: "Haşlanan pirinçlere süt ve şekeri ekleyip kaynatın. Nişastayı bağlayın.", gorsel: "https://picsum.photos/id/425/800/400", ipucu: "Nişastayı doğrudan sıcak süte atma, önce biraz soğuk suyla aç.", sure: 10 },
            { baslik: "Fırınlama", metin: "Güveç kaplarına paylaştırıp fırının üst rafında üzerleri kızarana kadar pişirin.", gorsel: "https://picsum.photos/id/429/800/400", ipucu: "Fırın tepsisine yarıya kadar soğuk su koyarsan sütlaçlar çatlamaz.", sure: 0 }
        ]
    }
};

let aktifKategori = "";
let suankiAdim = 0;
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
        suankiAdim = 0;
        
        document.getElementById("kategoriEkrani").classList.add("d-none");
        document.getElementById("tarifEkrani").classList.remove("d-none");
        
        ekraniGuncelle();
    };
}

function ekraniGuncelle() {
    let secilenTarif = tarifVeritabani[aktifKategori];
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
    if (suankiAdim > 0) {
        suankiAdim--;
        document.getElementById("ileriBtn").innerHTML = "Sonraki Adım ❯";
        ekraniGuncelle();
    } else {
        document.getElementById("tarifEkrani").classList.add("d-none");
        document.getElementById("kategoriEkrani").classList.remove("d-none");
    }
};