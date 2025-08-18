const NAV_OFFSET = 110;

let isGoTopHidden = true;
let recentNavActiveChange = false;

function amiateNavDotToTarget(targetId) {
    const navItem = document.getElementById(targetId);
    if (navItem === null) {
        console.debug('Nav item target id is not valid')
        return;
    }
    const navDot = document.getElementById("nav-dot");
    const navItemOffsetLeft = navItem.offsetLeft;
    const navItemWidth = navItem.offsetWidth;

    const newDotOffsetLeft = navItemOffsetLeft + navItemWidth / 2;
    anime.timeline()
        .add({
            targets: navDot,
            width: 20,
            height: 2,
            borderRadius: "8px",
            left: newDotOffsetLeft,
            duration: 300,
            backgroundColor: '#eee',
            easing: "easeInOutQuad"
        })
        .add({
            targets: navDot,
            width: 5,
            height: 5,
            borderRadius: "50%",
            duration: 150,
            easing: "easeInOutQuad"
        });

}

window.addEventListener("DOMContentLoaded", function () {

    document.querySelector("#nav-projects").addEventListener("click", function (e) {
        const element = document.getElementById('projects');
        const offsetTop = element.offsetTop - NAV_OFFSET;
        smoothScroll(offsetTop);
        setActiveNavItem('nav-projects');
    })

    document.querySelector("#nav-about").addEventListener("click", function (e) {
        const element = document.getElementById('about');
        const offsetTop = element.offsetTop - NAV_OFFSET;
        smoothScroll(offsetTop);
        setActiveNavItem('nav-about');
    })

    document.querySelector("#nav-certificates").addEventListener("click", function (e) {
        const certificatesEl = document.getElementById('last-fullpage');
        const offsetTop = certificatesEl.offsetTop;
        smoothScroll(offsetTop);
        setActiveNavItem('nav-certificates');
    })

    document.querySelector("#nav-contact").addEventListener("click", function (e) {
        const element = document.getElementById('last-fullpage');
        const offsetTop = element.offsetTop;
        smoothScroll(offsetTop);
        setActiveNavItem('nav-certificates');
    })

    document.querySelector("#lets-talk-btn").addEventListener("click", function (e) {
        const element = document.getElementById('last-fullpage');
        const offsetTop = element.offsetTop;
        smoothScroll(offsetTop);
        setActiveNavItem('nav-certificates');
    })

    document.querySelector(".my-photo").addEventListener('mouseover', function (e) {
        e.target.classList.remove('blur')
        e.target.classList.remove('magnifying-glass')
    });

    document.querySelector(".my-photo").addEventListener('mouseout', function (e) {
        e.target.classList.add('blur');
        e.target.classList.add('magnifying-glass');
    });

    const polishLanguageButton = document.getElementById('polish-button');
    const englishLanguageButton = document.getElementById('english-button');

    const polishAboutMe = this.document.getElementById('about-me-polish');
    const englishAboutMe = this.document.getElementById('about-me-english');

    polishAboutMe.classList.remove('hidden');
    englishAboutMe.classList.add('hidden');

    polishLanguageButton.addEventListener('click', (e) => {
        e.preventDefault();
        polishAboutMe.classList.remove('hidden');
        englishAboutMe.classList.add('hidden');
    })

    englishLanguageButton.addEventListener('click', (e) => {
        e.preventDefault();
        polishAboutMe.classList.add('hidden');
        englishAboutMe.classList.remove('hidden');
    })

    navigationDotAnimation();
})

function navigationDotAnimation() {
    const navDot = document.getElementById("nav-dot");
    const activeLink = document.querySelector('.nav-link.active')

    if (activeLink) {
        const center = activeLink.offsetLeft + activeLink.offsetWidth / 2;
        navDot.style.left = `${center}px`;
    }

    let lastMouseOverTarget = activeLink;

    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--clr-primary-a0').trim();

    document.querySelectorAll(".nav-link").forEach(item => {

        item.addEventListener('mouseover', function (e) {
            const navItem = e.currentTarget;
            if (navItem !== lastMouseOverTarget) {
                const navItemOffsetLeft = navItem.offsetLeft;
                const navItemWidth = navItem.offsetWidth;

                const newDotOffsetLeft = navItemOffsetLeft + navItemWidth / 2;
                anime.timeline()
                    .add({
                        targets: navDot,
                        width: 20,
                        height: 2,
                        borderRadius: "8px",
                        left: newDotOffsetLeft,
                        duration: 300,
                        backgroundColor: '#eee',
                        easing: "easeInOutQuad"
                    })
                    .add({
                        targets: navDot,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        backgroundColor: "#24f159",
                        duration: 150,
                        easing: "easeInOutQuad"
                    });
            }
            lastMouseOverTarget = navItem;
        });

        item.addEventListener('mouseout', function (e) {
            const navItem = e.currentTarget;
            const activeLink = document.querySelector(".nav-link.active");
            const offsetLeft = activeLink.offsetLeft + activeLink.offsetWidth / 2;

            if (navItem !== lastMouseOverTarget) {
                anime({
                    targets: navDot,
                    backgroundColor: primaryColor,
                })

                anime.timeline()
                    .add({
                        targets: navDot,
                        width: 40,
                        borderRadius: "8px",
                        left: offsetLeft,
                        duration: 300,
                        easing: "easeInOutQuad"
                    })
                    .add({
                        targets: navDot,
                        width: 5,
                        borderRadius: "50%",
                        duration: 150,
                        backgroundColor: "#24f159",
                        easing: "easeInOutQuad",
                    });
                lastMouseOverTarget = navItem;
            }
        });
    })
}

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
            "type": "polygon",
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
            "value": 6,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
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
                "mode": "repulse"
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
                "distance": 70,
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
                return
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


document.querySelector(".gotop-btn").addEventListener('click', function (e) {
    smoothScroll(0).then(() => {
        hideGoTopBtn();
    });
});

document.querySelector(".header .title").addEventListener('click', function (e) {
    smoothScroll(0);
})

const mailIcon = document.querySelector("#mail-icon");
mailIcon.addEventListener("click", function (e) {
    e.preventDefault();
    mailIcon.classList.add("fly-out-right-anim");
    setTimeout(() => {
        mailIcon.classList.remove("fly-out-right-anim")
    }, 400);
})

let position = window.scrollY
let lastScrollPostition = position;
let changeDirectionPosition = lastScrollPostition;
let direction = 0
let changesCount = 0;
let isHidden = false;

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
                hideNav();
            }
        } else {
            // show the nav
            if (isHidden) {
                showNav();
            }
        }
    }

    let viewportHeight = window.innerHeight;
    if ((position + viewportHeight) / totalHeight > 0.8) {
        if (isGoTopHidden) {
            showGoTopBtn();
        }
    }

    if ((position + viewportHeight) / totalHeight < 0.2) {
        if (!isGoTopHidden) {
            hideGoTopBtn();
        }
    }

    const activeNavItem = document.querySelector('.nav-link.active');

    const aboutTitle = document.getElementById("about")
    const aboutOffset = aboutTitle.offsetTop;
    const aboutNavItem = document.querySelector('#nav-about');

    const projectsTitle = document.getElementById("projects")
    const projectsOffset = projectsTitle.offsetTop;
    const projectsNavItem = document.querySelector('#nav-projects');

    const certTitle = document.getElementById("last-fullpage")
    const certOffset = certTitle.offsetTop;
    const certificatesNavItem = document.querySelector('#nav-certificates');

    if (position > aboutOffset && position < projectsOffset && activeNavItem !== aboutNavItem) {
        setActiveNavItem('nav-about')
        amiateNavDotToTarget('nav-about')
    }

    if (position > projectsOffset && position < certOffset && activeNavItem !== projectsNavItem) {
        setActiveNavItem('nav-projects')
        amiateNavDotToTarget('nav-projects')
    }

    if (position > certOffset && activeNavItem !== certificatesNavItem) {
        setActiveNavItem('nav-certificates')
        amiateNavDotToTarget('nav-certificates')
    }

    lastScrollPostition = position;
})

function recentNavActiveTimeout(timeout, activeChangeFlag) {
    if (timeout == undefined) {
        timeout = 800;
    }

    setTimeout(() => {
        activeChangeFlag = false;
    }, timeout);
}

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
    isGoTopHidden = true;
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
    isGoTopHidden = false;
}

function showNav() {
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
        duration: 800,
        ease: 'inOut'
    });

    isHidden = false;
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

    // anime({
    //     targets: '.header nav',
    //     opacity: 0,
    //     duration: 200,
    //     easing: 'easeInOutQuad'
    // });

    // anime({
    //     targets: 'header.header',
    //     backgroundColor: 'transparent',
    //     duration: 500,
    //     easing: 'easeInOutQuad'
    // })

    isHidden = true;
}

document.querySelector(".header").addEventListener('mouseover', function (e) {
    if (isHidden) {
        showNav();
    }
});

document.querySelector(".header").addEventListener('mouseout', function (e) {
    let position = window.scrollY;
    let totalHeight = document.body.scrollHeight;

    if (position > totalHeight * 0.03 && !isHidden) {
        hideNav();
    }
});

function setActiveNavItem(navItemId) {
    if (document.getElementById(navItemId).classList.contains('active')) {
        return;
    }
    const navItems = document.querySelectorAll(".nav-link");
    navItems.forEach(item => {
        item.classList.remove('active');
    })
    document.getElementById(navItemId).classList.add('active')
    // amiateNavDotToTarget(navItemId);
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

function typingLoop(targetElementId, textContent) {

    const TYPING_INTERVAL_MS = 60;
    const PAUSE_AFTER_ADD_MS = 200;
    const INITIAL_ADD_LINE_DELAY_MS = 1500;

    const elem = document.getElementById(targetElementId);
    if (!elem) {
        console.error('Target element id is not valid')
        return;
    }

    let output = textContent.mainText + " ";

    function renderText(text) {
        elem.innerHTML = text;
    }

    async function delay(timeInMilliseconds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => { resolve(); }, timeInMilliseconds);
        });
    }

    async function addLine(line) {
        // This function should handle typing out a single line
        let charIndex = 0;
        const charArray = line.split("");

        await new Promise(resolve => {
            const interval = setInterval(() => {
                if (charIndex < charArray.length) {
                    output += charArray[charIndex];
                    renderText(output);
                    charIndex++;
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, TYPING_INTERVAL_MS);
        });
    }

    async function removeLine(initialOutputLength) {
        // This function removes characters until the output matches the initial length
        await new Promise(resolve => {
            const interval = setInterval(() => {
                if (output.length > initialOutputLength) {
                    output = output.slice(0, -1);
                    renderText(output);
                } else {
                    clearInterval(interval);
                    resolve();
                }
            }, TYPING_INTERVAL_MS / 2);
        });
    }


    async function main() {
        // Store the initial length of the main text + space for easy removal later
        const initialOutputLength = output.length;
        renderText(output);

        for (let i = 0; i < textContent.textToWrite.length; i++) {
            const line = textContent.textToWrite[i];

            // 1. Wait before typing a new line
            await delay(INITIAL_ADD_LINE_DELAY_MS);

            // 2. Add the line character by character
            await addLine(line);

            // 3. Pause after the line is fully typed
            await delay(PAUSE_AFTER_ADD_MS);

            // 4. Remove the line character by character (back to initial main text length)
            await removeLine(initialOutputLength);
        }

        main();
    }

    main();
}

function init() {
    // page initialisation
    createAnimatedCounter('projects-counter', 20);
    createAnimatedCounter('experience-counter', 5);
    createAnimatedCounter('cert-counter', 7);

    typingLoop("typing-automation", {
        mainText: "W <b class='color-primary'>phildekode</b> ",
        textToWrite: [
            "tworzymy aplikacje webowe",
            "naprawiamy komputery i laptopy",
            "tworzymy sklepy intenertowe",
            "składamy komputery od zera",
            "wykonujemy solidne sieci LAN"
        ]
    });

    setActiveNavItem('nav-about');
    hideGoTopBtn();
    document.querySelector(".footer-year-span").textContent = new Date().getFullYear();
}

init();