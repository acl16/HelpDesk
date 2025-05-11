document.getElementById("signupForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const messageDiv = document.getElementById("message");
    messageDiv.innerHTML = "Processing...";

    const roleId = 1;  
    const createdAt = new Date();  

    try {
        const res = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, email, password, roleId, createdAt }) 
        });

        const resultText = await res.text();
        messageDiv.innerHTML = resultText;

        if (res.ok) {
            document.getElementById("signupForm").reset();
            window.location.href = '/user-dashboard';
        }

    } catch (err) {
        console.error("Signup error:", err);
        messageDiv.innerHTML = "Something went wrong!";
    }
});
