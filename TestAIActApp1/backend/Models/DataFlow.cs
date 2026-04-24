using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("DataFlow")]
public class DataFlow
{
    [Column("id")]
    public int Id { get; set; }

    [Column("tool_id")]
    public int ToolId { get; set; }

    [Column("data_type")]
    public string DataType { get; set; } = string.Empty;

    [Column("personal_data")]
    public bool PersonalData { get; set; }
}
