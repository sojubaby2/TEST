/* ============================================================
   알아볼괘 - 사주 리포트 렌더러
   ------------------------------------------------------------
   순서
     1. 한눈에 보기        SajuTopics.headline
     2. 나는 어떤 사람인가  SajuTopics.personality
     3. 초년·중년·말년      SajuTopics.stages
     4. 대운 (10년 흐름)
     5. 올해와 내년
     6. 주제별 운 8가지     SajuTopics.topics
     7. 사주 읽는 원리      SajuReading (접어둠 - 용어가 나오는 곳)
     8. 맺음말

   어려운 말은 7번 안에만 둡니다. 1~6번은 쉬운 말로만 씁니다.
   ============================================================ */

const SajuRender = (function () {

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function paras(arr, cls) {
    const f = document.createDocumentFragment();
    (arr || []).forEach(t => f.appendChild(el("p", cls || "rp-p", t)));
    return f;
  }
  function title(mount, id, text, sub) {
    const t = el("p", "section-title", text);
    t.id = id;
    t.style.marginTop = "30px";
    mount.appendChild(t);
    if (sub) {
      const s = el("p", "sec-sub", sub);
      mount.appendChild(s);
    }
  }

  /* ---------------- 명식 그리드 ---------------- */
  function renderPillars(a, mount, corrected) {
    const card = el("div", "card");

    if (corrected && (corrected.year || corrected.month)) {
      const which = [];
      if (corrected.year) which.push("첫째 기둥");
      if (corrected.month) which.push("둘째 기둥");
      card.appendChild(el("p", "rp-fix",
        "⚙️ 생일이 <b>절기가 바뀌는 날</b>에 걸쳐 있어 " + which.join("·") +
        "를 바로잡았습니다. 절기가 바뀌는 정확한 순간을 직접 계산해 적용했어요."));
    }

    const LABEL = { year:"첫째 기둥", month:"둘째 기둥", day:"셋째 기둥", hour:"넷째 기둥" };
    const WHO   = { year:"조상·어린시절", month:"부모·사회", day:"나·배우자", hour:"자녀·말년" };

    const grid = el("div", "pillar-grid");
    if (!a.hasHour) grid.classList.add("cols-3");
    a.cells.forEach(function (c) {
      const cell = el("div", "pillar-cell");
      cell.innerHTML =
        '<p class="pillar-label">' + LABEL[c.key] + "</p>" +
        '<p class="pillar-hanja">' + c.stemHanja + c.branchHanja + "</p>" +
        '<p class="pillar-hangul">' + c.pillar + "</p>" +
        '<p class="pillar-who">' + WHO[c.key] + "</p>";
      grid.appendChild(cell);
    });
    card.appendChild(grid);

    const birth = el("p", null, "");
    birth.id = "birthInfoLabel";
    birth.style.cssText = "margin:14px 0 0;font-size:12px;color:var(--text-sub);text-align:center;";
    card.appendChild(birth);
    mount.appendChild(card);
  }

  /* ---------------- 1. 한눈에 보기 ---------------- */
  function renderHeadline(r, mount) {
    title(mount, "sec-top", "한눈에 보기");
    const card = el("div", "card");

    const chips = el("div", "kw-chips");
    r.headline.keywords.forEach(k => chips.appendChild(el("span", "kw-chip", k)));
    card.appendChild(chips);

    const lead = el("div", "rp-lead");
    lead.appendChild(el("p", "rp-p", r.headline.lines[0]));
    card.appendChild(lead);
    card.appendChild(paras(r.headline.lines.slice(1)));
    mount.appendChild(card);
  }

  /* ---------------- 2. 성격 ---------------- */
  function renderPersonality(r, mount) {
    title(mount, "sec-me", "나는 어떤 사람인가");
    const card = el("div", "card");
    card.appendChild(paras(r.personality.paras));

    const two = el("div", "gb-grid");
    const g = el("div", "gb-col is-good");
    g.appendChild(el("p", "gb-head", "👍 강점"));
    const gu = el("ul", "trait-list");
    r.personality.good.forEach(t => gu.appendChild(el("li", null, t)));
    g.appendChild(gu);

    const b = el("div", "gb-col is-bad");
    b.appendChild(el("p", "gb-head", "⚠️ 조심할 점"));
    const bu = el("ul", "trait-list");
    r.personality.bad.forEach(t => bu.appendChild(el("li", null, t)));
    b.appendChild(bu);

    two.appendChild(g); two.appendChild(b);
    card.appendChild(two);
    mount.appendChild(card);
  }

  /* ---------------- 3. 초년·중년·말년 ---------------- */
  function renderStages(r, mount) {
    title(mount, "sec-life", "인생의 흐름", "사주의 네 기둥은 각각 인생의 한 시기를 맡습니다.");
    r.stages.forEach(function (s) {
      const card = el("div", "card stage-card");
      card.innerHTML =
        '<div class="stage-head">' +
          '<span class="st-emoji">' + s.emoji + "</span>" +
          "<div><p class=\"st-title\">" + s.title + "</p>" +
          '<p class="st-age">' + s.age + " · " + s.pillar + "(" + s.hanja + ")</p></div>" +
        "</div>";
      card.appendChild(paras(s.paras));
      mount.appendChild(card);
    });
  }

  /* ---------------- 4. 대운 ---------------- */
  function renderDaeun(r, rd, mount) {
    title(mount, "sec-daeun", "10년마다 바뀌는 흐름 (대운)");
    const card = el("div", "card");

    if (!rd.daeun) {
      const ask = el("div", "gender-ask");
      ask.innerHTML = "<p>10년 흐름의 방향은 <b>태어난 해와 성별</b>로 정해집니다.<br />" +
                      "성별을 알려주시면 흐름까지 풀어드릴게요.</p>";
      const row = el("div", "ga-row");
      [["male","남성"], ["female","여성"]].forEach(function (gg) {
        const btn = el("button", "btn btn-secondary", gg[1]);
        btn.type = "button"; btn.style.marginTop = "0";
        btn.addEventListener("click", function () {
          const p = new URLSearchParams(window.location.search);
          p.set("g", gg[0]);
          window.location.search = p.toString();
        });
        row.appendChild(btn);
      });
      ask.appendChild(row);
      card.appendChild(ask);
      mount.appendChild(card);
      return;
    }

    const d = rd.daeun;
    card.appendChild(el("p", "rp-p",
      "사주팔자 여덟 글자는 평생 바뀌지 않지만, 그 위를 지나가는 흐름이 있습니다. " +
      "이걸 <b>대운</b>이라고 해요. <b>10년마다</b> 바뀌고, 같은 사주라도 " +
      "지금 어느 구간을 지나느냐에 따라 작용이 달라진다고 봅니다."));
    card.appendChild(el("p", "rp-p",
      "당신은 <b>" + d.startAge + "세</b>부터 첫 구간이 시작되고, " +
      "흐름은 <b>" + (d.forward ? "순행" : "역행") + "</b> 방향입니다."));

    card.appendChild(el("p", "daeun-hint",
      "← 좌우로 밀어보세요. <b>초록은 순한 시기</b>, <b>주황은 품이 더 드는 시기</b>입니다."));

    const scroll = el("div", "daeun-scroll");
    const track = el("div", "daeun-track");
    const nowAge = d.current ? d.current.age : -1;
    d.list.forEach(function (it) {
      const grade = r.gradeDaeun(it);
      const isNow = d.current && d.current.item && d.current.item.order === it.order;
      const isPast = nowAge > it.to;
      const c = el("div", "daeun-cell" + (isNow ? " is-now" : isPast ? " is-past" : "") +
                   (grade === "순풍" ? " g-good" : grade === "역풍" ? " g-bad" : ""));
      c.innerHTML =
        '<p class="dc-age">' + it.from + "~" + it.to + "세</p>" +
        '<p class="dc-hanja">' + it.hanja + "</p>" +
        '<p class="dc-grade">' + grade + "</p>";
      track.appendChild(c);
    });
    scroll.appendChild(track);
    card.appendChild(scroll);

    const nowCell = track.querySelector(".is-now");
    if (nowCell) {
      requestAnimationFrame(function () {
        scroll.scrollLeft = Math.max(0,
          nowCell.offsetLeft - (scroll.clientWidth - nowCell.offsetWidth) / 2);
      });
    }

    if (d.now && d.now.length) {
      card.appendChild(el("p", "rp-sub", "지금 지나는 구간"));
      card.appendChild(paras(d.now));
    }

    if (rd.daeunNotes && rd.daeunNotes.length) {
      card.appendChild(el("p", "rp-sub", "10년씩 짚어보기"));
      rd.daeunNotes.forEach(function (n) {
        const grade = r.gradeDaeun(n);
        const b = el("div", "god-detail");
        b.innerHTML =
          '<p class="gd-head">' + n.from + "~" + n.to + "세 · " + n.pillar + " (" + n.hanja + ")" +
          (n.isNow ? '<span class="gd-tag">지금</span>' : n.isPast ? '<span class="gd-tag is-none">지나옴</span>' : "") +
          '<span class="gd-tag ' + (grade === "순풍" ? "is-good" : grade === "역풍" ? "is-warn" : "is-none") +
            '">' + grade + "</span></p>" +
          '<p class="gd-text">' + n.text + "</p>";
        if (n.isPast) b.style.opacity = "0.6";
        card.appendChild(b);
      });
    }
    mount.appendChild(card);
  }

  /* ---------------- 5. 올해와 내년 ---------------- */
  function renderYears(r, mount) {
    title(mount, "sec-year", "올해와 내년");
    [["올해", r.thisYear], ["내년", r.nextYear]].forEach(function (pair) {
      const y = pair[1];
      const card = el("div", "card year-card" +
        (y.helpful && !y.hurtful ? " is-good" : y.hurtful && !y.helpful ? " is-warn" : ""));
      card.innerHTML =
        '<p class="yc-head">' + pair[0] + " · " + y.year + "년 <b>" + y.pillar +
        "(" + y.hanja + ")</b></p>";
      card.appendChild(paras(y.paras));
      mount.appendChild(card);
    });
  }

  /* ---------------- 6. 주제별 운 ---------------- */
  function renderTopics(r, mount) {
    title(mount, "sec-topics", "주제별로 보는 내 사주");
    r.topics.forEach(function (t) {
      const card = el("div", "card topic-card" + (t.incomplete ? " is-dim" : ""));
      card.innerHTML =
        '<p class="tc-head"><span class="tc-emoji">' + t.emoji + "</span>" + t.title + "</p>" +
        (t.lede ? '<p class="tc-lede">' + t.lede + "</p>" : "");
      card.appendChild(paras(t.paras));
      if (t.tip) card.appendChild(el("p", "rp-note", "💡 " + t.tip));
      if (t.note) card.appendChild(el("p", "rp-note is-warn", "⚠️ " + t.note));
      mount.appendChild(card);
    });
  }

  /* ---------------- 7. 사주 읽는 원리 (접어둠) ---------------- */
  function block(host, head, build) {
    const d = el("details", "rp-fold");
    d.appendChild(el("summary", null, head));
    const body = el("div", "rp-fold-body");
    build(body);
    d.appendChild(body);
    host.appendChild(d);
  }

  function renderBasis(a, rd, mount) {
    title(mount, "sec-basis", "사주 읽는 원리",
      "위의 풀이가 어떤 계산에서 나왔는지 궁금하신 분만 펼쳐보세요. 전문 용어가 나옵니다.");
    const host = el("div", "card fold-host");

    /* 네 기둥 */
    block(host, "📐 네 기둥과 글자의 뜻", function (b) {
      b.appendChild(el("p", "rp-p",
        "각 기둥의 윗글자를 <b>천간</b>, 아랫글자를 <b>지지</b>라고 합니다. " +
        "일간(셋째 기둥 윗글자)이 '나'이고, 나머지 일곱 글자는 모두 이 글자를 기준으로 읽어요."));
      const tbl = el("div", "basis-table");
      a.cells.forEach(function (c) {
        const L = { year:"첫째", month:"둘째", day:"셋째", hour:"넷째" }[c.key];
        tbl.appendChild(el("div", "bt-row",
          '<span class="bt-k">' + L + " 기둥</span>" +
          '<span class="bt-v">' + c.pillar + " (" + c.stemHanja + c.branchHanja + ")</span>" +
          '<span class="bt-x">' + (c.stemGod || "-") + " / " + (c.branchGod || "-") + "</span>"));
      });
      b.appendChild(tbl);
      b.appendChild(el("p", "rp-sub", "지지 속에 숨은 글자 (지장간)"));
      b.appendChild(el("p", "rp-p",
        a.cells.map(c => c.branch + ": " + c.hidden.map(h => h.stem).join("·")).join(" &nbsp;|&nbsp; ")));
    });

    /* 십신 */
    block(host, "🔟 십신 — 글자와 나의 관계", function (b) {
      b.appendChild(paras(rd.gods.paras));
      const bars = el("div", "element-bars");
      const C = { 비겁:"#16A34A", 식상:"#DC2626", 재성:"#B45309", 관성:"#64748B", 인성:"#0369A1" };
      const max = Math.max.apply(null, rd.gods.rows.map(x => x.count)) || 1;
      rd.gods.rows.forEach(function (x) {
        bars.appendChild(el("div", "element-row",
          '<span class="element-emoji">' + (x.count ? "●" : "○") + "</span>" +
          '<span class="element-name">' + x.key + "</span>" +
          '<span class="element-bar-outer"><span class="element-bar-inner" style="width:' +
            Math.round(x.count / max * 100) + "%;background:" + C[x.key] + ';"></span></span>' +
          '<span class="element-count">' + x.count + "</span>"));
      });
      b.appendChild(bars);
      rd.gods.details.forEach(function (d2) {
        b.appendChild(el("div", "god-detail",
          '<p class="gd-head">' + d2.name +
          '<span class="gd-tag' + (d2.kind === "없음" ? " is-none" : "") + '">' +
          (d2.kind === "없음" ? "드러나지 않음" : d2.count + "개") + "</span></p>" +
          '<p class="gd-text">' + d2.text + "</p>"));
      });
    });

    /* 오행·용신 */
    block(host, "🌳 오행과 용신", function (b) {
      b.appendChild(paras(rd.elements.paras));
      const max = Math.max.apply(null, ["목","화","토","금","수"].map(k => rd.elements.counts[k])) || 1;
      const bars = el("div", "element-bars");
      ["목","화","토","금","수"].forEach(function (k) {
        const meta = SajuEngine.ELEMENT_META[k];
        bars.appendChild(el("div", "element-row",
          '<span class="element-emoji">' + meta.emoji + "</span>" +
          '<span class="element-name">' + meta.label + "</span>" +
          '<span class="element-bar-outer"><span class="element-bar-inner" style="width:' +
            Math.round(rd.elements.counts[k] / max * 100) + "%;background:" + meta.color + ';"></span></span>' +
          '<span class="element-count">' + rd.elements.counts[k] + "</span>"));
      });
      b.appendChild(bars);
      b.appendChild(el("p", "rp-sub", "용신"));
      b.appendChild(paras(rd.elements.yongsinParas));
    });

    /* 신강·신약 */
    block(host, "⚖️ 신강·신약", function (b) {
      b.appendChild(paras(rd.strength.paras));
      const list = el("div", "kv-list");
      rd.strength.detail.forEach(function (d2) {
        list.appendChild(el("div", "kv-row " + (d2.ok ? "is-ok" : "is-no"),
          '<span class="kv-key">' + d2.key + "</span>" +
          '<span class="kv-val">' + d2.label + "</span>" +
          '<span class="kv-mark">' + (d2.ok ? "내 편 ○" : "내 편 아님 ×") + "</span>"));
      });
      b.appendChild(list);
    });

    /* 격국 */
    if (rd.gyeokguk) {
      block(host, "🏛️ 격국 — " + rd.gyeokguk.name, function (b) {
        b.appendChild(paras(rd.gyeokguk.paras));
        if (rd.gyeokguk.work) b.appendChild(el("p", "rp-note", "🧭 " + rd.gyeokguk.work));
      });
    }

    /* 십이운성 */
    block(host, "🔄 십이운성", function (b) {
      b.appendChild(paras(rd.stage.paras.slice(0, 1)));
      const list = el("div", "kv-list");
      rd.stage.rows.forEach(function (row) {
        list.appendChild(el("div", "kv-row",
          '<span class="kv-key">' + row.label + "</span>" +
          '<span class="kv-val">' + row.branch + " — " + (row.stage || "-") + "</span>" +
          '<span class="kv-mark" style="color:var(--brand-1);">' + row.phase + "</span>"));
      });
      b.appendChild(list);
      b.appendChild(paras(rd.stage.paras.slice(1)));
    });

    /* 합충 */
    block(host, "⚡ 지지의 합과 충", function (b) {
      b.appendChild(el("p", "rp-p", rd.relations.intro));
      rd.relations.items.forEach(function (it) {
        b.appendChild(el("div", "rel-item " + (it.good ? "is-good" : "is-bad"),
          '<span class="ri-mark">' + it.kind + "</span>" +
          "<div><p class=\"ri-name\">" + it.name + "</p><p class=\"ri-text\">" + it.text + "</p></div>"));
      });
    });

    /* 신살 */
    block(host, "✨ 신살", function (b) {
      b.appendChild(el("p", "rp-p", rd.sinsal.intro));
      rd.sinsal.items.forEach(function (it) {
        b.appendChild(el("div", "rel-item is-plain",
          '<span class="ri-mark">' + it.emoji + "</span>" +
          "<div><p class=\"ri-name\">" + it.title + " <span style=\"font-size:11.5px;color:var(--text-sub);\">" +
          it.branch + "</span></p><p class=\"ri-text\">" + it.text + "</p></div>"));
      });
    });

    /* 공망 */
    block(host, "🕳️ 공망", function (b) {
      b.appendChild(paras(rd.gongmang.slice(0, -1)));
      b.appendChild(el("p", "rp-note", "ℹ️ " + rd.gongmang[rd.gongmang.length - 1]));
    });

    mount.appendChild(host);
  }

  /* ---------------- 8. 맺음말 ---------------- */
  function renderClosing(rd, mount) {
    title(mount, "sec-end", "맺음말");
    const card = el("div", "card");
    card.appendChild(el("p", "rp-p", rd.closing[0]));
    card.appendChild(el("p", "rp-note", rd.closing[1]));
    const lead = el("div", "rp-lead");
    lead.style.margin = "14px 0 0";
    lead.appendChild(el("p", "rp-p", rd.closing[2]));
    card.appendChild(lead);
    mount.appendChild(card);
  }

  /* ---------------- 목차 ---------------- */
  const TOC = [
    ["sec-top","한눈에"], ["sec-me","성격"], ["sec-life","인생 흐름"],
    ["sec-daeun","대운"], ["sec-year","올해·내년"], ["sec-topics","주제별"],
    ["sec-basis","원리"],
  ];
  function renderToc(mount) {
    const card = el("div", "card");
    card.appendChild(el("p", "rp-sub", "이 풀이에 담긴 내용"));
    const toc = el("div", "rp-toc");
    TOC.forEach(function (t) {
      const a2 = el("a", null, t[1]);
      a2.href = "#" + t[0];
      toc.appendChild(a2);
    });
    card.appendChild(toc);
    mount.appendChild(card);
  }

  /* ---------------- 전체 ---------------- */
  function renderAll(a, rd, mount, opts) {
    const r = SajuTopics.build(a);
    renderPillars(a, mount, opts && opts.corrected);
    renderToc(mount);
    renderHeadline(r, mount);
    renderPersonality(r, mount);
    renderStages(r, mount);
    renderDaeun(r, rd, mount);
    renderYears(r, mount);
    renderTopics(r, mount);
    renderBasis(a, rd, mount);
    renderClosing(rd, mount);
  }

  return { renderAll: renderAll };
})();
