const preview = document.getElementById("preview");
const previewImg = preview.querySelector("img");
const previewAlt = preview.querySelector("span");

document.querySelectorAll(".gallery img").forEach((img: HTMLImageElement) => {
    img.addEventListener("click", () => {
        previewImg.src = img.src;
        previewAlt.innerText = img.alt;
        preview.classList.add("active");
    });
});

preview.addEventListener("click", () => {
    preview.classList.remove("active");
});
