// ==========================================
// Export PNG Module
// ==========================================

console.log("Export PNG Module Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const exportButton =
        document.getElementById("exportPngBtn");

    exportButton.addEventListener("click", exportPNG);

});

// ==========================================
// Export PNG
// ==========================================

async function exportPNG() {

    const canvas =
        document.getElementById("designerCanvas");

    try {

        Swal.fire({

            title: "Generating PNG...",

            allowOutsideClick: false,

            didOpen: () => {

                Swal.showLoading();

            }

        });

        // Wait for jsPlumb to finish painting
        await new Promise(resolve => setTimeout(resolve, 300));

        const dataUrl =
            await htmlToImage.toPng(canvas, {

                cacheBust: true,

                pixelRatio: 2,

                backgroundColor: "#111827"

            });

        const link =
            document.createElement("a");

        link.download =
            "architecture.png";

        link.href =
            dataUrl;

        link.click();

        Swal.close();

        Swal.fire({

            icon: "success",

            title: "PNG Exported",

            timer: 1200,

            showConfirmButton: false

        });

    }

    catch (error) {

        console.error(error);

        Swal.close();

        Swal.fire({

            icon: "error",

            title: "Export Failed",

            text: error.message

        });

    }

}