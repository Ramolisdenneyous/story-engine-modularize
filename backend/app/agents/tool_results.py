from typing import Any


def accepted_party_requests(generation: Any) -> list[dict[str, Any]]:
    return [request for request in getattr(generation, "party_requests", []) if request.get("accepted")]

