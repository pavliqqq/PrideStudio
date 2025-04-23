async function loadNavbar() {
    const response = await fetch("navbar.html");
    const navbarHtml = await response.text();
    document.getElementById("navbar").innerHTML = navbarHtml;
}
loadNavbar();