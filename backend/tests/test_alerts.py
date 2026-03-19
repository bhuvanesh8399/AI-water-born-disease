def test_list_alerts(client, auth_header):
    response = client.get("/api/alerts", headers=auth_header)
    assert response.status_code == 200
    payload = response.json()
    assert payload["total"] >= 1


def test_update_alert(client, auth_header):
    response = client.get("/api/alerts", headers=auth_header)
    alert_id = response.json()["items"][0]["id"]

    patch_response = client.patch(
        f"/api/alerts/{alert_id}",
        headers=auth_header,
        json={"status": "resolved"},
    )
    assert patch_response.status_code == 200
    assert patch_response.json()["status"] == "resolved"
