using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/departments")]
public class DepartmentsController : ControllerBase
{
    private readonly AppDbContext _db;

    public DepartmentsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var departments = await _db.Departments
            .Where(d => d.CompanyId == 1)
            .OrderBy(d => d.Name)
            .ToListAsync();
        return Ok(departments);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Department department)
    {
        department.CompanyId = 1;
        _db.Departments.Add(department);
        await _db.SaveChangesAsync();
        return Ok(department);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Department updated)
    {
        var existing = await _db.Departments.FindAsync(id);
        if (existing == null) return NotFound();
        existing.Name = updated.Name;
        await _db.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var existing = await _db.Departments.FindAsync(id);
        if (existing == null) return NotFound();
        _db.Departments.Remove(existing);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
