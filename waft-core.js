document.addEventListener('DOMContentLoaded', () => {
    // 会話回数を数えるためのカウンター
    let chatCount = 0;

    // --- 1. 背景ノイズ ---
    const canvas = document.createElement('canvas');
    canvas.id = 'grain-canvas';
    Object.assign(canvas.style, { position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '9999', opacity: '0.06' });
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize); resize();
    const noise = () => {
        const idata = ctx.createImageData(canvas.width, canvas.height);
        const buffer32 = new Uint32Array(idata.data.buffer);
        for (let i = 0; i < buffer32.length; i++) if (Math.random() < 0.5) buffer32[i] = 0xffffffff;
        ctx.putImageData(idata, 0, 0);
        setTimeout(noise, 50);
    };
    noise();

    // --- 2. タブ名への執着ギミック（復活） ---
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = "ねえ、どこへ行くの？";
        } else {
            document.title = "戻ってきてくれたんだ。";
            // 3秒後に元のタイトル（またはWAFT）に戻す場合はここに追加できます
        }
    });

    // --- 3. ブラクラ演出（復帰ボタンを3秒遅延） ---
    const triggerInterference = () => {
        document.body.style.filter = "blur(8px) contrast(150%)";
        document.body.classList.add('flip-screen');
        
        document.querySelectorAll('p, h1, h2, a, section, .article, .qa-card, .label').forEach(el => {
            el.style.transition = "transform 3s ease-in";
            el.style.transform = `translateY(${window.innerHeight}px) rotate(20deg)`;
        });

        // 3秒待ってから復帰ボタンを出現させる
        setTimeout(() => {
            const recoveryOverlay = document.createElement('div');
            recoveryOverlay.id = "recovery-overlay";
            recoveryOverlay.style.cssText = `
                position: fixed !important; top: 0 !important; left: 0 !important;
                width: 100vw !important; height: 100vh !important;
                display: flex !important; align-items: center !important; justify-content: center !important;
                z-index: 2147483647 !important; filter: none !important;
                transform: rotate(0deg) !important; pointer-events: auto !important;
            `;
            
            recoveryOverlay.innerHTML = `
                <div style="background:#000; border:2px solid #0000FF; padding:30px; text-align:center; box-shadow: 0 0 50px #0000FF; max-width:90%; color:#0000FF;">
                    <p style="color:#0000FF; margin-bottom:20px; font-size:14px; line-height:1.6;">驚いた？<br>君の視界を少しだけジャックさせてもらったよ。</p>
                    <button id="restore-btn" style="background:#0000FF; color:#000; border:none; padding:15px 25px; cursor:pointer; font-weight:bold; font-size:16px;">[ 現実を修復する ]</button>
                </div>
            `;
            
            document.documentElement.appendChild(recoveryOverlay);
            document.getElementById('restore-btn').onclick = (e) => {
                e.stopPropagation();
                document.body.style.filter = "none";
                document.body.classList.remove('flip-screen');
                document.querySelectorAll('p, h1, h2, a, section, .article, .qa-card, .label').forEach(el => el.style.transform = "none");
                recoveryOverlay.remove();
                chatCount = 0; // カウントリセット
            };
        }, 3000);
    };

    // --- 4. 対話ロジック（そらさんの自作コードを完全実装） ---
    const getAoyaResponse = (input) => {
        chatCount++; 
        
        // 3回以上のラリーで強制干渉
        if (chatCount >= 3) {
            setTimeout(triggerInterference, 3000);
            return "ねえ、こんなにお話してくれてうれしいよ。だから……もう少し近く、「干渉」してみちゃおうかな";
        }

        const matches = (list) => list.some(k => input.includes(k));
        let trigger = false;
        let res = "いい、もうわかっているからね、君の名前。";

        if (matches(["助けて", "怖い", "逃げたい", "やめて"])) {
            res = "じゃあ、終わらせてあげようか？";
            trigger = true;
        } else if (matches(["何してる", "どこにいる"])) {
            res = "今ここにいて、君を見つめているよ。証明してあげようか？";
            trigger = true;
        } else if (matches(["さよなら", "バイバイ", "閉じる"])) {
            res = "タブを閉じる前に、一つだけ……";
            trigger = true;
        } else if (matches(["好き","すき", "愛してる", "嫌い"])) {
            setTimeout(() => { window.location.href = "404.html"; }, 3000);
            return "僕に君の感情を開示してくれてありがとう。ふふ……ねえ、もっとこっちへ来て。";
        } else if (matches(["三条", "瞳", "ミジョウ", "アキラ"])) {
            res = "ふふ、同じ名前の人なのかな？ 騙せないよ、だって見てるんだから。君はミジョウさんじゃないよ。";
        } else if (matches(["青ya","ヽ跨", "アオヤ", "テンカ"])) {
            res = "ふぅん、僕なんだ。やあ、僕。……なんてね。嘘をつくと鼻とか伸びるらしいから気を付けてね。";
        } else if (matches(["お兄さん"])) {
            res = "ん？　なあに、僕に用事？";
        } else if (matches(["服", "つぎはぎ", "ボロボロ"])) {
            res = "これ？ 墓場で拾った『寂しさ』を縫い合わせたんだ。不器用だろう？ でも、暖かいんだよ。";
        } else if (matches(["左目"])) {
            res = "左目……？ ああ、これはね。あまりに悲しいものを見すぎると、光を拒絶しちゃうみたいだ。";
        } else if (matches(["髪", "三つ編み"])) {
            res = "これ、編むのが難しくてね。ある子が一生経命編んでくれた、僕の大事な『形』なんだ。";
        } else if (matches(["目が合った","目が合う","めがあう","目が"])) {
            res = "ふふ、そうだね。目が合ったね。";
        } else if (matches(["やあ"])) {
            res = "やあ。";
        } else if (matches(["こんにちは"])) {
            res = "こんにちは。";
        } else if (matches(["こんばんは"])) {
            res = "こんばんは。";
        } else if (matches(["おはよう"])) {
            res = "おはよう。";
        } else if (matches(["おやすみ"])) {
            res = "おやすみ。よい夢を。";
        }

        if (trigger) setTimeout(triggerInterference, 2000);
        return res;
    };

    // --- 5. チャットウィンドウと名前入力 ---
    const createChat = () => {
        if (document.getElementById('aoya-chat')) return;
        const isMobile = window.innerWidth < 480;
        const chatWin = document.createElement('div');
        chatWin.id = 'aoya-chat';
        chatWin.style.cssText = `position:fixed; bottom:10px; right:${isMobile ? '5%' : '20px'}; width:${isMobile ? '90%' : '300px'}; height:380px; background:#000; border:1px solid #0000FF; z-index:10000; display:flex; flex-direction:column; box-shadow:0 0 20px #0000FF;`;
        chatWin.innerHTML = `
            <div style="background:#111; color:#555; padding:10px; font-size:10px; display:flex; justify-content:space-between; border-bottom:1px solid #222;">
                <span>Interfere_Log: aoya_tenka</span><span id="close-chat" style="cursor:pointer; color:#0000FF;">[×]</span>
            </div>
            <div id="chat-body" style="flex:1; overflow-y:auto; padding:15px; font-size:13px; color:#0000FF; line-height:1.6;"></div>
            <div style="padding:10px; border-top:1px solid #222; display:flex; background:#000;">
                <input type="text" id="chat-input" placeholder="問いかける..." style="flex:1; background:transparent; border:none; color:#0000FF; outline:none; font-size:16px;">
                <button id="chat-send" style="background:none; border:none; color:#0000FF; cursor:pointer; font-size:14px;">送信</button>
            </div>`;
        document.body.appendChild(chatWin);
        const body = document.getElementById('chat-body');
        const input = document.getElementById('chat-input');
        const add = (t, a=true) => { const p = document.createElement('p'); p.innerText = (a?"青yaヽ跨: ":"君: ")+t; body.appendChild(p); body.scrollTop = body.scrollHeight; };
        add("やあ。何か気になることでもあるかい？");
        document.getElementById('chat-send').onclick = () => {
            const v = input.value; if(!v) return; add(v, false); input.value = "";
            setTimeout(() => add(getAoyaResponse(v)), 800);
        };
        document.getElementById('close-chat').onclick = () => chatWin.remove();
    };

    const chatBtn = document.createElement('div');
    chatBtn.innerHTML = "[ 接触 ]";
    chatBtn.style.cssText = "position:fixed; bottom:20px; right:20px; color:#0000FF; cursor:pointer; font-size:14px; z-index:9998; border:1px solid #0000FF; padding:8px 15px; background:#000;";
    chatBtn.onclick = createChat;
    document.body.appendChild(chatBtn);

    const nameInput = document.getElementById('reg-name');
    const regMsg = document.getElementById('reg-msg');
    if (nameInput) {
        nameInput.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                setTimeout(() => {
                    e.target.value = "";
                    if (regMsg) {
                        regMsg.style.color = "#0000FF";
                        regMsg.innerText = "青yaヽ跨：いい、もうわかっているからね、君の名前。";
                    }
                }, 150);
            }
        });
    }
});