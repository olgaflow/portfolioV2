/* ===========================
   script.js — VERSION FINALE
   =========================== */

// ----------------------------------------------------
// 1. FONCTION MENU BURGER
// ----------------------------------------------------

function toggleMenu() {
    const menu = document.getElementById('site-menu');
    const toggle = document.querySelector('.menu-toggle');
    
    // Vérifie l'état actuel (true ou false)
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true' || false;
    
    // Change l'attribut ARIA
    toggle.setAttribute('aria-expanded', !isExpanded);
    
    // Ajoute/retire la classe CSS pour afficher/cacher le menu
    menu.classList.toggle('nav-links-open'); 
}

// Rendre la fonction accessible globalement depuis le HTML
window.toggleMenu = toggleMenu; 

// ----------------------------------------------------
// 2. GESTION DES COOKIES (Ton code, conservé et isolé)
// ----------------------------------------------------

(() => {
    const CONSENT_KEY = "cookie-consent";
    const BANNER_ID = "cookie-banner";
  
    const $ = (sel) => document.querySelector(sel);
  
    let cookieBanner;
  
    // Lecture / écriture du consentement
    function readConsent() {
      const v = localStorage.getItem(CONSENT_KEY);
      if (v === "accepted" || v === "rejected") return v;
      return null;
    }
  
    function saveConsent(accepted) {
      localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "rejected");
    }
  
    // Affichage / masquage
    function showCookieBanner() {
      if (!cookieBanner) cookieBanner = $("#" + BANNER_ID);
      if (cookieBanner) cookieBanner.style.display = "block";
    }
  
    function hideCookieBanner() {
      if (cookieBanner) cookieBanner.style.display = "none";
    }
  
    // Réaction au choix utilisateur
    function setConsent(isAccepted) {
      const accepted =
        isAccepted === true || String(isAccepted).toLowerCase() === "true";
      saveConsent(accepted);
      hideCookieBanner();
      handleConsentSideEffects(accepted);
    }
  
    // Effets secondaires
    function handleConsentSideEffects(accepted) {
      if (accepted) {
        console.log("Cookies ACCEPTED");
        // Place ici ton code Google Analytics ou autres scripts tiers
      } else {
        console.log("Cookies REJECTED");
      }
    }
  
    // Expose les fonctions au HTML inline
    window.setConsent = setConsent;
    window.showCookieBanner = showCookieBanner;
  
    // Initialisation au chargement
    document.addEventListener("DOMContentLoaded", () => {
      cookieBanner = $("#" + BANNER_ID);
      const consent = readConsent();
  
      if (consent === null) {
        showCookieBanner();
      } else {
        hideCookieBanner();
        handleConsentSideEffects(consent === "accepted");
      }
  
      const manageLink = $("#manage-cookies-link");
      if (manageLink) {
        manageLink.addEventListener("click", (e) => {
          e.preventDefault();
          showCookieBanner();
        });
      }
    });
  
    // ----------------------------------------------------
    // 3. BOUTON RETOUR EN HAUT (Scroll To Top)
    // ----------------------------------------------------

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Affiche/cache le bouton au défilement
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            scrollToTopBtn.hidden = false;
        } else {
            scrollToTopBtn.hidden = true;
        }
    };

    // Fonction de défilement vers le haut
    scrollToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

})();