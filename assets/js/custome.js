

// Initialize emailjs
(function () {
    emailjs.init("hdueE7bUifAPG9EJh"); // Replace with your Public Key
})();

// Example to programmatically show the popup
const successPopup = document.getElementById('successPopup');
const myModal = successPopup ? new bootstrap.Modal(successPopup) : null;

// Function to send email
function sendEmail(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Template parameters for emailjs
    const templateParams = {
        to_name: "gowtham", // Recipient name
        from_name: name, // Sender name
        from_email: email, // Sender email
        message: message, // Message content
        reply_to: email // Reply-to email address
    };

    // Send email using emailjs
    emailjs.send("service_hiqcowq", "template_b0yggtu", templateParams)
        .then(() => {
            // Show success popup or alert
            if (myModal) {
                myModal.show();
            } else {
                alert("Email Sent Successfully!");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to send the email. Check the console for details.");
        });

    // Reset the form
    document.getElementById("contact").reset();
}



// Function to check the password strength and calculate time to crack
function checkStrength() {
    const password = document.getElementById("password").value;
    const strengthText = document.getElementById("strengthText");
    const strengthIndicator = document.getElementById("strengthIndicator");
    const timeToCrack = document.getElementById("timeToCrack");
    const reviewMessage = document.getElementById("reviewMessage");

    const minLength = 8;
    const hasLower = /[a-z]/;
    const hasUpper = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

    let strength = 0;

    if (password.length >= minLength) strength++;
    if (hasLower.test(password)) strength++;
    if (hasUpper.test(password)) strength++;
    if (hasNumber.test(password)) strength++;
    if (hasSpecial.test(password)) strength++;

    // Calculate time to crack (in seconds) based on password length and complexity
    let crackTime = '';
    if (password.length < 8) {
        crackTime = 'Crack time: Very fast (seconds)';
    } else if (password.length >= 8 && password.length <= 10) {
        crackTime = 'Crack time: Minutes to hours';
    } else if (password.length > 10 && strength >= 4) {
        crackTime = 'Crack time: Days to years';
    } else {
        crackTime = 'Crack time: Hours to days';
    }

    // Review message based on password strength
    let review = '';
    if (strength === 0) {
        strengthText.textContent = "Password strength: Very Weak";
        strengthText.className = 'weak';
        review = "Review: Bad, using that password is like leaving your front door unlocked!";
    } else if (strength <= 2) {
        strengthText.textContent = "Password strength: Weak";
        strengthText.className = 'weak';
        review = "Review: Weak, using that password is like locking your front door and keeping the key under the doormat.";
    } else if (strength === 3) {
        strengthText.textContent = "Password strength: Medium";
        strengthText.className = 'medium';
        review = "Review: Good, using that password is like locking your front door and keeping the key in a safety deposit box.";
    } else {
        strengthText.textContent = "Password strength: Strong";
        strengthText.className = 'strong';
        review = "Review: Excellent, using that password is like having a strong vault to protect your valuables.";
    }

    
    if (password.length === 0) {
        strengthText.textContent = "Password strength: Strong";
        strengthText.className = '';
        reviewMessage.classList.remove("show");
        timeToCrack.classList.remove("show");
    } else {
        strengthIndicator.style.display = "block";
        reviewMessage.classList.add("show");
        timeToCrack.classList.add("show");
        timeToCrack.textContent = crackTime;
        reviewMessage.textContent = review;
    }
    
}

// Function to toggle password visibility
const togglePassword = document.getElementById("togglePassword");
const passwordField = document.getElementById("password");

togglePassword.addEventListener("click", function () {
    const type = passwordField.type === "password" ? "text" : "password";
    passwordField.type = type;
    this.classList.toggle("bi-eye-slash");
    this.classList.toggle("bi-eye");
});

// Function to copy password to clipboard
const copyPassword = document.getElementById("copyPassword");
const copyTooltip = document.getElementById("copyTooltip");

copyPassword.addEventListener("click", function () {
    const password = passwordField.value;
    navigator.clipboard.writeText(password)
        .then(() => {
            copyTooltip.classList.add("show-tooltip");
            setTimeout(() => {
                copyTooltip.classList.remove("show-tooltip");
            }, 1000);
        });
});


