document.addEventListener("DOMContentLoaded", () => {
 
  const navbar = document.getElementById("navbar")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }
  })
 
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
 
  const icon = document.getElementById("icon")
  const orbit = document.getElementById("icon-orbit")
  const ripple = document.getElementById("ripple")
  const container = document.getElementById("icon-container")
  const touchGlow = document.getElementById("touch-glow")
  const safariBlur = document.getElementById("safariblur")
  const glow = document.getElementById("glow")
 
  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -25
    const rotateY = ((x - centerX) / centerX) * 25
    orbit.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`

    glow.style.opacity = "0.8"
    glow.style.transform = "translate(-50%, -50%) scale(1.08)"
    clearTimeout(glow._resetTimeout)
    glow._resetTimeout = setTimeout(() => {
      glow.style.opacity = ""
      glow.style.transform = "translate(-50%, -50%)"
    }, 300)
  })

  container.addEventListener("mouseleave", () => {
    orbit.style.transform = "rotateX(0deg) rotateY(0deg)"
    glow.style.opacity = ""
    glow.style.transform = "translate(-50%, -50%)"
  })
 
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (event) => {
      const beta = event.beta || 0
      const gamma = event.gamma || 0
      const rotateX = Math.max(-0, Math.min(0, beta - 45))
      const rotateY = Math.max(-0, Math.min(0, gamma))
      orbit.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`
    })
  }
 
  let angle = 0
  function animateFloat() {
    angle += 0.015
    const x = Math.sin(angle * 0.9) * 5
    const y = Math.cos(angle * 0.6) * 3
    container.style.left = `calc(50% + ${x}px)`
    container.style.bottom = `calc(80px + ${y}px)`
    requestAnimationFrame(animateFloat)
  }

  animateFloat()
 
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  if (isSafari) {
    safariBlur.style.display = "block"
  }
 
  container.addEventListener("click", () => {
    const nextSection = document.querySelector("#why-matters")
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
 
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Message submitted successfully!")
    })
  }
 
  const fadeInOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  }, fadeInOptions)
 
  const elementsToAnimate = document.querySelectorAll(
    ".section-content, .application-item, .why-matters-content, .compatibility-content, .ventures-content, .contact-content",
  )
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    fadeInObserver.observe(el)
  })
 
  const buttons = document.querySelectorAll(".see-all-btn, .ventures-btn, .submit-btn")
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
 
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })
 
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device")
  }
})


 
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
  });
 
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    });
  });
 
  document.addEventListener('click', (e) => {
    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });
}