document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. SCROLL ANIMATIONS
     ========================================= */
  const scrollElements = document.querySelectorAll(".section-scroll");

  const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset);
  };

  const displayScrollElement = (el) => {
    el.classList.add("scrolled-in");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 50)) {
        displayScrollElement(el);
      }
    });
  };

  /* =========================================
     2. NAVBAR LOGIC
     ========================================= */
  const navbar = document.querySelector(".navbar");
  const handleNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  /* Initial calls & listeners */
  window.addEventListener("scroll", () => {
    handleScrollAnimation();
    handleNavbar();
  });
  handleScrollAnimation();
  handleNavbar();

  /* =========================================
     3. MOBILE MENU
     ========================================= */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
      });
    });
  }

  /* =========================================
     4. FLIPCARD COMPONENT
     ========================================= */
  const flipCardsData = [
    {
      title: "Explainer Masterclass",
      desc: "Discover the core orchestration of design variants.",
      link: "https://easyvariants.com/explainer_variants.html",
      embed: "https://easyvariants.com/explainer_variants.html",
      icon: "play_circle"
    },
    {
      title: "Apparel Suite: Caps",
      desc: "Instant colorway generation for headwear collections.",
      link: "https://easyvariants.com/cap_variants.html",
      embed: "https://easyvariants.com/cap_variants.html",
      icon: "checkroom"
    },
    {
      title: "Apparel Suite: Sweatshirts",
      desc: "Multi-layer automation for hoodies and leisurewear.",
      link: "https://easyvariants.com/sweatshirt_variants.html",
      embed: "https://easyvariants.com/sweatshirt_variants.html",
      icon: "styler"
    },
    {
      title: "Footwear Variants: Shoes",
      desc: "Dynamic texture and color remapping for footwear.",
      link: "https://easyvariants.com/shoe_variants.html",
      embed: "https://easyvariants.com/shoe_variants.html",
      icon: "steps"
    },
    {
      title: "Color Science: Gradients",
      desc: "Automating complex brand color transitions.",
      link: "https://easyvariants.com/color_transition_generator.html",
      embed: "https://easyvariants.com/color_transition_generator.html",
      icon: "palette"
    }
  ];

  const demoSlideshow = document.getElementById("demo-slideshow");
  const demoIndicators = document.getElementById("slide-indicators");
  const demoPrev = document.getElementById("slide-prev");
  const demoNext = document.getElementById("slide-next");

  if (demoSlideshow) {
    let currentSlide = 0;
    
    // We don't reverse the array for slideshow, keep it original order.
    const slides = flipCardsData.map((data, index) => {
      const slide = document.createElement("div");
      slide.style.position = "absolute";
      slide.style.inset = "0";
      slide.style.transition = "opacity 0.8s ease-in-out";
      slide.style.cursor = "pointer";
      
      // Iframe wrapper and clean dark gradient overlay
      slide.innerHTML = `
        <iframe width="100%" height="100%" src="${data.embed}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            style="position: absolute; top: -75px; left: 0; width: 100%; height: calc(100% + 150px); z-index: 1; border: none; opacity: 1; pointer-events: none; transform: scale(1.02);">
        </iframe>
        
        <!-- Interactive Overlay to capture clicks to open full link without playing directly in small iframe if desired -->
        <div style="position: absolute; inset: 0; z-index: 5" onclick="window.open('${data.link}', '_blank')"></div>

        <!-- Sleek Watch Now Button overlay -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 8; pointer-events: none;">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(133,173,255,0.15); border: 1px solid rgba(133,173,255,0.4); display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); box-shadow: 0 0 30px rgba(133,173,255,0.2);">
                <span class="material-symbols-outlined" style="color: white; font-size: 40px; margin-left: 4px;">play_arrow</span>
            </div>
        </div>

        <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 40px 60px; background: linear-gradient(to top, rgba(10,15,28,0.95) 0%, rgba(10,15,28,0.7) 40%, transparent 100%); z-index: 10; pointer-events: none;">
          <div style="display: inline-flex; align-items: center; gap: 8px; margin-bottom: 12px; background: rgba(133,173,255,0.15); border: 1px solid rgba(133,173,255,0.3); padding: 4px 12px; border-radius: 50px; color: #85adff; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
            <span class="material-symbols-outlined" style="font-size: 14px;">${data.icon}</span> ${data.title}
          </div>
          <p style="color: rgba(255,255,255,0.85); font-size: 18px; line-height: 1.6; font-weight: 300; max-width: 600px; margin: 0;">${data.desc}</p>
        </div>
      `;
      demoSlideshow.appendChild(slide);

      // Indicator dot
      if (demoIndicators) {
        const dot = document.createElement("button");
        dot.style.width = "10px";
        dot.style.height = "10px";
        dot.style.borderRadius = "50%";
        dot.style.border = "none";
        dot.style.cursor = "pointer";
        dot.style.transition = "all 0.3s";
        dot.addEventListener("click", () => goToSlide(index));
        demoIndicators.appendChild(dot);
      }

      return slide;
    });

    const updateSlides = () => {
      slides.forEach((slide, idx) => {
        const isActive = idx === currentSlide;
        slide.style.opacity = isActive ? "1" : "0";
        slide.style.pointerEvents = isActive ? "auto" : "none";
        slide.style.zIndex = isActive ? "20" : "1";
        
        // update dots
        if(demoIndicators && demoIndicators.children[idx]) {
          const dot = demoIndicators.children[idx];
          if (isActive) {
            dot.style.background = "#85adff";
            dot.style.transform = "scale(1.4)";
            dot.style.boxShadow = "0 0 10px rgba(133,173,255,0.8)";
          } else {
            dot.style.background = "rgba(255,255,255,0.2)";
            dot.style.transform = "scale(1)";
            dot.style.boxShadow = "none";
          }
        }
      });
    };

    const goToSlide = (index) => {
      currentSlide = index;
      updateSlides();
    };

    if (demoPrev) {
      demoPrev.addEventListener("click", () => {
        currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
        updateSlides();
      });
    }

    if (demoNext) {
      demoNext.addEventListener("click", () => {
        currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
        updateSlides();
      });
    }

    // Auto Advance Feature
    let slideInterval = setInterval(() => {
        if (document.visibilityState === 'visible') {
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            updateSlides();
        }
    }, 5000);

    // Pause on hover
    demoSlideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
    demoSlideshow.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
            updateSlides();
        }, 5000);
    });

    // Initialize first slide perfectly smoothly
    setTimeout(() => {
        updateSlides();
    }, 100);
  }

  /* =========================================
     5. CONTACT FORM HANDLER
     ========================================= */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('.submit-btn');
      const sMsg = contactForm.querySelector('.success-msg');
      const eMsg = contactForm.querySelector('.error-msg');

      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = 0.7;
      sMsg.style.display = 'none';
      eMsg.style.display = 'none';

      // Simulate API Call
      setTimeout(() => {
        submitBtn.textContent = 'Send Message';
        submitBtn.style.opacity = 1;
        // Assuming success
        sMsg.style.display = 'block';
        contactForm.reset();

        setTimeout(() => {
          sMsg.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

  /* =========================================
     6. HOW IT WORKS TIMELINE V2
     ========================================= */
  const tlSteps = document.querySelectorAll(".tl-step");
  const vidScreens = document.querySelectorAll(".vid-screen");
  const vidDots = document.querySelectorAll(".vid-dot");
  const tlProgress = document.querySelector(".timeline-progress");

  const activateStep = (stepIndex) => { // 1-indexed
    // Remove active from all steps first 
    tlSteps.forEach((st) => st.classList.remove("active"));

    // Add active to current step and previous steps (or just current depending on preference)
    // The prompt says "Each circle glows when active". Let's glow only the active one,
    // but advance the line up to the active one.
    tlSteps.forEach((st) => {
      if (parseInt(st.dataset.step) === stepIndex) {
        st.classList.add("active");
      }
    });

    vidDots.forEach(d => d.classList.remove("active"));
    const activeDot = document.querySelector(`.vid-dot[data-target="${stepIndex}"]`);
    if (activeDot) activeDot.classList.add("active");

    vidScreens.forEach(vs => {
      vs.style.opacity = "0";
      vs.style.zIndex = "1";
    });
    const activeScreen = document.getElementById(`vid-${stepIndex}`);
    if (activeScreen) {
      activeScreen.style.opacity = "1";
      activeScreen.style.zIndex = "2";
    }

    // Progress bar height (0% -> 50% -> 100%)
    if (tlProgress) {
      let height = 0;
      if (stepIndex === 1) height = 0;
      if (stepIndex === 2) height = 50;
      if (stepIndex === 3) height = 100;
      tlProgress.style.height = `${height}%`;
    }
  };

  if (tlSteps.length > 0) {
    tlSteps.forEach(st => {
      st.addEventListener("mouseenter", () => {
        const idx = parseInt(st.dataset.step);
        activateStep(idx);
      });
      st.addEventListener("click", () => {
        const idx = parseInt(st.dataset.step);
        activateStep(idx);
      });
    });

    vidDots.forEach(dot => {
      dot.addEventListener("click", () => {
        const target = parseInt(dot.dataset.target);
        activateStep(target);
      });
    });
  }

  /* =========================================
     6. MEET SECTION DRAGGABLE CAROUSEL
     ========================================= */
  /* =========================================
     6. MEET SECTION CAROUSEL (IMAGE STYLE)
     ========================================= */
  const meetMainVid = document.getElementById('meet-main-vid');
  const meetDots = document.querySelectorAll('.m-dot');
  const meetBadge = document.getElementById('meet-badge');
  const meetPPBtn = document.getElementById('meet-pause-play');
  const ppIcon = document.getElementById('pp-icon');

  if (meetMainVid && meetDots.length > 0) {
    const meetData = [
      { src: 'sweatshirt_v.mp4', badge: 'Sweatshirt Patterns' },
      { src: 'cap_v.mp4', badge: 'Cap Variations' },
      { src: 'color_v.mp4', badge: 'Color Transition Generator' }
    ];
    let currentIdx = 0;
    let isPaused = false;

    const setMeetSlide = (idx) => {
      meetMainVid.style.opacity = '0';
      setTimeout(() => {
        meetMainVid.src = meetData[idx].src;
        meetBadge.textContent = meetData[idx].badge;

        meetMainVid.play();
        meetMainVid.style.opacity = '1';

        meetDots.forEach(d => d.classList.remove('active'));
        meetDots[idx].classList.add('active');
        currentIdx = idx;

        // Reset pause icon if it was changed
        ppIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
        isPaused = false;
      }, 300);
    };

    meetDots.forEach((dot, i) => {
      dot.addEventListener('click', () => setMeetSlide(i));
    });

    if (meetPPBtn) {
      meetPPBtn.addEventListener('click', () => {
        if (meetMainVid.paused) {
          meetMainVid.play();
          ppIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
          isPaused = false;
        } else {
          meetMainVid.pause();
          ppIcon.innerHTML = `<path d="M8 5v14l11-7z"></path>`;
          isPaused = true;
        }
      });
    }

    // Auto cycle
    setInterval(() => {
      if (!isPaused) {
        let next = (currentIdx + 1) % meetData.length;
        setMeetSlide(next);
      }
    }, 6000);
  }

});
