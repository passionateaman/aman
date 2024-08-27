document.querySelector('.login__submit').addEventListener('click', async (e) => {
    e.preventDefault();

    // Get the email and password values from the form
    const email = document.querySelector('.login__input[type="text"]').value;
    const password = document.querySelector('.login__input[type="password"]').value;

    try {
        // Send a POST request to the login endpoint
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response JSON
        const data = await response.json();

        // Handle the response
        if (data.msg) {
            alert(data.msg);
            console.log('User data:', data.user);
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred');
    }
});
