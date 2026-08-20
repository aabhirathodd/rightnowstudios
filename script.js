/* ==========================================================================
   RIGHTNOWSTUDIOS - SCRIPT & DYNAMIC CONTENT RENDERER
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof SITE_CONFIG === "undefined") {
    console.error("SITE_CONFIG is missing! Please make sure config.js is loaded before script.js.");
    return;
  }

  initBackground();
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
   0. BACKGROUND INITIALIZATION
   -------------------------------------------------------------------------- */
function initBackground() {
  if (SITE_CONFIG.backgroundImage) {
    document.body.style.setProperty('--bg-image', `url('${SITE_CONFIG.backgroundImage}')`);
  }
}

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
   2. HERO INITIALIZATION & ROLLING TEXT ANIMATION (Louie.pro style with Suffix)
   -------------------------------------------------------------------------- */
function initHero() {
  const heroIntroStatic = document.getElementById("heroIntroStatic");
  const heroIntroSuffix = document.getElementById("heroIntroSuffix");
  const rollWordsContainer = document.getElementById("rollWordsContainer");
  const btnResume = document.getElementById("btnResume");
  const btnTalk = document.getElementById("btnTalk");

  if (!SITE_CONFIG.hero) return;
  const cfg = SITE_CONFIG.hero;

  if (heroIntroStatic) {
    heroIntroStatic.textContent = cfg.introStaticText || "I design for the people who live with the product, and the";
  }

  if (heroIntroSuffix) {
    heroIntroSuffix.textContent = cfg.introSuffixText || "who bring it to life.";
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
   3. RENDER PROJECTS BENTO GRID (Pinterest masonry style with click slider)
   -------------------------------------------------------------------------- */
function renderProjects() {
  const gridContainer = document.getElementById("portfolioGrid");
  if (!gridContainer || !SITE_CONFIG.projects) return;

  gridContainer.innerHTML = "";

  SITE_CONFIG.projects.forEach((proj, idx) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.animationDelay = `${idx * 0.1}s`;

    // Keep track of current image index in the image slider cycle
    let currentImgIdx = 0;
    const imagesList = proj.images || [proj.image];

    card.innerHTML = `
      <div class="project-card-image-wrapper">
        <img src="${imagesList[0]}" alt="${proj.title}" class="project-card-image" loading="lazy" />
      </div>
      <div class="project-card-info">
        <span class="project-category">${proj.category}</span>
        <a href="${proj.behanceUrl || '#'}" target="_blank" rel="noopener" class="project-title-link">
          <h3 class="project-title-text">${proj.title}</h3>
          <span class="project-arrow-icon">↗</span>
        </a>
      </div>
    `;

    // Click slider logic on the image
    const imgElement = card.querySelector(".project-card-image");
    if (imgElement && imagesList.length > 1) {
      imgElement.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Fade out transition
        imgElement.style.opacity = "0.2";
        
        setTimeout(() => {
          currentImgIdx = (currentImgIdx + 1) % imagesList.length;
          imgElement.src = imagesList[currentImgIdx];
          imgElement.style.opacity = "1";
        }, 150);
      });
    }

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
   6. FOOTER INITIALIZATION WITH SOCIAL SVG ICONS
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

  // Pre-defined SVG paths for social networks
  const svgIcons = {
    linkedin: `<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
    behance: `<svg viewBox="0 0 24 24"><path d="M8.228 15.011c0 .412-.108.78-.325 1.102-.217.323-.538.577-.963.762-.425.185-.947.278-1.567.278H2.755v-4.283h2.556c.551 0 1.018.087 1.401.263.383.175.679.427.889.756.209.328.314.733.314 1.213-1.037.051-1.025-.091-.687.909zm-.629-4.83c0 .356-.098.665-.293.928s-.485.467-.868.614c-.383.146-.86.22-1.428.22H2.755V9.071h2.247c.563 0 1.033.076 1.411.229.378.152.665.378.861.677s.294.636.294 1.009-.43-.075.031.195zM0 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5H5C2.239 0 0 2.239 0 5zm17.037 3.861h3.916v.928h-3.916v-.928zm.052 3.99c.075-.436.242-.806.502-1.11.26-.304.597-.532 1.011-.684.415-.152.888-.228 1.419-.228.847 0 1.503.228 1.968.684.465.456.702 1.085.71 1.887h-5.61c.015.424.116.764.305 1.021.189.257.445.442.769.555.323.113.693.17 1.11.17.652 0 1.184-.131 1.597-.393l.363.928c-.285.218-.665.393-1.139.525-.474.132-1.016.198-1.626.198-.94 0-1.705-.208-2.296-.624-.59-.416-.998-1.003-1.223-1.761-.225-.758-.338-1.65-.338-2.678 0-.987.12-1.859.362-2.615.242-.756.634-1.332 1.176-1.727.542-.395 1.258-.593 2.149-.593.847 0 1.547.18 2.099.54.551.36.953.869 1.205 1.528.252.659.378 1.439.378 2.34v.639h-6.95zm-9.396 3.12c.792 0 1.472-.143 2.038-.429.566-.286.995-.694 1.287-1.223s.438-1.161.438-1.896c0-.687-.137-1.282-.412-1.785s-.678-.891-1.21-1.163c-.532-.272-1.198-.408-1.998-.408H0v8.667h7.693z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
    email: `<svg viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v13.438h24v-13.438l-12 9.725z"/></svg>`
  };

  if (socialsContainer && SITE_CONFIG.footer.socials) {
    socialsContainer.innerHTML = "";
    SITE_CONFIG.footer.socials.forEach(soc => {
      const a = document.createElement("a");
      a.href = soc.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "social-pill";
      a.setAttribute("aria-label", soc.name);
      
      // Inject matching SVG icon if defined, otherwise initials fallback
      const key = soc.icon || soc.name.toLowerCase();
      if (svgIcons[key]) {
        a.innerHTML = svgIcons[key];
      } else {
        a.textContent = soc.name.substring(0, 2).toUpperCase();
      }
      
      a.title = soc.name;
      socialsContainer.appendChild(a);
    });
  }
}

/* --------------------------------------------------------------------------
   7. DYNAMIC FLAT NOTCHED INDUSTRIAL DIAL KNOB (Liftoff Challenge Style)
   -------------------------------------------------------------------------- */
function initRetroKnobButton() {
  const knobBtn = document.getElementById("retroKnobBtn");
  if (!knobBtn) return;

  const cfg = SITE_CONFIG.knobMenu || {
    size: 44,
    color: "#1c1c1c",
    outerRingColor: "#cccccc",
    indicatorColor: "#ff3b30",
    textColor: "#a0a0a0",
    text: "HOME",
    textPosition: "top",
    rotationDegrees: 90
  };

  // Set size dynamically
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

  knobBtn.innerHTML = `
    <svg viewBox="0 0 100 100" class="knob-svg" id="knobSvg">
      <defs>
        <path id="dynamicTextArcPath" d="${pathD}" />
      </defs>

      <!-- Outer Bevel Ring (Silver / Grey Border) -->
      <circle cx="50" cy="50" r="48" fill="${cfg.outerRingColor}" />
      
      <!-- Inner Matte Dark Bevel Shadow -->
      <circle cx="50" cy="50" r="44" fill="#111111" />

      <!-- Main Flat Dark Charcoal Center Disc -->
      <circle cx="50" cy="50" r="42" fill="${cfg.color}" />
      
      <!-- Vibrant Rectangular Indicator Notch (On the left side like Reference Image 1) -->
      <rect x="15" y="47.5" width="10" height="5" rx="1.2" fill="${cfg.indicatorColor}" />

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
