// --- Efek Navbar saat di-scroll ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// --- Fungsi Buka & Tutup Modal Kontak ---
const modal = document.getElementById('contactModal');

function openModal() {
  modal.classList.add('active');
  // Mencegah halaman utama di-scroll saat pop-up aktif
  document.body.style.overflow = 'hidden'; 
}

function closeModal() {
  modal.classList.remove('active');
  // Mengembalikan scroll halaman utama
  document.body.style.overflow = 'auto'; 
}

// Menutup modal secara otomatis jika area luar modal diklik
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// --- Menu Hamburger Responsive ---
const ham = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Menutup menu setelah klik salah satu link tautan
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    ham.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// --- Fitur Gambar Melayang pada Hobi (Hover Preview) ---
const hobiRows = document.querySelectorAll('.hobi-row');
const hoverImgWrap = document.getElementById('hobi-hover-img');
const hoverImg = hoverImgWrap.querySelector('img');

hobiRows.forEach(row => {
  // Saat kursor masuk ke baris hobi
  row.addEventListener('mouseenter', (e) => {
    const imgSrc = row.getAttribute('data-img');
    if (imgSrc) {
      hoverImg.src = imgSrc;
      hoverImgWrap.classList.add('active');
    }
  });

  // Saat kursor bergerak di dalam baris hobi
  row.addEventListener('mousemove', (e) => {
    // Mengatur posisi gambar tepat di sebelah kanan kursor (ditambah jeda 20 piksel)
    hoverImgWrap.style.left = (e.clientX + 20) + 'px';
    hoverImgWrap.style.top = (e.clientY + 20) + 'px';
  });

  // Saat kursor keluar dari baris hobi
  row.addEventListener('mouseleave', () => {
    hoverImgWrap.classList.remove('active');
  });
});

// --- Animasi Reveal saat Elemen Masuk Viewport ---
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

reveals.forEach(el => observer.observe(el));

// --- Navigasi Link Aktif Berdasarkan Posisi Scroll Halaman ---
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) cur = s.id;
  });
  navAs.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

// --- Validasi dan Logika Pengiriman Formulir Pesan ---
function kirimPesan() {
  const nama  = document.getElementById('inputNama').value.trim();
  const email = document.getElementById('inputEmail').value.trim();
  const pesan = document.getElementById('inputPesan').value.trim();
  
  if (!nama || !email || !pesan) {
    alert('Mohon lengkapi semua field.');
    return;
  }
  
  const s = document.getElementById('formSuccess');
  s.style.display = 'block';
  
  // Reset input form setelah berhasil dikirim
  document.getElementById('inputNama').value  = '';
  document.getElementById('inputEmail').value = '';
  document.getElementById('inputPesan').value = '';
  
  // Hilangkan pesan sukses setelah 5 detik
  setTimeout(() => s.style.display = 'none', 5000);
}