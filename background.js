// ============================================
// AI Background v1.0
// ============================================

const spotlight = document.querySelector(".spotlight");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateSpotlight() {

    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    if (spotlight) {
        spotlight.style.left = currentX + "px";
        spotlight.style.top = currentY + "px";
    }

    requestAnimationFrame(animateSpotlight);
}

animateSpotlight();



// ===========================
// Blob Parallax
// ===========================

const blobs = document.querySelectorAll(".blob");

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    blobs.forEach((blob, index) => {

        const depth = (index + 1) * 8;

        blob.style.transform =
            `translate(${x / depth}px, ${y / depth}px)`;

    });

});




// ===========================
// Aurora Rotation
// ===========================

const auroras = document.querySelectorAll(".aurora");

let angle = 0;

function animateAurora() {

    angle += 0.02;

    auroras.forEach((item, index) => {

        const rotate = angle * (index + 1);

        item.style.transform =
            `rotate(${rotate}deg)`;

    });

    requestAnimationFrame(animateAurora);

}

animateAurora();




// ===========================
// Floating Glow
// ===========================

const glows = document.querySelectorAll(".glow");

let t = 0;

function animateGlow() {

    t += 0.01;

    glows.forEach((g, i) => {

        const offset =
            Math.sin(t + i) * 30;

        g.style.transform =
            `translateY(${offset}px)`;

    });

    requestAnimationFrame(animateGlow);

}

animateGlow();




// ===========================
// Window Resize
// ===========================

window.addEventListener("resize", () => {

    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;

});


// ===========================
// Performance
// ===========================

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        console.log("Background paused");

    } else {

        console.log("Background resumed");

    }

});