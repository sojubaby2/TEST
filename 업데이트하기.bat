@echo off
title Site Update
echo.
echo Updating the site now. Please wait...
echo (This can take 1 to 3 minutes)
echo.
cd /d "%~dp0"
call npx --yes wrangler deploy
if errorlevel 1 goto finish
echo.
echo Telling search engines (IndexNow)...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\indexnow.ps1"
:finish
echo.
echo ============================================
echo  Done. If there is no red error text above,
echo  it worked. You can close this window now.
echo ============================================
echo.
pause
