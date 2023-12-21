// navbar.js
function loadNavbar() {
  const navbarContainer = document.getElementById("navbar-container");
  navbarContainer.innerHTML = `
      <nav>
      <button class="btn btn-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling"> <img src="/frontend/images/menu.png"/></button>
        <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul>
                <li><a href="/frontend/index.html">Home</a></li>
                <li><a href="/frontend/pages/hitungIMT.html">Hitung IMT</a></li>
                <li><a href="/frontend/pages/hitungKebutuhan.html">Hitung Kebutuhan</a></li>
                <li><a href="/frontend/pages/bukuGizi.html">Buku Gizi</a></li>
            </ul>        
        </div>
        </div>   
      </nav>
    `;
}

// Panggil fungsi loadNavbar saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadNavbar);
