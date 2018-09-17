@REM HINT: SET ARGUMENT TO /NOPAUSE WHEN AUTOMATING THE BUILD.
@SET SqlServer=(local)
@SET DatabaseName=TestAdminGui
SETLOCAL EnableDelayedExpansion
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do (
  set "DEL=%%a"
)

CD %~dp0
%~d0

CD AdminGui

REM CALL tsc  > make.out|| GOTO Error0

REM @ECHO.
REM call :ColorText *** AdminGui TypeScript compiled. ***


@REM CALL gulp clean-AdminGuiCompile > make.out || GOTO Error0

CALL gulp default > make.out || GOTO Error0

@ECHO.
call :ColorText *** AdminGui prepared wwwroot. ***

cd ..

CALL "Rhetos - CreateNugetPackages.bat" || GOTO Error0

CD 2CS.RhetosBuild\Rhetos\
XCOPY /Y/R ..\..\RhetosPackages\*.config  || GOTO Error0
XCOPY /Y/R ..\..\RhetosPackages\*.bat  || GOTO Error0
cd bin
CALL DeployPackages.exe /NOPAUSE || GOTO Error0



CD ..\..\..\

CALL "Rhetos - SetPermissionsForAdmin.bat" %SqlServer% %DatabaseName% /NOPAUSE || GOTO Error0
@REM ================================================

@ECHO.
@ECHO %~nx0 SUCCESSFULLY COMPLETED.
@EXIT /B 0

:ColorText
powershell -Command Write-Host "%*" -foreground "Green"
@EXIT /B 0

:Error0
@ECHO.
@ECHO %~nx0 FAILED.
@IF /I [%2] NEQ [/NOPAUSE] @PAUSE
@EXIT /B 1