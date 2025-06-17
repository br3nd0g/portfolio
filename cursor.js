const cursor = document.querySelector("#cursor");

// checking if touchscreen or prefers reduced motion
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!isTouchDevice && !prefersReducedMotion && cursor) {

    cursor.style.display = "block"; // show curor

    // Inject CSS to hide the default cursor
    const style = document.createElement("style");
    style.textContent = `
        * {
            cursor: none;
        }
    `;
    document.head.appendChild(style);

    // position cursor constantly
    document.addEventListener("mousemove", (e) => {
        let x = e.clientX;
        let y = e.clientY;
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    });


    // below: adding events for click and clickable elements to change cursor size
    document.addEventListener("mousedown", (e) => cursor.classList.add("click"));
    document.addEventListener("mouseup", (e) => cursor.classList.remove("click"));

    let items = document.querySelectorAll("a, button");
    items = Array.from(items).concat(Array.from(document.querySelectorAll(".projectOption, #arrowLeft, #arrowRight")));

    items.forEach((item) => {
        item.addEventListener("mouseover", () => {
            cursor.classList.add("pressable");
        });

        item.addEventListener("mouseleave", () => {
            cursor.classList.remove("pressable");
        });
    });
}