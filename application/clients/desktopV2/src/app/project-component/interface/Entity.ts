export interface IEntity 
{
    name: String;
    description: String;
    entity_type: String;
    project_id: String;
    created_by: String;
    feature_id: String;
    last_modified_by: String;
    updated_at: Date;
    field: any[];
}

export interface PEntity
{
    name: String;
    description: String;
    entity_type: String;
    project_id: String;
    created_by: String;
    last_modified_by: String;
    updated_at: Date;
    field: any[];
}
