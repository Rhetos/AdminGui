@REM HINT: SET ARGUMENT TO /NOPAUSE WHEN AUTOMATING THE BUILD.

SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)

@SET Config=%1%
@IF [%1] == [] SET Config=Debug

@IF DEFINED VisualStudioVersion GOTO SkipVcvarsall
IF "%VS140COMNTOOLS%" NEQ "" CALL "%VS140COMNTOOLS%VsDevCmd.bat" x86 && GOTO EndVcvarsall || GOTO Error0
IF "%VS120COMNTOOLS%" NEQ "" CALL "%VS120COMNTOOLS%\..\..\VC\vcvarsall.bat" x86 && GOTO EndVcvarsall || GOTO Error0
IF "%VS110COMNTOOLS%" NEQ "" CALL "%VS110COMNTOOLS%\..\..\VC\vcvarsall.bat" x86 && GOTO EndVcvarsall || GOTO Error0
IF "%VS100COMNTOOLS%" NEQ "" CALL "%VS100COMNTOOLS%\..\..\VC\vcvarsall.bat" x86 && GOTO EndVcvarsall || GOTO Error0
ECHO ERROR: Cannot detect Visual Studio, missing VSxxxCOMNTOOLS variable.
GOTO Error0
:EndVcvarsall
@ECHO ON
:SkipVcvarsall

CD %~dp0
%~d0
git submodule init
git submodule update

@ECHO.
call :ColorText *** Submodule 2CS.RhetosBuild initialized. ***
@ECHO.

if not exist "RhetosPackages\Plugins" mkdir "RhetosPackages\Plugins"
if not exist "RhetosPackages\BasecodePlugins" mkdir "RhetosPackages\BasecodePlugins"

DevEnv.exe "RhetosPackages\Source\Angular2ModelGenerator\Angular2ModelGenerator.csproj" /rebuild > make.out || GOTO Error0

@ECHO.
call :ColorText *** Angular2ModelGenerator compiled. ***
@ECHO.

DevEnv.exe "RhetosPackages\Source\AdminGuiRhetosExtensions\AdminGuiRhetosExtensions.csproj" /rebuild > make.out || GOTO Error0

@ECHO.
call :ColorText *** AdminGuiRhetosExtensions compiled. ***
@ECHO.

DevEnv.exe "RhetosPackages\Source\RhetosConceptsAndExtensions\RhetosConceptsAndExtensions.csproj" /rebuild > make.out || GOTO Error0

@ECHO.
call :ColorText *** RhetosConceptsAndExtensions.csproj compiled. ***
@ECHO.

CD AdminGui  > make.out
CALL npm install > make.out || GOTO Error0

@ECHO.
call :ColorText *** AdminGui NPM PACKAGES UPDATED. ***
@ECHO.

CALL npm run tsc || GOTO Error0

@ECHO.
call :ColorText *** AdminGui TypeScript compiled. ***

CALL bower update > make.out || GOTO Error0
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