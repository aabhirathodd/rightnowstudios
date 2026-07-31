/* ==========================================================================
   RIGHTNOWSTUDIOS - SCRIPT & DYNAMIC CONTENT RENDERER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SITE_CONFIG === "undefined") {
    console.error("SITE_CONFIG is missing! Please make sure config.js is loaded before script.js.");
    return;
  }

  initHeader();
  initHero();
  renderProjects();
  initBuiltByHands();
  renderServicesAccordion();
  initFooter();
  initRetroKnobButton();
  initContactModal();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. HEADER INITIALIZATION
   -------------------------------------------------------------------------- */
function initHeader() {
  const brandLogo = document.getElementById("brandLogo");
  if (brandLogo && SITE_CONFIG.brandName) {
    const parts = SITE_CONFIG.brandName.split("|");
    if (parts.length === 2) {
      brandLogo.innerHTML = `${parts[0].trim()} <span class="brand-divider">|</span> ${parts[1].trim()}`;
    } else {
      brandLogo.textContent = SITE_CONFIG.brandName;
    }
  }
}

/* --------------------------------------------------------------------------
   2. HERO INITIALIZATION & ROLLING TEXT ANIMATION (Louie.pro style)
   -------------------------------------------------------------------------- */
function initHero() {
  const heroIntroStatic = document.getElementById("heroIntroStatic");
  const rollWordsContainer = document.getElementById("rollWordsContainer");
  const btnResume = document.getElementById("btnResume");
  const btnTalk = document.getElementById("btnTalk");

  if (!SITE_CONFIG.hero) return;
  const cfg = SITE_CONFIG.hero;

  if (heroIntroStatic) {
    heroIntroStatic.textContent = cfg.introStaticText || "An Industrial Designer and";
  }

  if (rollWordsContainer && cfg.introRollingWords && cfg.introRollingWords.length > 0) {
    rollWordsContainer.innerHTML = "";
    cfg.introRollingWords.forEach(word => {
      const span = document.createElement("span");
      span.className = "roll-word";
      span.textContent = word;
      rollWordsContainer.appendChild(span);
    });

    // Set transition timing dynamically from config
    const transitionMs = cfg.transitionDuration || 800;
    rollWordsContainer.style.transition = `transform ${transitionMs}ms cubic-bezier(0.76, 0, 0.24, 1)`;

    // Wait for text rendering to measure height precisely
    setTimeout(() => {
      const firstWord = rollWordsContainer.querySelector(".roll-word");
      if (!firstWord) return;
      const wordHeight = firstWord.offsetHeight;
      const rollWrapper = document.querySelector(".roll-wrapper");
      if (rollWrapper) {
        rollWrapper.style.height = `${wordHeight}px`;
      }

      // One-time roll sequence (no loop, stops at last word)
      let currentIndex = 0;
      const totalWords = cfg.introRollingWords.length;
      const delay = cfg.rollSpeed || 2000;

      const performRoll = () => {
        if (currentIndex < totalWords - 1) {
          currentIndex++;
          rollWordsContainer.style.transform = `translateY(-${currentIndex * wordHeight}px)`;
          setTimeout(performRoll, delay);
        }
      };

      // Trigger first roll after custom delay
      setTimeout(performRoll, delay);
    }, 100);
  }

  if (btnResume && cfg.resumeUrl) {
    btnResume.href = cfg.resumeUrl;
  }

  if (btnTalk && cfg.letsTalkText) {
    btnTalk.textContent = cfg.letsTalkText;
  }
}

/* --------------------------------------------------------------------------
   3. RENDER PROJECTS BENTO GRID
   -------------------------------------------------------------------------- */
function renderProjects() {
  const gridContainer = document.getElementById("portfolioGrid");
  if (!gridContainer || !SITE_CONFIG.projects) return;

  gridContainer.innerHTML = "";

  SITE_CONFIG.projects.forEach((proj, idx) => {
    const card = document.createElement("a");
    card.href = "#";
    card.className = `project-card ${proj.isHero ? "hero-card" : ""}`;
    card.style.animationDelay = `${idx * 0.1}s`;

    card.innerHTML = `
      <img src="${proj.image}" alt="${proj.title}" class="project-card-image" loading="lazy" />
      <div class="project-card-overlay">
        <span class="project-category">${proj.category}</span>
        <h3 class="project-title">${proj.title}</h3>
      </div>
    `;

    card.addEventListener("click", (e) => {
      e.preventDefault();
      alert(`Project: ${proj.title}\n\n${proj.description}`);
    });

    gridContainer.appendChild(card);
  });
}

/* --------------------------------------------------------------------------
   4. BUILT BY HANDS SECTION (Inspired by sushantvohra.com)
   -------------------------------------------------------------------------- */
function initBuiltByHands() {
  const label = document.getElementById("builtByHandsLabel");
  const text = document.getElementById("builtByHandsText");

  if (!SITE_CONFIG.builtByHands) return;

  if (label && SITE_CONFIG.builtByHands.title) {
    label.textContent = SITE_CONFIG.builtByHands.title;
  }

  if (text && SITE_CONFIG.builtByHands.text) {
    text.textContent = SITE_CONFIG.builtByHands.text;
  }
}

/* --------------------------------------------------------------------------
   5. RENDER SERVICES ACCORDION
   -------------------------------------------------------------------------- */
function renderServicesAccordion() {
  const container = document.getElementById("accordionContainer");
  if (!container || !SITE_CONFIG.services) return;

  container.innerHTML = "";

  SITE_CONFIG.services.forEach((service) => {
    const item = document.createElement("div");
    item.className = "accordion-item";

    const itemsListHtml = service.items
      .map(subItem => `<li>${subItem}</li>`)
      .join("");

    item.innerHTML = `
      <button class="accordion-header" aria-expanded="false" id="acc-header-${service.id}">
        <span class="accordion-title">${service.title}</span>
        <span class="accordion-icon">+</span>
      </button>
      <div class="accordion-body" id="acc-body-${service.id}">
        <div class="accordion-content">
          <ul class="service-list">
            ${itemsListHtml}
          </ul>
        </div>
      </div>
    `;

    const headerBtn = item.querySelector(".accordion-header");
    headerBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      item.classList.toggle("active");
      headerBtn.setAttribute("aria-expanded", !isActive);
    });

    container.appendChild(item);
  });
}

/* --------------------------------------------------------------------------
   6. FOOTER INITIALIZATION
   -------------------------------------------------------------------------- */
function initFooter() {
  const taglineEl = document.getElementById("footerTagline");
  const brandEl = document.getElementById("footerBrand");
  const copyrightEl = document.getElementById("footerCopyright");
  const socialsContainer = document.getElementById("footerSocials");

  if (taglineEl && SITE_CONFIG.footer.quote) {
    taglineEl.innerText = SITE_CONFIG.footer.quote;
  }

  if (brandEl && SITE_CONFIG.footer.studioTitle) {
    brandEl.textContent = SITE_CONFIG.footer.studioTitle;
  }

  if (copyrightEl && SITE_CONFIG.footer.copyright) {
    copyrightEl.textContent = SITE_CONFIG.footer.copyright;
  }

  if (socialsContainer && SITE_CONFIG.footer.socials) {
    socialsContainer.innerHTML = "";
    SITE_CONFIG.footer.socials.forEach(soc => {
      const a = document.createElement("a");
      a.href = soc.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "social-pill";
      a.setAttribute("aria-label", soc.name);
      a.textContent = soc.name.substring(0, 2).toUpperCase();
      a.title = soc.name;
      socialsContainer.appendChild(a);
    });
  }
}

/* --------------------------------------------------------------------------
   7. DYNAMIC FLAT NOTCHED INDUSTRIAL DIAL KNOB (With Rotation Animation)
   -------------------------------------------------------------------------- */
function initRetroKnobButton() {
  const knobBtn = document.getElementById("retroKnobBtn");
  if (!knobBtn) return;

  const cfg = SITE_CONFIG.knobMenu || {
    size: 46,
    color: "#f2542d",
    outerRingColor: "#d9421a",
    textColor: "#ffffff",
    text: "HOME",
    textPosition: "top",
    rotationDegrees: 90
  };

  // Set size
  knobBtn.style.width = `${cfg.size}px`;
  knobBtn.style.height = `${cfg.size}px`;

  // Calculate text path start offset & arc path based on textPosition
  let startOffset = "50%";
  let pathD = "M 22,50 A 28,28 0 0,1 78,50";
  if (cfg.textPosition === "bottom") {
    pathD = "M 78,50 A 28,28 0 0,1 22,50";
  } else if (cfg.textPosition === "left") {
    pathD = "M 50,78 A 28,28 0 0,1 50,22";
  } else if (cfg.textPosition === "right") {
    pathD = "M 50,22 A 28,28 0 0,1 50,78";
  }

  // Build 8 perimeter notches (rotated around center 50,50)
  let notchesHtml = "";
  for (let i = 0; i < 8; i++) {
    const angle = i * 45;
    notchesHtml += `<rect x="48" y="2" width="4" height="6" rx="1.5" fill="#111111" opacity="0.3" transform="rotate(${angle} 50 50)" />`;
  }

  knobBtn.innerHTML = `
    <svg viewBox="0 0 100 100" class="knob-svg" id="knobSvg">
      <defs>
        <path id="dynamicTextArcPath" d="${pathD}" />
      </defs>

      <!-- Outer Ring Base -->
      <circle cx="50" cy="50" r="48" fill="${cfg.outerRingColor}" />
      
      <!-- Perimeter Notches -->
      ${notchesHtml}

      <!-- Main Flat Inner Disc -->
      <circle cx="50" cy="50" r="40" fill="${cfg.color}" stroke="rgba(0,0,0,0.12)" stroke-width="1" />
      
      <!-- Dual Center Vertical Grip Ridges -->
      <rect x="44.5" y="24" width="3" height="52" rx="1.5" fill="rgba(0,0,0,0.18)" />
      <rect x="52.5" y="24" width="3" height="52" rx="1.5" fill="rgba(0,0,0,0.18)" />
      <rect x="44" y="23" width="3" height="52" rx="1.5" fill="rgba(255,255,255,0.25)" />
      <rect x="52" y="23" width="3" height="52" rx="1.5" fill="rgba(255,255,255,0.25)" />

      <!-- Curved Text Label -->
      <text font-family="'Space Mono', monospace" font-size="9" font-weight="700" fill="${cfg.textColor}" letter-spacing="2">
        <textPath href="#dynamicTextArcPath" startOffset="${startOffset}" text-anchor="middle">${cfg.text}</textPath>
      </text>
    </svg>
  `;

  const knobSvg = document.getElementById("knobSvg");
  let currentRotation = 0;

  // Click handler: Scroll to top & trigger rotation animation
  knobBtn.addEventListener("click", () => {
    currentRotation += (cfg.rotationDegrees || 90);
    if (knobSvg) {
      knobSvg.style.transform = `rotate(${currentRotation}deg)`;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Scroll listener: When user reaches top (home), reset rotation back to 0
  window.addEventListener("scroll", () => {
    if (window.scrollY === 0) {
      currentRotation = 0;
      if (knobSvg) {
        knobSvg.style.transform = "rotate(0deg)";
      }
    } else {
      // Proportional subtle scroll rotation as user scrolls down
      const scrollFactor = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * (cfg.rotationDegrees || 90);
      if (knobSvg && currentRotation === 0) {
        knobSvg.style.transform = `rotate(${scrollFactor}deg)`;
      }
    }
  });
}

/* --------------------------------------------------------------------------
   8. CONTACT MODAL LOGIC
   -------------------------------------------------------------------------- */
function initContactModal() {
  const modal = document.getElementById("contactModal");
  const backdrop = document.getElementById("modalBackdrop");
  const closeBtn = document.getElementById("modalClose");
  const btnTalk = document.getElementById("btnTalk");

  if (!modal) return;

  const openModal = () => modal.classList.add("active");
  const closeModal = () => modal.classList.remove("active");

  if (btnTalk) btnTalk.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (backdrop) backdrop.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   9. SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".project-card, .built-by-hands-section, .services-section, .footer-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    observer.observe(el);
  });
}
