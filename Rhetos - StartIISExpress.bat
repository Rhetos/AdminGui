@REM HINT: SET ARGUMENT TO /NOPAUSE WHEN AUTOMATING THE BUILD.

XCOPY /Y/R %~dp0\RhetosPackages\*.config %~dp0\2CS.RhetosBuild\Rhetos\ || GOTO Error0
XCOPY /Y/R %~dp0\RhetosPackages\*.bat %~dp0\2CS.RhetosBuild\Rhetos\ || GOTO Error0
CD %~dp0
%~d0
CD 2CS.RhetosBuild\Rhetos

START /MIN RunIISExpress.bat || GOTO Error0

@REM ================================================

@ECHO.
@ECHO %~nx0 SUCCESSFULLY COMPLETED.
@EXIT /B 0

:Error0
@ECHO.
@ECHO %~nx0 FAILED.
@IF /I [%2] NEQ [/NOPAUSE] @PAUSE
@EXIT /B 1