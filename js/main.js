// Toggle spin class on icon
document.querySelector(".toggle-settings").onclick = () => {
    document.querySelector(".settings-box").classList.toggle("open");
    document.querySelector(".settings-icon").classList.toggle("fa-spin");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");
saveToLocalStorage(colorsLi)
if (window.localStorage.getItem("color")) {
    getItemToLocalStorage(colorsLi)
}

// switch random backgrounds option
let backgroundOption = true;
let backgroundInterval;
const randomBackground = document.querySelectorAll(".random-background span");
saveToLocalStorage(randomBackground)
if (window.localStorage.getItem("background")) {
    getItemToLocalStorage(randomBackground)
}

// Control the display of bullets 
let bulletSpan = document.querySelectorAll(".bullets-option span")
let bulletsContainer = document.querySelector(".nav-bullets")
saveToLocalStorage(bulletSpan)
if (window.localStorage.getItem("displayBullets")) {
    getItemToLocalStorage(bulletSpan)
}

// add elements to local storage
function saveToLocalStorage(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            elements.forEach(item => item.classList.remove("active"));
            e.target.classList.add("active")
            if (elements == colorsLi) {
                document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
                window.localStorage.setItem("color", e.target.dataset.color);
            } else if (elements == randomBackground) {
                if (e.target.dataset.background == "yes") {
                    backgroundOption = true;
                    randomizeImages();
                    window.localStorage.setItem("background", true);
                } else {
                    backgroundOption = false;
                    clearInterval(backgroundInterval);
                    window.localStorage.setItem("background", false);
                }
            } else if (elements == bulletSpan) {
                if (ele.dataset.display === "show") {
                    bulletsContainer.style.display = "block"
                } else {
                    bulletsContainer.style.display = "none"
                }
                window.localStorage.setItem("displayBullets", e.target.dataset.display)
            }
        })
    })
}

// get elements from to local storage
function getItemToLocalStorage(elements) {
    elements.forEach((ele) => ele.classList.remove("active"))
    if (elements == colorsLi) {
        document.documentElement.style.setProperty("--main-color", window.localStorage.getItem("color"));
        document.querySelector(`[data-color = "${window.localStorage.getItem("color")}"]`).classList.add("active");
    } else if (elements == randomBackground) {
        if (window.localStorage.getItem("background") == "true") {
            backgroundOption = true;
            document.querySelector("[data-background = 'yes']").classList.add("active");
        } else {
            backgroundOption = false;
            document.querySelector("[data-background = 'no']").classList.add("active");
        }
    } else if (elements == bulletSpan) {
        if (window.localStorage.getItem("displayBullets") === "show") {
            bulletsContainer.style.display = "block";
            document.querySelector("[data-display = 'show']").classList.add("active")
        } else {
            bulletsContainer.style.display = "none";
            document.querySelector("[data-display = 'hide']").classList.add("active")
        }
    }
}

// select landing page element
let landingPage = document.getElementsByClassName("landing-page");
let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImages() {
    if (backgroundOption === true) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * imagesArray.length);
            document.styleSheets[0].rules[0].style.backgroundImage = `url(../images/${imagesArray[randomNumber]})`
        }, 5000);
    }
}
randomizeImages();

// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = () => {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.scrollHeight;
    let windowHeight = window.innerHeight;
    let windowScrollTop = window.scrollY;
    if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
        let allSkills = document.querySelectorAll(".skill-progress span");
        allSkills.forEach(skill => skill.style.width = skill.dataset.progress);
    }
};

// Create popup with the image
let ourGallery = document.querySelectorAll(".images-box img");
ourGallery.forEach((img) => {
    img.addEventListener("click", () => {
        // create overlay Element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);
        // create popup
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        if (img.alt !== null) {
            let imgHeading = document.createElement("h3");
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
        }
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);
        let closeButton = document.createElement("i");
        closeButton.id = "close-button";
        closeButton.className = "fa-solid fa-close";
        popupBox.appendChild(closeButton);
    });
});
// close the popup
document.addEventListener("click", (e) => {
    if (e.target.id == "close-button") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});
// Control access to each scroll section
const allBullets = document.querySelectorAll(".nav-bullets .bullet")
scrollToSomeWhere(allBullets)

const allLinks = document.querySelectorAll(".links li a")
scrollToSomeWhere(allLinks)

function scrollToSomeWhere(elements) {
    elements.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            })
            if (elements == allLinks) {
                e.preventDefault()
                elements.forEach(link => link.classList.remove("active"))
                e.target.classList.add("active")
            }
        })
    })
}

// reset button
document.querySelector(".reset-options").onclick = _ => {
    window.localStorage.clear();
    window.location.reload();
}

// scroll to top 
let buttonScroll = document.querySelector(".scrollToTop")
document.addEventListener("scroll", () => {
    if (window.scrollY >= 1500) {
        buttonScroll.style.display = "block"
    } else {
        buttonScroll.style.display = "none"
    }
})
buttonScroll.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})

// toggle menu bars
let toggleIcon = document.querySelector("#bars")
let arrowMenu = document.querySelector(".toggle-menu")
let tLinks = document.querySelector(".links")

toggleIcon.onclick = function () {
    arrowMenu.classList.toggle("open")
    tLinks.classList.toggle("open")
}

document.addEventListener("click", function (e) {
    if (e.target !== toggleIcon && e.target !== tLinks && e.target !== arrowMenu) {
        if (tLinks.classList.contains("open")) {
            tLinks.classList.remove("open")
            arrowMenu.classList.remove("open")
        }
    }
})