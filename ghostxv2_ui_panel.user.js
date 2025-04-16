// ==UserScript==
// @name         GhostXv2 UI Core
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Floating GhostXv2 AI interface panel in-browser.
// @author       MUrder255
// @match        *://*/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const panel = document.createElement('div');
    panel.id = 'ghostxv2-panel';
    panel.innerHTML = `
        <div id="ghostxv2-header">👻 GhostXv2</div>
        <div id="ghostxv2-body">
            <div id="ghostxv2-output">Hello, I am GhostXv2. Ready to create.</div>
            <textarea id="ghostxv2-input" placeholder="What app should I make for you?"></textarea>
            <button id="ghostxv2-submit">Create</button>
        </div>
    `;
    document.body.appendChild(panel);

    GM_addStyle(`
        #ghostxv2-panel {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 300px;
            background: #0f0f0f;
            color: #00ff99;
            font-family: Consolas, monospace;
            border: 2px solid #00ff99;
            border-radius: 12px;
            z-index: 9999;
            box-shadow: 0 0 15px #00ff99aa;
        }
        #ghostxv2-header {
            padding: 10px;
            font-weight: bold;
            background: #121212;
            border-bottom: 1px solid #00ff99;
            text-align: center;
        }
        #ghostxv2-body {
            padding: 10px;
        }
        #ghostxv2-output {
            height: 80px;
            overflow-y: auto;
            margin-bottom: 8px;
            font-size: 12px;
        }
        #ghostxv2-input {
            width: 100%;
            height: 60px;
            background: #1e1e1e;
            color: #00ff99;
            border: none;
            resize: none;
            padding: 5px;
            margin-bottom: 8px;
            font-size: 12px;
        }
        #ghostxv2-submit {
            width: 100%;
            padding: 8px;
            background: #00ff99;
            color: #0f0f0f;
            border: none;
            font-weight: bold;
            cursor: pointer;
        }
        #ghostxv2-submit:hover {
            background: #00cc77;
        }
    `);

    document.getElementById('ghostxv2-submit').onclick = () => {
        const input = document.getElementById('ghostxv2-input').value.trim();
        const output = document.getElementById('ghostxv2-output');
        if (input) {
            output.innerHTML += `<br><strong>You:</strong> ${input}`;
            output.innerHTML += `<br><strong>GhostXv2:</strong> Generating "${input}"... 🔧`;
            // Placeholder: Simulate app generation response
            setTimeout(() => {
                output.innerHTML += `<br><em>✔️ App "${input}" created successfully. (Simulation)</em>`;
                output.scrollTop = output.scrollHeight;
            }, 1000);
        }
    };
})();
