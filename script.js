/* ===========================
   script.js — VERSION 100% FONCTIONNELLE
   =========================== */

   (() => {
    const CONSENT_KEY = "cookie-consent";
    const BANNER_ID = "cookie-banner";
  
    const $ = (sel) => document.querySelector(sel);
  
    let cookieBanner;
  
    // --- Lecture / écriture du consentement ---
    function readConsent() {
      const v = localStorage.getItem(CONSENT_KEY);
      if (v === "accepted" || v === "rejected") return v;
      return null;
    }
  
    function saveConsent(accepted) {
      localStorage.setItem(CONSENT_KEY, accepted ? "accepted" : "rejected");
    }
  
    // --- Affichage / masquage ---
    function showCookieBanner() {
      if (!cookieBanner) cookieBanner = $("#" + BANNER_ID);
      if (cookieBanner) cookieBanner.style.display = "block";
    }
  
    function hideCookieBanner() {
      if (cookieBanner) cookieBanner.style.display = "none";
    }
  
    // --- Réaction au choix utilisateur ---
    function setConsent(isAccepted) {
      const accepted =
        isAccepted === true || String(isAccepted).toLowerCase() === "true";
      saveConsent(accepted);
      hideCookieBanner();
      handleConsentSideEffects(accepted);
    }
  
    // --- Effets secondaires ---
    function handleConsentSideEffects(accepted) {
      if (accepted) {
        console.log("Cookies ACCEPTED → scripts analytiques autorisés");
        // Ici tu pourras charger Google Analytics plus tard si tu veux
      } else {
        console.log("Cookies REJECTED → aucun script chargé");
      }
    }
  
    // --- Expose les fonctions au HTML inline ---
    window.setConsent = setConsent;
    window.showCookieBanner = showCookieBanner;
  
    // --- Initialisation au chargement ---
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
  
    // --- Petit bonus : reset pour tests ---
    window._resetCookies = () => {
      localStorage.removeItem(CONSENT_KEY);
      console.log("Consentement supprimé. Rechargez la page pour tester à nouveau.");
    };
  })();