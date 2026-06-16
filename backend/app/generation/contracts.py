from typing import Literal

from pydantic import BaseModel, Field


class StoryBrief(BaseModel):
    seed: str
    genre: str
    tone: str
    world_premise: str
    player_fantasy: str
    content_boundaries: list[str] = Field(default_factory=list)
    major_locations: list[str] = Field(default_factory=list)
    key_characters: list[str] = Field(default_factory=list)
    narrative_arc: list[str] = Field(default_factory=list)
    emotional_beats: list[str] = Field(default_factory=list)
    must_include: list[str] = Field(default_factory=list)
    avoid: list[str] = Field(default_factory=list)


class RpgDesignBrief(BaseModel):
    core_loop: str
    player_roles: list[str] = Field(default_factory=list)
    conflict_types: list[str] = Field(default_factory=list)
    resource_systems: list[str] = Field(default_factory=list)
    success_failure_model: str = ""
    encounter_categories: list[str] = Field(default_factory=list)
    progression_model: str = ""
    balance_targets: list[str] = Field(default_factory=list)
    required_system_hooks: list[str] = Field(default_factory=list)


class GamePackSpec(BaseModel):
    pack_id: str
    name: str
    genre: str
    story_brief: StoryBrief
    rpg_design_brief: RpgDesignBrief
    players: list[dict] = Field(default_factory=list)
    classes: list[dict] = Field(default_factory=list)
    opposition: list[dict] = Field(default_factory=list)
    adventures: list[dict] = Field(default_factory=list)
    items: list[dict] = Field(default_factory=list)
    prompts: dict[str, str] = Field(default_factory=dict)
    ui_manifest: dict = Field(default_factory=dict)
    asset_manifest: dict = Field(default_factory=dict)
    validation_notes: list[str] = Field(default_factory=list)


class ImplementationContract(BaseModel):
    pack_id: str = ""
    source_spec_version: str = ""
    backend_tasks: list[str] = Field(default_factory=list)
    frontend_tasks: list[str] = Field(default_factory=list)
    data_tasks: list[str] = Field(default_factory=list)
    asset_tasks: list[str] = Field(default_factory=list)
    acceptance_checks: list[str] = Field(default_factory=list)
    risk_notes: list[str] = Field(default_factory=list)
    out_of_scope: list[str] = Field(default_factory=list)


class AssetManifestEntry(BaseModel):
    asset_id: str
    kind: Literal["image", "music", "sound", "voice", "text"]
    prompt: str
    target_path: str = ""
    status: Literal["requested", "generated", "approved", "rejected"] = "requested"
    owner_agent: str = ""
    acceptance_notes: list[str] = Field(default_factory=list)


class AssetManifest(BaseModel):
    pack_id: str
    assets: list[AssetManifestEntry] = Field(default_factory=list)


class TestReport(BaseModel):
    pack_id: str
    summary: str
    playthrough_id: str = ""
    bugs: list[str] = Field(default_factory=list)
    balance_notes: list[str] = Field(default_factory=list)
    ux_friction: list[str] = Field(default_factory=list)
    recommended_fixes: list[str] = Field(default_factory=list)
    regression_checks: list[str] = Field(default_factory=list)
