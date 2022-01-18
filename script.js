let navbar = document.querySelector("nav");
let navbarOffset = navbar.offsetTop;


function stickyNavbar() {
    if (window.scrollY >= navbarOffset) {
        navbar.classList.add("nav-sticky")
    } else {
        navbar.classList.remove("nav-sticky");
    }
}

function parallaxSection1() {
    const bg1_0 = document.querySelector("#bg1_0")
    const bg1_1 = document.querySelector("#bg1_1")
    const bg1_2 = document.querySelector("#bg1_2")
    const bg1_3 = document.querySelector("#bg1_3")

    window.addEventListener("scroll", () => {
        let value = window.scrollY
        bg1_0.style.top = value * 0.1 + "px"
        bg1_1.style.top = value * 0.5 + "px"
        bg1_2.style.top = value * 0.9 + "px"
        bg1_3.style.top = value * 0.6 + "px"
    })
}

function parallaxSection2() {
    const bg2_1 = document.querySelector("#bg2_1")
    let positionFromTop = document.querySelector("#section2").offsetTop

    window.addEventListener("scroll", () => {
        let value = window.scrollY - positionFromTop
        bg2_1.style.top = -value * 0.6 + "px"
        bg2_1.style.left = -value * 0.6 + "px"
    })
}

function parallaxSection3() {
    const bg3_1 = document.querySelector("#bg3_1")
    const bg3_2 = document.querySelector("#bg3_2")

    let positionFromTop = document.querySelector("#section3").offsetTop
    let startPos = positionFromTop - navbar.offsetHeight

    window.addEventListener("scroll", () => {
        let value = window.scrollY - positionFromTop
        if (window.scrollY > startPos)
            bg3_1.style.top = value * 0.6 + "px"
        bg3_2.style.top = value * 0.8 + "px"
        bg3_2.style.left = -value * 0.6 + "px"
    })
}

function parallaxSection4() {
    const bg4_1 = document.querySelector("#bg4_1")
    const bg4_2 = document.querySelector("#bg4_2")

    let positionFromTop = document.querySelector("#section4").offsetTop

    window.addEventListener("scroll", () => {
        let value = window.scrollY - positionFromTop
        bg4_1.style.top = -value * 0.1 + "px"
        bg4_1.style.left = -value * 0.6 + "px"
        bg4_2.style.top = value * 0.1 + "px"
        bg4_2.style.left = value * 0.6 + "px"
    })
}

const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === "section1") parallaxSection1();
            if (entry.target.id === "section2") parallaxSection2();
            if (entry.target.id === "section3") parallaxSection3();
            if (entry.target.id === "section4") parallaxSection4();
        }
    });
});

parallaxObserver.observe(document.querySelector("#section1"))
parallaxObserver.observe(document.querySelector("#section2"))
parallaxObserver.observe(document.querySelector("#section3"))
parallaxObserver.observe(document.querySelector("#section4"))


window.onscroll = function() {stickyNavbar()};