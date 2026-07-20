document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Elements
    // ===============================

    const loginForm = document.getElementById("loginForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginButton = document.querySelector(".login-btn");

    // ===============================
    // Password Toggle
    // ===============================

    if (togglePassword) {
        togglePassword.addEventListener("click", () => {

            const isPassword = password.type === "password";

            password.type = isPassword ? "text" : "password";

            togglePassword.innerHTML = isPassword
                ? '<i class="bi bi-eye-slash"></i>'
                : '<i class="bi bi-eye"></i>';
        });
    }

    // ===============================
    // Login Submit
    // ===============================

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (emailValue === "" || passwordValue === "") {
            alert("Please enter your email and password.");
            return;
        }

        loginButton.disabled = true;
        loginButton.innerHTML =
            '<i class="bi bi-arrow-repeat"></i> Signing In...';

        try {

            const response = await fetch("/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: emailValue,
                    password: passwordValue
                })

            });

            console.log("HTTP Status:", response.status);

            const data = await response.json();

            console.log("Response:", data);

            if (!response.ok) {

                throw new Error(
                    data.message || "Invalid email or password."
                );

            }

            // Save JWT Token

            if (data.token) {

                localStorage.setItem("jwtToken", data.token);

            }

            loginButton.innerHTML =
                '<i class="bi bi-check-circle"></i> Login Successful';

            setTimeout(() => {

                window.location.href = "/dashboard";

            }, 1000);

        }
        catch (error) {

            console.error(error);

            alert(error.message);

            loginButton.disabled = false;

            loginButton.innerHTML =
                '<i class="bi bi-box-arrow-in-right"></i> Login';

        }

    });

});