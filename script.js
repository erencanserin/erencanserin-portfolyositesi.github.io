document.addEventListener('DOMContentLoaded', () => {
    // 1. "Yukarı Kaydır" Butonu İşlevselliği
    const createScrollToTopButton = () => {
        let scrollButton = document.getElementById('scrollToTopBtn');

        if (!scrollButton) { // Buton henüz yoksa oluştur
            scrollButton = document.createElement('button');
            scrollButton.id = 'scrollToTopBtn';
            scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>'; // Font Awesome ikonu
            document.body.appendChild(scrollButton);

            scrollButton.style.cssText = `
                display: none; /* Varsayılan olarak gizli */
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #00bcd4;
                color: white;
                border: none;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                font-size: 1.5em;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.3s, background-color 0.3s;
                z-index: 1000;
            `;

            scrollButton.addEventListener('mouseover', () => {
                scrollButton.style.backgroundColor = '#0097a7';
            });

            scrollButton.addEventListener('mouseout', () => {
                scrollButton.style.backgroundColor = '#00bcd4';
            });

            scrollButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // Yumuşak kaydırma
                });
            });
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // 300px aşağı kaydırınca göster
                scrollButton.style.display = 'block';
                scrollButton.style.opacity = '1';
            } else {
                scrollButton.style.opacity = '0';
                setTimeout(() => { // Gizlerken yumuşak geçiş için gecikme
                    if (scrollButton.style.opacity === '0') {
                        scrollButton.style.display = 'none';
                    }
                }, 300);
            }
        });
    };

    createScrollToTopButton();

    // 2. Elementleri Görünür Olduğunda Belirme Animasyonu (Fade-in)
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');

        const observerOptions = {
            root: null, // viewport'u kök olarak kullan
            rootMargin: '0px',
            threshold: 0.2 // Elementin %20'si görünür olduğunda tetikle
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Element görünür olduğunda 'fade-in' sınıfını ekle
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Animasyon bir kez çalıştıktan sonra gözlemlemeyi bırak
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            section.classList.add('fade-in-on-scroll'); // Başlangıçta gizli tutacak sınıf
            observer.observe(section);
        });
    };

    animateOnScroll();
});