// ==========================================
// Save Layout Module
// ==========================================

async function saveLayout(architectureId) {

    const nodes = document.querySelectorAll(".node");

    const layout = [];

    nodes.forEach(node => {

        layout.push({

            componentId: node.id.replace("component-", ""),

            x: parseInt(node.style.left),

            y: parseInt(node.style.top)

        });

    });

    console.log("Layout To Save");

    console.table(layout);

    /*
    Later we will send it to Spring Boot

    await fetch("/designer/layout",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(layout)

    });

    */

}