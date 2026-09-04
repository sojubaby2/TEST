@echo off
title View Counter Setup
echo.
echo This is a one-time setup step for the view counter feature.
echo.
cd /d "%~dp0"
call node setup-view-counter.js
echo.
pause
