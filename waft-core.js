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

    // --- 2. ウィンドウ・パラノイア (Window Paranoia) ---
    // 作品リンク（data-waft-id="idx-a"など）を押すと小さな別窓風UIが出る演出
    const openParanoia = (title, content) => {
        const win = document.createElement('div');
        win.className = 'paranoia-window';
        win.style.top = Math.random() * 50 + 20 + '%';
        win.style.left = Math.random() * 50 + 20 + '%';
        win.innerHTML = `<div class="win-header">LOG_FRAGMENT [${title}] <span class="win-close">×</span></div>
                         <div class="win-body">${content}</div>`;
        document.body.appendChild(win);
        win.querySelector('.win-close').onclick = () => win.remove();
    };

    // --- 3. 観測者登録（突き放しの能動性） ---
    // もしサイト内に <div id="register-trigger"></div> があれば起動
    const regZone = document.getElementById('registration-zone');
    if (regZone) {
        regZone.innerHTML = `
            <p>【共同編纂者登録プロトコル】</p>
            <input type="text" id="reg-name" placeholder="名称を定義してください">
            <textarea id="reg-memo" placeholder="あなたの境界線を記述してください"></textarea>
            <button id="reg-btn">EXISTENCE SUBMIT</button>
            <div id="reg-msg"></div>
        `;
        document.getElementById('reg-btn').onclick = () => {
            const msg = document.getElementById('reg-msg');
            msg.innerText = "エラー：入力された存在は既に「忘却」のプロセスに含まれています。";
            msg.style.color = "var(--accent-red)";
            setTimeout(() => {
                msg.innerText = "青ya、跨：君のことは、僕がもう知っているよ。書かなくていい。";
            }, 2000);
        };
    }

    // --- 4. 隠しコマンド (waft) ---
    let cmd = "";
    document.addEventListener('keydown', (e) => {
        cmd += e.key;
        if (cmd.endsWith("waft")) {
            document.body.style.filter = "invert(1) hue-rotate(180deg)";
            console.log("%c[ADMIN] 管理者権限が励起されました。三条瞳：誰がここを開けた？", "background:red; color:white;");
            cmd = "";
        }
    });

    // --- 5. リアルタイム・ポルターガイスト ---
    setTimeout(() => {
        setInterval(() => {
            if (Math.random() > 0.95) {
                window.scrollBy(0, (Math.random() - 0.5) * 100);
                document.body.classList.add('glitch');
                setTimeout(() => document.body.classList.remove('glitch'), 150);
            }
        }, 2000);
    }, 60000); // 1分後に開始

    // 既存のクリック演出
    document.querySelectorAll('[data-waft-id]').forEach(el => {
        el.addEventListener('click', (e) => {
            if (el.getAttribute('href') === 'archive.html') {
                console.log("青ya、跨：過去を覗きに行くんだね。");
            }
        });
    });
});