async function signup() {
    try {
        // Get form input values
        var username = document.getElementById("usernames").value;
        var email = document.getElementById("email").value;
        var telphone = document.getElementById("telphone").value;
        var birthday = document.getElementById("birtday").value;
        var address = document.getElementById("address").value;
        var password = document.getElementById("password").value;
        var otpExpiresAt = document.getElementById("otpExpiresAt").value;
        
        // Construct the user object to send to the server
        var user = {
            username: username,
            email: email,
            telphone: telphone,
            birthday: birthday,
            address: address,
            password: password,
            otpExpiresAt: otpExpiresAt,
            role: "user"
        };

        console.log("Signup data:", user);

        // Make the POST request to the server
        const apiUrl = "http://localhost:5000/api/user/post";
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`Failed to register user. Status: ${response.status}`);
        }

        console.log("User registered successfully!");
        document.getElementById("reg-success").textContent = "Signup successful!";
        setTimeout(function () {
            window.location.href = "../pages/login.html"
          }, 2000);
    
    } catch (error) {
        console.error("Error during signup:", error);
        document.getElementById("reg-success").textContent = "Error during signup: " + error.message;
    }

}
