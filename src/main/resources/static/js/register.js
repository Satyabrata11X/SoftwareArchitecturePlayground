document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");

    const fullNameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const termsInput = document.getElementById("terms");

    const submitButton = document.querySelector(".login-btn");

    // ===============================
    // Password Show / Hide
    // ===============================

    document.querySelectorAll(".password-toggle").forEach(button => {

        button.addEventListener("click", () => {

            const input = button.previousElementSibling;
            const icon = button.querySelector("i");

            if (input.type === "password") {

                input.type = "text";
                icon.classList.remove("bi-eye");
                icon.classList.add("bi-eye-slash");

            } else {

                input.type = "password";
                icon.classList.remove("bi-eye-slash");
                icon.classList.add("bi-eye");

            }

        });

    });

    // ===============================
    // Register
    // ===============================

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validation

        if (!fullName || !email || !password || !confirmPassword) {

            alert("Please fill all fields.");
            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");
            return;

        }

        if (password.length < 6) {

            alert("Password must be at least 6 characters.");
            return;

        }

        if (!termsInput.checked) {

            alert("Please accept Terms & Conditions.");
            return;

        }

        submitButton.disabled = true;
        submitButton.innerHTML =
            '<i class="bi bi-arrow-repeat"></i> Creating Account...';

        try {

            const response = await fetch("/api/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    fullName: fullName,
                    email: email,
                    password: password

                })

            });

            const data = await response.json();

            if (response.ok) {

                alert("Account created successfully!");

                window.location.href = "/login";

            } else {

                alert(data.message || "Registration failed.");

            }

        } catch (error) {

            console.error(error);

            alert("Unable to connect to server.");

        } finally {

            submitButton.disabled = false;

            submitButton.innerHTML =
                '<i class="bi bi-person-plus-fill"></i> Create Account';

        }

    });

});