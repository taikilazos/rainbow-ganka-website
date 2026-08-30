/* ============================================================
   お知らせ一元管理ファイル
   ------------------------------------------------------------
   ★ 下の notices を編集するだけで、次の3か所すべてに反映されます。
        1. 全ページ上部の告知バー
        2. ホームの「休診日•検査制限のお知らせ」
        3. コンタクトレンズページの受付時間の注記

   ★ end（掲載終了日）を過ぎたお知らせは自動的に消えます。
      手で削除する必要はありませんが、古い行が溜まったら消してください。

   ■ 書き方
        { end: '2026-08-31', date: '8/31(月)', text: '休診' }

        end  … 掲載終了日。この日までは表示され、翌日から自動的に消えます。
               かならず YYYY-MM-DD の形式で書いてください。
        date … 太字で表示される日付。
        text … 日付のうしろに続く説明。
   ============================================================ */

var CLINIC_NOTICES = [
    { end: '2026-08-31', date: '8/31(月)',             text: '休診' },
    { end: '2026-09-07', date: '9/3(木)・9/7(月)',     text: 'コンタクトレンズ検査は過去1年以内に当院でコンタクトレンズ処方箋発行されている方のみ受付します' },
    { end: '2026-10-30', date: '10/29(木)〜10/30(金)', text: '休診' }
];


/* ------------------------------------------------------------
   ここから下は表示のための処理です。通常は編集不要です。
   ------------------------------------------------------------ */
(function () {
    'use strict';

    function startOfToday() {
        var d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    function parseDate(text) {
        var p = String(text).split('-');
        return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    }

    var today = startOfToday();
    var active = CLINIC_NOTICES.filter(function (n) {
        return parseDate(n.end) >= today;
    });

    // <strong>【8/31(月)】</strong> 休診 のような断片を作る
    function fragment(notice, wrapDate) {
        var frag = document.createDocumentFragment();
        var strong = document.createElement('strong');
        strong.textContent = wrapDate ? '【' + notice.date + '】' : notice.date;
        frag.appendChild(strong);
        frag.appendChild(document.createTextNode(wrapDate ? ' ' : '　'));
        frag.appendChild(document.createTextNode(notice.text));
        return frag;
    }

    /* 1. 全ページ上部の告知バー */
    function renderBar() {
        if (!active.length || !document.body) { return; }

        var text = document.createElement('span');
        text.className = 'bar-text';

        var icon = document.createElement('i');
        icon.className = 'fas fa-exclamation-triangle';
        text.appendChild(icon);
        text.appendChild(document.createTextNode(' '));

        active.forEach(function (notice) {
            var item = document.createElement('span');
            item.className = 'bar-item';
            item.appendChild(fragment(notice, true));
            text.appendChild(item);
        });

        var content = document.createElement('div');
        content.className = 'bar-content';
        content.appendChild(text);

        var container = document.createElement('div');
        container.className = 'container';
        container.appendChild(content);

        var bar = document.createElement('div');
        bar.className = 'top-announcement-bar';
        bar.setAttribute('role', 'alert');
        bar.setAttribute('aria-live', 'assertive');
        bar.appendChild(container);

        document.body.insertBefore(bar, document.body.firstChild);
    }

    /* 2. ホームの「休診日•検査制限のお知らせ」 */
    function renderNoticeList() {
        var list = document.getElementById('notice-list');
        if (!list) { return; }

        var card = document.getElementById('closure-notice');
        if (!active.length) {
            if (card) { card.hidden = true; }
            return;
        }

        active.forEach(function (notice) {
            var li = document.createElement('li');
            li.appendChild(fragment(notice, false));
            list.appendChild(li);
        });
    }

    /* 3. コンタクトレンズページの注記 */
    function renderLensNotices() {
        var target = document.getElementById('lens-notices');
        if (!target) { return; }

        active.forEach(function (notice) {
            target.appendChild(document.createTextNode('※'));
            target.appendChild(fragment(notice, false));
            target.appendChild(document.createElement('br'));
        });
    }

    // バーは <body> の先頭で読み込まれるため、その場で描画する
    renderBar();

    document.addEventListener('DOMContentLoaded', function () {
        renderNoticeList();
        renderLensNotices();
    });
})();
