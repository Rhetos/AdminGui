insert into [Common].[RolePermission](ID, RoleID, ClaimID, IsAuthorized)
select
	newID(),r.ID as RoleID,c.ID as ClaimID, 'true'
from
	[Common].[Claim] c join [Common].[Role] r on r.Name='SecurityAdministrator'
where not exists (select ClaimID,RoleID from Common.RolePermission where ClaimID = c.ID and RoleID =r.ID)