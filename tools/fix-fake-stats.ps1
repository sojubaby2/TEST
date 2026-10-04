# ============================================================
#  알아볼괘 - 사실이 아닌 수치 정리
# ------------------------------------------------------------
#  love-style / sociopath 테스트에 "전체 응시자 중 상위 74%" 같은
#  문구가 박혀 있었습니다. 실제 응시자를 센 적이 없는데도
#  센 것처럼 적어둔 숫자라서 '점수 구간' 표현으로 바꿉니다.
#
#  바꾸는 내용
#    "상위 74%"            → "5단계 중 1단계" 같은 구간 표시
#    "전체 응시자 중 ..."   → "점수 구간 ..." 으로 문장 수정
# ============================================================

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

# 낮은 점수대부터 1단계 → 5단계 (결과 파일 번호 순서와 같습니다)
$BAND = @{
  "상위 74%" = "5단계 중 1단계"; "상위 51%" = "5단계 중 2단계"
  "상위 29%" = "5단계 중 3단계"; "상위 15%" = "5단계 중 4단계"
  "상위 6%"  = "5단계 중 5단계"
  "상위 78%" = "5단계 중 1단계"; "상위 55%" = "5단계 중 2단계"
  "상위 32%" = "5단계 중 3단계"; "상위 12%" = "5단계 중 4단계"
  "상위 4%"  = "5단계 중 5단계"
}

$targets = @()
$targets += Get-ChildItem "assets\js" -Filter "love-style-data.js"
$targets += Get-ChildItem "assets\js" -Filter "sociopath-data.js"
$targets += Get-ChildItem "tests\love-style" -Filter "result-*.html"
$targets += Get-ChildItem "tests\sociopath" -Filter "result-*.html"

$changed = 0
foreach ($f in $targets) {
  $h = [System.IO.File]::ReadAllText($f.FullName)
  $orig = $h
  foreach ($k in $BAND.Keys) { $h = $h.Replace($k, $BAND[$k]) }
  # 문장도 고칩니다
  $h = $h.Replace('"점 · 전체 응시자 중 " + result.percentile', '"점 · 점수 구간 " + result.percentile')
  $h = $h.Replace('percentile:', 'band:')
  $h = $h.Replace('result.percentile', 'result.band')
  if ($h -ne $orig) {
    [System.IO.File]::WriteAllText($f.FullName, $h, (New-Object System.Text.UTF8Encoding($false)))
    $changed++
  }
}

Write-Output "수정한 파일: $changed"

# 남은 흔적 확인
$left = Select-String -Path "assets\js\*.js","tests\*\*.html" -Pattern "상위 \d+%|전체 응시자 중" -Encoding UTF8
if ($left) {
  Write-Output ""
  Write-Output "남은 흔적:"
  $left | ForEach-Object { "  $($_.Filename):$($_.LineNumber) $($_.Line.Trim())" }
} else {
  Write-Output "남은 흔적 없음"
}
