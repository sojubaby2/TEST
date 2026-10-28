@echo off
title Blog photos
cd /d "%~dp0"
echo Downloading blog photos from Unsplash...
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\blog-images.ps1"
echo.
pause
