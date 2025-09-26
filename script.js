document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('.skills');
    skills.forEach(skill => {
        const width = skill.getAttribute('data-skill');
        skill.style.width = width + '%';
    });

    const scrollBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.querySelector('form').addEventListener('submit', function(e) {
        const email = document.getElementById('email').value;
        if (!email.includes('@') || !email.includes('.')) {
            e.preventDefault();
            alert('Email invalide ! Ajoutez @ et un domaine (ex. .com)');
        }
    });
});