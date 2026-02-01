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
        win.style.top = (20 + Math.random() * 40) + '%';
        win.style.left = (10 + Math.random() * 20) + '%';
        win.innerHTML = `<div class="win-header">LOG_FRAGMENT [${targetId || 'LOG'}] <span class="win-close">×</span></div>
                         <div class="win-body">${msg}</div>`;
        document.body.appendChild(win);
        win.querySelector('.win-close').onclick = () => win.remove();
    };

    const finalSequence = () => {
        setTimeout(() => showWindow("鬱陶しい？"), 300);
        setTimeout(() => showWindow("……ごめんね"), 600);
        setTimeout(() => showWindow("解放してあげる"), 900);
        setTimeout(() => {
            if (targetHref) window.location.href = targetHref;
        }, 1500);
    };

    // 画面全体へのクリック検知（連鎖中のみ有効）
    document.addEventListener('click', (e) => {
        if (!isChaining) return;

        // リンク自体のデフォルト動作を無効化し続ける
        if (e.target.tagName === 'A') e.preventDefault();

        if (chainStep < paranoiaMessages.length) {
            showWindow(paranoiaMessages[chainStep]);
            chainStep++;
            if (chainStep === paranoiaMessages.length) {
                isChaining = false; // 最終シーケンスへ
                finalSequence();
            }
        }
    }, true);

    // 4. リンク干渉の開始
    document.querySelectorAll('a').forEach(el => {
        el.addEventListener('click', (e) => {
            const href = el.getAttribute('href');
            if (!href || href.startsWith('http')) return; // 外部リンクは除外

            // 低確率(20%)で連鎖開始。それ以外は即遷移
            if (!isChaining && Math.random() < 0.2) {
                e.preventDefault();
                isChaining = true;
                chainStep = 0;
                targetHref = href;
                targetId = el.getAttribute('data-waft-id') || "LOG";
                
                // 最初の「やあ」を表示
                showWindow(paranoiaMessages[0]);
                chainStep = 1;
            }
        });
    });

    // 5. 登録ボタンギミック（青yaヽ跨のメッセージのみ表示）
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