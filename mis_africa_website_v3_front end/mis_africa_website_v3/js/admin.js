import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const logoutBtn = document.getElementById('logout-btn');
const submissionsBody = document.getElementById('submissions-body');

// Auth State Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        loginSection.style.display = 'none';
        dashboardSection.style.display = 'block';
        loadSubmissions();
    } else {
        // User is signed out
        loginSection.style.display = 'block';
        dashboardSection.style.display = 'none';
    }
});

// Login Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const errorMsg = document.getElementById('login-error');

    try {
        await signInWithEmailAndPassword(auth, email, password);
        errorMsg.textContent = '';
    } catch (error) {
        console.error("Login failed", error);
        errorMsg.textContent = 'Invalid email or password.';
    }
});

// Logout Handler
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout failed", error);
    }
});

// Load Submissions
async function loadSubmissions() {
    submissionsBody.innerHTML = '<tr><td colspan="6">Loading...</td></tr>';

    try {
        const q = query(collection(db, "submissions"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        submissionsBody.innerHTML = ''; // Clear loading

        if (querySnapshot.empty) {
            submissionsBody.innerHTML = '<tr><td colspan="6">No submissions found.</td></tr>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString() : 'N/A';

            const row = `
                <tr>
                    <td>${date}</td>
                    <td>${data.fullname}<br><small>${data.email}</small></td>
                    <td>${data.role}</td>
                    <td>${data.institution}</td>
                    <td>${data.abstractTitle}</td>
                    <td>
                        ${data.fileUrl ? `<a href="${data.fileUrl}" target="_blank" class="btn btn-primary" style="padding: 5px 10px; font-size: 0.8rem;">View File</a>` : 'No File'}
                    </td>
                </tr>
            `;
            submissionsBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading submissions:", error);
        submissionsBody.innerHTML = '<tr><td colspan="6" style="color:red;">Error loading data. Check console.</td></tr>';
    }
}
