import { db, storage } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const form = document.getElementById('registration-form');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // UI Feedback
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = 'Submitting...';
    submitBtn.disabled = true;

    try {
        // 1. Get Form Data
        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const institution = document.getElementById('institution').value;
        const role = document.getElementById('role').value;
        const abstractTitle = document.getElementById('abstract-title').value;
        const abstractBody = document.getElementById('abstract-body').value;
        const fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];

        let fileUrl = null;

        // 2. Upload File (if exists)
        if (file) {
            const storageRef = ref(storage, 'abstracts/' + Date.now() + '_' + file.name);
            const snapshot = await uploadBytes(storageRef, file);
            fileUrl = await getDownloadURL(snapshot.ref);
        }

        // 3. Save to Firestore
        await addDoc(collection(db, "submissions"), {
            fullname,
            email,
            institution,
            role,
            abstractTitle,
            abstractBody,
            fileUrl,
            timestamp: serverTimestamp()
        });

        // 4. Success Feedback
        alert('Registration and Abstract submitted successfully!');
        form.reset();

    } catch (error) {
        console.error("Error submitting form:", error);
        alert('Error submitting form. Please try again.');
    } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
    }
});
