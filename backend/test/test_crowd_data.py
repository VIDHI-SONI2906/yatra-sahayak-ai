from crowd_data import get_prediction, get_alerts

def test_prediction_returns_valid_range():
    result = get_prediction("Ram Ghat")
    assert "predicted" in result
    assert 0 <= result["predicted"] <= 100

def test_alerts_only_high_congestion():
    alerts = get_alerts()
    assert all("High congestion" in a for a in alerts)