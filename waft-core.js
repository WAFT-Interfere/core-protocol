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

    // 3. ウィンドウ・パラノイア（順序出現）
    let paranoiaCount = 0;
    const paranoiaMessages = ["やあ", "どうも", "ふふ", "邪魔、しているよ", "鬱陶しい？"];

    const openParanoia = (id) => {
        const win = document.createElement('div');
        win.className = 'paranoia-window';
        win.style.top = (20 + Math.random() * 30) + '%';
        win.style.left = (5 + Math.random() * 10) + '%';
        
        const message = paranoiaMessages[paranoiaCount % paranoiaMessages.length];
        paranoiaCount++;
        
        win.innerHTML = `<div class="win-header">LOG_FRAGMENT [${id}] <span class="win-close">×</span></div>
                         <div class="win-body">${message}</div>`;
        document.body.appendChild(win);
        win.querySelector('.win-close').onclick = () => win.remove();
    };

    // 4. 隠しコマンド (waft)
    let cmd = "";
    document.addEventListener('keydown', (e) => {
        cmd += e.key.toLowerCase();
        if (cmd.endsWith("waft")) {
            document.body.style.filter = "invert(1) hue-rotate(180deg)";
            console.log("%c[ADMIN] 管理者権限が励起されました。三条瞳：誰がここを開けたの？", "background:#0000FF; color:white; padding:2px 5px;");
            cmd = "";
        }
    });

    // 5. リンク干渉
    document.querySelectorAll('a').forEach(el => {
        el.addEventListener('click', (e) => {
            const href = el.getAttribute('href');
            if (!href || href.startsWith('http')) return;

            e.preventDefault();
            const id = el.getAttribute('data-waft-id') || "LOG";
            
            if (href === 'archive.html') {
                console.log("青yaヽ跨：過去を覗きに行くんだね。");
            }

            openParanoia(id);
            
            setTimeout(() => {
                window.location.href = href;
            }, 1200);
        });
    });

    // 6. 登録ボタンギミック
    const regBtn = document.getElementById('reg-btn');
    if (regBtn) {
        regBtn.onclick = () => {
            const msg = document.getElementById('reg-msg');
            msg.innerText = "エラー：入力された存在は既に";
            msg.style.color = "var(--accent-blue)";
            setTimeout(() => {
                msg.innerText = "青yaヽ跨：君のことは、僕がもう知っているよ。書かなくていい。";
                msg.style.color = "#777";
            }, 2000);
        };
    }
});