document.addEventListener('DOMContentLoaded', () => {
    // --- 1. 基礎環境：ノイズと瞳 ---
    const canvas = document.createElement('canvas');
    canvas.id = 'grain-canvas';
    Object.assign(canvas.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: '9999', opacity: '0.06'
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);
    resize();
    const noise = () => {
        const idata = ctx.createImageData(canvas.width, canvas.height);
        const buffer32 = new Uint32Array(idata.data.buffer);
        for (let i = 0; i < buffer32.length; i++) if (Math.random() < 0.5) buffer32[i] = 0xffffffff;
        ctx.putImageData(idata, 0, 0);
        setTimeout(noise, 50);
    };
    noise();

    const eye = document.createElement('div');
    eye.id = 'giant-eye';
    document.body.appendChild(eye);

    // --- 2. ウィンドウ・パラノイア ---
    const openParanoia = (id) => {
        const win = document.createElement('div');
        win.className = 'paranoia-window';
        win.style.top = Math.random() * 40 + 20 + '%';
        win.style.left = Math.random() * 40 + 20 + '%';
        
        // IDによって中身を変えることも可能
        const message = "やあ、こんにちは……ふふ、一瞬の足止め、してみているよ";
        
        win.innerHTML = `<div class="win-header">LOG_FRAGMENT [${id}] <span class="win-close">×</span></div>
                         <div class="win-body">${message}</div>`;
        document.body.appendChild(win);
        win.querySelector('.win-close').onclick = () => win.remove();
    };

    // --- 3. 観測者登録（突き放しギミック） ---
    const regBtn = document.getElementById('reg-btn');
    if (regBtn) {
        regBtn.onclick = () => {
            const msg = document.getElementById('reg-msg');
            msg.innerText = "エラー：入力された存在は既に";
            msg.style.color = "var(--accent-red)";
            setTimeout(() => {
                msg.innerText = "青ya、跨：君のことは、僕がもう知っているよ。書かなくていい。";
                msg.style.color = "#777";
            }, 2000);
        };
    }

    // --- 4. 隠しコマンド (waft) ---
    let cmd = "";
    document.addEventListener('keydown', (e) => {
        cmd += e.key.toLowerCase();
        if (cmd.endsWith("waft")) {
            document.body.style.filter = "invert(1) hue-rotate(180deg)";
            console.log("%c[ADMIN] 管理者権限が励起されました。三条瞳：誰がここを開けたの？", "background:red; color:white; padding:2px 5px;");
            cmd = "";
        }
    });

    // --- 5. リンク干渉とポルターガイスト ---
    document.querySelectorAll('a').forEach(el => {
        el.addEventListener('click', (e) => {
            const id = el.getAttribute('data-waft-id') || "UNKNOWN";
            const href = el.getAttribute('href');

            if (href === 'archive.html') {
                console.log("青ya、跨：過去を覗きに行くんだね。");
            }

            // 確率でパラノイアウィンドウを発生させる（30%の確率）
            if (Math.random() < 0.3) {
                e.preventDefault();
                openParanoia(id);
            }
        });
    });

    setTimeout(() => {
        setInterval(() => {
            if (Math.random() > 0.98) { // 稀に発生
                window.scrollBy(0, (Math.random() - 0.5) * 200);
                document.body.style.transform = `translateX(${(Math.random()-0.5)*10}px)`;
                setTimeout(() => document.body.style.transform = "none", 100);
            }
        }, 2000);
    }, 60000); // 1分後に開始
});