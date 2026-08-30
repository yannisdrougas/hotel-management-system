@echo off
title Hotel Management System Launcher

echo ==========================================
echo     Hotel Management System Launcher
echo ==========================================
echo.

cd /d "%~dp0.."

echo Checking Docker...
docker --version >nul 2>&1

if errorlevel 1 (
    echo.
    echo ERROR: Docker is not installed or not available.
    echo Please install and start Docker Desktop.
    echo.
    pause
    exit /b 1
)

echo Docker found.
echo.

echo Starting Hotel Management System...
docker compose up -d

if errorlevel 1 (
    echo.
    echo ERROR: The application could not be started.
    echo Make sure Docker Desktop is running.
    echo.
    pause
    exit /b 1
)

echo.
echo Waiting for the application to start...
timeout /t 15 /nobreak >nul

echo.
echo Opening Hotel Management System...
start "" "http://localhost:3000"

echo.
echo Application started successfully.
echo You can close this window.
echo.

timeout /t 3 /nobreak >nul
exit
