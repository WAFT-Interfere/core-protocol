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

    // 2. 瞳の生成
    const eye = document.createElement('div');
    eye.id = 'giant-eye';
    document.body.appendChild(eye);

    let idleTimer;
    const resetIdle = () => {
        clearTimeout(idleTimer);
        eye.style.opacity = '0';
        document.body.classList.remove('glitch');
        idleTimer = setTimeout(() => {
            eye.style.opacity = '0.7'; // 10秒放置で瞳が浮かぶ
            document.body.classList.add('glitch'); 
        }, 10000);
    };
    ['mousemove', 'keydown', 'click', 'touchstart'].forEach(e => document.addEventListener(e, resetIdle));
    resetIdle();

    // 3. 忘却と再励起
    document.querySelectorAll('[data-waft-id]').forEach(el => {
        el.addEventListener('click', () => {
            el.style.opacity = "0.1";
            el.style.pointerEvents = "none";
            setTimeout(() => {
                el.style.opacity = "0.4";
                el.style.pointerEvents = "auto";
            }, 5000);
        });
    });

    console.clear();
    console.log("%c[SYSTEM] 対境界線広域干渉及び超領域的表現開発機構", "font-weight:bold; color:#555;");
    console.log("%c三条瞳：観測ログの増大を確認。これらは全て「記録」されます。", "color:#900;");
    console.log("%c青ya、跨：そんなにじっと見つめないでよ。恥ずかしいじゃないか。", "color:#00f;");
});