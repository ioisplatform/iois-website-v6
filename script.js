// Toggle 3-Line Menu
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Check Admin Privileges & Session Handler
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    const adminLink = document.getElementById('adminMenuLink');
    
    // एडमिन आईडी 'ioisowner' सेट की गई है
    if (currentUser && currentUser.toLowerCase() === 'ioisowner') {
        if(adminLink) adminLink.style.display = 'block';
    } else {
        if(adminLink) adminLink.style.display = 'none';
    }
});

// Login Validation Logic
function handleLogin(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value.trim();

    // एडमिन लॉगिन चेक
    if (usernameInput === 'ioisowner' && passwordInput === 'iois1234567890') {
        localStorage.setItem('currentUser', 'ioisowner');
        alert('एडमिन लॉगिन सफल!');
        window.location.href = 'admin.html';
        return;
    }

    // सामान्य यूजर लॉगिन चेक (लोकल स्टोरेज से)
    const storedUser = localStorage.getItem(usernameInput);
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === passwordInput) {
            localStorage.setItem('currentUser', usernameInput);
            alert('लॉगिन सफल!');
            window.location.href = 'dashboard.html';
            return;
        }
    }
    
    alert('गलत यूजरनेम या पासवर्ड! कृपया पुनः प्रयास करें।');
}

// Plan Click Modal Handler
function openPlanModal(planName, price, details) {
    document.getElementById('modalTitle').innerText = planName + " (" + price + ")";
    document.getElementById('modalDetails').innerText = details;
    document.getElementById('selectedPlanInput').value = planName + " (" + price + ")";
    document.getElementById('planModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('planModal').style.display = 'none';
}

function proceedToRegister() {
    const chosenPlan = document.getElementById('selectedPlanInput').value;
    localStorage.setItem('prefilledPlan', chosenPlan);
    window.location.href = 'register.html';
}

// Copy Link & Logout functions
function copyLink() {
    const copyText = document.getElementById("refLink");
    if(copyText) {
        copyText.select();
        document.execCommand("copy");
        alert("रेफरल लिंक कॉपी हो गया!");
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
