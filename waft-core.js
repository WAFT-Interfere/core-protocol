document.addEventListener('DOMContentLoaded', () => {
    // 1. ノイズ生成
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

    // 2. 瞳
    const eye = document.createElement('div');
    eye.id = 'giant-eye';
    document.body.appendChild(eye);

    // 3. 執拗な連鎖干渉（パラノイア・チェイン）
    let isChaining = false;
    let chainStep = 0;
    let targetHref = "";
    let targetId = "";

    const paranoiaMessages = ["やあ", "どうも", "ふふ", "邪魔、しているよ"];

    const showWindow = (msg) => {
        const win = document.createElement('div');
        win.className = 'paranoia-window';
        win.style.top = (20 + Math.random() * 35) + '%';
        win.style.left = (Math.random() * 15) + '%';
        win.innerHTML = `<div class="win-header">LOG_FRAGMENT [${targetId || 'LOG'}] <span class="win-close">×</span></div>
                         <div class="win-body">${msg}</div>`;
        document.body.appendChild(win);
        win.querySelector('.win-close').onclick = () => win.remove();
    };

    const finalSequence = () => {
        // 読めるように1.2秒（1200ms）間隔に設定
        setTimeout(() => showWindow("鬱陶しい？"), 1200);
        setTimeout(() => showWindow("……ごめんね"), 2400);
        setTimeout(() => showWindow("解放してあげる"), 3600);
        setTimeout(() => {
            if (targetHref) window.location.href = targetHref;
        }, 5500);
    };

    document.addEventListener('click', (e) => {
        if (!isChaining) return;
        if (e.target.tagName === 'A') e.preventDefault();
        if (chainStep < paranoiaMessages.length) {
            showWindow(paranoiaMessages[chainStep]);
            chainStep++;
            if (chainStep === paranoiaMessages.length) {
                isChaining = false;
                finalSequence();
            }
        }
    }, true);

    // 4. リンク干渉
    document.querySelectorAll('a').forEach(el => {
        el.addEventListener('click', (e) => {
            const href = el.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#')) return;

            // 確率を5%(0.05)に設定
            if (!isChaining && Math.random() < 0.05) {
                e.preventDefault();
                isChaining = true;
                chainStep = 0;
                targetHref = href;
                targetId = el.getAttribute('data-waft-id') || "LOG";
                showWindow(paranoiaMessages[0]);
                chainStep = 1;
            }
        });
    });

    // 5. 登録ボタン（青yaヽ跨のみ）
    const regBtn = document.getElementById('reg-btn');
    if (regBtn) {
        regBtn.onclick = () => {
            const msg = document.getElementById('reg-msg');
            msg.innerText = "青yaヽ跨：君のことは、僕がもう知っているよ。書かなくていい。";
            msg.style.color = "var(--accent-blue)";
        };
    }

    // 6. 隠しコマンド (waft)
    let cmd = "";
    document.addEventListener('keydown', (e) => {
        cmd += e.key.toLowerCase();
        if (cmd.endsWith("waft")) {
            document.body.style.filter = "invert(1) hue-rotate(180deg)";
            console.log("%c[ADMIN] 管理者権限が励起されました。三条瞳：誰がここを開けたの？", "background:#0000FF; color:white; padding:2px 5px;");
            cmd = "";
        }
    });
});