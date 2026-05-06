using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/tools")]
public class ToolsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ToolsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var tools = await _db.AITools
            .Where(t => t.CompanyId == Constants.CurrentCompanyId)
            .ToListAsync();

        return Ok(tools);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] AITool tool)
    {
        tool.CompanyId = Constants.CurrentCompanyId;
        _db.AITools.Add(tool);
        await _db.SaveChangesAsync();
        return Ok(tool);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] AITool updated)
    {
        var tool = await _db.AITools.FindAsync(id);
        if (tool is null) return NotFound();

        tool.Name = updated.Name;
        tool.Vendor = updated.Vendor;
        tool.Type = updated.Type;
        tool.PersonalData = updated.PersonalData;
        tool.OversightOwner = updated.OversightOwner;
        tool.TransparencyStatus = updated.TransparencyStatus;
        tool.DepartmentId = updated.DepartmentId;
        await _db.SaveChangesAsync();
        return Ok(tool);
    }

    [HttpPut("{id}/audit")]
    public async Task<IActionResult> LogAudit(int id)
    {
        var tool = await _db.AITools.FindAsync(id);
        if (tool is null) return NotFound();

        tool.LastAuditDate = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return Ok(tool);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var tool = await _db.AITools.FindAsync(id);
        if (tool is null) return NotFound();

        _db.AITools.Remove(tool);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}