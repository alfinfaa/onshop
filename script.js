// Menampilkan produk di index.html
if (document.getElementById("produk-list")) {
  const produk = JSON.parse(localStorage.getItem("produk")) || [];
  const container = document.getElementById("produk-list");

  produk.forEach(p => {
    const card = `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${p.gambar}" class="card-img-top" alt="${p.nama}">
          <div class="card-body">
            <h5 class="card-title">${p.nama}</h5>
            <p class="card-text">Rp ${p.harga.toLocaleString()}</p>
            <button class="btn btn-primary" onclick="tambahKeKeranjang(${p.id})">Beli</button>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

function tambahKeKeranjang(id) {
  let keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  keranjang.push(id);
  localStorage.setItem("keranjang", JSON.stringify(keranjang));
  alert("Produk ditambahkan ke keranjang!");
}

// Menampilkan keranjang di cart.html
if (document.getElementById("keranjang-list")) {
  const produk = JSON.parse(localStorage.getItem("produk")) || [];
  const keranjang = JSON.parse(localStorage.getItem("keranjang")) || [];
  const container = document.getElementById("keranjang-list");
  const totalEl = document.getElementById("total-harga");

  let total = 0;
  keranjang.forEach(id => {
    const item = produk.find(p => p.id === id);
    if (item) {
      total += item.harga;
      const card = `
        <div class="card mb-2">
          <div class="card-body">
            <h5 class="card-title">${item.nama}</h5>
            <p class="card-text">Rp ${item.harga.toLocaleString()}</p>
          </div>
        </div>
      `;
      container.innerHTML += card;
    }
  });
  totalEl.innerText = total.toLocaleString();
}

function checkout() {
  const metode = document.getElementById("metode").value;
  const alamat = document.getElementById("alamat").value.trim();

  if (!alamat) {
    alert("Mohon isi alamat pengiriman.");
    return;
  }

  const pesan = `Halo Admin, ada pesanan baru dari KOP MARKET.%0A%0A*Alamat:* ${alamat}%0A*Metode Pembayaran:* ${metode}`;
  const noAdmin = "089508715913"; // Ganti dengan nomor WhatsApp admin (format internasional tanpa +)
  const linkWA = `https://wa.me/${noAdmin}?text=${encodeURIComponent(pesan)}`;

  window.open(linkWA, '_blank');
  alert("Terima kasih! Pesanan Anda akan dikirim ke:\n" + alamat + "\n\nMetode Pembayaran: " + metode);
  localStorage.removeItem("keranjang");
  window.location.href = "index.html";
}
