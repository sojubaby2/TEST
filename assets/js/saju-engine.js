/* ============================================================
   알아볼괘 - 사주 분석 엔진 (계산 전용)
   ------------------------------------------------------------
   사주팔자 네 기둥 자체는 vendor/manseryeok.min.js 가 뽑습니다.
   이 파일은 그 여덟 글자에서 실제 명리 계산을 수행해요.

     · 십신(十神)      — 일간 기준 각 글자의 관계
     · 지장간(支藏干)  — 지지 속에 숨은 천간
     · 신강·신약       — 득령/득지/득세 점수화
     · 십이운성        — 일간이 각 지지에서 갖는 기운의 단계
     · 지지 관계       — 삼합·육합·충·형·해·파
     · 공망(空亡)      — 일주가 속한 순(旬)에서 빠진 두 지지
     · 신살(神煞)      — 도화·역마·화개·천을귀인·양인
     · 대운(大運)      — 10년 단위 흐름 (절입일까지의 거리로 대운수 산출)
     · 격국(格局)      — 월지 정기의 십신

   ※ 계산은 명리학의 통용 규칙을 그대로 구현한 것이고,
      그 결과를 운세로 읽는 해석은 saju-reading.js 가 맡습니다.
      해석에 과학적 근거가 없다는 점은 결과 화면에 밝혀두었습니다.
   ============================================================ */

const SajuEngine = (function () {

  /* ---------------- 기본 데이터 ---------------- */

  const STEMS = ["갑","을","병","정","무","기","경","신","임","계"];
  const BRANCHES = ["자","축","인","묘","진","사","오","미","신","유","술","해"];

  const STEM_HANJA   = { 갑:"甲",을:"乙",병:"丙",정:"丁",무:"戊",기:"己",경:"庚",신:"辛",임:"壬",계:"癸" };
  const BRANCH_HANJA = { 자:"子",축:"丑",인:"寅",묘:"卯",진:"辰",사:"巳",오:"午",미:"未",신:"申",유:"酉",술:"戌",해:"亥" };

  // 천간: 오행과 음양
  const STEM = {
    갑:{el:"목",yy:"양"}, 을:{el:"목",yy:"음"},
    병:{el:"화",yy:"양"}, 정:{el:"화",yy:"음"},
    무:{el:"토",yy:"양"}, 기:{el:"토",yy:"음"},
    경:{el:"금",yy:"양"}, 신:{el:"금",yy:"음"},
    임:{el:"수",yy:"양"}, 계:{el:"수",yy:"음"},
  };

  // 지지: 오행과 음양 (자인진오신술 = 양, 축묘사미유해 = 음)
  const BRANCH = {
    자:{el:"수",yy:"양"}, 축:{el:"토",yy:"음"}, 인:{el:"목",yy:"양"},
    묘:{el:"목",yy:"음"}, 진:{el:"토",yy:"양"}, 사:{el:"화",yy:"음"},
    오:{el:"화",yy:"양"}, 미:{el:"토",yy:"음"}, 신:{el:"금",yy:"양"},
    유:{el:"금",yy:"음"}, 술:{el:"토",yy:"양"}, 해:{el:"수",yy:"음"},
  };

  // 지장간 — 여기(餘氣)/중기(中氣)/정기(正氣). 정기가 그 지지의 본래 기운입니다.
  const HIDDEN = {
    자:[["임",10],["계",20]],
    축:[["계",9],["신",3],["기",18]],
    인:[["무",7],["병",7],["갑",16]],
    묘:[["갑",10],["을",20]],
    진:[["을",9],["계",3],["무",18]],
    사:[["무",7],["경",7],["병",16]],
    오:[["병",10],["기",9],["정",11]],
    미:[["정",9],["을",3],["기",18]],
    신:[["무",7],["임",7],["경",16]],
    유:[["경",10],["신",20]],
    술:[["신",9],["정",3],["무",18]],
    해:[["무",7],["갑",7],["임",16]],
  };

  const GEN  = { 목:"화", 화:"토", 토:"금", 금:"수", 수:"목" };  // 상생 (내가 생하는 것)
  const OVER = { 목:"토", 토:"수", 수:"화", 화:"금", 금:"목" };  // 상극 (내가 극하는 것)
  const GEN_BY  = { 화:"목", 토:"화", 금:"토", 수:"금", 목:"수" }; // 나를 생하는 것
  const OVER_BY = { 토:"목", 수:"토", 화:"수", 금:"화", 목:"금" }; // 나를 극하는 것

  const ELEMENT_META = {
    목:{emoji:"🌳",color:"#16A34A",label:"목(木)"},
    화:{emoji:"🔥",color:"#DC2626",label:"화(火)"},
    토:{emoji:"⛰️",color:"#B45309",label:"토(土)"},
    금:{emoji:"⚔️",color:"#64748B",label:"금(金)"},
    수:{emoji:"🌊",color:"#0369A1",label:"수(水)"},
  };

  /* ---------------- 십신(十神) ---------------- */
  // 일간과 대상 글자의 '오행 관계 × 음양 같고 다름'으로 열 가지가 나옵니다.
  function tenGod(dayStem, targetEl, targetYY) {
    const me = STEM[dayStem];
    if (!me || !targetEl) return null;
    const same = me.yy === targetYY;
    if (targetEl === me.el)          return same ? "비견" : "겁재";
    if (targetEl === GEN[me.el])     return same ? "식신" : "상관";
    if (targetEl === OVER[me.el])    return same ? "편재" : "정재";
    if (targetEl === OVER_BY[me.el]) return same ? "편관" : "정관";
    if (targetEl === GEN_BY[me.el])  return same ? "편인" : "정인";
    return null;
  }

  function tenGodOfStem(dayStem, stem) {
    const s = STEM[stem];
    return s ? tenGod(dayStem, s.el, s.yy) : null;
  }
  function tenGodOfBranch(dayStem, branch) {
    // 지지의 십신은 '정기(지장간의 마지막 글자)'를 기준으로 봅니다
    const h = HIDDEN[branch];
    if (!h) return null;
    const main = h[h.length - 1][0];
    return tenGodOfStem(dayStem, main);
  }

  // 십신을 다섯 갈래로 묶은 이름 (해석에서 자주 씁니다)
  const GOD_GROUP = {
    비견:"비겁", 겁재:"비겁",
    식신:"식상", 상관:"식상",
    편재:"재성", 정재:"재성",
    편관:"관성", 정관:"관성",
    편인:"인성", 정인:"인성",
  };

  /* ---------------- 십이운성 ---------------- */
  const TWELVE_STAGES = ["장생","목욕","관대","건록","제왕","쇠","병","사","묘","절","태","양"];
  // 각 천간의 장생지와 진행 방향 (양간 순행, 음간 역행)
  const LIFE_START = {
    갑:{b:"해",fwd:true},  을:{b:"오",fwd:false},
    병:{b:"인",fwd:true},  정:{b:"유",fwd:false},
    무:{b:"인",fwd:true},  기:{b:"유",fwd:false},
    경:{b:"사",fwd:true},  신:{b:"자",fwd:false},
    임:{b:"신",fwd:true},  계:{b:"묘",fwd:false},
  };
  function twelveStage(stem, branch) {
    const cfg = LIFE_START[stem];
    if (!cfg) return null;
    const start = BRANCHES.indexOf(cfg.b);
    const here  = BRANCHES.indexOf(branch);
    if (start < 0 || here < 0) return null;
    const step = cfg.fwd ? (here - start + 12) % 12 : (start - here + 12) % 12;
    return TWELVE_STAGES[step];
  }

  /* ---------------- 지지 관계 ---------------- */
  const SAMHAP = [
    { set:["신","자","진"], el:"수", name:"신자진 수국" },
    { set:["인","오","술"], el:"화", name:"인오술 화국" },
    { set:["사","유","축"], el:"금", name:"사유축 금국" },
    { set:["해","묘","미"], el:"목", name:"해묘미 목국" },
  ];
  const YUKHAP = [
    { pair:["자","축"], el:"토" }, { pair:["인","해"], el:"목" },
    { pair:["묘","술"], el:"화" }, { pair:["진","유"], el:"금" },
    { pair:["사","신"], el:"수" }, { pair:["오","미"], el:"토" },
  ];
  const CHUNG = [["자","오"],["축","미"],["인","신"],["묘","유"],["진","술"],["사","해"]];
  const HAE   = [["자","미"],["축","오"],["인","사"],["묘","진"],["신","해"],["유","술"]];
  const PA    = [["자","유"],["축","진"],["인","해"],["묘","오"],["사","신"],["술","미"]];
  const SAMHYUNG = [
    { set:["인","사","신"], name:"인사신 삼형" },
    { set:["축","술","미"], name:"축술미 삼형" },
  ];
  const SANGHYUNG = [["자","묘"]];
  const JAHYUNG = ["진","오","유","해"];

  function pairName(a, b) { return a + b; }

  function branchRelations(branches) {
    const out = { samhap:[], banhap:[], yukhap:[], chung:[], hyung:[], hae:[], pa:[] };
    const uniq = branches.filter(Boolean);

    SAMHAP.forEach(function (g) {
      const hit = g.set.filter(function (b) { return uniq.indexOf(b) !== -1; });
      if (hit.length === 3) out.samhap.push({ name:g.name, el:g.el, members:g.set.slice() });
      else if (hit.length === 2) out.banhap.push({ name:hit.join("")+" 반합", el:g.el, members:hit });
    });
    YUKHAP.forEach(function (g) {
      if (uniq.indexOf(g.pair[0]) !== -1 && uniq.indexOf(g.pair[1]) !== -1)
        out.yukhap.push({ name:pairName(g.pair[0],g.pair[1])+" 육합", el:g.el, members:g.pair.slice() });
    });
    CHUNG.forEach(function (p) {
      if (uniq.indexOf(p[0]) !== -1 && uniq.indexOf(p[1]) !== -1)
        out.chung.push({ name:pairName(p[0],p[1])+" 충", members:p.slice() });
    });
    HAE.forEach(function (p) {
      if (uniq.indexOf(p[0]) !== -1 && uniq.indexOf(p[1]) !== -1)
        out.hae.push({ name:pairName(p[0],p[1])+" 해", members:p.slice() });
    });
    PA.forEach(function (p) {
      if (uniq.indexOf(p[0]) !== -1 && uniq.indexOf(p[1]) !== -1)
        out.pa.push({ name:pairName(p[0],p[1])+" 파", members:p.slice() });
    });
    SAMHYUNG.forEach(function (g) {
      const hit = g.set.filter(function (b) { return uniq.indexOf(b) !== -1; });
      if (hit.length === 3) out.hyung.push({ name:g.name, members:g.set.slice() });
      else if (hit.length === 2) out.hyung.push({ name:hit.join("")+" 형", members:hit });
    });
    SANGHYUNG.forEach(function (p) {
      if (uniq.indexOf(p[0]) !== -1 && uniq.indexOf(p[1]) !== -1)
        out.hyung.push({ name:pairName(p[0],p[1])+" 상형", members:p.slice() });
    });
    JAHYUNG.forEach(function (b) {
      const n = uniq.filter(function (x) { return x === b; }).length;
      if (n >= 2) out.hyung.push({ name:b+b+" 자형", members:[b,b] });
    });
    return out;
  }

  /* ---------------- 공망(空亡) ---------------- */
  // 육십갑자를 열 개씩 끊은 '순(旬)'마다 짝을 못 얻은 지지 두 개가 공망입니다.
  function gongmang(dayPillar) {
    const s = STEMS.indexOf(dayPillar.charAt(0));
    const b = BRANCHES.indexOf(dayPillar.charAt(1));
    if (s < 0 || b < 0) return [];
    const idx = (b - s + 12) % 12;       // 순의 시작에서 몇 번째인지
    const startBranch = (b - s + 12) % 12; // 순두(旬頭)의 지지 위치
    const g1 = (startBranch + 10) % 12;
    const g2 = (startBranch + 11) % 12;
    return [BRANCHES[g1], BRANCHES[g2]];
  }

  /* ---------------- 신살(神煞) ---------------- */
  // 삼합 기준 — 도화(桃花)·역마(驛馬)·화개(華蓋)
  const SAMHAP_KEY = {
    신:"수", 자:"수", 진:"수",
    인:"화", 오:"화", 술:"화",
    사:"금", 유:"금", 축:"금",
    해:"목", 묘:"목", 미:"목",
  };
  const BY_GROUP = {
    수:{ 도화:"유", 역마:"인", 화개:"진" },
    화:{ 도화:"묘", 역마:"신", 화개:"술" },
    금:{ 도화:"오", 역마:"해", 화개:"축" },
    목:{ 도화:"자", 역마:"사", 화개:"미" },
  };
  // 천을귀인 — 일간 기준
  const CHEONEUL = {
    갑:["축","미"], 무:["축","미"], 경:["축","미"],
    을:["자","신"], 기:["자","신"],
    병:["해","유"], 정:["해","유"],
    임:["사","묘"], 계:["사","묘"],
    신:["인","오"],
  };
  // 양인 — 양간의 제왕지
  const YANGIN = { 갑:"묘", 병:"오", 무:"오", 경:"유", 임:"자" };

  function findSinsal(dayStem, yearBranch, dayBranch, allBranches) {
    const list = [];
    // 도화·역마·화개는 년지와 일지 둘 다를 기준으로 봅니다
    [["년지",yearBranch],["일지",dayBranch]].forEach(function (base) {
      const key = SAMHAP_KEY[base[1]];
      if (!key) return;
      const map = BY_GROUP[key];
      Object.keys(map).forEach(function (name) {
        const target = map[name];
        if (allBranches.indexOf(target) !== -1) {
          if (!list.some(function (x) { return x.name === name; })) {
            list.push({ name: name, branch: target, base: base[0] });
          }
        }
      });
    });
    (CHEONEUL[dayStem] || []).forEach(function (b) {
      if (allBranches.indexOf(b) !== -1) list.push({ name:"천을귀인", branch:b, base:"일간" });
    });
    if (YANGIN[dayStem] && allBranches.indexOf(YANGIN[dayStem]) !== -1) {
      list.push({ name:"양인", branch:YANGIN[dayStem], base:"일간" });
    }
    return list;
  }

  /* ---------------- 신강·신약 ---------------- */
  // 득령(월지)·득지(일지)·득세(나머지)를 점수로 환산합니다.
  function strength(dayStem, pillars) {
    const me = STEM[dayStem];
    const helpEls = [me.el, GEN_BY[me.el]];          // 나와 같거나 나를 생하는 오행 = 내 편
    let score = 0;
    const detail = [];

    function isHelp(el) { return helpEls.indexOf(el) !== -1; }

    // 득령: 월지가 내 편이면 가장 큰 가중치 (계절의 기운)
    const monthBranch = pillars.month.charAt(1);
    const mEl = BRANCH[monthBranch] ? BRANCH[monthBranch].el : null;
    const deukRyeong = isHelp(mEl);
    score += deukRyeong ? 3 : -2;
    detail.push({ key:"득령", ok:deukRyeong, label:"월지 " + monthBranch + "(" + mEl + ")", weight:3 });

    // 득지: 일지가 내 편인가 (내가 앉은 자리)
    const dayBranch = pillars.day.charAt(1);
    const dEl = BRANCH[dayBranch] ? BRANCH[dayBranch].el : null;
    const deukJi = isHelp(dEl);
    score += deukJi ? 2 : -1;
    detail.push({ key:"득지", ok:deukJi, label:"일지 " + dayBranch + "(" + dEl + ")", weight:2 });

    // 득세: 나머지 글자 중 내 편이 몇인가
    let helpCount = 0, totalCount = 0;
    ["year","month","day","hour"].forEach(function (k) {
      const p = pillars[k];
      if (!p) return;
      const st = p.charAt(0), br = p.charAt(1);
      if (!(k === "day")) { // 일간은 나 자신이라 세지 않습니다
        const se = STEM[st] ? STEM[st].el : null;
        if (se) { totalCount++; if (isHelp(se)) helpCount++; }
      }
      if (!(k === "month" || k === "day")) { // 월지·일지는 위에서 이미 셈
        const be = BRANCH[br] ? BRANCH[br].el : null;
        if (be) { totalCount++; if (isHelp(be)) helpCount++; }
      }
    });
    const deukSe = helpCount * 2 > totalCount;
    score += deukSe ? 2 : -1;
    detail.push({ key:"득세", ok:deukSe, label:"주변 글자 " + helpCount + "/" + totalCount + " 가 내 편", weight:2 });

    let level;
    if (score >= 5)      level = "신강";
    else if (score >= 1) level = "중화에 가까운 신강";
    else if (score >= -2) level = "중화에 가까운 신약";
    else                 level = "신약";

    return { score:score, level:level, detail:detail,
             isStrong: score >= 1, deukRyeong:deukRyeong, deukJi:deukJi, deukSe:deukSe };
  }

  /* ---------------- 절기 계산 ---------------- */
  // 2020~2030 은 만세력 라이브러리의 실측값을 쓰고,
  // 그 밖의 해는 태양 황경을 계산해서 절입 시각을 찾습니다.
  function toJD(y, m, d, h, mi) {
    let Y = y, M = m;
    if (M <= 2) { Y -= 1; M += 12; }
    const A = Math.floor(Y / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (Y + 4716)) + Math.floor(30.6001 * (M + 1))
         + d + B - 1524.5 + ((h || 0) + (mi || 0) / 60) / 24;
  }
  function fromJD(jd) {
    const z = Math.floor(jd + 0.5);
    const f = jd + 0.5 - z;
    let A = z;
    if (z >= 2299161) {
      const a = Math.floor((z - 1867216.25) / 36524.25);
      A = z + 1 + a - Math.floor(a / 4);
    }
    const B = A + 1524, C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C), E = Math.floor((B - D) / 30.6001);
    const day = B - D - Math.floor(30.6001 * E) + f;
    const month = E < 14 ? E - 1 : E - 13;
    const year = month > 2 ? C - 4716 : C - 4715;
    const dd = Math.floor(day);
    const hours = (day - dd) * 24;
    return { year:year, month:month, day:dd,
             hour:Math.floor(hours), minute:Math.round((hours - Math.floor(hours)) * 60) };
  }
  // 태양 황경 (도) — 평균 오차 0.01도 수준이면 절입 '날짜'에는 충분합니다
  function solarLongitude(jd) {
    const n = jd - 2451545.0;
    const L = 280.460 + 0.9856474 * n;
    const g = (357.528 + 0.9856003 * n) * Math.PI / 180;
    const lam = L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g);
    return ((lam % 360) + 360) % 360;
  }
  function lonDiff(a, b) {
    let d = (a - b) % 360;
    if (d > 180) d -= 360;
    if (d <= -180) d += 360;
    return d;
  }
  // KST 기준 날짜/시각 → 절입 시각을 KST 로 돌려줍니다 (UTC+9)
  const KST = 9 / 24;
  function findTermJD(targetLon, fromJDutc, forward) {
    const step = forward ? 0.5 : -0.5;
    let a = fromJDutc;
    let da = lonDiff(solarLongitude(a), targetLon);
    for (let i = 0; i < 160; i++) {
      const b = a + step;
      const db = lonDiff(solarLongitude(b), targetLon);
      if ((da < 0 && db >= 0) || (da > 0 && db <= 0)) {
        let lo = Math.min(a, b), hi = Math.max(a, b);
        for (let k = 0; k < 60; k++) {
          const mid = (lo + hi) / 2;
          if (lonDiff(solarLongitude(lo), targetLon) * lonDiff(solarLongitude(mid), targetLon) <= 0) hi = mid;
          else lo = mid;
        }
        return (lo + hi) / 2;
      }
      a = b; da = db;
    }
    return null;
  }
  // 절기 황경은 15, 45, 75 … 즉 30 으로 나눈 나머지가 15 인 값들입니다
  function nextTermLon(lon)  { return (Math.floor((lon - 15) / 30) + 1) * 30 + 15; }
  function prevTermLon(lon)  { return  Math.floor((lon - 15) / 30)      * 30 + 15; }

  const TERM_BY_LON = {};
  (function buildTermNames() {
    const names = [
      [315,"입춘"],[345,"경칩"],[15,"청명"],[45,"입하"],[75,"망종"],[105,"소서"],
      [135,"입추"],[165,"백로"],[195,"한로"],[225,"입동"],[255,"대설"],[285,"소한"],
    ];
    names.forEach(function (n) { TERM_BY_LON[((n[0] % 360) + 360) % 360] = n[1]; });
  })();

  // 생일에서 앞/뒤 절입일까지의 거리(일)를 구합니다
  function termDistance(y, m, d, h, mi) {
    const jdKst = toJD(y, m, d, h == null ? 12 : h, mi || 0);
    const jdUtc = jdKst - KST;
    const lon = solarLongitude(jdUtc);

    const nLon = ((nextTermLon(lon) % 360) + 360) % 360;
    const pLon = ((prevTermLon(lon) % 360) + 360) % 360;

    const nextJd = findTermJD(nLon, jdUtc, true);
    const prevJd = findTermJD(pLon, jdUtc, false);

    return {
      nextDays: nextJd == null ? null : (nextJd - jdUtc),
      prevDays: prevJd == null ? null : (jdUtc - prevJd),
      nextName: TERM_BY_LON[nLon] || null,
      prevName: TERM_BY_LON[pLon] || null,
      nextDate: nextJd == null ? null : fromJD(nextJd + KST),
      prevDate: prevJd == null ? null : fromJD(prevJd + KST),
    };
  }

  /* ---------------- 년주·월주 직접 계산 ----------------
     만세력 라이브러리가 내장한 절기 표는 해마다 같은 값이 들어 있어
     (예: 입춘이 어느 해든 2/4 05:02) 절입 시각이 실제와 최대 반나절 어긋납니다.
     월주는 격국과 득령의 기준이 되는 가장 중요한 기둥이라,
     여기서는 태양 황경으로 절입 순간을 직접 구해 년주·월주를 다시 세웁니다.
     (황경 공식은 한국천문연구원 공식 절입 시각과 10분 안쪽으로 맞는 것을 확인했습니다) */

  // 해당 연도의 입춘 순간 (UTC 기준 율리우스일)
  function ipchunJD(year) {
    const near = toJD(year, 2, 4, 0, 0) - KST;
    return findTermJD(315, near - 3, true);
  }

  // 황경 → 사주 월지 (입춘=인월 시작)
  function branchFromLongitude(lon) {
    const k = Math.floor((((lon - 315) % 360) + 360) % 360 / 30); // 0=인월
    return { index: k, branch: BRANCHES[(2 + k) % 12] };
  }

  function computeYearMonthPillar(y, m, d, h, mi) {
    const jdUtc = toJD(y, m, d, h == null ? 12 : h, mi || 0) - KST;
    const lon = solarLongitude(jdUtc);

    // 입춘 전이면 사주 연도는 한 해 앞입니다
    const ip = ipchunJD(y);
    const sajuYear = (ip != null && jdUtc < ip) ? y - 1 : y;

    const ysIdx = (((sajuYear - 4) % 10) + 10) % 10;
    const ybIdx = (((sajuYear - 4) % 12) + 12) % 12;
    const yearStem = STEMS[ysIdx], yearBranch = BRANCHES[ybIdx];

    // 오호둔 — 년간에 따라 인월의 천간이 정해집니다
    const firstMonthStem = ((ysIdx % 5) * 2 + 2) % 10;
    const mb = branchFromLongitude(lon);
    const monthStem = STEMS[(firstMonthStem + mb.index) % 10];

    return {
      sajuYear: sajuYear,
      yearPillar: yearStem + yearBranch,
      yearPillarHanja: STEM_HANJA[yearStem] + BRANCH_HANJA[yearBranch],
      monthPillar: monthStem + mb.branch,
      monthPillarHanja: STEM_HANJA[monthStem] + BRANCH_HANJA[mb.branch],
      longitude: lon,
    };
  }

  // 라이브러리 결과에 직접 계산한 년주·월주를 덮어씌웁니다 (일주·시주는 그대로 사용)
  function correctPillars(saju, y, m, d, h, mi) {
    const c = computeYearMonthPillar(y, m, d, h, mi);
    const changed = {
      year: saju.yearPillar !== c.yearPillar,
      month: saju.monthPillar !== c.monthPillar,
    };
    return {
      yearPillar: c.yearPillar, yearPillarHanja: c.yearPillarHanja,
      monthPillar: c.monthPillar, monthPillarHanja: c.monthPillarHanja,
      dayPillar: saju.dayPillar, dayPillarHanja: saju.dayPillarHanja,
      hourPillar: saju.hourPillar, hourPillarHanja: saju.hourPillarHanja,
      isTimeCorrected: saju.isTimeCorrected, correctedTime: saju.correctedTime,
      sajuYear: c.sajuYear,
      _corrected: changed,
      _original: { yearPillar: saju.yearPillar, monthPillar: saju.monthPillar },
    };
  }

  /* ---------------- 대운(大運) ---------------- */
  // 방향: 년간이 양이고 남자거나, 년간이 음이고 여자면 순행. 나머지는 역행.
  // 대운수: 순행이면 다음 절입일까지, 역행이면 지난 절입일부터의 거리를 3으로 나눕니다.
  function buildDaeun(saju, y, m, d, h, mi, gender, count) {
    const yearStem = saju.yearPillar.charAt(0);
    const yangYear = STEM[yearStem] && STEM[yearStem].yy === "양";
    const male = gender === "male";
    const forward = (yangYear && male) || (!yangYear && !male);

    const dist = termDistance(y, m, d, h, mi);
    const days = forward ? dist.nextDays : dist.prevDays;
    let startAge = days == null ? 1 : Math.round(days / 3);
    if (startAge < 1) startAge = 1;
    if (startAge > 10) startAge = 10;

    const monthStemIdx   = STEMS.indexOf(saju.monthPillar.charAt(0));
    const monthBranchIdx = BRANCHES.indexOf(saju.monthPillar.charAt(1));

    const list = [];
    const n = count || 9;
    for (let i = 1; i <= n; i++) {
      const si = forward ? (monthStemIdx + i) % 10   : (monthStemIdx - i + 100) % 10;
      const bi = forward ? (monthBranchIdx + i) % 12 : (monthBranchIdx - i + 120) % 12;
      const stem = STEMS[si], branch = BRANCHES[bi];
      list.push({
        order: i,
        from: startAge + (i - 1) * 10,
        to:   startAge + i * 10 - 1,
        stem: stem, branch: branch,
        pillar: stem + branch,
        hanja: (STEM_HANJA[stem] || "") + (BRANCH_HANJA[branch] || ""),
        stemGod: tenGodOfStem(saju.dayPillar.charAt(0), stem),
        branchGod: tenGodOfBranch(saju.dayPillar.charAt(0), branch),
        stage: twelveStage(saju.dayPillar.charAt(0), branch),
      });
    }
    return { forward:forward, startAge:startAge, list:list, termInfo:dist, days:days };
  }

  function currentDaeun(daeun, birthYear) {
    const age = new Date().getFullYear() - birthYear + 1; // 세는 나이 기준
    for (let i = 0; i < daeun.list.length; i++) {
      if (age >= daeun.list[i].from && age <= daeun.list[i].to) {
        return { item: daeun.list[i], age: age };
      }
    }
    return { item: null, age: age };
  }

  /* ---------------- 오행 집계 ---------------- */
  // 드러난 여덟 글자와, 지지 속에 숨은 지장간을 나눠 셉니다.
  function elementCount(pillars) {
    const open = { 목:0,화:0,토:0,금:0,수:0 };
    const hidden = { 목:0,화:0,토:0,금:0,수:0 };
    ["year","month","day","hour"].forEach(function (k) {
      const p = pillars[k];
      if (!p) return;
      const st = STEM[p.charAt(0)];
      const br = BRANCH[p.charAt(1)];
      if (st) open[st.el]++;
      if (br) open[br.el]++;
      (HIDDEN[p.charAt(1)] || []).forEach(function (hd) {
        const hs = STEM[hd[0]];
        if (hs) hidden[hs.el]++;
      });
    });
    const total = { 목:0,화:0,토:0,금:0,수:0 };
    Object.keys(total).forEach(function (e) { total[e] = open[e] + hidden[e]; });
    return { open:open, hidden:hidden, total:total };
  }

  function godCount(dayStem, pillars) {
    const counts = {};
    const groups = { 비겁:0, 식상:0, 재성:0, 관성:0, 인성:0 };
    ["year","month","day","hour"].forEach(function (k) {
      const p = pillars[k];
      if (!p) return;
      if (k !== "day") {
        const g = tenGodOfStem(dayStem, p.charAt(0));
        if (g) { counts[g] = (counts[g] || 0) + 1; groups[GOD_GROUP[g]]++; }
      }
      const gb = tenGodOfBranch(dayStem, p.charAt(1));
      if (gb) { counts[gb] = (counts[gb] || 0) + 1; groups[GOD_GROUP[gb]]++; }
    });
    return { counts:counts, groups:groups };
  }

  /* ---------------- 격국(格局) ---------------- */
  function findGyeokguk(dayStem, monthBranch) {
    const god = tenGodOfBranch(dayStem, monthBranch);
    if (!god) return null;
    if (god === "비견") return { name:"건록격", god:god };
    if (god === "겁재") return { name:"양인격", god:god };
    return { name: god + "격", god: god };
  }

  /* ---------------- 용신 후보 ----------------
     두 가지를 같이 봅니다.
       억부 — 일간이 약하면 북돋고, 강하면 덜어낼 오행을 고릅니다.
       조후 — 한겨울에 태어났으면 녹여줄 불, 한여름이면 식혀줄 물을 먼저 봅니다.
     옛 글에서는 계절이 치우친 사주일수록 조후를 억부보다 앞세웠습니다.
     (한겨울 흙에게는 북돋는 흙보다 먼저 녹여줄 불이 급하다는 뜻이에요) */
  const SEASON_OF_BRANCH = {
    인:"봄", 묘:"봄", 진:"봄",   사:"여름", 오:"여름", 미:"여름",
    신:"가을", 유:"가을", 술:"가을", 해:"겨울", 자:"겨울", 축:"겨울",
  };

  function suggestYongsin(dayStem, strong, elCount, monthBranch) {
    const me = STEM[dayStem];
    let wanted, reason;
    if (strong) {
      wanted = [GEN[me.el], OVER[me.el], OVER_BY[me.el]];
      reason = "일간이 힘이 있는 편이라, 그 기운을 밖으로 흘려보내거나 적절히 눌러주는 오행이 도움이 됩니다.";
    } else {
      wanted = [GEN_BY[me.el], me.el];
      reason = "일간이 힘이 부족한 편이라, 나를 생해주거나 나와 같은 편이 되어주는 오행이 도움이 됩니다.";
    }

    // 억부 기준: 후보 중 사주에서 가장 약한 것
    const byCount = wanted.slice().sort(function (a, b) {
      return (elCount.total[a] || 0) - (elCount.total[b] || 0);
    });

    // 조후 기준: 겨울이면 화, 여름이면 수
    const season = SEASON_OF_BRANCH[monthBranch] || null;
    const climate = season === "겨울" ? "화" : season === "여름" ? "수" : null;

    let primary = byCount[0];
    let johu = false;
    if (climate && wanted.indexOf(climate) !== -1) {
      primary = climate;
      johu = true;
      reason += (season === "겨울"
        ? " 게다가 한겨울에 태어나 사주 전체가 차가운 편이라, 녹여주는 화(火)가 가장 급합니다."
        : " 게다가 한여름에 태어나 사주 전체가 뜨거운 편이라, 식혀주는 수(水)가 가장 급합니다.");
    }

    // 주 용신 다음으로 볼 오행
    const second = wanted.filter(function (e) { return e !== primary; })
      .sort(function (a, b) { return (elCount.total[a] || 0) - (elCount.total[b] || 0); })[0] || null;

    return { candidates: wanted, primary: primary, second: second,
             reason: reason, johu: johu, season: season };
  }

  /* ---------------- 전체 분석 ---------------- */
  function analyze(saju, birth) {
    const dayStem = saju.dayPillar.charAt(0);
    const pillars = {
      year: saju.yearPillar, month: saju.monthPillar,
      day: saju.dayPillar,   hour: saju.hourPillar || null,
    };
    const branches = ["year","month","day","hour"]
      .map(function (k) { return pillars[k] ? pillars[k].charAt(1) : null; })
      .filter(Boolean);

    const cells = ["year","month","day","hour"].map(function (k) {
      const p = pillars[k];
      if (!p) return null;
      const st = p.charAt(0), br = p.charAt(1);
      return {
        key: k, pillar: p,
        stem: st, branch: br,
        stemHanja: STEM_HANJA[st], branchHanja: BRANCH_HANJA[br],
        stemEl: STEM[st] ? STEM[st].el : null,
        branchEl: BRANCH[br] ? BRANCH[br].el : null,
        stemYY: STEM[st] ? STEM[st].yy : null,
        stemGod: k === "day" ? "일간" : tenGodOfStem(dayStem, st),
        branchGod: tenGodOfBranch(dayStem, br),
        stage: twelveStage(dayStem, br),
        hidden: (HIDDEN[br] || []).map(function (h) {
          return { stem: h[0], days: h[1], god: tenGodOfStem(dayStem, h[0]),
                   el: STEM[h[0]] ? STEM[h[0]].el : null };
        }),
      };
    });

    const el = elementCount(pillars);
    const st = strength(dayStem, pillars);
    const gods = godCount(dayStem, pillars);
    const gm = gongmang(saju.dayPillar);

    const result = {
      dayStem: dayStem,
      dayStemEl: STEM[dayStem].el,
      dayStemYY: STEM[dayStem].yy,
      pillars: pillars,
      cells: cells.filter(Boolean),
      hasHour: !!saju.hourPillar,
      elements: el,
      strength: st,
      gods: gods,
      relations: branchRelations(branches),
      gongmang: gm,
      gongmangHit: branches.filter(function (b) { return gm.indexOf(b) !== -1; }),
      sinsal: findSinsal(dayStem, pillars.year.charAt(1), pillars.day.charAt(1), branches),
      gyeokguk: findGyeokguk(dayStem, pillars.month.charAt(1)),
      yongsin: suggestYongsin(dayStem, st.isStrong, el, pillars.month.charAt(1)),
      season: SEASON_OF_BRANCH[pillars.month.charAt(1)] || null,
    };

    if (birth && birth.gender) {
      result.daeun = buildDaeun(saju, birth.y, birth.m, birth.d, birth.h, birth.mi, birth.gender, 9);
      result.currentDaeun = currentDaeun(result.daeun, birth.y);
    }
    return result;
  }

  return {
    analyze: analyze,
    correctPillars: correctPillars,
    computeYearMonthPillar: computeYearMonthPillar,
    ipchunJD: ipchunJD,
    tenGodOfStem: tenGodOfStem,
    tenGodOfBranch: tenGodOfBranch,
    twelveStage: twelveStage,
    termDistance: termDistance,
    solarLongitude: solarLongitude,
    toJD: toJD, fromJD: fromJD,
    STEM: STEM, BRANCH: BRANCH, HIDDEN: HIDDEN,
    STEM_HANJA: STEM_HANJA, BRANCH_HANJA: BRANCH_HANJA,
    ELEMENT_META: ELEMENT_META, GOD_GROUP: GOD_GROUP,
    STEMS: STEMS, BRANCHES: BRANCHES,
  };
})();
