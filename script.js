/* ===========================
   script.js — VERSION CORRIGÉE
   =========================== */

// ----------------------------------------------------
// 1. FONCTION MENU BURGER (Aucun changement)
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

// Rendre la fonction accessible globalement depuis le HTML (déjà fait)
window.toggleMenu = toggleMenu; 

// ----------------------------------------------------
// 2. GESTION DES COOKIES (LOGIQUE)
// ----------------------------------------------------

const CONSENT_KEY = "cookie-consent";
const BANNER_ID = "cookie-banner";

// Sélecteur simplifié
const $ = (sel) => document.querySelector(sel);

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
  const cookieBanner = $("#" + BANNER_ID);
  if (cookieBanner) cookieBanner.style.display = "flex"; // Utilise 'flex' pour le style CSS
}

function hideCookieBanner() {
  const cookieBanner = $("#" + BANNER_ID);
  if (cookieBanner) cookieBanner.style.display = "none";
}

// Effets secondaires (Analytics, etc.)
function handleConsentSideEffects(accepted) {
  if (accepted) {
      console.log("Cookies ACCEPTED");
      // Place ici ton code Google Analytics ou autres scripts tiers
  } else {
      console.log("Cookies REJECTED");
  }
}

// Réaction au choix utilisateur (fonction rendue globale pour le onclick=)
function setConsent(isAccepted) {
  const accepted =
      isAccepted === true || String(isAccepted).toLowerCase() === "true";
  
  saveConsent(accepted);
  hideCookieBanner();
  handleConsentSideEffects(accepted);
}

// Expose la fonction au HTML inline pour le bouton Accepter/Refuser
window.setConsent = setConsent;
window.showCookieBanner = showCookieBanner; // Optionnel, mais reste utile pour le débogage

// ----------------------------------------------------
// 3. INITIALISATION ET ÉVÉNEMENTS (Unifié dans DOMContentLoaded)
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  
  // --- Initialisation Cookies ---
  const consent = readConsent();
  if (consent === null) {
      showCookieBanner();
  } else {
      hideCookieBanner();
      handleConsentSideEffects(consent === "accepted");
  }

  // Gestion du lien "Gérer les cookies" dans le footer
  const manageLink = $("#manage-cookies-link");
  if (manageLink) {
      manageLink.addEventListener("click", (e) => {
          e.preventDefault();
          // Supprime le consentement existant pour le réafficher si tu veux forcer
          localStorage.removeItem(CONSENT_KEY); 
          showCookieBanner();
      });
  }

  // --- BOUTON RETOUR EN HAUT (Scroll To Top) ---
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  if (scrollToTopBtn) {
      // Affiche/cache le bouton au défilement
      window.onscroll = function() {
          if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
              // Utilisation de classList pour plus de flexibilité CSS
              scrollToTopBtn.classList.remove('hidden'); 
          } else {
              scrollToTopBtn.classList.add('hidden');
          }
      };

      // Fonction de défilement vers le haut
      scrollToTopBtn.onclick = function() {
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      };
  }
});