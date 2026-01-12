$(document).ready(function() {
    $('#mobile-btn').on('click', function () {
        $('#mobile-menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars');
        $(this).find('i').toggleClass('fa-xmark');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function() {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if(scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        sections.each(function (i) {
            const section = $(this);
            const sectionTop =section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition <sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left', 
        duration: 2000,
        distance:'2%',
    });

     ScrollReveal().reveal('#menu', {
        origin: 'left', 
        duration: 2000,
        distance:'15%',
    });

     ScrollReveal().reveal('.birth', {
        origin: 'left', 
        duration: 1000,
        distance:'2%',
    });
});


const openButtons = document.querySelectorAll('#open-modal');

openButtons.forEach( button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        modal.showModal();
    });
});

const closeButton = document.querySelectorAll('#close-modal');

closeButton.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);

        modal.close();
    });
});
