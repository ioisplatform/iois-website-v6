// Toggle 3-Line Menu
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

// Check Admin Privileges (Only show Admin Panel if user is Vikas or admin ID)
window.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');
    const adminLink = document.getElementById('adminMenuLink');
    
    // यहाँ आप अपनी एडमिन आईडी सेट कर सकते हैं (जैसे 'IOIS123456' या आपका नंबर)
    if (currentUser && (currentUser === 'IOISADMIN' || currentUser.includes('8877490845') || localStorage.getItem(currentUser)?.whatsapp === '8877490845')) {
        if(adminLink) adminLink.style.display = 'block';
    } else {
        if(adminLink) adminLink.style.display = 'none';
    }
});

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
