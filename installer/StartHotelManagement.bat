@echo off
setlocal EnableDelayedExpansion

title Hotel Management System Launcher

echo ==========================================
echo     Hotel Management System Launcher
echo ==========================================
echo.

cd /d "%~dp0.."

echo Checking Docker installation...

where docker >nul 2>&1
if errorlevel 1 goto DockerNotInstalled

echo Docker found.
echo.

echo Checking Docker Engine...

docker info >nul 2>&1
if not errorlevel 1 goto DockerReady

echo Docker Desktop is not running.
echo Starting Docker Desktop...
echo.

if not exist "%ProgramFiles%\Docker\Docker\Docker Desktop.exe" goto DockerDesktopNotFound

start "" "%ProgramFiles%\Docker\Docker\Docker Desktop.exe"

echo Waiting for Docker Desktop to become ready...
echo.

set attempts=0

:WaitForDocker
timeout /t 5 /nobreak >nul

docker info >nul 2>&1
if not errorlevel 1 goto DockerReady

set /a attempts+=1

echo Waiting for Docker... !attempts!/24

if !attempts! GEQ 24 goto DockerTimeout

goto WaitForDocker


:DockerReady

echo.
echo Docker Engine is ready.
echo.

echo Starting Hotel Management System...
docker compose up -d

if errorlevel 1 goto ApplicationError

echo.
echo Waiting for the application to start...
timeout /t 15 /nobreak >nul

echo.
echo Opening Hotel Management System...
start "" "http://localhost:3000"

echo.
echo Application started successfully.
echo.

timeout /t 3 /nobreak >nul
exit /b 0


:DockerNotInstalled

echo.
echo ERROR: Docker is not installed or is not available in PATH.
echo Please install Docker Desktop first.
echo.
pause
exit /b 1


:DockerDesktopNotFound

echo.
echo ERROR: Docker Desktop executable was not found.
echo Expected location:
echo %ProgramFiles%\Docker\Docker\Docker Desktop.exe
echo.
pause
exit /b 1


:DockerTimeout

echo.
echo ERROR: Docker Desktop did not become ready within 2 minutes.
echo Please start Docker Desktop manually and try again.
echo.
pause
exit /b 1


:ApplicationError

echo.
echo ERROR: Hotel Management System could not be started.
echo.
pause
exit /b 1