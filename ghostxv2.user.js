// ==UserScript==
// @name         GhostXv2 Core
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Self-updating GhostXv2 AI app builder for browser-based evolution and UI generation.
// @author       MUrder255
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @connect      MUrder255.github.io
// ==/UserScript==

(function() {
    'use strict';

    const version = '1.0.0';
    const versionCheckUrl = 'https://MUrder255.github.io/ghostxv2/latest_version.json';

    GM_xmlhttpRequest({
        method: 'GET',
        url: versionCheckUrl,
        onload: function(res) {
            try {
                const data = JSON.parse(res.responseText);
                if (data.version !== version) {
                    if (confirm(`[GhostXv2] New version ${data.version} available. Update now?`)) {
                        window.open(data.script_url, '_blank');
                    }
                }
            } catch (e) {
                console.error('[GhostXv2] Version check failed:', e);
            }
        }
    });

    // GhostXv2 core logic will expand here.
    console.log('[GhostXv2] Ready.');
})();
