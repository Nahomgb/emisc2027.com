document.addEventListener('DOMContentLoaded', function () {
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeMessage = document.getElementById('subscribe-message');
    const subscriberEmail = document.getElementById('subscriber-email');
    const submitBtn = subscribeForm.querySelector('button[type="submit"]');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = subscriberEmail.value;

            if (!email) return;

            // Simple client-side validation
            if (!validateEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }

            // IMPORTANT: Updated to use Google Forms for no-code storage
            const FORM_URL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeK_IvQIWvzQ2tW_ssAXTEhOqW7nb45PkfU_PQrWHyUthd0NQ/formResponse';
            const EMAIL_ID = 'entry.1714420102'; // The ID for your email question

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            showMessage('Processing...', '');

            // Use URLSearchParams for compatibility with Google Forms
            const params = new URLSearchParams();
            params.append(EMAIL_ID, email);

            // Send data to Google Forms
            fetch(FORM_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            })
                .then(() => {
                    // With no-cors, we assume success if no network error occurs
                    showMessage('Thank you for subscribing! We will keep you updated.', 'success');
                    subscribeForm.reset();
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    showMessage('Something went wrong. Please try again later.', 'error');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Subscribe';
                });
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showMessage(msg, type) {
        subscribeMessage.textContent = msg;
        subscribeMessage.className = 'subscribe-message ' + type;
    }
});
