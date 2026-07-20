/* =====================================================
   ARCHITECTURE STUDIO
   landing.js - Part 1
   Navigation • Scroll • Reveal • Back To Top
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Elements
    ========================================== */

    const navbar = document.querySelector(".navbar");

    const navLinks = document.querySelectorAll(".nav-link");

    const sections = document.querySelectorAll("section");

    const mobileToggle = document.querySelector(".mobile-toggle");

    const navMenu = document.querySelector(".nav-menu");

    const backToTop = document.querySelector(".back-to-top");

    const reveals = document.querySelectorAll(".reveal");

    /* ==========================================
       Navbar Scroll Effect
    ========================================== */

    function updateNavbar(){

        if(window.scrollY > 60){

            navbar.classList.add("scrolled");

        }else{

            navbar.classList.remove("scrolled");

        }

    }

    updateNavbar();

    window.addEventListener("scroll", updateNavbar);

    /* ==========================================
       Active Navigation
    ========================================== */

    function updateActiveNav(){

        let current = "";

        sections.forEach(section=>{

            const top = section.offsetTop - 150;

            const height = section.offsetHeight;

            if(window.scrollY >= top){

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if(href === "#" + current){

                link.classList.add("active");

            }

        });

    }

    updateActiveNav();

    window.addEventListener("scroll", updateActiveNav);

    /* ==========================================
       Smooth Scroll
    ========================================== */

    navLinks.forEach(link=>{

        link.addEventListener("click",(e)=>{

            const target = document.querySelector(link.getAttribute("href"));

            if(!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 90,

                behavior:"smooth"

            });

            if(navMenu){

                navMenu.classList.remove("active");

            }

            if(mobileToggle){

                mobileToggle.classList.remove("active");

            }

        });

    });

    /* ==========================================
       Mobile Menu
    ========================================== */

    if(mobileToggle){

        mobileToggle.addEventListener("click",()=>{

            mobileToggle.classList.toggle("active");

            navMenu.classList.toggle("active");

        });

    }

    /* ==========================================
       Back To Top
    ========================================== */

    if(backToTop){

        function toggleBackTop(){

            if(window.scrollY > 600){

                backToTop.classList.add("show");

            }else{

                backToTop.classList.remove("show");

            }

        }

        toggleBackTop();

        window.addEventListener("scroll",toggleBackTop);

        backToTop.addEventListener("click",(e)=>{

            e.preventDefault();

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }

    /* ==========================================
       Reveal Animation
    ========================================== */

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{

        threshold:.15

    });

    reveals.forEach(item=>{

        observer.observe(item);

    });

});

/* =====================================================
   ARCHITECTURE STUDIO
   landing.js - Part 2
   Hero Animations • Counters • Floating Effects
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Animated Counters
    ========================================== */

    const counters = document.querySelectorAll("[data-counter]");

    function animateCounter(counter){

        const target = parseInt(counter.dataset.counter);

        const duration = 2000;

        const step = target / (duration / 16);

        let current = 0;

        function update(){

            current += step;

            if(current >= target){

                counter.textContent = target + "+";

                return;

            }

            counter.textContent = Math.floor(current) + "+";

            requestAnimationFrame(update);

        }

        update();

    }

    const counterObserver = new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                animateCounter(entry.target);

                counterObserver.unobserve(entry.target);

            }

        });

    },{

        threshold:.5

    });

    counters.forEach(counter=>{

        counterObserver.observe(counter);

    });

    /* ==========================================
       Hero Elements Entrance
    ========================================== */

    const heroItems=document.querySelectorAll(

        ".hero-badge,.hero-title,.hero-description,.hero-buttons,.stats-grid,.tech-stack"

    );

    heroItems.forEach((item,index)=>{

        item.style.opacity="0";

        item.style.transform="translateY(40px)";

        item.style.transition="all .8s ease";

        setTimeout(()=>{

            item.style.opacity="1";

            item.style.transform="translateY(0)";

        },250+(index*180));

    });

    /* ==========================================
       Floating Tech Chips
    ========================================== */

    const chips=document.querySelectorAll(".tech-chip");

    chips.forEach((chip,index)=>{

        chip.style.animation=`chipFloat ${5+index}s ease-in-out infinite`;

        chip.style.animationDelay=`${index*.4}s`;

    });

    /* ==========================================
       Hero Card Floating
    ========================================== */

    const architectureCard=document.querySelector(".architecture-card");

    if(architectureCard){

        architectureCard.animate(

            [

                {

                    transform:"translateY(0px)"

                },

                {

                    transform:"translateY(-12px)"

                },

                {

                    transform:"translateY(0px)"

                }

            ],

            {

                duration:5000,

                iterations:Infinity,

                easing:"ease-in-out"

            }

        );

    }

    /* ==========================================
       Scroll Indicator
    ========================================== */

    const scrollIndicator=document.querySelector(".scroll-indicator");

    if(scrollIndicator){

        scrollIndicator.addEventListener("click",()=>{

            const next=document.querySelector("section:nth-of-type(2)");

            if(next){

                next.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    }

    /* ==========================================
       Mouse Tilt Hero Card
    ========================================== */

    if(architectureCard){

        architectureCard.addEventListener("mousemove",(e)=>{

            const rect=architectureCard.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateY=((x/rect.width)-0.5)*12;

            const rotateX=((rect.height/2-y)/rect.height)*12;

            architectureCard.style.transform=

                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.02)`;

        });

        architectureCard.addEventListener("mouseleave",()=>{

            architectureCard.style.transform=

                "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";

        });

    }

    /* ==========================================
       Hero Background Parallax
    ========================================== */

    const auroras=document.querySelectorAll(

        ".aurora-1,.aurora-2,.aurora-3"

    );

    window.addEventListener("mousemove",(e)=>{

        const x=e.clientX/window.innerWidth;

        const y=e.clientY/window.innerHeight;

        auroras.forEach((aurora,index)=>{

            const speed=(index+1)*12;

            aurora.style.transform=

            `translate(${x*speed}px,${y*speed}px)`;

        });

    });

});

/* =====================================================
   ARCHITECTURE STUDIO
   landing.js - Part 3
   Premium Interactions • Cursor • Particles • Buttons
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Cursor Glow
    ========================================== */

    const cursorGlow = document.querySelector(".cursor-glow");

    if(cursorGlow){

        window.addEventListener("mousemove",(e)=>{

            cursorGlow.style.left = e.clientX + "px";

            cursorGlow.style.top = e.clientY + "px";

        });

    }

    /* ==========================================
       Floating Particles
    ========================================== */

    const particles = document.querySelectorAll(".particle");

    particles.forEach((particle,index)=>{

        particle.animate(

            [

                {
                    transform:"translateY(0px) translateX(0px)",
                    opacity:.2
                },

                {
                    transform:`translateY(-${80+index*20}px) translateX(${20-index*8}px)`,
                    opacity:.8
                },

                {
                    transform:"translateY(0px) translateX(0px)",
                    opacity:.2
                }

            ],

            {

                duration:7000 + (index*1000),

                iterations:Infinity,

                easing:"ease-in-out"

            }

        );

    });

    /* ==========================================
       Magnetic Buttons
    ========================================== */

    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button=>{

        button.addEventListener("mousemove",(e)=>{

            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const moveX = (x - rect.width/2)/8;

            const moveY = (y - rect.height/2)/8;

            button.style.transform =
                `translate(${moveX}px,${moveY}px)`;

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="translate(0,0)";

        });

    });

    /* ==========================================
       Ripple Effect
    ========================================== */

    buttons.forEach(button=>{

        button.addEventListener("click",(e)=>{

            const ripple=document.createElement("span");

            const rect=button.getBoundingClientRect();

            const size=Math.max(rect.width,rect.height);

            ripple.style.width=size+"px";

            ripple.style.height=size+"px";

            ripple.style.left=e.clientX-rect.left-size/2+"px";

            ripple.style.top=e.clientY-rect.top-size/2+"px";

            ripple.className="ripple";

            button.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },700);

        });

    });

    /* ==========================================
       Card Hover Tilt
    ========================================== */

    const cards=document.querySelectorAll(

        ".tech-card,.feature-card,.metric-card,.workflow-card,.dev-card"

    );

    cards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateY=((x/rect.width)-0.5)*8;

            const rotateX=((rect.height/2-y)/rect.height)*8;

            card.style.transform=

            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

        });

    });

    /* ==========================================
       Navigation Link Hover
    ========================================== */

    const navLinks=document.querySelectorAll(".nav-link");

    navLinks.forEach(link=>{

        link.addEventListener("mouseenter",()=>{

            link.style.transform="translateY(-2px)";

        });

        link.addEventListener("mouseleave",()=>{

            link.style.transform="translateY(0)";

        });

    });

    /* ==========================================
       Animated Logo
    ========================================== */

    const logo=document.querySelector(".logo");

    if(logo){

        logo.addEventListener("mouseenter",()=>{

            logo.animate([

                {transform:"rotate(0deg)"},

                {transform:"rotate(-8deg)"},

                {transform:"rotate(8deg)"},

                {transform:"rotate(0deg)"}

            ],{

                duration:600,

                easing:"ease"

            });

        });

    }

    /* ==========================================
       Random Glow Pulse
    ========================================== */

    setInterval(()=>{

        const randomCard=cards[Math.floor(Math.random()*cards.length)];

        if(!randomCard) return;

        randomCard.classList.add("pulse-glow");

        setTimeout(()=>{

            randomCard.classList.remove("pulse-glow");

        },1200);

    },4000);

});

/* =====================================================
   ARCHITECTURE STUDIO
   landing.js - Part 4
   Live Architecture Diagram Animation
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Elements
    ========================================== */

    const nodes = document.querySelectorAll(".node");

    const services = document.querySelectorAll(".service-column .node");

    const databases = document.querySelectorAll(".database-card");

    const liveDot = document.querySelector(".live-dot");

    const connectors = document.querySelectorAll(".connector");

    const footerHealth = document.querySelector(".health");

    /* ==========================================
       Node Hover Pulse
    ========================================== */

    nodes.forEach(node=>{

        node.addEventListener("mouseenter",()=>{

            node.animate([

                {
                    transform:"scale(1)"
                },

                {
                    transform:"scale(1.05)"
                },

                {
                    transform:"scale(1)"
                }

            ],{

                duration:500

            });

        });

    });

    /* ==========================================
       Sequential Request Flow
    ========================================== */

    let current = 0;

    function animateFlow(){

        nodes.forEach(node=>{

            node.classList.remove("active-node");

        });

        if(nodes[current]){

            nodes[current].classList.add("active-node");

        }

        current++;

        if(current >= nodes.length){

            current = 0;

        }

    }

    animateFlow();

    setInterval(animateFlow,800);

    /* ==========================================
       Services Health Animation
    ========================================== */

    setInterval(()=>{

        services.forEach(service=>{

            service.classList.remove("healthy");

        });

        const random = Math.floor(Math.random()*services.length);

        if(services[random]){

            services[random].classList.add("healthy");

        }

    },1200);

    /* ==========================================
       Database Activity
    ========================================== */

    setInterval(()=>{

        databases.forEach(db=>{

            db.classList.remove("database-active");

        });

        const db = databases[Math.floor(Math.random()*databases.length)];

        if(db){

            db.classList.add("database-active");

        }

    },1500);

    /* ==========================================
       Connector Pulse
    ========================================== */

    connectors.forEach((connector,index)=>{

        connector.style.animation = `connectorPulse 1.6s ease-in-out infinite`;

        connector.style.animationDelay = `${index*0.25}s`;

    });

    /* ==========================================
       Live Status Dot
    ========================================== */

    if(liveDot){

        setInterval(()=>{

            liveDot.classList.toggle("online");

        },900);

    }

    /* ==========================================
       Health Status
    ========================================== */

    if(footerHealth){

        const status = [

            "System Healthy",

            "Optimal Performance",

            "No Bottlenecks",

            "99.99% Uptime"

        ];

        let index = 0;

        setInterval(()=>{

            footerHealth.lastElementChild.textContent = status[index];

            index++;

            if(index>=status.length){

                index=0;

            }

        },3500);

    }

    /* ==========================================
       Architecture Glow
    ========================================== */

    setInterval(()=>{

        nodes.forEach(node=>{

            node.classList.remove("soft-glow");

        });

        const random = Math.floor(Math.random()*nodes.length);

        if(nodes[random]){

            nodes[random].classList.add("soft-glow");

        }

    },1800);

    /* ==========================================
       Random CPU Values
    ========================================== */

    const cpuElements=document.querySelectorAll("[data-cpu]");

    cpuElements.forEach(cpu=>{

        let value=parseInt(cpu.innerText)||25;

        setInterval(()=>{

            value+=Math.floor(Math.random()*8)-3;

            value=Math.max(12,Math.min(85,value));

            cpu.innerHTML=value+"%";

        },2000);

    });

    /* ==========================================
       Random Latency
    ========================================== */

    const latency=document.querySelectorAll("[data-latency]");

    latency.forEach(item=>{

        let value=18;

        setInterval(()=>{

            value+=Math.floor(Math.random()*6)-2;

            value=Math.max(10,Math.min(35,value));

            item.innerHTML=value+" ms";

        },1800);

    });

    /* ==========================================
       Requests Per Second
    ========================================== */

    const rps=document.querySelectorAll("[data-rps]");

    rps.forEach(item=>{

        let value=1240;

        setInterval(()=>{

            value+=Math.floor(Math.random()*120)-60;

            item.innerHTML=value.toLocaleString();

        },1000);

    });

});

/* =====================================================
   ARCHITECTURE STUDIO
   landing.js - Part 5
   Live Metrics Dashboard
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Progress Bars
    ========================================== */

    const progressBars = document.querySelectorAll(".progress");

    function animateProgress(){

        progressBars.forEach(bar=>{

            const max = parseInt(bar.dataset.value);

            if(isNaN(max)) return;

            let value = parseInt(bar.style.width) || 0;

            value += Math.floor(Math.random()*7)-3;

            value = Math.max(max-8,Math.min(max+8,value));

            bar.style.width = value + "%";

        });

    }

    animateProgress();

    setInterval(animateProgress,1800);

    /* ==========================================
       Metric Values
    ========================================== */

    const cpu = document.querySelector("[data-metric='cpu']");

    const memory = document.querySelector("[data-metric='memory']");

    const latency = document.querySelector("[data-metric='latency']");

    const throughput = document.querySelector("[data-metric='throughput']");

    const health = document.querySelector("[data-metric='health']");

    const users = document.querySelector("[data-metric='users']");

    function random(min,max){

        return Math.floor(Math.random()*(max-min+1))+min;

    }

    setInterval(()=>{

        if(cpu){

            cpu.innerHTML=random(20,45)+"%";

        }

        if(memory){

            memory.innerHTML=random(45,70)+"%";

        }

        if(latency){

            latency.innerHTML=random(12,30)+" ms";

        }

        if(throughput){

            throughput.innerHTML=random(1200,2400).toLocaleString();

        }

        if(health){

            health.innerHTML=random(96,100)+"%";

        }

        if(users){

            users.innerHTML=random(1200,2200);

        }

    },1800);

    /* ==========================================
       Floating Panel Status
    ========================================== */

    const statusElements=document.querySelectorAll(".status");

    const statusText=[

        "Healthy",

        "Running",

        "Optimal",

        "Synced"

    ];

    let statusIndex=0;

    setInterval(()=>{

        statusElements.forEach(status=>{

            status.innerHTML=

            `<i class="fa-solid fa-circle-check"></i> ${statusText[statusIndex]}`;

        });

        statusIndex++;

        if(statusIndex>=statusText.length){

            statusIndex=0;

        }

    },2500);

    /* ==========================================
       Metric Card Pulse
    ========================================== */

    const metricCards=document.querySelectorAll(".metric-card");

    setInterval(()=>{

        metricCards.forEach(card=>{

            card.classList.remove("metric-active");

        });

        const randomCard=

        metricCards[Math.floor(Math.random()*metricCards.length)];

        if(randomCard){

            randomCard.classList.add("metric-active");

        }

    },1400);

    /* ==========================================
       Dashboard Header Time
    ========================================== */

    const clock=document.querySelector(".dashboard-time");

    if(clock){

        setInterval(()=>{

            const now=new Date();

            clock.innerHTML=

            now.toLocaleTimeString([],{

                hour:"2-digit",

                minute:"2-digit",

                second:"2-digit"

            });

        },1000);

    }

    /* ==========================================
       Active Users Counter
    ========================================== */

    const activeUsers=document.querySelector(".active-users");

    if(activeUsers){

        let usersCount=1845;

        setInterval(()=>{

            usersCount+=Math.floor(Math.random()*40)-20;

            activeUsers.innerHTML=

            usersCount.toLocaleString();

        },1200);

    }

    /* ==========================================
       Dashboard Notification
    ========================================== */

    const notification=document.querySelector(".dashboard-notification");

    if(notification){

        const messages=[

            "Simulation Running",

            "Traffic Stable",

            "Scaling Services",

            "No Bottlenecks",

            "Gateway Healthy",

            "Database Optimized"

        ];

        let index=0;

        setInterval(()=>{

            notification.style.opacity="0";

            setTimeout(()=>{

                notification.innerHTML=messages[index];

                notification.style.opacity="1";

                index++;

                if(index>=messages.length){

                    index=0;

                }

            },400);

        },3500);

    }

    /* ==========================================
       Progress Glow
    ========================================== */

    setInterval(()=>{

        progressBars.forEach(bar=>{

            bar.classList.remove("progress-active");

        });

        const random=

        progressBars[Math.floor(Math.random()*progressBars.length)];

        if(random){

            random.classList.add("progress-active");

        }

    },1300);

});

/* =====================================================
   ARCHITECTURE STUDIO
   landing.js - Part 6
   Workflow Timeline Animation
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Elements
    ========================================== */

    const timelineItems = document.querySelectorAll(".timeline-item");

    const timelineCards = document.querySelectorAll(".timeline-content");

    const timelineNumbers = document.querySelectorAll(".timeline-number");

    const timelineIcons = document.querySelectorAll(".timeline-icon");

    const workflowCards = document.querySelectorAll(".workflow-card");

    /* ==========================================
       Workflow Observer
    ========================================== */

    const workflowObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                startWorkflowAnimation();

                workflowObserver.disconnect();

            }

        });

    },{

        threshold:.35

    });

    if(document.querySelector(".workflow")){

        workflowObserver.observe(document.querySelector(".workflow"));

    }

    /* ==========================================
       Sequential Timeline Animation
    ========================================== */

    function startWorkflowAnimation(){

        timelineItems.forEach((item,index)=>{

            setTimeout(()=>{

                item.classList.add("timeline-active");

            },index*700);

        });

    }

    /* ==========================================
       Active Step
    ========================================== */

    let currentStep=0;

    function animateSteps(){

        timelineCards.forEach(card=>{

            card.classList.remove("step-active");

        });

        timelineNumbers.forEach(number=>{

            number.classList.remove("number-active");

        });

        timelineIcons.forEach(icon=>{

            icon.classList.remove("icon-active");

        });

        if(timelineCards[currentStep]){

            timelineCards[currentStep].classList.add("step-active");

        }

        if(timelineNumbers[currentStep]){

            timelineNumbers[currentStep].classList.add("number-active");

        }

        if(timelineIcons[currentStep]){

            timelineIcons[currentStep].classList.add("icon-active");

        }

        currentStep++;

        if(currentStep>=timelineCards.length){

            currentStep=0;

        }

    }

    animateSteps();

    setInterval(animateSteps,2200);

    /* ==========================================
       Timeline Hover Tilt
    ========================================== */

    timelineCards.forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            const rotateY=((x/rect.width)-0.5)*8;

            const rotateX=((rect.height/2-y)/rect.height)*8;

            card.style.transform=

            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

        });

        card.addEventListener("mouseleave",()=>{

            card.style.transform="";

        });

    });

    /* ==========================================
       Workflow Stats Counter
    ========================================== */

    const workflowNumbers=document.querySelectorAll("[data-workflow]");

    workflowNumbers.forEach(counter=>{

        const target=parseInt(counter.dataset.workflow);

        if(isNaN(target)) return;

        let value=0;

        const timer=setInterval(()=>{

            value++;

            counter.innerHTML=value;

            if(value>=target){

                clearInterval(timer);

            }

        },25);

    });

    /* ==========================================
       Pulse Workflow Cards
    ========================================== */

    setInterval(()=>{

        workflowCards.forEach(card=>{

            card.classList.remove("workflow-active");

        });

        const random=Math.floor(Math.random()*workflowCards.length);

        if(workflowCards[random]){

            workflowCards[random].classList.add("workflow-active");

        }

    },2500);

    /* ==========================================
       Icon Rotation
    ========================================== */

    timelineIcons.forEach(icon=>{

        icon.addEventListener("mouseenter",()=>{

            icon.animate([

                {

                    transform:"rotate(0deg) scale(1)"

                },

                {

                    transform:"rotate(15deg) scale(1.1)"

                },

                {

                    transform:"rotate(-15deg) scale(1.1)"

                },

                {

                    transform:"rotate(0deg) scale(1)"

                }

            ],{

                duration:600

            });

        });

    });

    /* ==========================================
       Auto Scroll Highlight
    ========================================== */

    setInterval(()=>{

        timelineItems.forEach(item=>{

            item.classList.remove("timeline-highlight");

        });

        const random=Math.floor(Math.random()*timelineItems.length);

        if(timelineItems[random]){

            timelineItems[random].classList.add("timeline-highlight");

        }

    },3000);

});

