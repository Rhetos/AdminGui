@REM HINT: SET ARGUMENT TO /NOPAUSE WHEN AUTOMATING THE BUILD.

CD %~dp0
%~d0
CALL ChangeVersions.bat || GOTO Error0

CD AdminGui
CALL gulp clean
CALL gulp default
CD ..

2CS.RhetosBuild\RhetosPackages\.nuget\NuGet.exe pack AdminGui\Rhetos.AdminGui.nuspec -o . || GOTO Error0
2CS.RhetosBuild\RhetosPackages\.nuget\NuGet.exe pack AdminGui\Rhetos.AdminGuiCompile.nuspec -o . || GOTO Error0


@REM ================================================

@ECHO.
@ECHO %~nx0 SUCCESSFULLY COMPLETED.
@EXIT /B 0

:Error0
@ECHO.
@ECHO %~nx0 FAILED.
@IF /I [%2] NEQ [/NOPAUSE] @PAUSE
@EXIT /B 1