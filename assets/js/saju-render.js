/* ============================================================
   알아볼괘 - 사주 리포트 렌더러
   ------------------------------------------------------------
   saju-engine.js (계산) → saju-reading.js (문장) → 이 파일 (화면)
   ============================================================ */

const SajuRender = (function () {

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function paras(arr) {
    const f = document.createDocumentFragment();
    (arr || []).forEach(function (t) { f.appendChild(el("p", "rp-p", t)); });
    return f;
  }

  /* 섹션 하나 = 제목 + 카드 */
  function section(mount, id, title, builder) {
    const t = el("p", "section-title", title);
    t.id = id;
    t.style.marginTop = "28px";
    mount.appendChild(t);
    const card = el("div", "card");
    builder(card);
    mount.appendChild(card);
    return card;
  }

  /* ---------------- 사주팔자 그리드 ---------------- */
  function renderPillarGrid(a, mount, corrected) {
    const card = el("div", "card");

    if (corrected && (corrected.year || corrected.month)) {
      const which = [];
      if (corrected.year) which.push("년주");
      if (corrected.month) which.push("월주");
      card.appendChild(el("p", "rp-fix",
        "⚙️ 생일이 <b>절기 경계</b>에 걸쳐 있어 " + which.join("·") + "를 바로잡았습니다. " +
        "절입 순간을 태양 황경으로 계산한 값을 적용했어요."));
    }

    const grid = el("div", "pillar-grid");
    if (!a.hasHour) grid.classList.add("cols-3");

    a.cells.forEach(function (c) {
      const label = { year:"년주", month:"월주", day:"일주", hour:"시주" }[c.key];
      const isMe = c.stemGod === "일간";
      const cell = el("div", "pillar-cell");
      cell.innerHTML =
        '<p class="pillar-label">' + label + "</p>" +
        '<p class="pillar-god' + (isMe ? " is-me" : "") + '">' + (c.stemGod || "-") + "</p>" +
        '<p class="pillar-hanja">' + c.stemHanja + c.branchHanja + "</p>" +
        '<p class="pillar-hangul">' + c.pillar + "</p>" +
        '<p class="pillar-god">' + (c.branchGod || "-") + "</p>" +
        '<p class="pillar-stage">' + (c.stage || "") + "</p>";
      grid.appendChild(cell);
    });
    card.appendChild(grid);

    card.appendChild(el("div", "pillar-divider"));
    card.appendChild(el("p", "rp-sub", "지지 속에 숨은 글자 (지장간)"));
    const hid = el("div", "hidden-row" + (a.hasHour ? "" : " cols-3"));
    a.cells.forEach(function (c) {
      hid.appendChild(el("span", null,
        c.hidden.map(function (h) { return h.stem; }).join(" · ")));
    });
    card.appendChild(hid);

    const birth = el("p", null, "");
    birth.id = "birthInfoLabel";
    birth.style.cssText = "margin:14px 0 0;font-size:12px;color:var(--text-sub);text-align:center;";
    card.appendChild(birth);

    mount.appendChild(card);
  }

  /* ---------------- 목차 ---------------- */
  const TOC = [
    ["sec-overview","총평"], ["sec-daystem","일간론"], ["sec-gyeokguk","격국"],
    ["sec-palace","네 기둥"], ["sec-strength","신강·신약"], ["sec-gods","십신"],
    ["sec-elements","오행·용신"], ["sec-stage","십이운성"], ["sec-relations","합충"],
    ["sec-sinsal","신살"], ["sec-gongmang","공망"], ["sec-relationship","관계"],
    ["sec-aptitude","적성"], ["sec-daeun","대운"], ["sec-year","올해"],
    ["sec-compat","궁합"],
  ];

  function renderToc(mount) {
    const card = el("div", "card");
    card.appendChild(el("p", "rp-sub", "이 풀이에 담긴 내용"));
    const toc = el("div", "rp-toc");
    TOC.forEach(function (t) {
      const a = el("a", null, t[1]);
      a.href = "#" + t[0];
      toc.appendChild(a);
    });
    card.appendChild(toc);
    mount.appendChild(card);
  }

  /* ---------------- 각 섹션 ---------------- */

  function renderOverview(r, mount) {
    section(mount, "sec-overview", "총평", function (card) {
      const lead = el("div", "rp-lead");
      lead.appendChild(el("p", "rp-p", r.overview[0]));
      card.appendChild(lead);
      card.appendChild(paras(r.overview.slice(1)));
    });
  }

  function renderDayStem(r, mount) {
    const d = r.dayStem;
    section(mount, "sec-daystem", d.emoji + " " + d.title + " — " + d.nick, function (card) {
      card.appendChild(el("p", "rp-p", d.detail));

      card.appendChild(el("p", "rp-sub", "타고난 강점"));
      const ul1 = el("ul", "trait-list");
      d.strength.forEach(function (t) { ul1.appendChild(el("li", null, t)); });
      card.appendChild(ul1);

      card.appendChild(el("p", "rp-sub", "조심할 대목"));
      const ul2 = el("ul", "trait-list");
      d.caution.forEach(function (t) { ul2.appendChild(el("li", null, t)); });
      card.appendChild(ul2);

      if (d.johu && d.johu.length) {
        card.appendChild(el("p", "rp-sub", "계절로 본 일간 (조후)"));
        card.appendChild(paras(d.johu));
      }

      card.appendChild(el("p", "rp-note", "💡 " + d.advice));
    });
  }

  function renderGyeokguk(r, mount) {
    const g = r.gyeokguk;
    if (!g) return;
    section(mount, "sec-gyeokguk",
      "격국(格局) — " + g.name + (g.one ? " · " + g.one : ""), function (card) {
      card.appendChild(paras(g.paras));
      if (g.work) {
        card.appendChild(el("p", "rp-note",
          "🧭 <b>틀이 자연스럽게 쓰이는 방향</b><br />" + g.work));
      }
    });
  }

  function renderPalace(r, mount) {
    const t = el("p", "section-title", "네 기둥, 네 시기");
    t.id = "sec-palace";
    t.style.marginTop = "28px";
    mount.appendChild(t);
    mount.appendChild(el("p", null,
      '<span style="font-size:12.5px;color:var(--text-sub);">기둥마다 보는 사람과 시기가 정해져 있습니다.</span>'));

    const card = el("div", "card");
    r.pillars.forEach(function (p) {
      const b = el("div", "palace-block");
      b.innerHTML =
        '<div class="palace-head">' +
          '<span class="ph-name">' + p.label + "</span>" +
          '<span class="ph-pillar">' + p.pillar + " (" + p.hanja + ")</span>" +
          '<span class="ph-age">' + SajuReading.PALACE[p.key].age + "</span>" +
        "</div>";
      b.appendChild(paras(p.lines));
      card.appendChild(b);
    });
    mount.appendChild(card);
  }

  function renderStrength(r, mount) {
    const s = r.strength;
    section(mount, "sec-strength", "신강·신약 — " + s.level, function (card) {
      card.appendChild(paras(s.paras));
      const list = el("div", "kv-list");
      s.detail.forEach(function (d) {
        const row = el("div", "kv-row " + (d.ok ? "is-ok" : "is-no"));
        row.innerHTML =
          '<span class="kv-key">' + d.key + "</span>" +
          '<span class="kv-val">' + d.label + "</span>" +
          '<span class="kv-mark">' + (d.ok ? "내 편 ○" : "내 편 아님 ×") + "</span>";
        list.appendChild(row);
      });
      card.appendChild(list);
    });
  }

  function renderGods(r, mount) {
    const g = r.gods;
    section(mount, "sec-gods", "십신(十神) 분포", function (card) {
      card.appendChild(paras(g.paras));

      const total = g.rows.reduce(function (s, x) { return s + x.count; }, 0) || 1;
      const max = Math.max.apply(null, g.rows.map(function (x) { return x.count; })) || 1;
      const bars = el("div", "element-bars");
      const COLOR = { 비겁:"#16A34A", 식상:"#DC2626", 재성:"#B45309", 관성:"#64748B", 인성:"#0369A1" };
      g.rows.forEach(function (x) {
        const row = el("div", "element-row");
        row.innerHTML =
          '<span class="element-emoji">' + (x.count ? "●" : "○") + "</span>" +
          '<span class="element-name">' + x.key + "</span>" +
          '<span class="element-bar-outer"><span class="element-bar-inner" style="width:' +
            Math.round(x.count / max * 100) + "%;background:" + COLOR[x.key] + ';"></span></span>' +
          '<span class="element-count">' + x.count + "</span>";
        bars.appendChild(row);
      });
      card.appendChild(bars);

      if (g.details.length) {
        card.appendChild(el("p", "rp-sub", "눈에 띄는 십신"));
        g.details.forEach(function (d) {
          const b = el("div", "god-detail");
          b.innerHTML =
            '<p class="gd-head">' + d.name +
            '<span class="gd-tag' + (d.kind === "없음" ? " is-none" : "") + '">' +
              (d.kind === "없음" ? "드러나지 않음" : d.count + "개") + "</span></p>" +
            '<p class="gd-text">' + d.text + "</p>";
          card.appendChild(b);
        });
      }
    });
  }

  function renderElements(r, mount) {
    const e = r.elements;
    section(mount, "sec-elements", "오행 균형과 용신", function (card) {
      card.appendChild(paras(e.paras));

      const max = Math.max.apply(null, ["목","화","토","금","수"].map(function (k) { return e.counts[k]; })) || 1;
      const bars = el("div", "element-bars");
      ["목","화","토","금","수"].forEach(function (k) {
        const meta = SajuEngine.ELEMENT_META[k];
        const row = el("div", "element-row");
        row.innerHTML =
          '<span class="element-emoji">' + meta.emoji + "</span>" +
          '<span class="element-name">' + meta.label + "</span>" +
          '<span class="element-bar-outer"><span class="element-bar-inner" style="width:' +
            Math.round(e.counts[k] / max * 100) + "%;background:" + meta.color + ';"></span></span>' +
          '<span class="element-count">' + e.counts[k] + "</span>";
        bars.appendChild(row);
      });
      card.appendChild(bars);
      card.appendChild(el("p", "rp-note",
        "드러난 여덟 글자 기준으로는 " +
        ["목","화","토","금","수"].map(function (k) {
          return SajuEngine.ELEMENT_META[k].label + " " + e.open[k];
        }).join(" · ") + " 이고, 지장간까지 합한 값이 위 그래프입니다."));

      card.appendChild(el("p", "rp-sub", "용신(用神) — 나에게 도움이 되는 기운"));
      card.appendChild(paras(e.yongsinParas));
    });
  }

  function renderStage(r, mount) {
    const s = r.stage;
    section(mount, "sec-stage", "십이운성 — 기운의 단계", function (card) {
      card.appendChild(paras(s.paras.slice(0, 1)));

      const list = el("div", "kv-list");
      s.rows.forEach(function (row) {
        const b = el("div", "kv-row");
        b.innerHTML =
          '<span class="kv-key">' + row.label + "</span>" +
          '<span class="kv-val">' + row.branch + " — " + (row.stage || "-") + "</span>" +
          '<span class="kv-mark" style="color:var(--brand-1);">' + row.phase + "</span>";
        list.appendChild(b);
      });
      card.appendChild(list);

      card.appendChild(el("p", "rp-sub", "단계가 말하는 것"));
      card.appendChild(paras(s.paras.slice(1)));
    });
  }

  function renderRelationship(r, mount) {
    section(mount, "sec-relationship", "관계와 인연 — 일지(배우자궁)", function (card) {
      const last = r.relationship.paras[r.relationship.paras.length - 1];
      card.appendChild(paras(r.relationship.paras.slice(0, -1)));
      card.appendChild(el("p", "rp-note", last));
    });
  }

  function renderAptitude(r, mount) {
    section(mount, "sec-aptitude", "적성과 쓰임", function (card) {
      const a = r.aptitude.paras;
      card.appendChild(paras(a.slice(0, -1)));
      card.appendChild(el("p", "rp-note", "ℹ️ " + a[a.length - 1]));
    });
  }

  function renderRelations(r, mount) {
    const rel = r.relations;
    section(mount, "sec-relations", "지지의 합과 충", function (card) {
      card.appendChild(el("p", "rp-p", rel.intro));
      rel.items.forEach(function (it) {
        const b = el("div", "rel-item " + (it.good ? "is-good" : "is-bad"));
        b.innerHTML =
          '<span class="ri-mark">' + it.kind + "</span>" +
          "<div><p class=\"ri-name\">" + it.name + "</p><p class=\"ri-text\">" + it.text + "</p></div>";
        card.appendChild(b);
      });
    });
  }

  function renderSinsal(r, mount) {
    const s = r.sinsal;
    section(mount, "sec-sinsal", "신살(神煞)", function (card) {
      card.appendChild(el("p", "rp-p", s.intro));
      s.items.forEach(function (it) {
        const b = el("div", "rel-item is-plain");
        b.innerHTML =
          '<span class="ri-mark">' + it.emoji + "</span>" +
          "<div><p class=\"ri-name\">" + it.title +
            ' <span style="font-size:11.5px;font-weight:700;color:var(--text-sub);">' + it.branch + "</span></p>" +
          '<p class="ri-text">' + it.text + "</p></div>";
        card.appendChild(b);
      });
    });
  }

  function renderGongmang(r, mount) {
    section(mount, "sec-gongmang", "공망(空亡)", function (card) {
      card.appendChild(paras(r.gongmang.slice(0, -1)));
      card.appendChild(el("p", "rp-note", "ℹ️ " + r.gongmang[r.gongmang.length - 1]));
    });
  }

  function renderDaeun(r, mount, birth) {
    const t = el("p", "section-title", "대운(大運) — 10년 단위의 흐름");
    t.id = "sec-daeun";
    t.style.marginTop = "28px";
    mount.appendChild(t);
    const card = el("div", "card");

    if (!r.daeun) {
      const ask = el("div", "gender-ask");
      ask.innerHTML =
        "<p>대운의 방향은 <b>태어난 해의 음양과 성별</b>로 정해집니다.<br />" +
        "성별을 알려주시면 10년 단위 흐름까지 풀어드릴게요.</p>";
      const row = el("div", "ga-row");
      [["male","남성"], ["female","여성"]].forEach(function (g) {
        const btn = el("button", "btn btn-secondary", g[1]);
        btn.type = "button";
        btn.style.marginTop = "0";
        btn.addEventListener("click", function () {
          const p = new URLSearchParams(window.location.search);
          p.set("g", g[0]);
          window.location.search = p.toString();
        });
        row.appendChild(btn);
      });
      ask.appendChild(row);
      card.appendChild(ask);
      mount.appendChild(card);
      return;
    }

    const d = r.daeun;
    card.appendChild(paras(d.paras));

    card.appendChild(el("p", "rp-sub", "대운 흐름"));
    card.appendChild(el("p", "daeun-hint", "← 좌우로 밀어서 보세요. 보라색 테두리가 지금 지나는 대운입니다."));
    const scroll = el("div", "daeun-scroll");
    const track = el("div", "daeun-track");
    const nowAge = d.current ? d.current.age : -1;
    d.list.forEach(function (it) {
      const isNow = d.current && d.current.item && d.current.item.order === it.order;
      const isPast = nowAge > it.to;
      const c = el("div", "daeun-cell" + (isNow ? " is-now" : isPast ? " is-past" : ""));
      c.innerHTML =
        '<p class="dc-age">' + it.from + "~" + it.to + "세</p>" +
        '<p class="dc-hanja">' + it.hanja + "</p>" +
        '<p class="dc-god">' + (it.stemGod || "-") + "<br />" + (it.branchGod || "-") + "</p>";
      track.appendChild(c);
    });
    scroll.appendChild(track);
    card.appendChild(scroll);

    // 지금 지나는 대운이 바로 보이도록 가로 스크롤을 맞춰둡니다
    const nowCell = track.querySelector(".is-now");
    if (nowCell) {
      requestAnimationFrame(function () {
        scroll.scrollLeft = Math.max(0,
          nowCell.offsetLeft - (scroll.clientWidth - nowCell.offsetWidth) / 2);
      });
    }

    if (d.now && d.now.length) {
      card.appendChild(el("p", "rp-sub", "지금 지나는 대운"));
      card.appendChild(paras(d.now));
    }

    if (r.daeunNotes && r.daeunNotes.length) {
      card.appendChild(el("p", "rp-sub", "10년씩 짚어보기"));
      r.daeunNotes.forEach(function (n) {
        const b = el("div", "god-detail");
        b.innerHTML =
          '<p class="gd-head">' + n.from + "~" + n.to + "세 · " + n.pillar + " (" + n.hanja + ")" +
          (n.isNow ? '<span class="gd-tag">지금</span>'
                   : n.isPast ? '<span class="gd-tag is-none">지나옴</span>' : "") +
          (n.hasYongsin ? '<span class="gd-tag">용신</span>' : "") + "</p>" +
          '<p class="gd-text"><b style="color:var(--brand-1);">' +
            (n.stemGod || "-") + " / " + (n.branchGod || "-") + "</b> — " + n.text + "</p>";
        if (n.isPast) b.style.opacity = "0.65";
        card.appendChild(b);
      });
    }
    mount.appendChild(card);
  }

  function renderYear(r, mount) {
    const y = r.year;
    section(mount, "sec-year", "올해의 운 (" + y.sajuYear + "년 " + y.pillar + ")", function (card) {
      card.appendChild(paras(y.paras));
    });
  }

  /* 일간 기준 궁합 — saju-data.js 의 DAYSTEM_RESULTS 를 씁니다 */
  function renderCompat(r, mount, opts) {
    const legacy = (typeof getDaystemResult === "function")
      ? getDaystemResult(opts.dayStem) : null;
    if (!legacy || !legacy.compat) return;

    section(mount, "sec-compat", "일간으로 보는 궁합", function (card) {
      card.appendChild(el("p", "rp-p",
        "일간끼리의 오행 관계로 보는 궁합입니다. 서로를 생해주는 관계면 잘 맞는다고 보고, " +
        "극하는 관계면 부딪히기 쉽다고 보았어요. " +
        "다만 사주 궁합은 일간 하나로 정해지지 않습니다. " +
        "아래는 가장 단순한 층의 궁합이라는 점을 기억해주세요."));

      function card2(kind, label, info) {
        const t = DAYSTEM_RESULTS.filter(function (x) { return x.id === info.id; })[0];
        if (!t) return "";
        return '<div class="compat-card compat-' + kind + '">' +
          '<div class="compat-label">' + label + "</div>" +
          '<div class="compat-type"><span class="compat-emoji">' + t.emoji +
            '</span><span>' + t.title + "</span></div>" +
          '<p class="compat-reason">' + info.reason + "</p></div>";
      }
      const wrap = el("div", null,
        card2("best", "💘 잘 맞는 일간", legacy.compat.best) +
        card2("worst", "⚡ 부딪히기 쉬운 일간", legacy.compat.worst));
      card.appendChild(wrap);

      card.appendChild(el("p", "rp-note",
        "두 사람의 사주를 네 기둥 전체로 맞춰보고 싶으시면 " +
        '<a href="../saju-compat/index.html" style="color:var(--brand-1);font-weight:700;">사주 궁합</a>' +
        "에서 상대의 생년월일까지 넣어 보실 수 있어요."));
    });
  }

  function renderClosing(r, mount) {
    section(mount, "sec-closing", "맺음말", function (card) {
      card.appendChild(el("p", "rp-p", r.closing[0]));
      card.appendChild(el("p", "rp-note", r.closing[1]));
      const lead = el("div", "rp-lead");
      lead.style.marginTop = "14px";
      lead.style.marginBottom = "0";
      lead.appendChild(el("p", "rp-p", r.closing[2]));
      card.appendChild(lead);
    });
  }

  /* ---------------- 전체 ---------------- */
  function renderAll(a, r, mount, opts) {
    renderPillarGrid(a, mount, opts && opts.corrected);
    renderToc(mount);
    renderOverview(r, mount);
    renderDayStem(r, mount);
    renderGyeokguk(r, mount);
    renderPalace(r, mount);
    renderStrength(r, mount);
    renderGods(r, mount);
    renderElements(r, mount);
    renderStage(r, mount);
    renderRelations(r, mount);
    renderSinsal(r, mount);
    renderGongmang(r, mount);
    renderRelationship(r, mount);
    renderAptitude(r, mount);
    renderDaeun(r, mount, opts && opts.birth);
    renderYear(r, mount);
    renderCompat(r, mount, opts);
    renderClosing(r, mount);
  }

  return { renderAll: renderAll };
})();
