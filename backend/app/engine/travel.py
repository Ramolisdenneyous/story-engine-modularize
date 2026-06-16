def allowed_locations_for_path(adventure_paths: dict[str, dict[str, list[str]]], adventure_id: str, current_location_id: str) -> list[str]:
    paths = adventure_paths.get(adventure_id, {})
    return paths.get(current_location_id, paths.get("", []))
