const NAV_OFFSET = 110;

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#nav-certificates").addEventListener("click", function (e) {
        const certificatesEl = document.getElementById('last-fullpage');
        const offsetTop = certificatesEl.offsetTop;
        smoothScroll(offsetTop);
        setActive('nav-certificates');
    })

    document.querySelector("#nav-projects").addEventListener("click", function (e) {
        const element = document.getElementById('projects-1');
        const offsetTop = element.offsetTop - NAV_OFFSET;
        smoothScroll(offsetTop);
        setActive('nav-projects');
    })

    document.querySelector("#nav-about").addEventListener("click", function (e) {
        const element = document.getElementById('about');
        const offsetTop = element.offsetTop - NAV_OFFSET;
        smoothScroll(offsetTop);
        setActive('nav-about');
    })

    document.querySelector("#nav-contact").addEventListener("click", function (e) {
        const element = document.getElementById('last-fullpage');
        const offsetTop = element.offsetTop;
        smoothScroll(offsetTop);
        setActive('nav-contact');
    })

    document.querySelector("#lets-talk-btn").addEventListener("click", function (e) {
        const element = document.getElementById('last-fullpage');
        const offsetTop = element.offsetTop;
        smoothScroll(offsetTop);
        setActive('nav-contact');
    })

    particlesJS("particles-container", {
        "particles": {
            "number": {
                "value": 180,
                // set 150 or greater when done
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                //"value": "#4aedf2"
                "value": "#d6ff79"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#ffffff"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.95,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 8,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // page initialisation
    createAnimatedCounter('born-counter', 1991);
    createAnimatedCounter('experience-counter', 5);
    createAnimatedCounter('cert-counter', 6);

    setActive('nav-about');
    hideGoTopBtn();
    document.querySelector(".footer-year-span").textContent = new Date().getFullYear();

    document.querySelector(".gotop-btn").addEventListener('click', function (e) {
        smoothScroll(0).then(() => {
            hideGoTopBtn();
        });
    });

    document.querySelector(".header .title").addEventListener('click', function (e) {
        smoothScroll(0);
    })

    const mailIcon = document.querySelector("#mail-icon");
    mailIcon.addEventListener("click", function(e) {
        e.preventDefault();
        mailIcon.classList.add("fly-out-right-anim");
        setTimeout(() => {
            mailIcon.classList.remove("fly-out-right-anim")
        }, 400);
    })

});

let position = window.scrollY
let lastScrollPostition = position;
let changeDirectionPosition = lastScrollPostition;
let direction = 0
let changesCount = 0;
let isHidden = false;

let isGoTopHidden = true;

let recentNavActiveChange = false;

window.addEventListener("scroll", function (e) {
    position = window.scrollY;
    totalHeight = document.body.scrollHeight;

    if (position <= totalHeight * 0.03) {
        showNav();
        isHidden = false;
    }

    if (position - lastScrollPostition < 0) {
        if (direction == 1) {
            changeDirectionPosition = position;
        }
        direction = -1; // scrolling up
    } else if (position - lastScrollPostition > 0) {
        if (direction == -1) {
            changeDirectionPosition = position;
        }
        direction = 1; // scrolling down
    }

    if (direction != 0 && Math.abs(position - changeDirectionPosition) > 220) {
        if (direction == 1) {
            // hide the nav
            if (!isHidden) {
                console.log('hide nav')
                hideNav();
                isHidden = true;
            }
        } else {
            // show the nav
            if (isHidden) {
                console.log('show nav')
                showNav();
                isHidden = false;
            }
        }
    }

    let viewportHeight = window.innerHeight;
    if ((position + viewportHeight) / totalHeight > 0.8) {
        if (isGoTopHidden) {
            showGoTopBtn();
            isGoTopHidden = false;
        }
    }

    if ((position + viewportHeight) / totalHeight < 0.2) {
        if (!isGoTopHidden) {
            hideGoTopBtn();
            isGoTopHidden = true;
        }
    }

    const projectsTitle = document.getElementById("projects")
    const projectsHeight = projectsTitle.offsetTop;
    if (position > projectsHeight) {
        if (!recentNavActiveChange) {
            setActive('nav-projects')
            recentNavActiveChange = true;
        }
    }

    const aboutTitle = document.getElementById("about")
    const aboutHeight = aboutTitle.offsetTop;
    if (position > aboutHeight) {
        if (!recentNavActiveChange) {
            setActive('nav-about')
            recentNavActiveChange = true;
        }
    }

    const certTitle = document.querySelector(".certificates")
    const certHeight = certTitle.offsetTop;
    if (position > certHeight) {
        if (!recentNavActiveChange) {
            setActive('nav-certificates')
            recentNavActiveChange = true;
        }
    }

    setInterval(function () {
        recentNavActiveChange = false;
    }, 200);

    lastScrollPostition = position;
})

function hideGoTopBtn() {
    const btn = document.querySelector(".gotop-btn");
    anime({
        targets: btn,
        opacity: 0,
        duration: 200,
        easing: 'easeInOutQuad',
        complete: function (anim) {
            isGoTopHidden = true;
        }
    })
}

function showGoTopBtn() {
    const btn = document.querySelector(".gotop-btn");
    anime({
        targets: btn,
        opacity: 1,
        duration: 200,
        easing: 'easeInOutQuad',
        complete: function (anim) {
            isGoTopHidden = false;
        }
    })
}

function showNav() {
    const navEl = document.querySelector('.header');

    let titleTargetFontSize = '1.2rem';
    if (document.width <= 650) {
        titleTargetFontSize = '1rem';
    }

    anime({
        targets: '.header .title',
        fontSize: titleTargetFontSize,
        duration: 500,
        easing: 'easeInOutQuad'
    });

    anime({
        targets: '.header nav',
        opacity: 1,
        transform: 'scale(1)',
        duration: 500,
        easing: 'easeInOutQuad'
    });

    anime({
        targets: 'header.header',
        duration: 500,
        easing: 'easeInOutQuad'
    })
}

showNav();

function hideNav() {
    const navEl = document.querySelector('.header');
    // navEl.classList.add('hidden');

    anime({
        targets: '.header .title',
        fontSize: '0.9rem',
        duration: 500,
        easing: 'easeInOutQuad'
    })



    anime({
        targets: '.header nav',
        opacity: 0,
        transform: 'scale(0.4)',
        duration: 500,
        easing: 'easeInOutQuad'
    });

    anime({
        targets: 'header.header',
        backgroundColor: 'transparent',
        duration: 500,
        easing: 'easeInOutQuad'
    })
}

document.querySelector(".header").addEventListener('mouseover', function (e) {
    showNav();
});

document.querySelector(".header").addEventListener('mouseout', function (e) {
    hideNav();
});

function setActive(navItemId) {
    document.querySelector(".nav-link.active").classList.remove("active");
    document.getElementById(navItemId).classList.add('active')
}

function smoothScroll(offsetTop) {
    return new Promise((resolve, reject) => {
        anime({
            targets: 'html',
            scrollTop: offsetTop,
            duration: 1000,
            easing: 'easeInOutQuad',
            complete: function (anim) {
                resolve();
            }
        });
    });
}

const ANIMATED_COUNTER_DURATION = 2500;

function createAnimatedCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);

    function animateCounter() {
        anime({
            targets: element,
            duration: ANIMATED_COUNTER_DURATION,
            easing: 'easeOutExpo',
            innerHTML: [1, targetValue],
            round: 1,
            complete: function (anim) {
                if (elementId == 'experience-counter') {
                    element.textContent = '5+';
                }
            }
        });
    }
    animateCounter();
}


function createAnimatedCounterReverse(elementId, startValue, targetValue) {
    const element = document.getElementById(elementId);

    function animateCounter() {
        anime({
            targets: element,
            duration: ANIMATED_COUNTER_DURATION,
            easing: 'easeOutExpo',
            innerHTML: [startValue, targetValue],
            round: 1,
            complete: function (anim) {
                if (elementId == 'experience-counter') {
                    element.textContent = '5+';
                }
            }
        });
    }
    animateCounter();
}