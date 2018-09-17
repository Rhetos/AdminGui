# Project overview

Rhetos is pluggable DSL platform.  It has support for basic building concepts of business application. It’s basic concepts used in .RHE DSL scripts during deployment process creates tables in database, model classes, REST/SOAP/oDATA interface. Some of the concepts are Entity, Property, SqlQuerable, Action, Browse, Polymorphic, QueryableExtension, Computed… Some of those concepts creates only model classes and interface, others create database objects as well.

Your project will be to create admin UI for Rhetos platform. That UI should be made as plugin for Rhetos. It should provide basic UI representation for common concepts available in Rhetos and should be able to trigger some common tasks (like re-computing previously defined data computations, checking data validations, etc.). UI will be Angular2 based web UI – SPA (Single Page Application), written in TypeScript. It should be made as one-pager (single index.html that will load all necessary scripts/data to be able to run AdminUI for Rhetos). As index.html and basic resources (static files and generated models) won’t rely on server host specifics, it will be deployed in Resources folder of Rhetos installation (materials how to do that will be provided in following weeks).

As AdminUI will not have any server host specifics, it may be developed in lightweight dev environment (Sublime with support for TypeScript). It will be packed as additional package for Rhetos as defined with *.nuspec file to produce Nuget form of package.

Estimated timeline for project is:

1.	Basic setup dev environment for Rhetos/RhetosBuild and getting familiar with Rhetos common concepts – **1 week**
2.	Upgrade of CoffeeOrdering app and Setup of RhetosPackage solution – **1 week**
3.	Basic generic UI based on entity models (definition of entity model structure and basic UI generator for entity/browse structures based on models) – **2 weeks**
4.	Generator for Angular2 models from .RHE scripts (MvcModelGenerator as starting point) for entities/browse/SqlQueryable, improvement of basic UI – **2 weeks**
5.	Adding support for Recompute and InvalidData checks (both generator and Angular2 handler) – **2 weeks**
6.	Final touch, documentation, testing and demonstration (publishing on github) – **2 weeks**

#Notice:
If prerequisites for 2CS.BaseCode are already deployed, you should delete two following lines in AdminGUI/AdminGui.nuspec :
	-	<file src="..\RhetosPackages\BasecodeDslScripts\**\*.rhe" target="DslScripts" />
	-	<file src="..\RhetosPackages\BasecodePlugins\*" target="Plugins" />
	
Prerequisites for 2CS.BaseCode are: 
	-	ComposableFilterBy MyAccount for Common.Principal.
	-	CreatedByUserInfo.cs.
	-	ExternalActionInfo.cs.
	-	PingService.cs.

#Preparing 2CS.Rhetos.AdminGui:
	1. clone from 2CS.Rhetos.AdminGui - pull submodules immediatelly (automatically through SourceTree or manually with "submodule init", "submodule update" commands)
	2. install gulp and bower globally if not yet installed:
		- "npm install gulp -global"
		- "npm install bower -global"
	3. update npm packages for 2CS.BaseCode and 2CS.Rhetos.AdminGui
		- run "npm update" in 2CS.BaseCode and AdminGui subfolders
	4. compile typescript for 2CS.BaseCode
		- run "tsc" inside 2CS.BaseCode subfolder
	5. make build inside wwwroot
		- run "gulp default" inside 2CS.BaseCode subfolder
	6. copy compiled files from 2CS.BaseCode to AdminGui
		- run "gulp baseCodeRef" inside AdminGui subfolder
	7. compile AdminGui typescript project
		- run "tsc" inside AdminGui subfolder
	8. fetch client side additional libraries with bower
		- run "bower update" inside AdminGui subfolder
	9. make build inside wwwroot
		- run "gulp default" inside AdminGui subfolder
	10. start app inside wwwroot with basic web server
		- run "gulp webserver" inside AdminGui subfolder
		*** it will produce errors, but it is ok to see that everything loads ***
	11. make NuGet package with nuspec configuration and nuget.exe referenced from 2CS.RhetosBuild submodule
	
#How to use package:
	1. Go to NuGet Gallery site at http://zod.2cs.local:8070/
	2. Upload package has been created recently to this site through tab "Upload Package".
	3. In RhetosBuild, you have to configure 2 files:
		- RhetosPackages.config : add this line
			<package id="AdminGui" />
		- RhetosPackageSources.config: replace source location tag by this line
			<source location="http://zod.2cs.local:8070/api/v2/" />
	4. Deploy Package and you will see the result.
After deployment, those files of package will locate at /*Rhetos*/Resources/AdminGui.

#Run file .bat:
	We got 8 files bat:
	1. ChangePacketVersion.bat : 
		This file will upgrade the version of package at tag <version> in 2CS.Rhetos.AdminGui2\AdminGUI\AdminGui.nuspec
		with the version you will change in ChangeVersions.bat
		
	2. ChangeVersions.bat :
		Open it by notepad++, you will see line "SET BuildVersion= ...". You will change version you want at here.
		The Version you change will get format: '{BuildVersion}-A{date:{yyMMddHHmm}}-{your commit ID}'.
		Example: You change the version 1.1.0 at 6/30/2016 15:36 and you have commint ID is 021b84 (you can see it in your sourcode control (SourceTree))
			So when you run this file, in AdminGui.nuspec, tag version will be : <version>1.1.0-A1606301536-021b84</version>
	
	3. Rhetos - CreateNugetPackages.bat :
		- It will call "ChangeVersions.bat" to change version of package.
		- Then it will create the package based on AdminGui\AdminGui.nuspec at outside of AdminGui.
	
	4. Rhetos - Deploy.bat :
		- Compile typescript files in 2CS.BaseCode.
		- Use gulp to copy files from 2CS.BaseCode to AdminGui.
		- Compile typescript files in AdminGui.
		- Compile typescript files from Rhetos.Angular2.ts to javascript files inside folder Resources/Angular2ModelGenerator(including necessary node_modules file use for tsc command).
		- Copy typings and scripts files from AdminGui to Resources/Angular2ModelGenerator.
		- Update bower component and prepared wwwroot folder in AdminGui.
		- Create the packet by calling "Rhetos - CreateNugetPackages.bat".
		- Copy some config and bat files.
		- Finally, run DeployPackages.exe in 2CS.RhetosBuild to deploy all packages.
		
	5. make.bat:
		- It will get version of you Visual Studio.
		- Rebuild RhetosConceptsAndExtensions.csproj to run 3 file cs:
			+ PingService.cs
			+ CreatedByUserInfo.cs
			+ ExternalActionInfo.cs
		- Git submodule init : to initialize your local configuration file.
		- Git submodule update : to fetch all the data from that project and check out the appropriate commit listed in your superproject (2CS.BaseCode and 2CS.RhetosBuild)
		- Update nodemodules in 2CS.BaseCode and AdminGui.
		- Compile typescript files with "tsc" in 2CS.BaseCode.
		- Use gulp to copy file from 2CS.BaseCode to AdminGui.
		- Compile typescript files with "tsc" in AdminGui.
		- Update bower component and prepared wwwroot folder in AdminGui.
		- Finally, make a package nuspec outside of AdminGui (2CS.Rhetos.AdminGui).
	
	6. Rhetos - PrepareAndDeploy.bat: 
		- Run make.bat
		- Create and set database "TestAdminGui" for projects by calling "CreateAndSetDatabase.exe (local) TestAdminGui".
		- Copy some config and bat files.
		- Run DeployPackages.exe in 2CS.RhetosBuild to deploy all packages.
		- Run Plugins\AdminSetup.exe to setup password for admin.
		- Create IISExpress site is TestAdminGui at port 9000 by calling CreateIISExpressSite.exe TestAdminGui 9000.
	
	7. Rhetos - StartIISExpress.bat : 
		This file will help you run and start the server.
	
    8. Rhetos - Angular2ModelGenerator:
        - Change direction to AdminGui and start to "bower", "gulp" in here. Next, change direction to the outside and create NugetPackage for current state.
        - Start prepare things need for deploy process. After that, a new package will deploy to Rhetos.
        - Copy Rhetos.Angular2.ts generated to AdminGui\scripts\models.
        - Compile AdminGui with new model definition.
        - Start create a new NugetPackage.
        - Deploy upper package into Rhetos.
         

 
	Actually, after cloning 2CS.Rhetos.AdminGui by cmd "git clone https://2cs.visualstudio.com/2CS.Rhetos.AdminGui/_git/2CS.Rhetos.AdminGui <LOCAL_LOCATION>",
	you just have to run "Rhetos - PrepareAndDeploy.bat", it will do all things for you and then you just start server by "Rhetos - StartIISExpress.bat".
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		