@echo off
chcp 65001 >nul
setlocal EnableExtensions EnableDelayedExpansion
cd /d "%~dp0"

echo ============================================
echo   LUMINEX Portfolio - Startup (static demo)
echo ============================================
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js was not found. Install Node.js 18 LTS or newer:
    echo         https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js version:
node -v
echo.

where npm.cmd >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] npm was not found. Reinstall Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [INFO] Installing dependencies...
call npm.cmd install
if %errorlevel% neq 0 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
)
echo.

echo [INFO] Building static files...
call npm.cmd run build
if %errorlevel% neq 0 (
    echo [ERROR] Production build failed.
    pause
    exit /b 1
)
echo.

echo ============================================
echo   Serving LUMINEX (static preview)...
echo ============================================
echo.
echo Site: http://localhost:4173/
echo Built static files are in the dist\ folder.
echo Press Ctrl+C in this window to stop.
echo.

powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command "Start-Sleep -Seconds 3; Start-Process 'http://localhost:4173/'" >nul 2>nul
call npm.cmd run preview -- --host --port 4173

pause
