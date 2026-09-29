document.getElementById("tarifKaydetBtn").onclick = function() {
    let ad = document.getElementById("yeniTarifAdi").value;
    let kategori = document.getElementById("yeniKategori").value;
    let metin = document.getElementById("yeniAdimMetni").value;
    let mesaj = document.getElementById("adminMesaj");

    if (ad === "" || kategori === "" || metin === "") {
        mesaj.innerHTML = "Hata: Lütfen tüm alanları eksiksiz doldurunuz!";
        mesaj.style.color = "red";
        return;
    }

    mesaj.innerHTML = "Başarılı: " + ad + " tarifi " + kategori + " kategorisine eklendi!";
    mesaj.style.color = "green";

    document.getElementById("yeniTarifAdi").value = "";
    document.getElementById("yeniKategori").value = "";
    document.getElementById("yeniAdimMetni").value = "";
};