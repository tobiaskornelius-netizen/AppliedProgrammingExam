using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/companies")]
public class CompaniesController : ControllerBase
{
    private readonly AppDbContext _db;

    public CompaniesController(AppDbContext db) => _db = db;

    // Returns the single company instance
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrent()
    {
        var company = await _db.Companies.FindAsync(1);
        if (company is null) return NotFound();
        return Ok(company);
    }

    // Kept for exam CRUD requirement
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var companies = await _db.Companies.ToListAsync();
        return Ok(companies);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Company company)
    {
        _db.Companies.Add(company);
        await _db.SaveChangesAsync();
        return Ok(company);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Company updated)
    {
        var company = await _db.Companies.FindAsync(id);
        if (company is null) return NotFound();
        company.Name = updated.Name;
        company.Industry = updated.Industry;
        await _db.SaveChangesAsync();
        return Ok(company);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var company = await _db.Companies.FindAsync(id);
        if (company is null) return NotFound();
        _db.Companies.Remove(company);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
