def test_dashboard_summary(client, auth_header):
    response = client.get("/api/dashboard/summary", headers=auth_header)
    assert response.status_code == 200
    payload = response.json()
    assert "kpis" in payload
    assert len(payload["top_hotspots"]) >= 1
   