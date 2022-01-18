let navbar = document.querySelector("nav");
let navbarOffset = navbar.offsetTop;
let sectionCount = 4

function stickyNavbar() {
    if (window.scrollY >= navbarOffset)
        navbar.classList.add("nav-sticky")
    else
        navbar.classList.remove("nav-sticky");
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
        if (window.scrollY > positionFromTop)
            bg3_1.style.top = value * 0.8 + "px"
        else
            bg3_1.style.top = "0px"
        bg3_2.style.top = value * 0.7 + "px"
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


let loadedSections = 1
const lazyLoadingObserver = new IntersectionObserver(((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && loadedSections < sectionCount) {
                let sectionId = loadedSections + 1
                loadedSections += 1

                console.log("Fetching section" + sectionId)
                fetch("sections/section" + sectionId + ".html").then(r => r.text()).then(htmlString => {
                    let html = new DOMParser().parseFromString(htmlString, "text/html")
                    let newSection = html.querySelector("section")
                    entry.target.parentElement.appendChild(newSection)

                    let newSec = document.querySelector("#section" + sectionId)
                    lazyLoadingObserver.unobserve(entry.target)
                    lazyLoadingObserver.observe(newSec)

                    parallaxObserver.observe(document.querySelector("#section" + sectionId))
                    document.querySelectorAll(".text").forEach(e => blurObserver.observe(e))

                    addToNav(document.querySelector("#title" + sectionId).innerHTML)
                    locationObserver.observe(newSec)

                })
            }
        })
    }), {
        rootMargin: "0px 0px -500px 0px"
    }
)

function addToNav(name) {
    let newItem = document.createElement("div")
    newItem.classList.add("nav-item")
    newItem.classList.add("nav-" + name)
    newItem.innerHTML = name
    newItem.addEventListener("click", () => {

        document.querySelector("." + name).scrollIntoView(true)
        // document.querySelector(".nav-" + name).classList.add("currentSection")
    })
    navbar.appendChild(newItem)
}

function setupNavScroll() {
    let existing = document.querySelectorAll(".nav-item")
    existing.forEach(item => {
        item.addEventListener("click", () => {
            document.querySelector("." + item.innerHTML).scrollIntoView(true)
        })
    })
}

const blurObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.remove("blur")
        else entry.target.classList.add("blur")
    })
}, {
    rootMargin: "-250px 0px -200px 0px"
})

const locationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let sectionName = entry.target.querySelector("h3").innerHTML
            document.querySelectorAll(".currentSection").forEach(i => i.classList.remove("currentSection"))
            document.querySelector(".nav-" + sectionName).classList.add("currentSection")
        }
    })
}, {
    rootMargin: "-50% 0px -50% 0px"
})


// setup
window.onscroll = () => stickyNavbar()
lazyLoadingObserver.observe(document.querySelector("#section1"))
parallaxObserver.observe(document.querySelector("#section1"))
document.querySelectorAll(".text").forEach(e => blurObserver.observe(e))
setupNavScroll()
locationObserver.observe(document.querySelector("#section1"))