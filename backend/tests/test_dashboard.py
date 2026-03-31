def test_dashboard_summary(client):
    response = client.get("/api/dashboard/summary")
    assert response.status_code == 200
    payload = response.json()
    assert payload["total_districts"] == 200


def test_hotspots_non_empty(client):
    response = client.get("/api/hotspots")
    assert response.status_code == 200
    assert len(response.json()) > 0
