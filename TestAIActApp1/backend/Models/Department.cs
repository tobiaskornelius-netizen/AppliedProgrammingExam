using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Department")]
public class Department
{
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("company_id")]
    public int CompanyId { get; set; }
}
