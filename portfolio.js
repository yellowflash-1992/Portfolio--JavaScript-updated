var loader = document.getElementById("preloader");

function settingtoggle() {
    const container = document.getElementById("setting-container"),
        settingLabel = document.getElementById("labelforsetting"),
        visualBox = document.getElementById("visualmodetogglebuttoncontainer");
    if (!container) return
    container.classList.toggle("settingactivate"),
    visualBox && visualBox.classList.toggle("visualmodeshow"),
    settingLabel && settingLabel.setAttribute("aria-expanded", container.classList.contains("settingactivate"))
}

var THEME_STORAGE_KEY = "portfolio-theme";

function isLightMode() { return document.documentElement.classList.contains("light-mode") }

function syncThemeControls() {
    const light = isLightMode(),
        themeSwitch = document.getElementById("switchforvisualmode");
    themeSwitch && (themeSwitch.checked = light),
    document.querySelectorAll("#labelforvisualmode, #mobile-themebtn").forEach(e => e.setAttribute("aria-checked", light)),
    document.querySelectorAll(".needtobeinvert").forEach(e => e.classList.toggle("invertapplied", light))
}

function visualmode() {
    document.documentElement.classList.toggle("light-mode"), syncThemeControls();
    try { localStorage.setItem(THEME_STORAGE_KEY, isLightMode() ? "light" : "dark") } catch (error) {}
}

(function restoreSavedTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_STORAGE_KEY) } catch (error) {}
    "light" === saved && document.documentElement.classList.add("light-mode"), syncThemeControls()
})();
var preloaderDismissed = false;

function dismissPreloader() {
    preloaderDismissed || (preloaderDismissed = !0, loader && loader.classList.add("preloader-hidden"))
}

function showHeyGreeting() {
    const hey = document.querySelector(".hey");
    hey && hey.classList.add("popup")
}

function revealPortfolio() {
    showHeyGreeting(), dismissPreloader()
}

setTimeout(dismissPreloader, 2500);
"loading" === document.readyState ? document.addEventListener("DOMContentLoaded", revealPortfolio) : revealPortfolio(), window.addEventListener("pageshow", dismissPreloader);
function hamburgerMenu() {
    const overlay = document.getElementById("menu-overlay");
    const mobileMenu = document.getElementById("mobiletogglemenu");
    document.body.classList.toggle("stopscrolling");
    overlay.classList.toggle("show");
    mobileMenu.classList.toggle("show-toggle-menu");
}

function hidemenubyli() {
    const overlay = document.getElementById("menu-overlay");
    const mobileMenu = document.getElementById("mobiletogglemenu");
    document.body.classList.remove("stopscrolling");
    overlay.classList.remove("show");
    mobileMenu.classList.remove("show-toggle-menu");
}
const sections = document.querySelectorAll("section"),
    navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li"),
    mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");
window.addEventListener("scroll", () => {
    let e = "";
    sections.forEach(t => {
        let o = t.offsetTop;
        pageYOffset >= o - 200 && (e = t.getAttribute("id"))
    }), mobilenavLi.forEach(t => { t.classList.remove("activeThismobiletab"), t.classList.contains(e) && t.classList.add("activeThismobiletab") }), navLi.forEach(t => { t.classList.remove("activeThistab"), t.classList.contains(e) && t.classList.add("activeThistab") })
}), console.log("%c Designed and Developed by yellowflash ", "background-image: linear-gradient(90deg,#8000ff,#6bc5f8); color: white;font-weight:900;font-size:1rem; padding:20px;");
let mybutton = document.getElementById("backtotopbutton");

function scrollFunction() { document.body.scrollTop > 400 || document.documentElement.scrollTop > 400 ? mybutton.style.display = "block" : mybutton.style.display = "none" }

function scrolltoTopfunction() { document.body.scrollTop = 0, document.documentElement.scrollTop = 0 }
window.onscroll = function() { scrollFunction() }, document.addEventListener("contextmenu", function(e) { "IMG" === e.target.nodeName && e.preventDefault() });
let Pupils = document.getElementsByClassName("footer-pupil"),
    pupilsArr = Array.from(Pupils),
    pupilStartPoint = -10,
    pupilRangeX = 20,
    pupilRangeY = 15,
    mouseXStartPoint = 0,
    mouseXEndPoint = window.innerWidth,
    currentXPosition = 0,
    fracXValue = 0,
    mouseYEndPoint = window.innerHeight,
    currentYPosition = 0,
    fracYValue = 0,
    mouseXRange = mouseXEndPoint - mouseXStartPoint;
const mouseMove = e => {
        fracXValue = (currentXPosition = e.clientX - mouseXStartPoint) / mouseXRange, fracYValue = (currentYPosition = e.clientY) / mouseYEndPoint;
        let t = pupilStartPoint + fracXValue * pupilRangeX,
            o = pupilStartPoint + fracYValue * pupilRangeY;
        pupilsArr.forEach(e => { e.style.transform = `translate(${t}px, ${o}px)` })
    },
    windowResize = () => { mouseXEndPoint = window.innerWidth, mouseYEndPoint = window.innerHeight, mouseXRange = mouseXEndPoint - mouseXStartPoint };
window.addEventListener("mousemove", mouseMove), window.addEventListener("resize", windowResize);
function openURL() {
    window.open("src/pdf/yellowflash's Resume.pdf", "_blank");
}

const cursorInner = document.getElementById("cursor-inner");
const cursorOuter = document.getElementById("cursor-outer");
const links = document.querySelectorAll("a,label,button");

if (cursorInner && cursorOuter) {
    document.addEventListener("mousemove", function (e) {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorInner.style.left = posX + "px";
        cursorInner.style.top = posY + "px";
        cursorOuter.animate(
            {
                left: posX + "px",
                top: posY + "px",
            },
            {
                duration: 500,
                fill: "forwards",
            },
        );
    });

    links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
            cursorInner.classList.add("hover");
            cursorOuter.classList.add("hover");
        });
        link.addEventListener("mouseleave", () => {
            cursorInner.classList.remove("hover");
            cursorOuter.classList.remove("hover");
        });
    });
}

const backButton = document.querySelector(".home.bk");
const tooltip = document.getElementById("global-tooltip");

if (backButton && tooltip) {
    backButton.addEventListener("mouseenter", function () {
        const rect = this.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 1.5 + "px";
        tooltip.style.top = rect.bottom + 8 + "px";
        tooltip.style.transform = "translateX(-50%)";
        tooltip.classList.add("visible");
    });
    backButton.addEventListener("mouseleave", function () {
        tooltip.classList.remove("visible");
    });
}

window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 80) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
