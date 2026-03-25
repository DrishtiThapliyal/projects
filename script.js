let captchaText = "";
let otp = "";
let otpExpiryTime;
let otpAttempts = 0;
let captchaAttempts = 0;

// Generate CAPTCHA
function generateCaptcha() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    captchaText = "";

    for (let i = 0; i < 5; i++) {
        captchaText += chars[Math.floor(Math.random() * chars.length)];
    }

    document.getElementById("captcha").innerText = captchaText;
}

// Verify CAPTCHA
function verifyCaptcha() {
    let userInput = document.getElementById("captchaInput").value;

    if (userInput === captchaText) {
        alert("CAPTCHA Verified!");
        document.getElementById("otpSection").style.display = "block";
    } else {
        captchaAttempts++;

        if (captchaAttempts >= 3) {
            alert("Too many wrong attempts! Refreshing CAPTCHA.");
            captchaAttempts = 0;
            generateCaptcha();
        } else {
            alert("Wrong CAPTCHA");
        }
    }
}

// Generate OTP
function generateOTP() {
    otp = Math.floor(100000 + Math.random() * 900000);

    // Set expiry (2 minutes)
    otpExpiryTime = Date.now() + (2 * 60 * 1000);

    otpAttempts = 0;

    //console.log("OTP (for testing):", otp); // hidden (check console)
	alert("Your OTP is: " + otp);


    startTimer();
}

// Timer Display
function startTimer() {
    let timerDisplay = document.getElementById("timer");
    let interval = setInterval(() => {
        let remaining = Math.floor((otpExpiryTime - Date.now()) / 1000);

        if (remaining <= 0) {
            clearInterval(interval);
            timerDisplay.innerText = "OTP Expired ❌";
        } else {
            timerDisplay.innerText = "Expires in: " + remaining + "s";
        }
    }, 1000);
}

// Verify OTP
function verifyOTP() {
    let userOtp = document.getElementById("otpInput").value;

    if (Date.now() > otpExpiryTime) {
        alert("OTP Expired!");
        return;
    }

    if (userOtp == otp) {
        alert("Login Successful 🎉");
    } else {
        otpAttempts++;

        if (otpAttempts >= 3) {
            alert("Too many wrong OTP attempts!");
        } else {
            alert("Invalid OTP");
        }
    }
}

// Load CAPTCHA on start
generateCaptcha();