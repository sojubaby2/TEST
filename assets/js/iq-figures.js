/* ============================================================
   알아볼괘 - IQ 테스트 도형 렌더러
   ------------------------------------------------------------
   도형 문제를 이미지 파일 없이 SVG 로 그립니다.
   문항 데이터는 '무엇을 그릴지'만 토큰으로 적어두고,
   실제 그리기는 전부 이 파일이 맡아요.

   토큰 예시
     { s:"sq", f:1, r:45, z:0.8 }   네모 · 채움 · 45도 회전 · 조금 작게
     { s:"dots", n:4 }              점 4개
     { s:"seg", v:[0,2,4] }         상자의 윗변·아랫변·대각선
     { s:"ln", d:"/" }              사선 하나
   ============================================================ */

const IQFigure = (function () {

  const INK   = "#1f2029";   // 선
  const HALF  = "#c4b5fd";   // 반쯤 채운 색
  const FULL  = "#7c3aed";   // 가득 채운 색
  const FAINT = "#d9d6e4";   // 보조선

  /* 중심(50,50) 기준 정다각형 꼭짓점 */
  function poly(n, R, startDeg) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (startDeg + i * 360 / n) * Math.PI / 180;
      pts.push((50 + R * Math.cos(a)).toFixed(1) + "," + (50 + R * Math.sin(a)).toFixed(1));
    }
    return pts.join(" ");
  }

  function starPts(R, r, startDeg) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const rad = i % 2 === 0 ? R : r;
      const a = (startDeg + i * 36) * Math.PI / 180;
      pts.push((50 + rad * Math.cos(a)).toFixed(1) + "," + (50 + rad * Math.sin(a)).toFixed(1));
    }
    return pts.join(" ");
  }

  function fillOf(f) {
    if (f === 1) return FULL;
    if (f === 2) return HALF;
    return "none";
  }

  /* 상자의 여섯 선분 — 겹침/XOR 문제에 씁니다 */
  const SEGS = [
    "M20,20 L80,20",   // 0 윗변
    "M80,20 L80,80",   // 1 오른변
    "M20,80 L80,80",   // 2 아랫변
    "M20,20 L20,80",   // 3 왼변
    "M20,20 L80,80",   // 4 대각선 ＼
    "M80,20 L20,80",   // 5 대각선 ／
  ];

  /* 점 n개의 자리 (주사위처럼) */
  const DOTS = {
    1: [[50,50]],
    2: [[32,32],[68,68]],
    3: [[30,30],[50,50],[70,70]],
    4: [[32,32],[68,32],[32,68],[68,68]],
    5: [[30,30],[70,30],[50,50],[30,70],[70,70]],
    6: [[32,26],[68,26],[32,50],[68,50],[32,74],[68,74]],
  };

  const LINES = {
    "/":  "M22,78 L78,22",
    "\\": "M22,22 L78,78",
    "|":  "M50,18 L50,82",
    "-":  "M18,50 L82,50",
  };

  /* 표식이 놓이는 여덟 자리 (12시 방향부터 시계 방향).
     '표식이 한 칸씩 돌아간다' 같은 문제에 씁니다. */
  const SPOTS = [
    [50,18],[73,27],[82,50],[73,73],
    [50,82],[27,73],[18,50],[27,27],
  ];

  /* 토큰 하나를 SVG 조각으로 */
  function draw(t) {
    const z = t.z == null ? 1 : t.z;
    const R = 32 * z;
    const f = t.f == null ? 0 : t.f;
    const rot = t.r == null ? 0 : t.r;
    const spin = rot ? ' transform="rotate(' + rot + ' 50 50)"' : "";
    const common = ' fill="' + fillOf(f) + '" stroke="' + INK +
                   '" stroke-width="4" stroke-linejoin="round"' + spin;

    switch (t.s) {
      case "sq":
        return '<rect x="' + (50 - R) + '" y="' + (50 - R) + '" width="' + (R * 2) +
               '" height="' + (R * 2) + '" rx="3"' + common + "/>";
      case "ci":
        return '<circle cx="50" cy="50" r="' + R + '"' + common + "/>";
      case "tr":
        return '<polygon points="' + poly(3, R * 1.15, -90) + '"' + common + "/>";
      case "dm":
        return '<polygon points="' + poly(4, R * 1.2, -90) + '"' + common + "/>";
      case "pt":   // 오각형
        return '<polygon points="' + poly(5, R * 1.1, -90) + '"' + common + "/>";
      case "hx":   // 육각형
        return '<polygon points="' + poly(6, R * 1.1, -90) + '"' + common + "/>";
      case "st":   // 별
        return '<polygon points="' + starPts(R * 1.15, R * 0.48, -90) + '"' + common + "/>";
      case "pl":   // 십자
        return '<path d="M38,' + (50 - R) + ' h24 v' + (R - 12) + ' h' + (R - 12) +
               ' v24 h-' + (R - 12) + ' v' + (R - 12) + ' h-24 v-' + (R - 12) +
               ' h-' + (R - 12) + ' v-24 h' + (R - 12) + ' z"' + common + "/>";
      case "ar":   // 화살표 (위쪽 기준)
        return '<path d="M50,16 L74,46 H60 V84 H40 V46 H26 Z"' + common + "/>";
      case "dots": {
        // z 를 주면 점들이 가운데로 모입니다.
        // 도형 안에 점을 넣을 때는 꼭 줄여야 삼각형 같은 좁은 도형 밖으로 안 나갑니다.
        const n = Math.max(1, Math.min(6, t.n || 1));
        const k = t.z == null ? 1 : t.z;
        const r = (6.5 * Math.max(0.7, k)).toFixed(1);
        return DOTS[n].map(function (p) {
          const x = (50 + (p[0] - 50) * k).toFixed(1);
          const y = (50 + (p[1] - 50) * k).toFixed(1);
          return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + INK + '"/>';
        }).join("");
      }
      case "seg":
        return (t.v || []).map(function (i) {
          return '<path d="' + SEGS[i] + '" stroke="' + INK +
                 '" stroke-width="5" stroke-linecap="round" fill="none"/>';
        }).join("");
      case "ln":
        return '<path d="' + (LINES[t.d] || "") + '" stroke="' + INK +
               '" stroke-width="4" stroke-linecap="round" fill="none"/>';
      case "mk": {   // 표식 하나를 여덟 자리 중 하나에
        const p = SPOTS[((t.p || 0) % 8 + 8) % 8];
        const open = t.f === 0;
        return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="9" fill="' +
               (open ? "none" : FULL) + '" stroke="' + INK + '" stroke-width="3.5"/>';
      }
      case "ring":   // 표식의 자리를 알려주는 연한 안내 원
        return '<circle cx="50" cy="50" r="32" fill="none" stroke="' + FAINT +
               '" stroke-width="2.5"/>';
      case "box":  // 연한 테두리 (보조)
        return '<rect x="18" y="18" width="64" height="64" rx="4" fill="none" stroke="' +
               FAINT + '" stroke-width="3"/>';
      case "txt":
        return '<text x="50" y="50" text-anchor="middle" dominant-baseline="central" ' +
               'font-size="46" font-weight="800" fill="' + INK + '"' + spin + ">" +
               (t.t || "") + "</text>";
      case "q":    // 물음표 칸
        return '<text x="50" y="52" text-anchor="middle" dominant-baseline="central" ' +
               'font-size="44" font-weight="800" fill="' + FULL + '">?</text>';
      default:
        return "";
    }
  }

  /* 토큰 묶음 하나 = 칸 하나.
     size 를 주면 그 크기로 고정하고, 없으면 칸 너비에 맞춰 늘어납니다. */
  function cellSvg(tokens, size) {
    const body = (tokens || []).map(draw).join("");
    const dim = size
      ? ' width="' + size + '" height="' + size + '"'
      : ' width="100%" height="100%"';
    return '<svg viewBox="0 0 100 100"' + dim + ' role="img" aria-hidden="true">' + body + "</svg>";
  }

  /* 칸 하나의 최대 너비 — 칸이 많을수록 작게 잡습니다 */
  function capFor(cols) {
    if (cols <= 1) return 110;
    if (cols <= 3) return 96;
    if (cols === 4) return 84;
    return 70;
  }

  /* 문제 그림: 칸을 cols 개씩 늘어놓습니다 (3×3 행렬, 1×5 수열 등).
     화면이 좁으면 칸이 같이 줄어들어서 가로로 밀리는 일이 없습니다. */
  function grid(cells, cols) {
    const n = cols || 3;
    const html = cells.map(function (c) {
      const isQ = (c || []).some(function (t) { return t.s === "q"; });
      return '<div class="fig-cell' + (isQ ? " is-q" : "") + '">' + cellSvg(c, null) + "</div>";
    }).join("");
    return '<div class="fig-grid" style="grid-template-columns:repeat(' + n +
           ',minmax(0,1fr));max-width:' + (n * capFor(n)) + 'px;">' + html + "</div>";
  }

  return { grid: grid, cell: cellSvg, INK: INK };
})();
