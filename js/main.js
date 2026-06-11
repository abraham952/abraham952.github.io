(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const reveals = document.querySelectorAll(".reveal");
  const scrollProgress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let typingTimer = null;

  function t(key) {
    return window.getI18n ? window.getI18n(key, window.currentLang || "en") : key;
  }

  /* ── Theme toggle ── */
  function initTheme() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      const label = theme === "dark" ? t("theme.light") : t("theme.dark");
      if (label) btn.setAttribute("aria-label", label);
    }

    btn.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      applyTheme(current === "dark" ? "light" : "dark");
    });

    document.addEventListener("languageChanged", function () {
      const theme = document.documentElement.getAttribute("data-theme") || "dark";
      const label = theme === "dark" ? t("theme.light") : t("theme.dark");
      if (label) btn.setAttribute("aria-label", label);
    });

    const theme = document.documentElement.getAttribute("data-theme") || "dark";
    const label = theme === "dark" ? t("theme.light") : t("theme.dark");
    if (label) btn.setAttribute("aria-label", label);
  }

  /* ── Language switcher ── */
  function initLanguage() {
    const saved = localStorage.getItem("lang") || "en";
    if (window.applyLanguage) window.applyLanguage(saved);

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const lang = btn.getAttribute("data-lang");
        if (window.applyLanguage) window.applyLanguage(lang);
      });
    });
  }

  /* ── Preloader (reference: COMPILING_PORTFOLIO_CORE) ── */
  function initPreloader() {
    const preloader = document.getElementById("preloader");
    const bar = document.getElementById("preloaderBar");
    const log = document.getElementById("preloaderLog");
    if (!preloader || !bar) {
      document.body.classList.add("loaded");
      return;
    }

    const logs = t("preloader.logs") || [
      "[OK] Loading diagnostic packages...",
      "[OK] Parsing CV matrices...",
      "[OK] Mounting Laravel modules...",
      "[OK] Portfolio core compiled.",
    ];

    let progress = 0;
    let logIndex = 0;

    const interval = setInterval(function () {
      progress += reducedMotion ? 50 : Math.random() * 18 + 8;
      if (progress > 100) progress = 100;
      bar.style.width = progress + "%";

      if (log && logIndex < logs.length && progress > (logIndex + 1) * 22) {
        log.textContent = logs[logIndex];
        logIndex++;
      }

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(function () {
          document.body.classList.add("loaded");
          preloader.setAttribute("aria-hidden", "true");
        }, reducedMotion ? 0 : 400);
      }
    }, reducedMotion ? 80 : 120);
  }

  /* ── Particle background ── */
  function initParticles() {
    const canvas = document.getElementById("particleCanvas");
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let mouse = { x: -1000, y: -1000 };
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = Math.min(60, Math.floor(w / 25));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          r: Math.random() * 1.5 + 0.5,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(function (p) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= dx * 0.008;
          p.y -= dy * 0.008;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(96, 165, 250, 0.5)";
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();
    window.addEventListener("resize", function () {
      resize();
      createParticles();
    });
    window.addEventListener("mousemove", function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  }

  /* ── Scroll progress & back to top ── */
  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle("scrolled", scrollTop > 20);

    if (scrollProgress && docHeight > 0) {
      scrollProgress.style.width = (scrollTop / docHeight) * 100 + "%";
    }

    if (backToTop) {
      if (scrollTop > 500) {
        backToTop.hidden = false;
      } else {
        backToTop.hidden = true;
      }
    }

    updateActiveNav();
  }

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
  }

  /* Active nav */
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    let current = "";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute("id");
      }
    });

    navAnchors.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  /* Mobile menu */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const open = navLinks.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", open);
    });

    navAnchors.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal on scroll */
  if ("IntersectionObserver" in window && reveals.length) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    reveals.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* Skill bars animation */
  function initSkillBars() {
    const items = document.querySelectorAll(".skill-bar-item");
    if (!items.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const item = entry.target;
          const level = parseInt(item.getAttribute("data-level"), 10) || 0;
          const fill = item.querySelector(".skill-bar-fill");
          const pct = item.querySelector(".skill-pct");
          if (fill) fill.style.width = level + "%";
          if (pct) {
            let current = 0;
            const step = reducedMotion ? level : 2;
            const timer = setInterval(function () {
              current += step;
              if (current >= level) {
                current = level;
                clearInterval(timer);
              }
              pct.textContent = current + "%";
            }, reducedMotion ? 0 : 25);
          }
          observer.unobserve(item);
        });
      },
      { threshold: 0.3 }
    );

    items.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* Project filters */
  function initProjectFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".project-card[data-category]");
    if (!buttons.length || !cards.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filter = btn.getAttribute("data-filter");
        buttons.forEach(function (b) {
          b.classList.toggle("active", b === btn);
          b.setAttribute("aria-selected", b === btn);
        });

        cards.forEach(function (card) {
          const cats = card.getAttribute("data-category") || "";
          const show = filter === "all" || cats.includes(filter);
          card.classList.toggle("hidden", !show);
        });
      });
    });
  }

  /* Toast helper */
  function showToast(msg) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 2800);
  }

  /* Copy email */
  function initCopyEmail() {
    const btn = document.getElementById("copyEmailBtn");
    if (!btn) return;

    btn.addEventListener("click", function () {
      const email = btn.getAttribute("data-email");
      if (!email) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(function () {
          showToast(t("toast.copied") || "✓ Email copied");
        }).catch(function () {
          showToast(email);
        });
      } else {
        showToast(email);
      }
    });
  }

  /* Contact chat */
  function initChat() {
    const form = document.getElementById("chatForm");
    const messages = document.getElementById("chatMessages");
    const messageInput = document.getElementById("chatMessage");
    const quickReplies = document.querySelectorAll(".quick-reply");
    const EMAIL = "abrahamgebreyohannes12@gmail.com";

    if (!form || !messages) return;

    quickReplies.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const text = btn.getAttribute("data-msg");
        if (messageInput && text) {
          messageInput.value = text;
          messageInput.focus();
        }
      });
    });

    function appendUserMessage(text) {
      const wrap = document.createElement("div");
      wrap.className = "chat-msg chat-msg-out";
      wrap.innerHTML =
        '<div class="chat-bubble"><p>' + escapeHtml(text) + "</p></div>" +
        '<time class="chat-time">You · just now</time>';
      messages.appendChild(wrap);
      messages.scrollTop = messages.scrollHeight;
    }

    function appendBotReply() {
      setTimeout(function () {
        const wrap = document.createElement("div");
        wrap.className = "chat-msg chat-msg-in";
        wrap.innerHTML =
          '<div class="chat-bubble"><p>' + escapeHtml(t("toast.chatReply") || "Thanks! Opening your email app.") + "</p></div>" +
          '<time class="chat-time">Abraham · just now</time>';
        messages.appendChild(wrap);
        messages.scrollTop = messages.scrollHeight;
      }, 600);
    }

    function escapeHtml(str) {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("chatName");
      const email = document.getElementById("chatEmail");
      const message = document.getElementById("chatMessage");
      let valid = true;

      [name, email, message].forEach(function (field) {
        if (!field) return;
        field.classList.remove("error");
        if (!field.value.trim()) {
          field.classList.add("error");
          valid = false;
        }
      });

      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add("error");
        valid = false;
        showToast(t("toast.invalidEmail"));
        return;
      }

      if (!valid) {
        showToast(t("toast.fillFields"));
        return;
      }

      const body =
        "Name: " + name.value.trim() + "\n" +
        "Email: " + email.value.trim() + "\n\n" +
        message.value.trim();

      appendUserMessage(message.value.trim());
      appendBotReply();

      const subject = encodeURIComponent("Portfolio message from " + name.value.trim());
      const mailBody = encodeURIComponent(body);

      setTimeout(function () {
        window.location.href =
          "mailto:" + EMAIL + "?subject=" + subject + "&body=" + mailBody;
        form.reset();
      }, 900);
    });
  }

  /* CV download — uses resume.pdf if present, else email request */
  function initCvButton() {
    const cvBtn = document.getElementById("cvBtn");
    if (!cvBtn) return;

    cvBtn.addEventListener("click", function (e) {
      const href = cvBtn.getAttribute("href");
      if (!href || !href.endsWith(".pdf")) return;

      fetch(href, { method: "HEAD" })
        .then(function (res) {
          if (!res.ok) throw new Error("missing");
        })
        .catch(function () {
          e.preventDefault();
          showToast(t("toast.cvMissing"));
          setTimeout(function () {
            window.location.href =
              "mailto:abrahamgebreyohannes12@gmail.com?subject=" +
              encodeURIComponent("Resume / CV Request from Portfolio") +
              "&body=" +
              encodeURIComponent(
                "Hi Abraham,\n\nI visited your portfolio and would like to receive your CV/resume.\n\nThank you."
              );
          }, 400);
        });
    });
  }

  /* Typing effect for hero role */
  function initTyping() {
    const roleEl = document.querySelector(".hero-role-text");
    if (!roleEl) return;

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function getRoles() {
      const roles = t("hero.roles");
      return Array.isArray(roles) ? roles : ["Full-Stack Web Developer"];
    }

    function typeRole() {
      const roles = getRoles();
      const current = roles[roleIndex] || roles[0];
      if (!deleting) {
        roleEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
          deleting = true;
          typingTimer = setTimeout(typeRole, 2200);
          return;
        }
      } else {
        roleEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      typingTimer = setTimeout(typeRole, deleting ? 40 : 80);
    }

    function start() {
      if (typingTimer) clearTimeout(typingTimer);
      roleIndex = 0;
      charIndex = 0;
      deleting = false;
      if (!reducedMotion) {
        typeRole();
      } else {
        roleEl.textContent = getRoles()[0];
      }
    }

    start();
    document.addEventListener("languageChanged", start);
  }

  /* Profile image fallback */
  const profileImg = document.querySelector(".profile-photo");
  if (profileImg) {
    profileImg.addEventListener("error", function () {
      const wrap = profileImg.closest(".profile-wrap");
      if (!wrap) return;
      profileImg.remove();
      const fallback = document.createElement("div");
      fallback.className = "profile-fallback";
      fallback.setAttribute("aria-hidden", "true");
      fallback.textContent = "AG";
      wrap.appendChild(fallback);
    });
  }

  /* Video modal */
  window.openVideo = function (src) {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("demoVideo");
    if (!modal || !video) return;

    if (src) {
      video.querySelector("source").src = src;
      video.load();
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    video.play();
  };

  window.closeVideo = function () {
    const modal = document.getElementById("videoModal");
    const video = document.getElementById("demoVideo");
    if (!modal || !video) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    video.pause();
    video.currentTime = 0;
  };

  const videoModal = document.getElementById("videoModal");
  if (videoModal) {
    videoModal.addEventListener("click", function (e) {
      if (e.target === videoModal) closeVideo();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeVideo();
  });

  /* Init */
  initLanguage();
  initTheme();
  initPreloader();
  initParticles();
  initSkillBars();
  initProjectFilters();
  initCopyEmail();
  initChat();
  initCvButton();
  initTyping();

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
