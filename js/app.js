(function () {
  const PHONE = "59891332854";
  const SITE = "https://djcarloshermida.com.uy";

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const toggle = document.querySelector("[data-nav-toggle]");
  const mobile = document.querySelector("[data-nav-mobile]");
  if (toggle && mobile) {
    toggle.addEventListener("click", function () {
      const open = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    mobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobile.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const filters = document.querySelectorAll("[data-filter]");
  const projects = document.querySelectorAll(".project[data-cat]");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const value = btn.getAttribute("data-filter");
      filters.forEach(function (item) {
        item.classList.toggle("is-active", item === btn);
      });
      projects.forEach(function (card) {
        const cat = card.getAttribute("data-cat");
        const show = value === "all" || cat === value;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  const form = document.querySelector("#form");
  const status = document.querySelector("[data-form-status]");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const email = String(data.get("email") || "").trim();
      const topic = String(data.get("topic") || "").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || !phone || !email || !topic || !message) {
        setStatus("Completá todos los campos.", false);
        return;
      }

      const body = [
        "Consulta desde " + SITE,
        "Tipo: " + topic,
        "Nombre: " + name,
        "Tel: " + phone,
        "Email: " + email,
        "",
        message,
      ].join("\n");

      const wa = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(body);
      window.open(wa, "_blank", "noopener,noreferrer");
      setStatus("Abrí WhatsApp con tu consulta. Si no se abre, escribime al 091 332 854.", true);
      form.reset();
    });
  }

  function setStatus(text, ok) {
    if (!status) return;
    status.hidden = false;
    status.textContent = text;
    status.classList.toggle("ok", ok);
    status.classList.toggle("err", !ok);
  }

  const lightbox = document.querySelector("[data-lightbox]");
  const lightboxImg = document.querySelector("[data-lightbox-img]");
  if (lightbox && lightboxImg) {
    const items = Array.prototype.slice.call(document.querySelectorAll("[data-gallery] img"));
    const counter = lightbox.querySelector("[data-lightbox-count]");
    let index = 0;

    function show(i) {
      if (!items.length) return;
      index = (i + items.length) % items.length;
      const img = items[index];
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || "";
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
      if (counter) counter.textContent = index + 1 + " / " + items.length;
    }

    function close() {
      lightbox.classList.remove("is-open");
      lightboxImg.removeAttribute("src");
      document.body.style.overflow = "";
    }

    items.forEach(function (img, i) {
      img.parentElement.addEventListener("click", function (event) {
        event.preventDefault();
        show(i);
      });
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) close();
    });

    lightboxImg.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    const prevBtn = lightbox.querySelector("[data-lightbox-prev]");
    const nextBtn = lightbox.querySelector("[data-lightbox-next]");
    const closeBtn = lightbox.querySelector("[data-lightbox-close]");
    if (prevBtn) {
      prevBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        show(index - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        show(index + 1);
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        close();
      });
    }

    document.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(index + 1);
      }
    });
  }
})();
