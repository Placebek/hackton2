const asd = [
    {
        id: 1,
        request: "GET /api/v1/resource",
        vuln_title: "SQL Injection",
        vuln_date: "2024-12-07",
        vuln_sample: "' OR '1'='1",
        vulnerability_indicator: "High",
        description: "This vulnerability allows an attacker to inject malicious SQL code into a query."
    },
    {
        id: 2,
        request: "POST /api/v1/login",
        vuln_title: "Cross-Site Scripting (XSS)",
        vuln_date: "2024-12-06",
        vuln_sample: "<script>alert('XSS');</script>",
        vulnerability_indicator: "Medium",
        description: "This vulnerability allows an attacker to inject malicious scripts into a webpage."
    },
    {
        id: 3,
        request: "DELETE /api/v1/resource/123",
        vuln_title: "Unauthorized Access",
        vuln_date: "2024-12-05",
        vuln_sample: "No authentication required",
        vulnerability_indicator: "Critical",
        description: "This vulnerability allows access to restricted resources without proper authentication."
    }
];

export default asd;
