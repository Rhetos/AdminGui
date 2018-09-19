@REM HINT: SET ARGUMENT TO /NOPAUSE WHEN AUTOMATING THE BUILD.

SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)

@SET Config=%1%
@IF [%1] == [] SET Config=Debug

CD %~dp0
%~d0

if not exist "RhetosPackages\Plugins" mkdir "RhetosPackages\Plugins"
if not exist "RhetosPackages\BasecodePlugins" mkdir "RhetosPackages\BasecodePlugins"

cd RhetosPackages\Source\Angular2ModelGenerator
CALL dotnet build AdminGuiPlugin.sln
cd ..\..\..\

@ECHO.
call :ColorText *** AdminGUI Plugins compiled. ***
@ECHO.

CD AdminGui  > make.out
CALL npm install > make.out || GOTO Error0

@ECHO.
call :ColorText *** AdminGui NPM PACKAGES UPDATED. ***
@ECHO.

CALL npm run tsc || GOTO Error0

@ECHO.
call :ColorText *** AdminGui TypeScript compiled. ***

CALL gulp default > make.out || GOTO Error0

@ECHO.
call :ColorText *** AdminGui prepared wwwroot. ***

@ECHO.
call :ColorText *** Package creation completed. ***
cd ..

@REM ================================================

@ECHO.
call :ColorText *** %~nx0 SUCCESSFULLY COMPLETED. ***
@EXIT /B 0

:ColorText
powershell -Command Write-Host "%*" -foreground "Green"
@EXIT /B 0

:Error0
@ECHO.
@ECHO %~nx0 FAILED.
@IF /I [%2] NEQ [/NOPAUSE] @PAUSE
@EXIT /B 1