"use strict";

/* ==========================================================
   ARC STUDIO DASHBOARD
========================================================== */

const Dashboard = {

    init() {

        Greeting.init();
        DateTime.init();
        Counter.init();
        Sidebar.init();
        Hero.init();
        QuickActions.init();
        Toast.init();

        lucide.createIcons();

        console.log("✅ Arc Studio Dashboard Loaded");

    }

};

/* ==========================================================
   GREETING
========================================================== */

const Greeting = {

    init() {
        this.update();
    },

    update() {

        const element = document.getElementById("greeting");

        if (!element) return;

        const hour = new Date().getHours();

        if (hour < 12)
            element.textContent = "Good Morning ☀️";

        else if (hour < 17)
            element.textContent = "Good Afternoon 🌤";

        else
            element.textContent = "Good Evening 🌙";

    }

};

/* ==========================================================
   DATE
========================================================== */

const DateTime = {

    init() {

        this.update();

        setInterval(() => this.update(),1000);

    },

    update(){

        const el=document.getElementById("currentDate");

        if(!el) return;

        const now=new Date();

        el.textContent=
            now.toLocaleDateString("en-US",{
                weekday:"long",
                day:"numeric",
                month:"long",
                year:"numeric"
            })
            +" • "+
            now.toLocaleTimeString([],{
                hour:"2-digit",
                minute:"2-digit"
            });

    }

};

/* ==========================================================
   COUNTERS
========================================================== */

const Counter={

    init(){

        document.querySelectorAll(".counter").forEach(counter=>{

            this.animate(counter);

        });

    },

    animate(counter){

        const target=parseInt(counter.dataset.target);

        let value=0;

        const speed=Math.max(1,target/60);

        function update(){

            value+=speed;

            if(value<target){

                counter.textContent=Math.floor(value);

                requestAnimationFrame(update);

            }

            else{

                counter.textContent=target;

            }

        }

        update();

    }

};

/* ==========================================================
   SIDEBAR
========================================================== */

const Sidebar={

    init(){

        document.querySelectorAll(".menu-item").forEach(item=>{

            item.addEventListener("click",()=>{

                document.querySelectorAll(".menu-item")
                    .forEach(i=>i.classList.remove("active"));

                item.classList.add("active");

            });

        });

    }

};

/* ==========================================================
   HERO BUTTONS
========================================================== */

const Hero={

    init(){

        const continueBtn=document.querySelector(".primary-btn");
        const newBtn=document.querySelector(".secondary-btn");

        if(continueBtn){

            continueBtn.onclick=()=>{

                Toast.show("Opening latest project...","success");

            };

        }

        if(newBtn){

            newBtn.onclick=()=>{

                Toast.show("Create new architecture","info");

            };

        }

    }

};

/* ==========================================================
   QUICK ACTIONS
========================================================== */

const QuickActions={

    init(){

        document.querySelectorAll(".action-btn").forEach(btn=>{

            btn.onclick=()=>{

                Toast.show(btn.innerText.trim(),"success");

            };

        });

    }

};

/* ==========================================================
   TOAST
========================================================== */

const Toast={

    container:null,

    init(){

        this.container=document.createElement("div");

        this.container.className="toast-container";

        document.body.appendChild(this.container);

    },

    show(message,type="info"){

        const toast=document.createElement("div");

        toast.className=`toast ${type}`;

        toast.innerHTML=message;

        this.container.appendChild(toast);

        setTimeout(()=>toast.classList.add("show"),50);

        setTimeout(()=>{

            toast.classList.remove("show");

            setTimeout(()=>toast.remove(),300);

        },2500);

    }

};

/* ==========================================================
   LOADER
========================================================== */

const Loader={

    show(){

        if(document.querySelector(".loader-overlay")) return;

        const div=document.createElement("div");

        div.className="loader-overlay";

        div.innerHTML="<div class='loader-spinner'></div>";

        document.body.appendChild(div);

    },

    hide(){

        document.querySelector(".loader-overlay")?.remove();

    }

};

/* ==========================================================
   START
========================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    Dashboard.init();

});