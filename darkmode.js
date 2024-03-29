const sunIcon = document.querySelector(".sun");
const moonIcon = document.querySelector(".moon");

const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia(("prefer-color-scheme: dark")).matches;


const iconToggle = ()=>{
    moonIcon.classList.toggle("display-none");
    sunIcon.classList.toggle("display-none");
};


const themCheck = () => {
    if(userTheme ==="dark" || (!userTheme && systemTheme)){
        document.documentElement.classList.add("dark");
        moonIcon.classList.add("display-none");
        return;
    }
    sunIcon.classList.add("display-none");
};

const themSwitch = () =>{
    if (document.documentElement.classList.contains("dark")){
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme","light");
        iconToggle();
        return;
    }
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme","dark");
    iconToggle();
};

sunIcon.addEventListener("click",()=>{
    themSwitch();
});

moonIcon.addEventListener("click",()=>{
    themSwitch();
});

themCheck();