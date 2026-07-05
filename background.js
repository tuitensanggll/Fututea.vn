// ============================================
// AI Background v1.0
// ============================================

const spotlight = document.querySelector(".spotlight");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateSpotlight() {

    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;

    if (spotlight) {
        spotlight.style.left = currentX + "px";
        spotlight.style.top = currentY + "px";
    }

    requestAnimationFrame(animateSpotlight);
}

animateSpotlight();



// ===========================
// Blob Parallax
// ===========================

const blobs = document.querySelectorAll(".blob");

document.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    blobs.forEach((blob, index) => {

        const depth = (index + 1) * 8;

        blob.style.transform =
            `translate(${x / depth}px, ${y / depth}px)`;

    });

});




// ===========================
// Aurora Rotation
// ===========================

const auroras = document.querySelectorAll(".aurora");

let angle = 0;

function animateAurora() {

    angle += 0.02;

    auroras.forEach((item, index) => {

        const rotate = angle * (index + 1);

        item.style.transform =
            `rotate(${rotate}deg)`;

    });

    requestAnimationFrame(animateAurora);

}

animateAurora();




// ===========================
// Floating Glow
// ===========================

const glows = document.querySelectorAll(".glow");

let t = 0;

function animateGlow() {

    t += 0.01;

    glows.forEach((g, i) => {

        const offset =
            Math.sin(t + i) * 30;

        g.style.transform =
            `translateY(${offset}px)`;

    });

    requestAnimationFrame(animateGlow);

}

animateGlow();




// ===========================
// Window Resize
// ===========================

window.addEventListener("resize", () => {

    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;

});


// ===========================
// Performance
// ===========================

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {

        console.log("Background paused");

    } else {

        console.log("Background resumed");

    }

});

// ============================================
// FUTU RÔ BÔ - Chatbot thông minh
// ============================================

let chatOpen = false;
function toggleChat() {
    chatOpen = !chatOpen;
    document.getElementById('chatbot-view').style.display  = chatOpen ? 'flex' : 'none';
    document.getElementById('chat-toggle-btn').style.display = chatOpen ? 'none' : 'flex';
}

/* ===== BỎ DẤU TIẾNG VIỆT (để nhận diện câu gõ không dấu) ===== */
function boDau(str) {
    return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .toLowerCase();
}

/* ===== KHOẢNG CÁCH LEVENSHTEIN (so khớp gần đúng, chịu sai chính tả) ===== */
function levenshtein(a, b) {
    const dp = Array.from({length: a.length + 1}, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            dp[i][j] = a[i-1] === b[j-1]
                ? dp[i-1][j-1]
                : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
        }
    }
    return dp[a.length][b.length];
}

/* ===== DANH SÁCH Ý ĐỊNH (INTENT) — mỗi ý định có nhiều từ khóa/đồng nghĩa ===== */
const intents = [
    {
        id: 'menu',
        keywords: ['menu', 'mon', 'thuc don', 'co gi', 'ban gi', 'danh sach', 'uong gi'],
        reply: 'Menu hiện có: 🍋 Trà chanh tươi (15k), 🍃 Trà chanh thái xanh (15k), 🫧 Trà chanh hạt chia (17k), ➕ Topping thêm (5k). Bạn xem chi tiết ở phần sản phẩm phía trên nhé!',
        quickReplies: ['Giá bao nhiêu', 'Có ship không']
    },
    {
        id: 'gia',
        keywords: ['gia', 'bao nhieu tien', 'price', 'bn tien', 'cost'],
        reply: 'Giá dao động 5.000đ – 17.000đ tùy món 💰 (Trà chanh tươi 15k, hạt chia 17k, topping thêm 5k). Bạn muốn xem menu đầy đủ không?',
        quickReplies: ['Xem menu']
    },
    {
        id: 'gio_mo_cua',
        keywords: ['gio', 'mo cua', 'dong cua', 'open', 'gio giac', 'khi nao mo'],
        reply: 'Futu Tea mở bán tất cả các ngày trong tuần, từ 08:00 sáng đến 24:00 khuya 🕖 — kể cả cuối tuần luôn nha!'
    },
    {
        id: 'dia_chi',
        keywords: ['dia chi', 'o dau', 'cho nao', 'vi tri', 'quan o', 'tim quan'],
        reply: 'Futu Tea ở KDC Lê Phong 1, KP.Đổng Tác, P.Tân Đông Hiệp, TP.HCM 📍 Bạn cần mình gửi thêm chỉ đường không?'
    },
    {
        id: 'ship',
        keywords: ['ship', 'giao hang', 'delivery', 'phi ship', 'giao tan noi', 'co giao khong'],
        reply: 'Có giao hàng tận nơi nha! 🚚 Bạn để lại địa chỉ ở phần Thanh toán, shop sẽ liên hệ xác nhận thời gian giao nhé.',
        quickReplies: ['Số điện thoại']
    },
    {
        id: 'lien_he',
        keywords: ['sdt', 'so dien thoai', 'hotline', 'lien he', 'phone', 'goi dien', 'zalo'],
        reply: 'Hotline: 0794 392 411 hoặc 0975 944 623 📞 Bạn có thể gọi trực tiếp để đặt hàng nhanh!'
    },
    {
        id: 'thanh_toan',
        keywords: ['thanh toan', 'chuyen khoan', 'tra tien', 'payment', 'qr', 'quet ma'],
        reply: 'Sau khi chọn món và bấm Thanh toán, bạn điền thông tin nhận hàng rồi quét mã QR để chuyển khoản nhé 🧾 Rất nhanh gọn!'
    },
    {
        id: 'khuyen_mai',
        keywords: ['khuyen mai', 'giam gia', 'uu dai', 'sale', 'discount', 'ma giam gia'],
        reply: 'Hiện tại theo dõi TikTok @trachanh_futu để cập nhật ưu đãi mới nhất nha, tụi mình có đăng deal cuối tuần khá thường xuyên 🎉'
    },
    {
        id: 'sang_lap',
        keywords: ['sang lap', 'founder', 'chu quan', 'ai lap', 'ai sang lap'],
        reply: 'Futu Tea được đồng sáng lập bởi 2 sinh viên Võ Thanh Sang và Trần Kim Hưng, thuộc FUTU GROUP 🏢'
    },
    {
        id: 'cam_on',
        keywords: ['cam on', 'thanks', 'thank you', 'cảm', 'tks'],
        reply: 'Không có chi! Rất vui được phục vụ bạn 😄 Chúc bạn một ngày tốt lành nhé!'
    },
    {
        id: 'chao',
        keywords: ['xin chao', 'hello', 'hi', 'chao ban', 'alo'],
        reply: 'Xin chào! Futu Rô Bô đây 🤖 Bạn cần mình giúp gì nè?',
        quickReplies: ['Xem menu', 'Giờ mở cửa']
    },
    {
        id: 'tam_biet',
        keywords: ['tam biet', 'bye', 'hen gap lai', 'ngung'],
        reply: 'Hẹn gặp lại bạn nhé! Futu Tea luôn chờ bạn ghé quán 🍵💚'
    }
];

// Tất cả từ khóa gộp lại, dùng để tìm ý định gần đúng khi không khớp trực tiếp
const allKeywordsFlat = intents.flatMap(it => it.keywords.map(k => ({ intent: it, kw: k })));

function timNhieuYDinh(vBoDau) {
    // Trả về TẤT CẢ ý định khớp trực tiếp trong câu (hỗ trợ hỏi ghép nhiều ý)
    return intents.filter(it => it.keywords.some(k => vBoDau.includes(k)));
}

function doanYDinhGanDung(vBoDau) {
    // Khi không khớp trực tiếp, tìm từ khóa gần giống nhất (chịu sai chính tả)
    const tokens = vBoDau.split(/\s+/).filter(t => t.length > 2);
    let best = null, bestDist = 3; // ngưỡng chấp nhận
    for (const token of tokens) {
        for (const { intent, kw } of allKeywordsFlat) {
            const kwFirstWord = kw.split(' ')[0];
            const dist = levenshtein(token, kwFirstWord);
            if (dist < bestDist) { bestDist = dist; best = intent; }
        }
    }
    return best;
}

function getBotReply(msg) {
    const v = boDau(msg.trim());
    if (!v) return { text: 'Bạn nhắn gì đó cho Futu Rô Bô nghe với 😊', quickReplies: [] };

    const matched = timNhieuYDinh(v);

    if (matched.length > 0) {
        // Hỏi ghép nhiều ý -> gộp câu trả lời, tối đa 2 ý để khỏi dài dòng
        const uniqueMatched = matched.slice(0, 2);
        const text = uniqueMatched.map(it => it.reply).join('<br><br>');
        const quickReplies = uniqueMatched.flatMap(it => it.quickReplies || []).slice(0, 3);
        return { text, quickReplies };
    }

    // Không khớp trực tiếp -> thử đoán ý định gần đúng (chịu sai chính tả)
    const guess = doanYDinhGanDung(v);
    if (guess) {
        return {
            text: `Ý bạn có phải muốn hỏi về "${guess.id.replace(/_/g,' ')}" không? 🤔<br><br>${guess.reply}`,
            quickReplies: guess.quickReplies || []
        };
    }

    // Bó tay hoàn toàn -> gợi ý các chủ đề có thể hỏi
    return {
        text: 'Futu Rô Bô chưa hiểu ý bạn lắm 😅 Bạn có thể hỏi mình về:',
        quickReplies: ['Xem menu', 'Giá bao nhiêu', 'Giờ mở cửa', 'Địa chỉ ở đâu']
    };
}

function renderQuickReplies(list) {
    if (!list || list.length === 0) return '';
    const btns = list.map(q => `<button class="quick-reply-btn" onclick="sendQuick('${q.replace(/'/g,"\\'")}')">${escHtml(q)}</button>`).join('');
    return `<div class="quick-replies">${btns}</div>`;
}

function sendQuick(text) {
    const inp = document.getElementById('chat-input');
    inp.value = text;
    sendChat();
}

function sendChat() {
    const inp  = document.getElementById('chat-input');
    const body = document.getElementById('chat-body');
    const text = inp.value.trim();
    if (!text) return;

    // Xóa quick-reply cũ khi khách gửi tin mới (tránh bấm lại nút cũ)
    document.querySelectorAll('.quick-replies').forEach(el => el.remove());

    body.innerHTML += `<div class="message user-msg">${escHtml(text)}</div>`;
    inp.value = '';
    body.scrollTop = body.scrollHeight;

    // Hiện hiệu ứng "đang gõ..."
    body.innerHTML += `<div class="typing-indicator" id="typing-now"><span></span><span></span><span></span></div>`;
    body.scrollTop = body.scrollHeight;

    setTimeout(() => {
        const typingEl = document.getElementById('typing-now');
        if (typingEl) typingEl.remove();

        const { text: reply, quickReplies } = getBotReply(text);
        body.innerHTML += `<div class="message bot-msg">${reply}</div>`;
        body.innerHTML += renderQuickReplies(quickReplies);
        body.scrollTop = body.scrollHeight;
    }, 600 + Math.random() * 400);
}

function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
