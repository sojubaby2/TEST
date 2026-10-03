/* ============================================================
   알아볼괘 - 사주 풀이 (주제별 · 쉬운 말)
   ------------------------------------------------------------
   saju-engine.js 가 계산한 값을 받아
   '연애 / 결혼 / 자녀 / 재물 / 직업 / 건강 / 부모 / 인간관계'
   그리고 '초년 / 중년 / 말년' 으로 나눠 풀어 씁니다.

   여기서는 십신·용신 같은 말을 쓰지 않습니다.
   그런 용어 설명은 saju-reading.js 의 '사주 읽는 원리' 칸이 맡아요.

   ※ 모든 문장은 계산 결과가 고릅니다. 무작위는 쓰지 않습니다.
   ============================================================ */

const SajuTopics = (function () {

  const EL_LABEL = { 목:"목(나무)", 화:"화(불)", 토:"토(흙)", 금:"금(쇠)", 수:"수(물)" };
  const EL_WORD  = { 목:"나무", 화:"불", 토:"흙", 금:"쇠", 수:"물" };
  const EL_EMOJI = { 목:"🌳", 화:"🔥", 토:"⛰️", 금:"⚔️", 수:"🌊" };

  /* 오행 상생상극 */
  const GEN = { 목:"화", 화:"토", 토:"금", 금:"수", 수:"목" };
  const OVER = { 목:"토", 토:"수", 수:"화", 화:"금", 금:"목" };
  const GEN_BY = { 화:"목", 토:"화", 금:"토", 수:"금", 목:"수" };

  /* 일간을 사람 말로 */
  const ME = {
    갑:{ word:"큰 나무", emoji:"🌳", one:"곧게 뻗는 사람" },
    을:{ word:"덩굴·화초", emoji:"🌱", one:"휘어서 길을 찾는 사람" },
    병:{ word:"태양", emoji:"☀️", one:"있는 것만으로 드러나는 사람" },
    정:{ word:"촛불", emoji:"🕯️", one:"가까운 사람을 밝히는 사람" },
    무:{ word:"큰 산", emoji:"⛰️", one:"흔들리지 않는 사람" },
    기:{ word:"논밭", emoji:"🌾", one:"무언가를 길러내는 사람" },
    경:{ word:"무쇠·도끼", emoji:"⚔️", one:"끊고 맺는 게 분명한 사람" },
    신:{ word:"보석·메스", emoji:"💎", one:"작은 차이를 보는 사람" },
    임:{ word:"바다·큰 강", emoji:"🌊", one:"크게 담는 사람" },
    계:{ word:"이슬비", emoji:"🌧️", one:"스며드는 사람" },
  };

  /* 다섯 갈래를 사람 말로 (십신 그룹) */
  const FORCE = {
    비겁:{ word:"내 편·경쟁자", what:"주관과 고집, 동료, 그리고 내 몫을 나누는 일" },
    식상:{ word:"표현과 재능", what:"만들고 말하고 베푸는 일, 그리고 자식" },
    재성:{ word:"돈과 현실", what:"재물, 활동 범위, 그리고 현실을 다루는 감각" },
    관성:{ word:"책임과 규칙", what:"직장, 자리, 압박, 그리고 지켜야 할 것" },
    인성:{ word:"배움과 도움", what:"공부, 윗사람의 지원, 마음의 바탕" },
  };

  /* 건강 - 오행이 전통적으로 연결되어 온 자리 (의학 아님) */
  const BODY = {
    목:{ part:"간·담, 눈, 근육", life:"스트레스를 쌓아두는 습관, 화를 참는 버릇" },
    화:{ part:"심장, 혈액순환", life:"과로와 수면 부족, 급하게 몰아치는 생활" },
    토:{ part:"위장, 소화", life:"불규칙한 식사, 신경 쓰면 체하는 성향" },
    금:{ part:"폐·대장, 호흡기, 피부", life:"건조한 환경, 담배와 먼지" },
    수:{ part:"신장·방광, 뼈, 하체", life:"수분 부족, 몸이 차가워지는 생활" },
  };

  /* 분야 (적성) */
  const FIELD = {
    목:"교육·기획·출판·환경·의류처럼 자라고 뻗어가는 일",
    화:"방송·예술·디자인·요식·IT처럼 드러내고 밝히는 일",
    토:"부동산·건설·중개·관리처럼 쌓고 품는 일",
    금:"금융·법률·기계·의료·기술처럼 자르고 다듬는 일",
    수:"유통·무역·연구·상담·물류처럼 흐르고 스며드는 일",
  };

  /* ---------------- 유틸 ---------------- */
  function josa(w, a, b) {
    if (!w) return b;
    const s = String(w).replace(/[)\]}"'·\s]+$/, "");
    const c = s.charCodeAt(s.length - 1);
    if (c < 0xac00 || c > 0xd7a3) return b;
    return ((c - 0xac00) % 28) !== 0 ? a : b;
  }
  const eun = w => josa(w, "은", "는");
  const i_ga = w => josa(w, "이", "가");
  const eul = w => josa(w, "을", "를");

  function cellOf(a, key) {
    return a.cells.filter(c => c.key === key)[0] || null;
  }
  function groupOfGod(g) {
    return SajuEngine.GOD_GROUP[g] || null;
  }

  /* 희신(도움되는 기운) / 기신(부담되는 기운) */
  function helpHurt(a) {
    const y = a.yongsin.primary;
    const help = [y, GEN_BY[y]];              // 용신과 용신을 생해주는 것
    const hurt = [OVER[GEN_BY[y]] === y ? null : null].filter(Boolean);
    // 용신을 극하는 오행이 부담이 됩니다
    const against = Object.keys(OVER).filter(e => OVER[e] === y);
    return { help: help, hurt: against, yong: y };
  }

  /* 어떤 대운이 순한 시기인지 */
  function gradeDaeun(a, item) {
    const hh = helpHurt(a);
    const els = [
      SajuEngine.STEM[item.stem] ? SajuEngine.STEM[item.stem].el : null,
      SajuEngine.BRANCH[item.branch] ? SajuEngine.BRANCH[item.branch].el : null,
    ].filter(Boolean);
    let score = 0;
    els.forEach(e => {
      if (hh.help.indexOf(e) !== -1) score += 1;
      if (hh.hurt.indexOf(e) !== -1) score -= 1;
    });
    return score > 0 ? "순풍" : score < 0 ? "역풍" : "보통";
  }

  /* 나이 구간에 걸치는 대운들 */
  function daeunBetween(a, lo, hi) {
    if (!a.daeun) return [];
    return a.daeun.list.filter(d => d.to >= lo && d.from <= hi)
      .map(d => Object.assign({ grade: gradeDaeun(a, d) }, d));
  }

  /* 지금 나이 (세는 나이). 모르면 null */
  function nowAge(a) {
    return (a.currentDaeun && a.currentDaeun.age) ? a.currentDaeun.age : null;
  }

  /* 특정 십신이 들어오는 대운을 '쓸모 있는 나이대'로 추려서
     이미 지난 것과 앞으로 올 것으로 나눕니다.
     (여든 넘은 재물운을 알려주는 건 아무 도움이 안 되니까요) */
  function findDaeun(a, gods, opt) {
    if (!a.daeun) return { past: [], ahead: [] };
    const o = opt || {};
    const lo = o.minAge == null ? 18 : o.minAge;
    const hi = o.maxAge == null ? 72 : o.maxAge;
    const age = nowAge(a);
    const hit = a.daeun.list.filter(function (d) {
      if (d.from < lo || d.from > hi) return false;
      const gs = [d.stemGod, d.branchGod];
      if (!gs.some(x => gods.indexOf(x) !== -1)) return false;
      if (o.grade === "good") return gradeDaeun(a, d) !== "역풍";
      if (o.grade === "bad") return gradeDaeun(a, d) === "역풍";
      return true;
    });
    if (age == null) return { past: [], ahead: hit };
    return {
      past: hit.filter(d => d.to < age),
      ahead: hit.filter(d => d.to >= age),
    };
  }

  function ageRanges(list) {
    return list.map(d => d.from + "~" + d.to + "세").join(", ");
  }

  function summarizeRun(list) {
    if (!list.length) return null;
    const good = list.filter(d => d.grade === "순풍");
    const bad = list.filter(d => d.grade === "역풍");
    return { good: good, bad: bad, all: list };
  }

  /* ============================================================
     1. 한눈에 보기
     ============================================================ */
  function headline(a) {
    const me = ME[a.dayStem];
    const season = a.season;
    const t = a.elements.total;
    const order = ["목","화","토","금","수"];
    const max = Math.max.apply(null, order.map(e => t[e]));
    const min = Math.min.apply(null, order.map(e => t[e]));
    const most = order.filter(e => t[e] === max);
    const least = order.filter(e => t[e] === min);

    const SEASON_WORD = { 봄:"봄", 여름:"한여름", 가을:"가을", 겨울:"한겨울" };
    const metaphor = (season ? SEASON_WORD[season] + "에 태어난 " : "") + me.word;

    const lines = [];
    lines.push(
      "당신을 사주에서 나타내는 글자는 <b>" + a.dayStem + "</b>, " +
      me.word + "에 해당합니다. 태어난 달까지 함께 보면 <b>" + metaphor + "</b>이에요."
    );

    // 가장 많고 적은 기운
    lines.push(
      "여덟 글자를 기운별로 세어보면 <b>" + most.map(e => EL_WORD[e]).join("·") +
      "</b>" + i_ga(EL_WORD[most[most.length-1]]) + " 가장 많고, <b>" +
      least.map(e => EL_WORD[e]).join("·") + "</b>" +
      i_ga(EL_WORD[least[least.length-1]]) + " 가장 적습니다." +
      (min === 0 ? " 아예 없는 기운도 있네요." : "")
    );

    // 핵심 구조 한 문장
    const g = a.gods.groups;
    const st = a.strength;
    const yong = a.yongsin.primary;
    let core;
    if (!st.isStrong && g.재성 >= 3) {
      core = "돈과 현실을 다루는 기운이 많은데 정작 그걸 감당할 내 힘은 넉넉하지 않은 구조입니다. " +
             "<b>기회는 자주 오는데 다 받으면 내가 지치는</b> 모양이에요. " +
             "그래서 이 사주에서 중요한 건 '얼마나 버느냐'보다 <b>'내가 감당할 수 있는 크기인가'</b>입니다.";
    } else if (!st.isStrong && g.관성 >= 3) {
      core = "책임과 압박이 많은데 그걸 받아낼 내 힘은 넉넉하지 않은 구조입니다. " +
             "<b>맡겨지는 일은 많은데 혼자 떠안으면 버거운</b> 모양이라, " +
             "도와줄 사람과 기댈 장치를 미리 만들어두는 게 이 사주의 핵심이에요.";
    } else if (st.isStrong && g.재성 + g.관성 <= 1) {
      core = "내 힘은 센데 그 힘을 쓸 곳이 사주 안에 뚜렷하지 않은 구조입니다. " +
             "<b>에너지를 흘려보낼 통로</b>를 스스로 만들어야 해요. 일이든 운동이든 표현이든, " +
             "쓰지 않으면 그 힘이 안에서 부딪힙니다.";
    } else if (st.isStrong) {
      core = "내 힘도 있고 그 힘을 쓸 곳도 있는 비교적 균형 잡힌 구조입니다. " +
             "<b>밀어붙여도 버티는 체력</b>이 있는 편이라, 기회가 왔을 때 망설이지 않는 쪽이 유리해요.";
    } else {
      core = "내 힘이 넉넉한 편은 아니라서 <b>혼자 다 하기보다 주변을 쓰는 방식</b>이 맞는 구조입니다. " +
             "기대는 게 약한 게 아니라 이 사주의 전략이에요.";
    }
    lines.push(core);

    lines.push(
      "이 사주에 <b>보약처럼 작용하는 기운은 " + EL_EMOJI[yong] + " " + EL_WORD[yong] + "</b>입니다. " +
      (a.yongsin.johu
        ? "계절이 한쪽으로 치우쳐 있어서, 그걸 바로잡아주는 기운이 가장 급해요."
        : "부족한 쪽을 채워주는 기운이라 이게 들어오는 시기에 일이 잘 풀립니다.")
    );

    // 키워드
    const keys = [];
    keys.push(me.one);
    keys.push(st.isStrong ? "밀고 나가는 힘이 있음" : "주변을 쓸 때 멀리 감");
    const topForce = ["비겁","식상","재성","관성","인성"]
      .slice().sort((x, y2) => g[y2] - g[x])[0];
    keys.push(FORCE[topForce].word + "이 두터움");
    if (a.sinsal.some(s => s.name === "천을귀인")) keys.push("어려울 때 돕는 사람이 있음");
    if (a.sinsal.some(s => s.name === "역마")) keys.push("움직일수록 풀림");
    if (a.sinsal.some(s => s.name === "도화")) keys.push("사람을 끌어당김");
    keys.push(EL_EMOJI[yong] + " " + EL_WORD[yong] + " 기운이 보약");

    return { metaphor: metaphor, emoji: me.emoji, lines: lines, keywords: keys.slice(0, 5) };
  }

  /* ============================================================
     2. 성격
     ============================================================ */
  const CHAR = {
    갑:{ base:"방향이 분명합니다. 한번 정하면 좀처럼 틀지 않아요. 나무가 옆으로 눕지 않고 위로만 자라는 것과 같습니다.",
         good:["맡으면 끝까지 해냄","원칙이 분명해 믿음을 줌","앞에 서는 자리가 어울림"],
         bad:["한번 세운 뜻을 굽히기 어려움","돌아가는 길을 잘 못 찾음","내 기준으로 남을 재기 쉬움"] },
    을:{ base:"정면으로 부딪히기보다 돌아가는 길을 먼저 찾고, 그 길이 대개 맞습니다. 덩굴이 바위를 넘지 않고 감아 오르는 것과 같아요.",
         good:["어디에 놓여도 적응함","부딪히지 않고 길을 찾음","분위기를 섬세하게 읽음"],
         bad:["맞추다가 내 기준이 흐려짐","거절을 어려워함","속으로 쌓아둠"] },
    병:{ base:"존재감이 큽니다. 조용히 있으려 해도 사람들이 알아보고, 가라앉은 자리에 들어가면 공기가 바뀝니다.",
         good:["어디서든 드러나는 존재감","분위기를 끌어올림","속내가 투명해 믿음을 줌"],
         bad:["기분의 오르내림이 그대로 보임","한번 식으면 빠르게 식음","쉴 줄 모름"] },
    정:{ base:"모두에게 잘하기보다 몇 사람에게 깊이 갑니다. 상대가 말하지 않은 것도 알아채요.",
         good:["가까운 사람을 깊이 챙김","말 안 해도 알아채는 섬세함","조용하지만 오래 가는 영향력"],
         bad:["속으로 삭이다 한꺼번에 터짐","상처를 오래 기억함","힘들다는 말을 가장 늦게 함"] },
    무:{ base:"주변이 흔들릴수록 가치가 드러납니다. 급한 일이 터져도 톤이 크게 변하지 않아요.",
         good:["흔들림이 적어 기준이 되어줌","성향이 다른 사람을 품음","위기에서 침착함"],
         bad:["변화를 시작하는 데 느림","고집이 조용히 단단함","답답해 보일 때가 있음"] },
    기:{ base:"말이 멋진 것보다 실제로 되는 쪽을 고릅니다. 남이 안 하는 뒷정리를 조용히 해요.",
         good:["실제 결과를 만들어냄","사람을 품고 뒷받침함","성실함이 쌓여 신뢰가 됨"],
         bad:["남의 몫까지 떠안음","결정을 미루기 쉬움","자기를 뒤로 미룸"] },
    경:{ base:"재고 또 재기보다 '해야 한다' 싶으면 바로 움직이고, 그 판단이 대체로 맞습니다.",
         good:["결단이 빠르고 실행이 따라옴","의리를 지킴","불의를 참지 않음"],
         bad:["말이 날카롭게 나감","옳고 그름을 먼저 따짐","부드럽게 전하는 데 서투름"] },
    신:{ base:"남들이 넘기는 차이를 알아챕니다. 자기 기준이 뚜렷하고 그 기준이 높아요.",
         good:["작은 차이를 알아봄","완성도 기준이 높음","자기 색이 분명함"],
         bad:["사소한 일에 예민함","자기를 가장 혹독하게 평가","상처를 오래 기억함"] },
    임:{ base:"눈앞의 손익보다 전체 판을 봅니다. 낯선 분야에도 거부감 없이 들어가요.",
         good:["판을 넓게 보는 시야","새로운 걸 받아들임","사람을 가리지 않음"],
         bad:["방향이 흐려지기 쉬움","한번 흔들리면 오래 출렁임","깊이보다 넓이로 흐름"] },
    계:{ base:"분위기의 미세한 변화를 먼저 알아채고, 말로 설명하기 어려운 직감이 자주 맞습니다.",
         good:["감정과 분위기를 먼저 읽음","직감이 잘 맞음","조용히 곁을 지킴"],
         bad:["남의 감정에 쉽게 물듦","여리고 상처받기 쉬움","내 마음을 뒤로 미룸"] },
  };

  function personality(a) {
    const c = CHAR[a.dayStem];
    const paras = [c.base];
    const good = c.good.slice();
    const bad = c.bad.slice();
    const g = a.gods.groups;
    const t = a.elements.total;

    // 물이 많으면 생각이 많아집니다 (참고 풀이에서 가장 잘 드러난 대목)
    if (t.수 >= 5) {
      paras.push(
        "여기에 <b>물 기운이 아주 많습니다</b>. 물은 사주에서 생각과 계산을 뜻해요. " +
        "그래서 겉으로 태연해 보여도 속에서는 여러 경우의 수를 돌려봅니다. " +
        "'생각 → 검토 → 다시 생각 → 행동' 순서로 움직이는 편이라, " +
        "즉흥적으로 뛰어들기보다 머릿속에서 충분히 시뮬레이션한 다음 나섭니다."
      );
      paras.push(
        "이게 강점일 때는 <b>사람 보는 눈과 현실 계산</b>으로 나타납니다. " +
        "다만 지나치면 '지금 움직이는 게 맞나', '저 말을 한 이유가 뭐지' 하고 " +
        "안에서 계산이 길어져서, 남들 눈에는 결단이 늦어 보이는 순간이 생겨요."
      );
      good.push("관찰력이 좋고 경우의 수를 미리 봄");
      bad.push("생각이 길어져 결정이 늦어짐");
    } else if (t.화 >= 5) {
      paras.push(
        "여기에 <b>불 기운이 아주 많습니다</b>. 불은 드러냄과 추진을 뜻해요. " +
        "속도가 빠르고 표현이 분명해서 함께 있는 사람이 당신 생각을 헷갈릴 일이 없습니다. " +
        "다만 한번에 몰아 태우는 편이라, 식는 것도 빠릅니다."
      );
      bad.push("한꺼번에 몰아 태우고 빠르게 식음");
    } else if (t.토 >= 5) {
      paras.push(
        "여기에 <b>흙 기운이 아주 많습니다</b>. 흙은 쌓고 버티는 힘이에요. " +
        "쉽게 흔들리지 않고 자기 자리를 지키지만, 바꿔야 할 때도 '조금만 더 보자'로 넘기기 쉽습니다."
      );
      bad.push("바꿔야 할 때를 미루기 쉬움");
    }

    // 비겁이 없으면 혼자 버티는 힘보다 주변
    if (g.비겁 === 0) {
      paras.push(
        "사주에 <b>나와 같은 편에 해당하는 글자가 없습니다</b>. " +
        "또래와 몰려다니며 힘을 얻는 쪽이 아니라, 혼자 판단하고 혼자 책임지는 데 익숙해지는 구조예요. " +
        "자립심이 빨리 생기는 대신, 힘들 때 기댈 곳을 스스로 만들어두지 않으면 혼자 버티다 지칩니다."
      );
    } else if (g.비겁 >= 3) {
      paras.push(
        "사주에 <b>나와 같은 편이 많습니다</b>. 주관이 뚜렷하고 지지 않으려는 마음이 강해요. " +
        "경쟁 구도에 자주 놓이고, 함께 가야 할 자리에서도 혼자 가려 하는 일이 생깁니다."
      );
    }

    // 사람을 쉽게 믿지 않는 구조
    if (a.relations.hyung.length || a.relations.hae.length) {
      paras.push(
        "사주 안에 서로 어긋나는 글자 조합이 있습니다. 전통적으로 <b>사소한 오해가 쌓이기 쉬운 자리</b>로 봤어요. " +
        "본인은 별 뜻 없이 한 말인데 상대가 다르게 받아들이거나, 반대로 상대의 행동을 오래 곱씹는 일이 생깁니다. " +
        "이 사주에서는 <b>추측하기보다 직접 물어보는 습관</b>이 특히 값집니다."
      );
    }

    return { paras: paras, good: good.slice(0, 4), bad: bad.slice(0, 4) };
  }

  /* ============================================================
     3. 초년 / 중년 / 말년
     ============================================================ */
  function lifeStages(a) {
    const out = [];
    const SPEC = [
      { id:"early", emoji:"🌱", title:"초년운", age:"태어나서 20대까지",
        cellKey:"year", lo:1, hi:29,
        seat:"태어난 집안의 분위기와 자라난 환경" },
      { id:"mid", emoji:"🌳", title:"중년운", age:"30대부터 50대까지",
        cellKey:"day", lo:30, hi:59,
        seat:"내 가정과 가장 가까운 관계, 그리고 일의 절정기" },
      { id:"late", emoji:"🍂", title:"말년운", age:"60대 이후",
        cellKey:"hour", lo:60, hi:95,
        seat:"노년의 모습, 자녀와 아랫사람, 내가 남기는 것" },
    ];

    SPEC.forEach(function (s) {
      const cell = cellOf(a, s.cellKey);
      if (!cell) return;
      const paras = [];
      const god = cell.branchGod;
      const grp = groupOfGod(god);

      paras.push(
        s.title + "은 사주의 <b>" + { year:"첫째", day:"셋째", hour:"넷째" }[s.cellKey] +
        " 기둥</b>으로 봅니다. " + s.seat + "을 읽는 자리예요."
      );

      if (grp) {
        const f = FORCE[grp];
        const SAY = {
          비겁:"이 시기에는 <b>또래와 경쟁</b>이 삶의 중심에 놓입니다. 친구·동료와 어울리는 일이 많고, 내 몫을 지키는 문제가 자주 떠올라요.",
          식상:"이 시기에는 <b>표현하고 만들어내는 일</b>이 중심에 놓입니다. 재능이 드러나고, 내가 밖으로 내보내는 것으로 평가받습니다.",
          재성:"이 시기에는 <b>돈과 현실</b>이 중심에 놓입니다. 벌고 쓰고 굴리는 문제가 삶의 전면에 올라와요.",
          관성:"이 시기에는 <b>책임과 자리</b>가 중심에 놓입니다. 맡은 일, 지켜야 할 것, 평판 같은 게 중요해집니다.",
          인성:"이 시기에는 <b>배우고 받는 일</b>이 중심에 놓입니다. 공부하거나 누군가의 도움을 받으며 바탕을 쌓는 시기예요.",
        };
        paras.push(SAY[grp]);
      }

      // 그 시기 대운 흐름
      const run = summarizeRun(daeunBetween(a, s.lo, s.hi));
      if (run) {
        const g = run.good, b = run.bad;
        if (g.length && !b.length) {
          paras.push(
            "이 시기를 지나는 10년 흐름을 보면 <b>" +
            g.map(d => d.from + "~" + d.to + "세").join(", ") +
            "</b> 구간에 당신에게 보약이 되는 기운이 들어옵니다. 전반적으로 순한 시기예요."
          );
        } else if (!g.length && b.length) {
          paras.push(
            "이 시기를 지나는 10년 흐름 중 <b>" +
            b.map(d => d.from + "~" + d.to + "세").join(", ") +
            "</b> 구간은 애써야 하는 때로 봅니다. 나쁜 일이 생긴다는 뜻이 아니라, " +
            "같은 결과를 내는 데 품이 더 드는 시기라는 뜻이에요."
          );
        } else if (g.length && b.length) {
          paras.push(
            "이 시기 안에서도 흐름이 갈립니다. <b>" + g.map(d => d.from + "~" + d.to + "세").join(", ") +
            "</b>는 순한 구간이고, <b>" + b.map(d => d.from + "~" + d.to + "세").join(", ") +
            "</b>는 품이 더 드는 구간이에요."
          );
        } else {
          paras.push("이 시기의 10년 흐름은 크게 치우치지 않고 무난하게 지나갑니다.");
        }
      }

      // 공망
      if (a.gongmangHit.indexOf(cell.branch) !== -1) {
        paras.push(
          "다만 이 기둥이 <b>'빈자리'에 해당</b>합니다. 전통적으로 이 시기에는 " +
          "분주한 것에 비해 손에 쥐어지는 게 적게 느껴진다고 봤어요. " +
          "반대로 그 영역에 매이지 않아 자유롭다고 읽는 관점도 있습니다."
        );
      }

      out.push({ id:s.id, emoji:s.emoji, title:s.title, age:s.age,
                 pillar: cell.pillar, hanja: (cell.stemHanja||"") + (cell.branchHanja||""),
                 paras: paras, run: run });
    });
    return out;
  }

  /* ============================================================
     4. 주제별 운
     ============================================================ */

  /* --- 연애 --- */
  const SEAT_LOVE = {
    비견:"끌리는 사람이 나와 비슷합니다. 친구처럼 지내는 관계가 가장 편해요. 다만 둘 다 주관이 뚜렷해서 주도권이 겹치면 부딪힙니다.",
    겁재:"끌리는 힘도 세고 부딪히는 힘도 셉니다. 잔잔한 관계보다 역동적인 관계가 되기 쉬워요. 돈이 얽히는 지점은 특히 조심하셔야 합니다.",
    식신:"편안한 사람에게 끌립니다. 극적인 사랑보다 일상이 잘 맞는 사람과 오래 가요. 챙겨주고 먹이고 돌보는 게 애정 표현이 됩니다.",
    상관:"말이 통하고 서로 자극이 되는 사람에게 끌립니다. 다만 그 말이 날카로워지면 가장 가까운 사람을 베요. '맞는 말'보다 '전하는 방식'이 숙제입니다.",
    편재:"활동적이고 사람 잘 쓰는 상대에게 끌립니다. 인연의 폭이 넓어 여러 사람이 스쳐가는 편이라, 깊이를 어디에 둘지 스스로 정해두는 게 중요해요.",
    정재:"성실하고 현실적인 상대에게 끌립니다. 관계에서 약속과 신뢰를 가장 중요하게 여겨요. 안정적인 연애를 하는 쪽입니다.",
    편관:"강한 사람에게 끌립니다. 관계 안에서 긴장이 자주 생기는데, 그 긴장이 서로를 키울 수도 있고 갈아낼 수도 있어요. 참다가 터뜨리는 방식만 피하면 됩니다.",
    정관:"반듯하고 책임감 있는 상대에게 끌립니다. 예의와 질서를 중요하게 여겨요. 다만 서로 '해야 할 것'만 챙기다 마음이 뒤로 밀리지 않게 하셔야 합니다.",
    편인:"설명하지 않아도 통하는 사람에게 끌립니다. 다만 둘 다 안으로 향하면 말이 줄어드니, 사소한 걸 입으로 꺼내는 습관이 필요해요.",
    정인:"품어주고 받쳐주는 상대에게 끌립니다. 안정감을 가장 크게 느끼는 쪽이에요. 다만 기대는 쪽으로만 흐르면 관계가 한쪽으로 기웁니다.",
  };

  function topicLove(a) {
    const day = cellOf(a, "day");
    const seat = day ? day.branchGod : null;
    const g = a.gods.groups;
    const st = a.strength;
    const paras = [];

    paras.push(
      "사주에서 연애와 배우자를 보는 자리는 <b>태어난 날의 아랫글자</b>입니다. " +
      "내가 평생 깔고 앉는 자리라고 해서, 가장 가까운 사람을 여기서 읽어요."
    );
    if (seat && SEAT_LOVE[seat]) paras.push(SEAT_LOVE[seat]);

    // 인연의 양
    const love = g.재성 + g.관성;
    if (love === 0) {
      paras.push(
        "인연을 뜻하는 글자가 겉으로 드러나지 않습니다. 인연이 없다는 뜻은 아니고, " +
        "<b>늦게 자리 잡거나 조용히 오는 편</b>으로 읽어요. 글자 속에 숨어 있는 경우도 많고, " +
        "10년 흐름에서 들어오기도 합니다. 이걸로 결혼 여부를 점치는 식의 해석은 근거가 약해요."
      );
    } else if (love >= 4) {
      paras.push(
        "인연을 뜻하는 글자가 <b>여러 개 있습니다</b>. 사람과의 인연이 인생에서 꽤 큰 자리를 차지해요. " +
        "이성의 관심을 받는 일도, 관계로 고민하는 일도 남들보다 많은 편입니다."
      );
    }

    // 재다신약 - 관계에서 끌려가는 구조
    if (!st.isStrong && g.재성 >= 3) {
      paras.push(
        "눈여겨볼 대목이 있습니다. 상대를 뜻하는 기운은 센데 내 힘은 그만큼은 아닌 구조예요. " +
        "연애에서 <b>상대의 존재감이 커지기 쉽습니다.</b> 맞춰주다 지치거나, 좋아하는 사람에게 " +
        "현실적인 지원을 많이 하거나, 상대 감정에 내 하루가 좌우되는 식으로요. " +
        "이 사주에서 연애가 편해지는 방법은 하나입니다. <b>내 생활을 먼저 세워두는 것</b>이에요."
      );
    }
    if (!st.isStrong && g.관성 >= 3) {
      paras.push(
        "눈여겨볼 대목이 있습니다. 나를 누르는 기운이 센 편이라, 관계에서 <b>책임감이 과하게 올라올 수 있어요.</b> " +
        "상대를 챙겨야 한다는 마음이 커지다가 어느 순간 혼자 짊어지고 있는 걸 발견하게 됩니다."
      );
    }

    // 일지 충·합
    const dayB = day ? day.branch : null;
    const chung = a.relations.chung.filter(x => x.members.indexOf(dayB) !== -1);
    const hap = a.relations.yukhap.concat(a.relations.samhap, a.relations.banhap)
      .filter(x => x.members.indexOf(dayB) !== -1);
    if (chung.length) {
      paras.push(
        "배우자 자리가 다른 글자와 <b>부딪히고 있습니다</b>. 관계에 변동이 잦은 구조로 봤어요. " +
        "다만 부딪힘은 '변화'이지 '파탄'이 아닙니다. 이사·이직처럼 환경이 바뀌는 일로도 똑같이 나타나요."
      );
    }
    if (hap.length) {
      paras.push(
        "배우자 자리가 다른 글자와 <b>묶여 있습니다</b>. 한번 자리 잡으면 오래 유지되는 쪽으로 봤어요."
      );
    }
    if (a.sinsal.some(s => s.name === "도화")) {
      paras.push("사람을 끌어당기는 기운(도화)도 있습니다. 매력과 인기로 읽는 쪽이 요즘의 해석이에요.");
    }

    return { id:"love", emoji:"💕", title:"연애운", paras: paras,
      tip: !st.isStrong && g.재성 >= 3
        ? "상대에게 맞추기 전에 내 하루를 먼저 세워두세요. 그래야 오래 갑니다."
        : "추측으로 상대 마음을 짐작하기보다 직접 물어보는 쪽이 이 사주에는 잘 맞습니다." };
  }

  /* --- 결혼 --- */
  function topicMarriage(a) {
    const day = cellOf(a, "day");
    const seat = day ? day.branchGod : null;
    const g = a.gods.groups;
    const st = a.strength;
    const paras = [];

    paras.push(
      "연애와 결혼은 사주에서 읽는 방식이 조금 다릅니다. " +
      "연애가 '끌리는가'라면 결혼은 <b>'같이 살 수 있는가'</b>를 보거든요."
    );

    // 배우자 성향
    const SPOUSE = {
      비견:"주관이 뚜렷하고 자기 일이 분명한 사람", 겁재:"추진력이 세고 승부욕이 있는 사람",
      식신:"넉넉하고 잘 먹이고 잘 챙기는 사람", 상관:"재주가 많고 말이 분명한 사람",
      편재:"활동 범위가 넓고 수완이 좋은 사람", 정재:"성실하고 알뜰하며 약속을 지키는 사람",
      편관:"강단 있고 책임을 지는 사람", 정관:"반듯하고 체계적인 사람",
      편인:"생각이 깊고 자기 세계가 있는 사람", 정인:"따뜻하고 품어주는 사람",
    };
    if (seat && SPOUSE[seat]) {
      paras.push(
        "배우자 자리의 글자로 보면, 인연이 되는 사람은 <b>" + SPOUSE[seat] + "</b>일 가능성을 봅니다. " +
        "본인도 그런 사람에게 끌리는 편이고요."
      );
    }

    if (!st.isStrong && g.재성 >= 3) {
      paras.push(
        "이 사주는 결혼에서 <b>현실 조건이 특히 중요</b>합니다. 감정만 보고 결정하면 나중에 힘들어지는 구조예요. " +
        "돈, 집, 생활 방식, 시간 쓰는 법, 양가 문제 같은 게 맞아야 관계가 오래 갑니다. " +
        "상대를 고를 때 <b>경제관념과 생활습관이 맞는지</b>를 꼭 보셔야 해요."
      );
    } else {
      paras.push(
        "결혼 상대를 볼 때 이 사주가 가장 중요하게 여기는 건 " +
        (g.인성 >= g.재성 ? "<b>마음이 편한가</b>입니다. 조건보다 함께 있을 때 긴장이 풀리는 사람이 맞아요."
                          : "<b>생활이 맞는가</b>입니다. 설레는 것보다 같이 사는 리듬이 맞는 쪽이 오래 갑니다.")
      );
    }

    // 인연이 자리 잡기 좋은 시기 — 결혼을 생각할 나이대만
    if (a.daeun) {
      const LOVE = ["정재","편재","정관","편관"];
      const f = findDaeun(a, LOVE, { grade:"good", minAge:20, maxAge:55 });
      if (f.ahead.length) {
        paras.push(
          "앞으로 10년 흐름에서 <b>인연이 자리 잡기 좋은 구간은 " + ageRanges(f.ahead) + "</b>입니다. " +
          "이 시기에 만남이 결혼으로 이어지는 경우가 많다고 봤어요."
        );
      } else if (f.past.length) {
        paras.push(
          "인연이 자리 잡기 좋은 구간은 <b>" + ageRanges(f.past) + "</b>로 이미 지나왔습니다. " +
          "앞으로는 새 인연을 만드는 일보다 지금 곁에 있는 관계를 다지는 쪽에 힘이 실리는 흐름이에요."
        );
      } else {
        // 인연 기운이 들어오는 대운이 없으면, 순한 구간을 대신 짚어줍니다
        const fair = daeunBetween(a, 20, 55).filter(d => d.grade === "순풍");
        paras.push(
          "10년 흐름에 인연 기운이 따로 크게 들어오는 구간은 없습니다. " +
          "결혼이 특정 시기에 몰리기보다 <b>본인이 마음먹은 때에 이뤄지는 쪽</b>으로 보시면 돼요." +
          (fair.length
            ? " 굳이 꼽자면 <b>" + ageRanges(fair) + "</b> 구간이 전반적으로 순해서, " +
              "이때 내린 결정이 뒤탈이 적은 편입니다."
            : "")
        );
      }
    }

    paras.push(
      "⚠️ 옛 명리서는 <b>남자는 재물 기운을, 여자는 책임 기운을</b> 배우자로 읽었습니다. " +
      "남자가 바깥일을 하고 여자가 집을 지킨다는 시대의 전제 위에 세운 규칙이에요. " +
      "지금 삶에 그대로 대응시키기 어려워서, 여기서는 성별로 나누지 않고 두 기운을 함께 읽었습니다."
    );

    return { id:"marry", emoji:"💍", title:"결혼운", paras: paras,
      tip:"'이 사람이 좋은가'와 '이 사람과 살 수 있는가'는 다른 질문입니다. 두 번째 질문을 꼭 따로 해보세요." };
  }

  /* --- 자녀 --- */
  function topicChild(a) {
    const hour = cellOf(a, "hour");
    const g = a.gods.groups;
    const paras = [];

    if (!hour) {
      paras.push(
        "태어난 시각을 넣지 않으셔서 <b>자녀를 보는 기둥이 비어 있습니다</b>. " +
        "사주에서 자녀는 넷째 기둥(태어난 시각)으로 보기 때문에, 이 대목은 시각을 아셔야 풀 수 있어요. " +
        "가족분께 출생 시각을 여쭤보시고 다시 해보시길 권합니다."
      );
      return { id:"child", emoji:"👶", title:"자녀운", paras: paras, tip:null, incomplete:true };
    }

    paras.push(
      "사주에서 자녀는 <b>태어난 시각의 기둥</b>으로 봅니다. 하루의 끝이 삶의 끝이자 " +
      "다음 세대로 이어지는 자리라고 본 거예요."
    );

    const grp = groupOfGod(hour.branchGod);
    const SAY = {
      비겁:"자녀 자리에 나와 같은 기운이 앉았습니다. 자녀가 나와 성향이 비슷해서 잘 통하는 대신, 둘 다 고집이 있어 부딪히기도 합니다.",
      식상:"자녀 자리에 표현하는 기운이 앉았습니다. 전통적으로 자녀 복이 좋은 자리로 봤어요. 아이가 재능을 일찍 드러내고, 키우는 보람이 큰 쪽입니다.",
      재성:"자녀 자리에 현실적인 기운이 앉았습니다. 자녀가 야무지고 현실 감각이 좋은 편으로 봅니다. 다만 자녀에게 들어가는 비용도 함께 보는 자리예요.",
      관성:"자녀 자리에 책임의 기운이 앉았습니다. 자녀가 반듯하게 자라는 대신, 부모로서 짊어지는 몫도 큰 자리로 봤어요.",
      인성:"자녀 자리에 배움의 기운이 앉았습니다. 자녀가 공부 쪽과 연이 있고, 늦게까지 부모 손이 가는 편으로 봅니다.",
    };
    if (grp) paras.push(SAY[grp]);

    if (g.식상 === 0) {
      paras.push(
        "자녀를 뜻하는 또 다른 기운(내가 내보내는 기운)이 겉으로 드러나지 않습니다. " +
        "전통적으로는 자녀와의 인연이 늦거나 수가 적다고 읽었어요. " +
        "다만 이건 <b>출산을 예측하는 근거가 전혀 되지 못합니다.</b> " +
        "글자 속에 숨어 있는 경우도 많고, 무엇보다 사주로 임신·출산을 점칠 수는 없어요. " +
        "그 부분은 반드시 의료 전문가와 상의하세요."
      );
    } else if (g.식상 >= 3) {
      paras.push(
        "내가 내보내는 기운이 두텁습니다. 자녀와 관련된 일이 삶에서 비중 있게 다뤄지는 구조예요. " +
        "자녀가 아니더라도 가르치고 돌보고 만들어내는 쪽으로 이 기운이 쓰입니다."
      );
    }

    if (a.gongmangHit.indexOf(hour.branch) !== -1) {
      paras.push(
        "자녀 자리가 '빈자리'에 해당합니다. 자녀와 떨어져 지내는 시기가 있거나, " +
        "기대와 다른 방향으로 자라는 경우를 옛 글에서는 여기로 읽었어요. " +
        "좋고 나쁨이라기보다 <b>내 뜻대로 되지 않는 영역</b>이라는 뜻에 가깝습니다."
      );
    }

    return { id:"child", emoji:"👶", title:"자녀운", paras: paras,
      tip:"자녀 자리는 '내가 남기는 것' 전체를 보는 자리이기도 합니다. 꼭 아이가 아니어도 돼요." };
  }

  /* --- 재물 --- */
  function topicMoney(a) {
    const g = a.gods.groups;
    const st = a.strength;
    const paras = [];

    paras.push(
      "사주에서 재물은 <b>'내가 다루는 기운'</b>으로 봅니다. " +
      "내가 눌러서 내 것으로 만드는 대상이라는 뜻이에요. " +
      "그래서 재물운은 재물 기운이 얼마나 많은지만 보지 않고, " +
      "<b>내가 그걸 감당할 힘이 되는지</b>를 함께 봅니다."
    );

    const many = g.재성 >= 3;
    const strong = st.isStrong;

    if (many && !strong) {
      paras.push(
        "당신의 사주는 <b>재물 기운은 두터운데 내 힘은 그만큼은 아닌</b> 구조입니다. " +
        "명리에서 꽤 특징적으로 보는 모양이에요. 한마디로 <b>돈 벌 기회는 자주 오는데, " +
        "그걸 다 받으면 내가 지치는</b> 구조입니다."
      );
      paras.push(
        "그래서 이 사주는 '얼마나 버느냐'가 아니라 <b>'내가 통제할 수 있느냐'</b>가 핵심입니다. " +
        "기회가 보인다고 규모를 키우면 돈 뒤에 책임이 따라오고, 책임 뒤에 스트레스가, " +
        "그 뒤에 사람 문제가 따라옵니다. <b>'기회가 있으니 한다'가 아니라 '내가 감당되는가'</b>로 " +
        "판단하는 게 이 사주에서는 아주 중요해요."
      );
      paras.push(
        "특히 조심할 것은 <b>보증, 무리한 대출, 지인 돈이 섞인 사업, 감정이 실린 투자</b>입니다. " +
        "한 번에 크게 거는 방식보다 <b>시간을 들여 쌓는 방식</b>이 훨씬 잘 맞습니다."
      );
    } else if (many && strong) {
      paras.push(
        "<b>재물 기운도 두텁고 그걸 감당할 내 힘도 있는</b> 구조입니다. " +
        "벌어들이는 힘과 지키는 힘이 함께 있어서, 재물 쪽으로는 비교적 복이 있는 모양으로 봤어요. " +
        "판을 벌이는 일, 사람과 돈이 함께 움직이는 일에서 능력이 드러납니다."
      );
    } else if (!many && strong) {
      paras.push(
        "내 힘은 센데 <b>재물 기운은 두텁지 않은</b> 구조입니다. " +
        "가만히 있으면 돈이 들어오는 모양은 아니라서, <b>내가 움직여 만들어야</b> 합니다. " +
        "다행히 그럴 힘은 있어요. 월급처럼 정해진 수입보다 성과가 바로 돌아오는 구조가 잘 맞습니다."
      );
    } else {
      paras.push(
        "<b>재물 기운도 내 힘도 크게 두텁지는 않은</b> 구조입니다. " +
        "크게 벌어 크게 쓰는 쪽보다 <b>안정적인 수입을 꾸준히 쌓는 방식</b>이 맞아요. " +
        "투기적인 선택은 이 사주와 잘 맞지 않습니다."
      );
    }

    // 비겁 = 재물 분산
    if (g.비겁 >= 3) {
      paras.push(
        "여기에 <b>내 몫을 나눠 갖는 기운</b>도 두텁습니다. 전통적으로 재물이 한곳에 머물지 않고 " +
        "나가는 구조로 읽었어요. 동업이나 돈이 얽힌 관계에서는 조건을 처음에 문서로 " +
        "분명히 해두시는 게 좋습니다."
      );
    }

    // 재물이 움직이는 시기 — 일할 나이대만, 그리고 앞으로 올 것 위주로
    if (a.daeun) {
      const MONEY = ["정재","편재"];
      const good = findDaeun(a, MONEY, { grade:"good", minAge:20, maxAge:70 });
      const bad  = findDaeun(a, MONEY, { grade:"bad",  minAge:20, maxAge:70 });

      if (good.ahead.length) {
        paras.push(
          "앞으로 10년 흐름에서 <b>재물이 크게 움직이는 구간은 " + ageRanges(good.ahead) +
          "</b>입니다. 벌이와 씀씀이가 함께 커지는 때라고 보시면 돼요."
        );
      } else if (good.past.length) {
        paras.push(
          "재물이 크게 움직이는 구간은 <b>" + ageRanges(good.past) + "</b>로, 이미 지나오셨습니다. " +
          "앞으로는 새로 벌이기보다 그때 쌓은 것을 지키고 굴리는 쪽이 이 사주에 맞습니다."
        );
      }

      if (bad.ahead.length && many && !strong) {
        paras.push(
          "반대로 <b>" + ageRanges(bad.ahead) + "</b>는 돈이 커지는 만큼 부담도 같이 커지는 구간이에요. " +
          "이때는 벌리기보다 <b>현금흐름 → 빚 → 투자 규모</b> 순으로 점검하시길 권합니다."
        );
      }

      // 재물 기운이 들어오는 대운이 아예 없을 때도 할 말이 있습니다
      if (!good.ahead.length && !good.past.length && !bad.ahead.length) {
        const fair = daeunBetween(a, 20, 70).filter(d => d.grade === "순풍");
        if (many && !strong) {
          paras.push(
            "흥미로운 점이 있습니다. 당신의 10년 흐름에는 <b>재물 기운이 따로 들어오는 구간이 없습니다.</b> " +
            "언뜻 서운하게 들리지만, 이 사주에는 오히려 반가운 모양이에요. " +
            "원래 사주 안에 재물 기운은 이미 넘치도록 있고 부족한 건 <b>그걸 감당할 내 힘</b>이거든요. " +
            "10년 흐름이 돈을 더 밀어넣는 대신 <b>나를 단단하게 만드는 쪽</b>으로 흐른다는 뜻입니다."
          );
          paras.push(
            "그래서 이 사주의 재물은 <b>'돈부터 키우고 기반을 나중에'가 아니라 " +
            "'기반을 먼저 만들고 돈을 그 위에 얹는'</b> 순서로 풀립니다. " +
            "전문성을 쌓고, 자격이나 기술을 확보하고, 경험을 모은 다음 규모를 키우는 방식이에요."
          );
        } else {
          paras.push(
            "당신의 10년 흐름에는 재물 기운이 뚜렷하게 들어오는 구간이 따로 없습니다. " +
            "한 번에 크게 움직이는 재물운이라기보다 <b>꾸준히 쌓아가는 형태</b>로 보시면 됩니다."
          );
        }
        if (fair.length) {
          paras.push(
            "대신 <b>" + ageRanges(fair) + "</b> 구간에 당신에게 보약이 되는 기운이 들어옵니다. " +
            "이때가 기반을 다지기 가장 좋은 때예요."
          );
        }
      }
    }

    return { id:"money", emoji:"💰", title:"재물운", paras: paras,
      tip: many && !strong
        ? "버는 능력보다 통제하는 능력이 이 사주의 승부처입니다."
        : "이 사주는 시간을 들여 쌓는 방식이 가장 잘 맞습니다." };
  }

  /* --- 직업 --- */
  function topicJob(a) {
    const g = a.gods.groups;
    const st = a.strength;
    const yong = a.yongsin.primary;
    const paras = [];
    const order = ["비겁","식상","재성","관성","인성"];
    const top = order.slice().sort((x, y) => g[y] - g[x])[0];

    const BY = {
      비겁:"내 이름으로 하는 일이 맞습니다. 남이 정한 속도를 따라가는 자리에서는 답답함을 느껴요.",
      식상:"만들고 표현하고 전달하는 일이 맞습니다. 결과물이 눈에 보이거나 누군가에게 닿는 구조에서 보람이 큽니다.",
      재성:"움직이고 벌이고 다루는 일이 맞습니다. 성과가 바로 돌아오는 구조에서 힘이 나요.",
      관성:"책임이 분명하고 체계가 있는 일이 맞습니다. 맡은 범위가 명확할 때 가장 잘하고, 경계가 흐린 자리에서는 소모가 큽니다.",
      인성:"배우고 쌓아 전하는 일이 맞습니다. 바로 성과가 나지 않아도 깊이가 자산이 되는 구조에서 오래 갑니다.",
    };
    paras.push("사주에서 가장 두터운 기운은 <b>" + FORCE[top].word + "</b>입니다. " + BY[top]);

    // 직장 vs 사업
    if (g.재성 >= 3 && !st.isStrong) {
      paras.push(
        "직장형이라고만 묶기에는 <b>활동성이 있고</b>, 완전한 사업가형이라고 하기에는 " +
        "<b>혼자 밀어붙이는 힘이 아주 세지는 않은</b> 구조입니다. " +
        "그래서 가장 잘 맞는 건 <b>전문성 + 조직이나 시스템 + 성과</b>가 함께 있는 형태예요. " +
        "완전히 혼자 떠안는 사업보다, 받쳐주는 구조 안에서 내 성과를 내는 쪽이 유리합니다."
      );
    } else if (g.관성 >= 2 && g.인성 >= 2) {
      paras.push(
        "체계가 있는 조직에서 힘을 내는 구조입니다. 규칙과 절차가 분명한 곳에서 " +
        "오래 버티고 인정받는 쪽이에요."
      );
    } else if (st.isStrong && g.재성 >= 2) {
      paras.push(
        "스스로 판을 만드는 쪽이 맞는 구조입니다. 내 결정으로 결과가 바뀌는 자리에서 " +
        "능력이 가장 잘 드러나요."
      );
    }

    paras.push(
      "보약이 되는 <b>" + EL_EMOJI[yong] + " " + EL_WORD[yong] + "</b> 기운으로 보면 " +
      FIELD[yong] + "이 부족한 쪽을 채워주는 방향입니다. " +
      "꼭 직업이 아니어도 괜찮아요. 그런 성격의 환경이나 취미를 곁에 두는 것만으로도 " +
      "전통에서는 보완이 된다고 봤습니다."
    );
    paras.push(
      "다만 사주로 직업을 맞히려는 시도는 적중률이 낮다는 지적을 오래 받아왔습니다. " +
      "<b>'내가 어떤 자리에서 덜 지치는가'</b>를 떠올려보는 재료 정도로 쓰시는 게 알맞아요."
    );

    return { id:"job", emoji:"💼", title:"직업·적성", paras: paras, tip:null };
  }

  /* --- 건강 --- */
  function topicHealth(a) {
    const t = a.elements.total;
    const order = ["목","화","토","금","수"];
    const max = Math.max.apply(null, order.map(e => t[e]));
    const min = Math.min.apply(null, order.map(e => t[e]));
    const most = order.filter(e => t[e] === max)[0];
    const least = order.filter(e => t[e] === min)[0];
    const paras = [];

    paras.push(
      "먼저 분명히 해둘 것이 있습니다. 사주에서 건강을 본다는 건 <b>진단이 아닙니다.</b> " +
      "오행의 균형을 보고 '어느 쪽을 덜 챙기기 쉬운 성향인가'를 상징적으로 읽는 거예요. " +
      "실제 증상이 있으시면 반드시 병원에 가셔야 합니다."
    );

    paras.push(
      "당신의 사주는 <b>" + EL_WORD[most] + " 기운이 가장 많고 " + EL_WORD[least] + " 기운이 가장 적습니다</b>. " +
      "전통적으로 넘치는 쪽과 모자란 쪽 모두 탈이 나기 쉬운 자리로 봤어요."
    );

    if (min === 0) {
      paras.push(
        "특히 <b>" + EL_WORD[least] + " 기운이 아예 없습니다</b>. 옛 글에서는 " +
        EL_WORD[least] + "에 연결된 " + BODY[least].part + " 쪽을 " +
        "평소에 덜 챙기기 쉽다고 봤어요. " + BODY[least].life + "을 특히 조심하시면 좋습니다."
      );
    } else {
      paras.push(
        "넘치는 " + EL_WORD[most] + " 기운은 " + BODY[most].part + " 쪽과 연결해 읽습니다. " +
        BODY[most].life + "이 쌓이지 않도록 하시는 게 좋아요."
      );
    }

    // 조후 - 한랭/과열
    if (a.season === "겨울" && t.수 >= 4) {
      paras.push(
        "태어난 계절이 한겨울인데 <b>물 기운까지 많습니다</b>. 사주 전체가 차가운 쪽으로 기울어 있어요. " +
        "전통 명리에서는 이런 구조에 <b>몸이 차가워지는 것과 긴장이 쌓이는 것</b>을 가장 조심하라고 봤습니다. " +
        "구체적으로는 수면 리듬, 운동 부족, 오래 앉아 있는 생활, 과음, " +
        "스트레스를 안에 담아두는 습관 같은 것들이에요."
      );
    } else if (a.season === "여름" && t.화 >= 4) {
      paras.push(
        "태어난 계절이 한여름인데 <b>불 기운까지 많습니다</b>. 사주 전체가 뜨거운 쪽으로 기울어 있어요. " +
        "열이 쌓이는 구조라 <b>과로와 수면 부족</b>을 가장 조심하라고 봤습니다. " +
        "쉬는 걸 일정에 넣어두지 않으면 몸이 먼저 신호를 보냅니다."
      );
    }

    // 충 - 변동
    if (a.relations.chung.length) {
      paras.push(
        "사주 안에 서로 부딪히는 글자가 있습니다. 전통적으로 <b>갑작스러운 변동</b>을 " +
        "조심하라고 읽는 자리예요. 무리한 일정, 급하게 몰아치는 생활을 줄이시면 좋습니다."
      );
    }

    return { id:"health", emoji:"🩺", title:"건강운", paras: paras,
      tip:"사주는 생활 습관을 돌아보는 재료일 뿐입니다. 몸이 보내는 신호는 사주보다 훨씬 정확해요." };
  }

  /* --- 부모·가족 --- */
  function topicFamily(a) {
    const year = cellOf(a, "year");
    const month = cellOf(a, "month");
    const g = a.gods.groups;
    const paras = [];

    paras.push(
      "사주에서 부모와 집안은 <b>앞의 두 기둥</b>으로 봅니다. " +
      "첫째 기둥은 조상과 자라난 환경, 둘째 기둥은 부모와 형제를 읽는 자리예요."
    );

    if (year) {
      const grp = groupOfGod(year.branchGod);
      const SAY = {
        비겁:"자라난 환경에서 형제나 또래의 영향이 컸던 구조로 봅니다.",
        식상:"자라난 환경이 비교적 자유롭고, 표현을 억누르지 않는 쪽이었던 구조로 봅니다.",
        재성:"자라난 환경에서 현실적인 문제, 특히 살림이나 돈이 일찍부터 눈에 들어온 구조로 봅니다.",
        관성:"자라난 환경에 규칙과 기대가 분명했던 구조로 봅니다. 예의나 기준 같은 게 일찍 몸에 밴 편이에요.",
        인성:"자라난 환경에서 보살핌과 교육을 비교적 잘 받은 구조로 봅니다.",
      };
      if (grp) paras.push(SAY[grp]);
    }

    if (g.인성 === 0) {
      paras.push(
        "<b>받쳐주는 기운이 겉으로 드러나지 않습니다.</b> 부모 복이 없다는 뜻이 아니라, " +
        "<b>'내 문제는 내가 해결한다'</b>는 쪽으로 일찍 기울었다는 뜻에 가까워요. " +
        "독립이 빠른 대신, 도움을 요청하는 걸 어려워하는 습관이 생기기 쉽습니다."
      );
    } else if (g.인성 >= 3) {
      paras.push(
        "<b>받쳐주는 기운이 두텁습니다.</b> 윗사람이나 부모의 도움을 받는 구조로 봤어요. " +
        "다만 지나치면 스스로 판단할 기회를 놓치기도 합니다."
      );
    }

    // 물이 많으면 속을 잘 안 보임
    if (a.elements.total.수 >= 5) {
      paras.push(
        "다만 사주 전체가 생각이 많은 쪽이라, <b>가족에게 속을 다 털어놓는 편은 아닐</b> 가능성이 있습니다. " +
        "가족을 생각하지 않아서가 아니라, 걱정 끼치기 싫어서 혼자 삼키는 쪽이에요."
      );
    }

    // 년월 충
    const yb = year ? year.branch : null, mb = month ? month.branch : null;
    const famChung = a.relations.chung.filter(x =>
      (yb && x.members.indexOf(yb) !== -1) || (mb && x.members.indexOf(mb) !== -1));
    if (famChung.length) {
      paras.push(
        "앞쪽 기둥이 다른 글자와 부딪히고 있습니다. 전통적으로 <b>일찍 집을 떠나거나 " +
        "고향과 멀어지는</b> 구조로 읽었어요. 사이가 나쁘다는 뜻은 아닙니다."
      );
    }

    return { id:"family", emoji:"👨‍👩‍👧", title:"부모·가족", paras: paras, tip:null };
  }

  /* --- 인간관계 --- */
  function topicSocial(a) {
    const g = a.gods.groups;
    const paras = [];

    paras.push(
      "사람을 대하는 방식은 <b>나와 같은 기운이 얼마나 있는지</b>와 " +
      "<b>글자끼리 서로 어떻게 맞물리는지</b>로 봅니다."
    );

    if (g.비겁 === 0) {
      paras.push(
        "나와 같은 편에 해당하는 글자가 없습니다. 무리 지어 다니기보다 " +
        "<b>소수와 깊게</b> 가는 쪽이에요. 넓은 인맥보다 믿을 사람 두셋이 훨씬 든든한 구조입니다."
      );
    } else if (g.비겁 >= 3) {
      paras.push(
        "나와 같은 편이 많습니다. 사람이 자주 모이는 대신 <b>주도권이 겹치는 일</b>도 잦아요. " +
        "역할을 처음에 나눠두면 훨씬 수월합니다."
      );
    } else {
      paras.push("사람과의 거리를 비교적 잘 조절하는 편입니다. 가까워지는 속도도 급하지 않아요.");
    }

    if (a.relations.hyung.length || a.relations.hae.length || a.relations.pa.length) {
      paras.push(
        "사주 안에 <b>서로 어긋나는 글자 조합</b>이 있습니다. " +
        "본인은 별 뜻 없이 한 말인데 상대가 다르게 받아들이거나, " +
        "상대의 행동을 혼자 오래 곱씹는 일이 생기기 쉬운 구조예요. " +
        "<b>추측하지 말고 직접 확인하는 습관</b>이 이 사주에서는 특히 값집니다."
      );
    }

    if (a.sinsal.some(s => s.name === "천을귀인")) {
      paras.push(
        "사주에서 가장 귀하게 치는 <b>도움의 별</b>이 있습니다. " +
        "고비마다 사람의 손으로 넘어간다는 뜻이에요. " +
        "혼자 해결하려 들기보다 주변에 말을 꺼내는 게 이 사주에서는 전략입니다."
      );
    }

    return { id:"social", emoji:"🤝", title:"인간관계", paras: paras, tip:null };
  }

  /* ============================================================
     5. 올해와 내년
     ============================================================ */
  function yearLook(a, offset) {
    // 사주에서 해가 바뀌는 기준은 1월 1일이 아니라 입춘(2월 4일 무렵)입니다.
    // 그래서 달력 연도를 그대로 쓰면 1월~입춘 사이에 한 해 앞서 나옵니다.
    // 오늘 날짜를 그대로 넣어 '지금의 사주 연도'를 먼저 구합니다.
    // 시각까지 넣어야 입춘 당일에도 정확히 갈립니다 (입춘은 분 단위로 정해져요)
    const now = new Date();
    const today = SajuEngine.computeYearMonthPillar(
      now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes());
    const target = today.sajuYear + (offset || 0);

    // 구한 사주 연도의 한가운데 날짜로 년주를 뽑습니다 (절기 경계에서 멀어 안전해요)
    const ymp = SajuEngine.computeYearMonthPillar(target, 6, 15, 12, 0);
    const pillar = ymp.yearPillar;
    const stem = pillar.charAt(0), branch = pillar.charAt(1);
    const sg = SajuEngine.tenGodOfStem(a.dayStem, stem);
    const bg = SajuEngine.tenGodOfBranch(a.dayStem, branch);
    const hh = helpHurt(a);
    const els = [SajuEngine.STEM[stem].el, SajuEngine.BRANCH[branch].el];
    const helpful = els.some(e => hh.help.indexOf(e) !== -1);
    const hurtful = els.some(e => hh.hurt.indexOf(e) !== -1);

    const paras = [];
    const grp = groupOfGod(sg);
    if (grp) {
      const SAY = {
        비겁:"또래·동료·경쟁이 전면에 나오는 해입니다. 내 몫을 지키는 문제가 떠오를 수 있어요.",
        식상:"표현하고 만들어내는 일이 전면에 나오는 해입니다. 하고 싶은 걸 꺼내기 좋은 때예요.",
        재성:"돈과 현실적인 성과가 전면에 나오는 해입니다. 벌이와 씀씀이가 모두 커질 수 있어요.",
        관성:"책임과 자리가 전면에 나오는 해입니다. 맡는 일이 늘거나 평가받는 자리에 서게 됩니다.",
        인성:"배우고 받는 일이 전면에 나오는 해입니다. 바탕을 다지기 좋은 때예요.",
      };
      paras.push(SAY[grp]);
    }

    if (helpful && !hurtful) {
      paras.push("<b>보약이 되는 기운이 들어오는 해</b>입니다. 미뤄둔 일을 꺼내기에 나쁘지 않아요.");
    } else if (hurtful && !helpful) {
      paras.push("<b>부담이 되는 기운이 강해지는 해</b>입니다. 벌이기보다 지키는 쪽이 유리합니다.");
    }

    // 충 - 변화
    const myBranches = a.cells.map(c => c.branch);
    const CHUNG = [["자","오"],["축","미"],["인","신"],["묘","유"],["진","술"],["사","해"]];
    const hit = [];
    CHUNG.forEach(p => {
      if (p[0] === branch && myBranches.indexOf(p[1]) !== -1) hit.push(p[1]);
      if (p[1] === branch && myBranches.indexOf(p[0]) !== -1) hit.push(p[0]);
    });
    if (hit.length) {
      const where = a.cells.filter(c => hit.indexOf(c.branch) !== -1)
        .map(c => ({ year:"초년·집안", month:"직업·사회", day:"배우자·가정", hour:"자녀·말년" })[c.key]);
      paras.push(
        "이 해의 글자가 당신 사주의 <b>" + hit.join("·") + "</b>와 정면으로 부딪힙니다. " +
        "한마디로 <b>변화의 압력이 커지는 해</b>예요. " +
        (where.length ? "특히 <b>" + where.join(", ") + "</b> 쪽에서 움직임이 생기기 쉽습니다. " : "") +
        "이직, 부서 이동, 사업 방향 수정, 이사, 관계 재편 같은 모습으로 나타납니다. " +
        "반드시 일이 터진다는 뜻은 아니고, <b>가만히 있기보다 뭔가를 바꾸고 싶어지는</b> 해라는 뜻이에요."
      );
    }
    if (a.gongmang.indexOf(branch) !== -1) {
      paras.push("이 해는 당신의 '빈자리'에 해당합니다. 바쁜 것에 비해 손에 남는 게 적게 느껴질 수 있어요.");
    }

    return { year: ymp.sajuYear, pillar: pillar,
             hanja: SajuEngine.STEM_HANJA[stem] + SajuEngine.BRANCH_HANJA[branch],
             paras: paras, helpful: helpful, hurtful: hurtful,
             stemGod: sg, branchGod: bg };
  }

  /* ============================================================
     조립
     ============================================================ */
  function build(a) {
    const topics = [
      topicLove(a), topicMarriage(a), topicChild(a), topicMoney(a),
      topicJob(a), topicHealth(a), topicFamily(a), topicSocial(a),
    ];
    return {
      headline: headline(a),
      personality: personality(a),
      stages: lifeStages(a),
      topics: topics,
      thisYear: yearLook(a, 0),
      nextYear: yearLook(a, 1),
      gradeDaeun: function (item) { return gradeDaeun(a, item); },
    };
  }

  return { build: build, gradeDaeun: gradeDaeun, helpHurt: helpHurt,
           EL_WORD: EL_WORD, EL_EMOJI: EL_EMOJI, FORCE: FORCE, ME: ME };
})();
