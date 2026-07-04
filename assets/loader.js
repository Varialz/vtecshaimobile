document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("page-loader");

    if(!loader) return;

    // Hide loader after page finishes loading

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hidden");

        },350);

    });

});
