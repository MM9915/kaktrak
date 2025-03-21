let darkmode = localStorage.getItem("darkmode")
const themeSwitch = document.querySelector(".theme")

const darkmodeOn = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
}

const darkmodeOff = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
}

if (darkmode === "active") darkmodeOn();

themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? darkmodeOn() : darkmodeOff(); 
})