set arg1=%1
set arg2=%2
sqlcmd -s %arg1% -d %arg2% -i SecurityAdminPermissionSetup.sql
@ECHO 		***	SET PERMISSION DONE ***