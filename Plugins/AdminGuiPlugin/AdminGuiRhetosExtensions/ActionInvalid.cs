using Common;
using Rhetos.Dom.DefaultConcepts;
using Rhetos.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminGuiRhetosExtensions
{
    public class ActionInvalid
    {
        private static void CreateInvalidCheckingHistory(DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {
            var oldHistory = repository.CheckingInvalid.InvalidCheckingHistory.Query().Where(item => item.Lasted == true && item.CurrentUser == userInfo.UserName).SingleOrDefault();

            if (oldHistory != null)
            {
                repository.CheckingInvalid.InvalidCheckingHistory.Save(null, new[]{
                    new CheckingInvalid.InvalidCheckingHistory
                    {
                        ID = oldHistory.ID,
                        CurrentUser = oldHistory.CurrentUser,
                        IsChecked = oldHistory.IsChecked,
                        StartTime = oldHistory.StartTime,
                        EndTime = oldHistory.EndTime,
                        Status = oldHistory.Status,
                        Lasted = false
                    }
                }, null);
            }

            repository.CheckingInvalid.InvalidCheckingHistory.Save(new[] { new CheckingInvalid.InvalidCheckingHistory
                    {
                        CurrentUser = userInfo.UserName,
                        IsChecked = false,
                        StartTime = DateTime.Now,
                        EndTime = null,
                        Status = "Checking is progress",
                        Lasted = true
                    }
            }, null, null);
        }

        private static void CreateInvalidEntity(string ListEntity, DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {

            var history = repository.CheckingInvalid.InvalidCheckingHistory.Query().Where(item => item.Lasted == true && item.CurrentUser == userInfo.UserName).SingleOrDefault();

            if (ListEntity != "" && history != null)
            {
                string[] listInvalidEntity = ListEntity.Split(',');


                foreach (var invalidEntity in listInvalidEntity)
                {
                    var entityGenericRepository = context.GenericRepository(invalidEntity);
                    int totalCount = (int)entityGenericRepository.Query().Count();
                    repository.CheckingInvalid.InvalidEntity.Save(new[] {
                        new CheckingInvalid.InvalidEntity
                        {
                            EntityName = invalidEntity,
                            NumRecord = totalCount,
                            IsChecked = false,
                            InvalidCheckingHistoryID = history.ID
                        }
                    }, null, null);
                }
            }
        }
        private static void CreateInvalidFilter(string EntityName, string ListFilters, DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {
            var history = repository.CheckingInvalid.InvalidCheckingHistory.Query().Where(item => item.Lasted == true && item.CurrentUser == userInfo.UserName).SingleOrDefault();

            if (ListFilters != "" && history != null)
            {
                var invalidEntity = repository.CheckingInvalid.InvalidEntity.Query().Where(item => item.EntityName == EntityName && item.InvalidCheckingHistoryID == history.ID).SingleOrDefault();
                if (invalidEntity != null)
                {

                    string[] listInvalidFilter = ListFilters.Split(',');

                    foreach (var invalidFilter in listInvalidFilter)
                    {
                        repository.CheckingInvalid.InvalidFilter.Save(new[] {
                            new CheckingInvalid.InvalidFilter
                            {
                                FilterName = invalidFilter,
                                Status ="Check not started",
                                IsChecked = false,
                                InvalidEntityID = invalidEntity.ID
                            }
                        }, null, null);
                    }
                }
            }
        }
        private static void CreateInvalidChunk(string EntityName, DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {
            var history = repository.CheckingInvalid.InvalidCheckingHistory.Query().Where(item => item.Lasted == true && item.CurrentUser == userInfo.UserName).SingleOrDefault();

            if (history == null)
                return;

            var invalidEntity = repository.CheckingInvalid.InvalidEntity.Query().Where(item => item.EntityName == EntityName && item.InvalidCheckingHistoryID == history.ID).SingleOrDefault();

            if (invalidEntity != null)
            {
                int totalRecord = (int)invalidEntity.NumRecord;
                int recordPerChunk = 0;
                int numChunk = 0;

                if (totalRecord <= 1000)
                    numChunk = 1;
                else if (totalRecord <= 10000)
                    numChunk = 16;
                else if (totalRecord <= 100000)
                    numChunk = 64;
                else
                    numChunk = 128;

                recordPerChunk = totalRecord / numChunk;

                List<Tuple<Guid, Guid>> listChunks = new List<Tuple<Guid, Guid>>();
                for (int i = 0; i < numChunk; i++)
                {
                    int start = i * (256 / numChunk);
                    int end = (i + 1) * (256 / numChunk);
                    end = (end == 256) ? 255 : end;

                    string hexStartID = (start < 16) ? "0" + start.ToString("X") : start.ToString("X");
                    string hexEndID = (end < 16) ? "0" + end.ToString("X") : end.ToString("X");


                    Guid startID = new Guid(
                        string.Join("", Enumerable.Repeat(hexStartID, 4)) + "-" +
                        string.Join("-", Enumerable.Repeat(hexStartID + hexStartID, 3)) + "-" +
                        string.Join("", Enumerable.Repeat(hexStartID, 6)));

                    Guid endID = new Guid(
                        string.Join("", Enumerable.Repeat(hexEndID, 4)) + "-" +
                        string.Join("-", Enumerable.Repeat(hexEndID + hexEndID, 3)) + "-" +
                        string.Join("", Enumerable.Repeat(hexEndID, 6)));

                    listChunks.Add(new Tuple<Guid, Guid>(startID, endID));
                }

                foreach (var chunk in listChunks)
                {
                    var listFilters = repository.CheckingInvalid.InvalidFilter.Query().Where(item => item.InvalidEntityID == invalidEntity.ID && item.IsChecked == false).ToArray();
                    foreach (var filter in listFilters)
                    {
                        repository.CheckingInvalid.InvalidChunk.Save(new[] {
                            new CheckingInvalid.InvalidChunk
                            {
                                StartID = chunk.Item1,
                                EndID = chunk.Item2,
                                NumRecord = recordPerChunk,
                                NumInvalid = 0,
                                IsChecked = false,
                                InvalidFilterID = filter.ID
                            }
                        }, null, null);
                    }
                }
            }
        }

        public static void InitialCheckingAction(InitialParam parameters, DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {
            var data = Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(parameters.EntityData);
            string listEntityName = "";
            bool first = true;

            foreach (Newtonsoft.Json.Linq.JObject entity in data.data)
            {
                if (!first)
                {
                    listEntityName += ",";
                }
                string entityName = entity["EntityName"].ToString();

                listEntityName += entityName;
                first = false;
            }

            CreateInvalidCheckingHistory(repository, userInfo, context);
            CreateInvalidEntity(listEntityName, repository, userInfo, context);
            foreach (Newtonsoft.Json.Linq.JObject entity in data.data)
            {
                string entityName = entity["EntityName"].ToString();
                string listFilter = entity["ListFilter"].ToString();
                CreateInvalidFilter(entityName, listFilter, repository, userInfo, context);
                CreateInvalidChunk(entityName, repository, userInfo, context);
            }
        }

        private static void UpdateInvalidChunk(Guid ChunkID, int NumInvalid, DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {
            var oldChunk = repository.CheckingInvalid.InvalidChunk.Query().Where(item => item.ID == ChunkID).SingleOrDefault();

            if (oldChunk != null)
            {
                repository.CheckingInvalid.InvalidChunk.Save(null, new[] {
                    new CheckingInvalid.InvalidChunk
                    {
                        ID = oldChunk.ID,
                        StartID = oldChunk.StartID,
                        EndID = oldChunk.EndID,
                        NumRecord = oldChunk.NumRecord,
                        NumInvalid = NumInvalid,
                        IsChecked = true,
                        InvalidFilterID = oldChunk.InvalidFilterID
                    }
                }, null);
            }
        }

        private static void UpdateInvalidFilter(Guid FilterID, int TotalRecord, DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {
            var oldFilter = repository.CheckingInvalid.InvalidFilter.Query().Where(item => item.ID == FilterID).SingleOrDefault();
            var listUnCheckChunks = repository.CheckingInvalid.InvalidChunk.Query().Where(item => item.InvalidFilterID == FilterID && item.IsChecked == false).ToArray();
            var listCheckedChunks = repository.CheckingInvalid.InvalidChunk.Query().Where(item => item.InvalidFilterID == FilterID && item.IsChecked == true).ToArray();

            if (oldFilter != null)
            {
                string status = "";
                bool isChecked = false;

                if (listUnCheckChunks.Count() == 0)
                {
                    status = "Check completed";
                    isChecked = true;
                }
                else if (listCheckedChunks.Count() > 0)
                {
                    int numCheckedRows = 0;
                    foreach (var checkedChunk in listCheckedChunks)
                    {
                        numCheckedRows += (int)checkedChunk.NumRecord;
                    }

                    double percentCheckedRow = (int)((numCheckedRows / (double)TotalRecord) * 10000) / 100.0;

                    status = "Check " + percentCheckedRow + "% of rows";
                    isChecked = (bool)oldFilter.IsChecked;
                }

                if (listUnCheckChunks.Count() == 0 || listCheckedChunks.Count() > 0)
                {
                    repository.CheckingInvalid.InvalidFilter.Save(null, new[] {
                        new CheckingInvalid.InvalidFilter
                        {
                            ID = oldFilter.ID,
                            FilterName = oldFilter.FilterName,
                            Status = status,
                            IsChecked = isChecked,
                            InvalidEntityID = oldFilter.InvalidEntityID
                        }
                    }, null);
                }

            }
        }

        private static void UpdateInvalidEntity(Guid EntityID, DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {
            var oldEntity = repository.CheckingInvalid.InvalidEntity.Query().Where(item => item.ID == EntityID).SingleOrDefault();
            var listFilters = repository.CheckingInvalid.InvalidFilter.Query().Where(item => item.InvalidEntityID == EntityID && item.IsChecked == false).ToArray();

            if (oldEntity != null && listFilters.Count() == 0)
            {
                repository.CheckingInvalid.InvalidEntity.Save(null, new[] {
                    new CheckingInvalid.InvalidEntity
                    {
                        ID = oldEntity.ID,
                        EntityName = oldEntity.EntityName,
                        NumRecord = oldEntity.NumRecord,
                        IsChecked = true,
                        InvalidCheckingHistoryID = oldEntity.InvalidCheckingHistoryID,
                    }
                }, null);
            }
        }

        private static void UpdateInvalidCheckingHistory(DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {
            var oldHistory = repository.CheckingInvalid.InvalidCheckingHistory.Query().Where(item => item.CurrentUser == context.UserInfo.UserName && item.Lasted == true).SingleOrDefault();
            var listEntitys = repository.CheckingInvalid.InvalidEntity.Query().Where(item => item.InvalidCheckingHistoryID == oldHistory.ID && item.IsChecked == false).ToArray();

            if (oldHistory != null && listEntitys.Count() == 0)
            {
                repository.CheckingInvalid.InvalidCheckingHistory.Save(null, new[] {
                    new CheckingInvalid.InvalidCheckingHistory
                    {
                        ID = oldHistory.ID,
                        CurrentUser = oldHistory.CurrentUser,
                        IsChecked = true,
                        StartTime = oldHistory.StartTime,
                        EndTime = DateTime.Now,
                        Status = "Check Completed",
                        Lasted = oldHistory.Lasted
                    }
                }, null);
            }
        }

        public static void UpdateInvalidData(UpdateInvalidParam parameters, DomRepository repository, IUserInfo userInfo, ExecutionContext context)
        {
            int totalRecords = (int)repository.CheckingInvalid.InvalidEntity.Query().Where(item => item.ID == parameters.EntityID).SingleOrDefault().NumRecord;
            UpdateInvalidChunk(parameters.ChunkID, parameters.NumInvalid, repository, userInfo, context);
            UpdateInvalidFilter(parameters.FilterID, totalRecords, repository, userInfo, context);
            UpdateInvalidEntity(parameters.EntityID, repository, userInfo, context);
            UpdateInvalidCheckingHistory(repository, userInfo, context);
        }
    }
    public class InitialParam
    {
        public string EntityData { get; set; }
    }

    public class UpdateInvalidParam
    {
        public Guid ChunkID { get; set; }
        public Guid FilterID { get; set; }
        public Guid EntityID { get; set; }
        public int NumInvalid { get; set; }
    }
}
