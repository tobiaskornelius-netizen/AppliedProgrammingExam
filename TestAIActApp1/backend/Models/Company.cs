using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("Company")]
public class Company
{
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("industry")]
    public string Industry { get; set; } = string.Empty;
}
