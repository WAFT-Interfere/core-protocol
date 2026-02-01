// WAFT Core System - 2026 Revised
document.addEventListener('DOMContentLoaded', () => {
    // 1. 粒状ノイズの生成 (Canvas)
    const canvas = document.createElement('canvas');
    canvas.id = 'grain-canvas';
    Object.assign(canvas.style, {
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: '9999', opacity: '0.07'
    });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const drawNoise = () => {
        const w = canvas.width, h = canvas.height;
        const idata = ctx.createImageData(w, h);
        const buffer32 = new Uint32Array(idata.data.buffer);
        for (let i = 0; i < buffer32.length; i++) {
            if (Math.random() < 0.5) buffer32[i] = 0xffffffff;
        }
        ctx.putImageData(idata, 0, 0);
        setTimeout(drawNoise, 60);
    };
    drawNoise();

    // 2. コンソールログでの語りかけ (第四の壁の侵食)
    console.clear();
    console.log("%c[SYSTEM] WAFT Terminal Initialized.", "color: #555; font-family: monospace; font-weight: bold;");
    console.log("%c三条瞳：観測ログを開始。データの整合性に注意してください。", "color: #900; border-left: 2px solid #900; padding-left: 10px;");
    console.log("%c青ya、跨：……やあ。見つかっちゃったかな。君がこれを読んでいるとき、僕はどこにいるんだろうね。", "color: #00f; border-left: 2px solid #00f; padding-left: 10px;");

    // 3. 忘却システム (localStorageを使用した物理的消滅)
    const forgottenIds = JSON.parse(localStorage.getItem('waft_forgotten') || '[]');
    document.querySelectorAll('[data-waft-id]').forEach(el => {
        const id = el.getAttribute('data-waft-id');
        if (forgottenIds.includes(id)) {
            el.style.display = 'none'; // 物理的に消去
        }
        el.addEventListener('click', () => {
            if (!forgottenIds.includes(id)) {
                forgottenIds.push(id);
                localStorage.setItem('waft_forgotten', JSON.stringify(forgottenIds));
            }
        });
    });

    // 4. 放置による実存の消失 (15秒放置でフェードアウト)
    let idleTimer;
    const fadeOut = () => {
        document.body.style.transition = "opacity 10s ease-in-out";
        document.body.style.opacity = "0";
    };
    const resetIdle = () => {
        clearTimeout(idleTimer);
        document.body.style.transition = "opacity 0.2s";
        document.body.style.opacity = "1";
        idleTimer = setTimeout(fadeOut, 15000);
    };
    ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(e => document.addEventListener(e, resetIdle));
    resetIdle();
});