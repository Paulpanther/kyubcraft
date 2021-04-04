if (window.location.hash) {
    switchToPost()
} else {
    switchToPre();
}

export function switchToPre() {
    document.getElementById("pre-import").style.display = "block";
    document.getElementById("post-import").style.display = "none";
}

export function switchToPost() {
    document.getElementById("pre-import").style.display = "none";
    document.getElementById("post-import").style.display = "block";
}
