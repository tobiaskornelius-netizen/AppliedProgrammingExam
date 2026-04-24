using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/compliance")]
public class ComplianceController : ControllerBase
{
    private readonly AppDbContext _db;

    public ComplianceController(AppDbContext db) => _db = db;

    [HttpGet("report")]
    public async Task<IActionResult> GetReport()
    {
        const int companyId = 1;
        var company = await _db.Companies.FindAsync(companyId);
        if (company is null) return NotFound();

        var tools = await _db.AITools
            .Where(t => t.CompanyId == companyId)
            .ToListAsync();

        var cutoff = DateTime.UtcNow.AddDays(-90);

        int riskScore = tools.Sum(t =>
        {
            int score = t.RiskLevel switch
            {
                "Unacceptable" => 5,
                "High"         => 3,
                "Limited"      => 1,
                _              => 0
            };
            if (t.PersonalData) score += 2;
            if (string.IsNullOrWhiteSpace(t.OversightOwner)) score += 2;
            if (t.TransparencyStatus == "Pending") score += 2;
            if (t.LastAuditDate is null || t.LastAuditDate < cutoff) score += 2;
            return score;
        });

        var report = new ComplianceReport
        {
            CompanyId = companyId,
            RiskScore = riskScore,
            CreatedAt = DateTime.UtcNow
        };
        _db.ComplianceReports.Add(report);
        await _db.SaveChangesAsync();

        return Ok(new
        {
            companyId,
            companyName = company.Name,
            riskScore,
            totalTools = tools.Count,
            highRiskCount = tools.Count(t => t.RiskLevel is "High" or "Unacceptable"),
            personalDataCount = tools.Count(t => t.PersonalData)
        });
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetDashboard()
    {
        const int companyId = 1;
        var company = await _db.Companies.FindAsync(companyId);
        if (company is null) return NotFound();

        var tools = await _db.AITools
            .Where(t => t.CompanyId == companyId)
            .ToListAsync();

        var cutoff = DateTime.UtcNow.AddDays(-90);

        var riskLevelCounts = new Dictionary<string, int>
        {
            ["Low"] = tools.Count(t => t.RiskLevel == "Low"),
            ["Limited"] = tools.Count(t => t.RiskLevel == "Limited"),
            ["High"] = tools.Count(t => t.RiskLevel == "High"),
            ["Unacceptable"] = tools.Count(t => t.RiskLevel == "Unacceptable")
        };

        var pendingTransparencyTools = tools
            .Where(t => t.TransparencyStatus == "Pending")
            .Select(t => t.Name)
            .ToList();

        var auditNeglectTools = tools
            .Where(t => t.LastAuditDate is null || t.LastAuditDate < cutoff)
            .Select(t => t.Name)
            .ToList();

        return Ok(new
        {
            totalTools = tools.Count,
            riskLevelCounts,
            pendingTransparencyTools,
            auditNeglectTools
        });
    }
}
