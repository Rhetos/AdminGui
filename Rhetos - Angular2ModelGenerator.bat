@REM Create nuget package for current state
cd AdminGui
CALL bower update > make.out || GOTO Error0
CALL gulp default > make.out || GOTO Error0
cd ..\
CALL "Rhetos - CreateNugetPackages.bat"

@REM deploy to Rhetos new package
CD 2CS.RhetosBuild\Rhetos\
XCOPY /Y/R ..\..\RhetosPackages\*.config  || GOTO Error0
XCOPY /Y/R ..\..\RhetosPackages\*.bat  || GOTO Error0
cd bin
CALL DeployPackages.exe /NOPAUSE || GOTO Error0

@REM Copy generated model back to AdminGui
copy Rhetos.Angular2.ts ..\..\..\AdminGUI\scripts\models

@REM Compile AdminGui with new model definition
cd ..\..\..\AdminGui\scripts
CALL tsc 
cd ..
CALL gulp default > make.out || GOTO Error0
cd scripts

@REM Create new NugetPackage
cd ..\..\
CALL "Rhetos - CreateNugetPackages.bat"

@REM deploy to Rhetos new package
CD 2CS.RhetosBuild\Rhetos\bin\
CALL DeployPackages.exe /NOPAUSE || GOTO Error0
cd ..\..\..\