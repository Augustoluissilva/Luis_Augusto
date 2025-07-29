document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // NAVBAR EFFECTS
    // =============================================
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Efeito de scroll na navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // =============================================
    // MOBILE MENU TOGGLE
    // =============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Bloquear scroll quando o menu está aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // =============================================
    // SMOOTH SCROLLING
    // =============================================
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Atualizar link ativo
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll suave para a seção
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // ACTIVE LINK ON SCROLL
    // =============================================
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // =============================================
    // CONTACT FORM SUBMISSION (USING FORMSUBMIT)
    // =============================================
    const contactForm = document.querySelector('.contato-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Feedback visual
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            try {
                const formData = new FormData(this);
                
                // Envia para o FormSubmit
                const response = await fetch('https://formsubmit.co/ajax/luis.agsilva22@gmail.com', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    // Mensagem de sucesso
                    showAlert('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                    this.reset();
                } else {
                    throw new Error(result.message || 'Erro ao enviar mensagem');
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert('Ocorreu um erro ao enviar. Por favor, tente novamente ou me envie um e-mail diretamente.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // =============================================
    // SCROLL ANIMATIONS
    // =============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .projeto-card, .habilidade-card').forEach(element => {
        observer.observe(element);
    });

    // =============================================
    // HELPER FUNCTIONS
    // =============================================
    function showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 5000);
    }

    // =============================================
    // INITIAL SETUP
    // =============================================
    // Set initial active nav link
    navLinks[0].classList.add('active');

    // BOTÃO VOLTAR AO TOPO
    // =============================================
    const backToTopButton = document.getElementById('back-to-top');
    
    // Mostrar/ocultar botão conforme scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Animação e rolagem suave
    backToTopButton.addEventListener('click', function() {
        // Adiciona classe de animação
        this.classList.add('animate');
        
        // Rola para o topo suavemente
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Remove a classe de animação após 0.8s
        setTimeout(() => {
            this.classList.remove('animate');
        }, 800);
    });
});