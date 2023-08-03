const parallax_el = document.querySelectorAll('.parallax');

let xVal = 0,
    yVal = 0;

let rotateDegree = 0;

function update(cursorPosition) {
    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;

        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
        let zVal = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1;

        el.style.transform = `translateX(calc(-50% + ${
            -xVal * speedx
        }px)) rotateY(${rotateDegree * rotateSpeed}deg) translateY(calc(-50% + ${
            yVal * speedy
        }px)) perspective(2300px) translateZ(calc(${zVal * speedz}px))`;
    });
} update(0);

window.addEventListener('mousemove', (e) => {
    xVal = e.clientX - window.innerWidth / 2;
    yVal = e.clientY - window.innerHeight / 2;

    rotateDegree = (xVal / (window.innerWidth / 2)) * 20;
    update(e.clientX);
});

let timeline = gsap.timeline();

timeline.from('.text h1', {
    y: window.innerHeight - document.querySelector('.text h1').
    getBoundingClientRect().top,
    duration: 2,
}, '1'
).from('.text h2', {
    y: -150, 
    opacity: 0,
    duration: 1.5,
}, '2'
);
