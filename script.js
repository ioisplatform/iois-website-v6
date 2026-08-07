// IOIS Platform Global Script.js

// 1. रजिस्ट्रेशन और डेटा सेविंग हैंडलर
function handleRegistration(event) {
    event.preventDefault();

    const photoInput = document.getElementById('userPhoto');
    if (photoInput && photoInput.files && photoInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            saveUserData(e.target.result);
        };
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        saveUserData("");
    }
}

function saveUserData(photoData) {
    const userId = 'IOIS' + Math.floor(100000 + Math.random() * 900000);
    const joinDate = new Date().toLocaleString();
    
    const cardTier = document.getElementById('cardTier').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const sponsorId = document.getElementById('sponsorId').value;
    const paymentInfo = document.getElementById('paymentInfo').value;
    const password = document.getElementById('password').value;

    const userData = { userId, fullName, email, whatsapp, sponsorId, paymentInfo, password, cardTier, joinDate, photo: photoData };
    
    // ब्राउज़र के इंटरनल लोकल स्टोरेज में सेव करना
    localStorage.setItem(userId, JSON.stringify(userData));
    localStorage.setItem('currentUser', userId);

    // टेलीग्राम बोट ऑटो नोटिफिकेशन
    const botToken = "8838741922:AAFGoIvjohnF8FvEiW84h3SxaX2NeANLC50";
    const chatId = "964524685";
    const message = `🔔 *New Secure Registration!*\n🆔 ID: ${userId}\n👤 Name: ${fullName}\n📱 WhatsApp: ${whatsapp}\n📦 Plan: ${cardTier}`;
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`).catch(err => console.log(err));

    alert(`🎉 बहुत-बधाई हो! आपका रजिस्ट्रेशन सफल रहा।\n\nआपकी यूनिक यूजर आईडी (इसे कॉपी कर लें):\n👉 ${userId}\n\nअब आपको आपके डैशबोर्ड पर ले जाया जा रहा है।`);
    window.location.href = 'dashboard.html';
}

// 2. सिक्योर लॉगिन हैंडलर
function handleLogin(event) {
    event.preventDefault();
    const id = document.getElementById('loginId').value.trim();
    const pass = document.getElementById('loginPass').value.trim();

    const storedUser = localStorage.getItem(id);
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === pass) {
            localStorage.setItem('currentUser', id);
            alert('लॉगिन सफल रहा!');
            window.location.href = 'dashboard.html';
        } else {
            alert('गलत पासवर्ड! कृपया सही पासवर्ड दर्ज करें।');
        }
    } else {
        alert('यह यूजर आईडी रजिस्टर नहीं है!');
    }
}

// 3. डायरेक्ट वेबसाइट से अकाउंट रिकवरी (WhatsApp के जरिए)
function recoverAccount() {
    const wh = prompt("अपना रजिस्टर किया हुआ 10 अंकों का व्हाट्सएप नंबर दर्ज करें:");
    if(!wh) return;
    
    let found = false;
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if(key && key.startsWith('IOIS')) {
            const data = JSON.parse(localStorage.getItem(key));
            if(data.whatsapp === wh) {
                alert(`✅ आपकी जानकारी मिल गई!\n\nUser ID: ${data.userId}\nPassword: ${data.password}\nName: ${data.fullName}`);
                found = true;
                break;
            }
        }
    }
    if(!found) {
        alert('इस व्हाट्सएप नंबर से कोई अकाउंट नहीं मिला!');
    }
}

// 4. रेफरल लिंक कॉपी करने का फंक्शन
function copyLink() {
    const copyText = document.getElementById("refLink");
    if(copyText) {
        copyText.select();
        copyText.setSelectionRange(0, 99999); // मोबाइल सपोर्ट के लिए
        document.execCommand("copy");
        alert("रेफरल लिंक कॉपी हो गया!");
    }
}

// 5. लॉगआउट फंक्शन
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
