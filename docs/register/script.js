// SHOW ADDITIONAL FIELD FOR PHONE NUMBER
document.addEventListener("DOMContentLoaded", function() {
    var countryCodeSelect = document.getElementById("countryCode");
    var otherCountryCodeInput = document.getElementById("otherCountryCode");

    countryCodeSelect.addEventListener("change", function() {
        if (countryCodeSelect.value === "other") {
            otherCountryCodeInput.style.display = "inline-block";
        } else {
            otherCountryCodeInput.style.display = "none";
        }
    });
});

// CLICK SFX
const sfx = new Audio('../assets/terraria_sfx.mp3');
function playSound() {
    sfx.currentTime = 0;
    sfx.play();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('back-btn').addEventListener('click', function(event) {
        event.preventDefault();
        playSound();
        setTimeout(() => {
            window.history.back();
        }, 300);
    });
});


// SHOW ERROR POP UP MESSAGE
function showError(message) {
    var errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = message;
    errorMessage.style.display = "block";
    playSound();
    
    document.addEventListener("click", function hideErrorMessage() {
        errorMessage.style.display = "none";
        document.removeEventListener("click", hideErrorMessage);
    });
}

document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    if (validateForm()) window.location.href = "..";
});

function validateForm() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var genderInputs = document.querySelectorAll('input[name="gender"]');
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var countryCode = document.getElementById("countryCode").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var otherCountryCode = document.getElementById("otherCountryCode").value;
    var termsOfService = document.getElementById("termsOfService").checked;

    // 1. CHECK IF ALL INPUT FIELD IS FILLED
    if (firstName.trim() === "" || lastName.trim() === "" || email.trim() === "" || phoneNumber.trim() === "" || address.trim() === "") {
        showError("Please fill in all text fields.");
        return false;
    }

    // CHECK IF ANY GENDER IS SELECTED
    var genderFilled = false;
    genderInputs.forEach(function(input) {
        if (input.checked) {
            genderFilled = true;
        }
    });
    if (!genderFilled) {
        showError("Please select a Gender.");
        return false;
    }
    
    // 2. CHECK NAME
    if (!isAlphabetical(firstName)) {
        showError("First Name must contain alphabetical letters only.");
        return false;
    }
    if (!isAlphabetical(lastName)) {
        showError("Last Name must contain alphabetical letters only.");
        return false;
    }
    
    // 3. CHECK IF EMAIL FORMAT IS VALID
    if (!isValidEmail(email)) {
        showError("Please enter a valid email address.");
        return false;
    }

    // 4. CHECK IF COUNTRY CODE IS NOT EMPTY
    if (countryCode === "none") {
        showError("Please select a country code.");
        return false;
    }

    // 5. CHECK IF SELECTED COUNTRY CODE IS "Other", THEN VALIDATE ADDITIONAL CODE
    if (countryCode === "other") {
        if (otherCountryCode.trim() == "") {
            showError("Please fill in the additional country code field.");
            return false;
        }
    
        if (!((otherCountryCode.startsWith("+") && otherCountryCode.length > 1 && isNumeric(otherCountryCode.slice(1))) || isNumeric(otherCountryCode))) {
            showError("Country code must be numerical (can also be started with '+').");
            return false;
        }
    }
    
    // 6. CHECK IF PHONE NUMBER FORMAT IS VALID
    if (!isNumeric(phoneNumber)) {
        showError("Phone Number must contain numbers only.");
        return false;
    }

    // 7. CHECK IF PHONE NUMBER STARTS WITH '0'
    if (phoneNumber.charAt(0) !== '0') {
        showError("Phone Number must start with '0'.");
        return false;
    }

    // 8. CHECK IF ToS CHECKBOX IS FILLED
    if (!termsOfService) {
        showError("Please agree to the Terms of Service.");
        return false;
    }

    // VALIDATIONS PASSED
    return true;
}

function isAlphabetical(str) {
    for (var i = 0; i < str.length; i++) {
        var char = str.charAt(i);
        if (!(char >= 'a' && char <= 'z') && !(char >= 'A' && char <= 'Z')) {
            return false;
        }
    }
    return true;
}

function isNumeric(str) {
    for (var i = 0; i < str.length; i++) {
        var char = str.charAt(i);
        if (!(char >= '0' && char <= '9')) {
            return false;
        }
    }
    return true;
}

// LET '@' AND '.' PASS THE TEST SINCE IT WILL BE USED IN EMAIL VALIDATION
function isAlphanumerical(str) {
    for (var i = 0; i < str.length; i++) {
        var char = str.charAt(i);
        if (!((char >= 'a' && char <= 'z') || 
              (char >= 'A' && char <= 'Z') || 
              (char >= '0' && char <= '9') || 
              char === '@' || char === '.')) {
            return false;
        }
    }
    return true;
}

function isValidEmail(email) {
    // Check email length (must not exceed 254 chars)
    if (email.length <= 254) {
        // Check for "@" and "."
        if (email.includes("@") && email.includes(".")) {
            // Check "@" and "." position
            var atIndex = email.indexOf("@");
            var dotIndex = email.indexOf(".");
            if (atIndex < dotIndex) {
                // Check for multiple "@" or "."
                if (
                    email.indexOf("@", atIndex + 1) === -1 && 
                    email.indexOf(".", dotIndex + 1) === -1
                ) {
                    // Check character between "@" and "."
                    if (dotIndex - atIndex > 1) {
                        // Check "." position
                        if (dotIndex !== email.length - 1) {
                            // Check for special characters
                            if (isAlphanumerical(email)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }
    return false;
}


