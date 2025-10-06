// ===================================
// FONCTIONS GLOBALES
// (Appelées directement depuis le HTML via onclick)
// ===================================

/**
 * Affiche ou cache le menu de navigation mobile.
 * Cette fonction est appelée par : onclick="toggleMenu()"
 */
function toggleMenu() {
    const btn = document.querySelector('.menu-toggle');
    const menu = document.getElementById('site-menu');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  
    btn.setAttribute('aria-expanded', String(!isExpanded));
    menu.style.display = isExpanded ? 'none' : 'flex'; 
}

/**
 * Accepte les cookies, enregistre le choix et cache le bandeau.
 * Cette fonction est appelée par : onclick="acceptCookies()"
 */
function acceptCookies() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
        localStorage.setItem('cookies-accepted', 'yes');
        banner.hidden = true;
    }
}


// ==================================================
// CODE EXÉCUTÉ APRÈS LE CHARGEMENT COMPLET DE LA PAGE
// ==================================================

document.addEventListener('DOMContentLoaded', function() {

    /**
     * Logique d'affichage du bandeau de cookies.
     * S'exécute une seule fois au chargement pour vérifier si l'utilisateur a déjà accepté.
     */
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        if (localStorage.getItem('cookies-accepted') !== 'yes') {
            cookieBanner.hidden = false;
        }
    }

    /**
     * Logique du bouton "Retour en haut".
     */
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        // Affiche ou cache le bouton en fonction du défilement
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.hidden = false;
            } else {
                scrollToTopBtn.hidden = true;
            }
        });

        // Fait remonter la page en douceur au clic
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
