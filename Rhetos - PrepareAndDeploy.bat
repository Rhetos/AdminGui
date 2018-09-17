@REM HINT: SET ARGUMENT TO /NOPAUSE WHEN AUTOMATING THE BUILD.
@SET SqlServer=(local)
@SET DatabaseName=TestAdminGui
@SET Port=9000
CD %~dp0
%~d0

CALL make.bat /NOPAUSE || GOTO Error0

CD 2CS.RhetosBuild\Rhetos\bin\

CALL CreateAndSetDatabase.exe %SqlServer% %DatabaseName% || GOTO Error0
XCOPY /Y/R ..\..\..\RhetosPackages\*.config ..\ || GOTO Error0
XCOPY /Y/R ..\..\..\RhetosPackages\*.bat ..\ || GOTO Error0
CALL DeployPackages.exe /NOPAUSE || GOTO Error0
CALL Plugins\AdminSetup.exe || GOTO Error0
CALL CreateIISExpressSite.exe %DatabaseName% %Port% || GOTO Error0

CD ..\..\..\

CALL "Rhetos - SetPermissionsForAdmin.bat" %SqlServer% %DatabaseName% || GOTO Error0
@REM ================================================

@ECHO.
@ECHO %~nx0 SUCCESSFULLY COMPLETED.
@EXIT /B 0

:Error0
@ECHO.
@ECHO %~nx0 FAILED.
@IF /I [%2] NEQ [/NOPAUSE] @PAUSE
@EXIT /B 1