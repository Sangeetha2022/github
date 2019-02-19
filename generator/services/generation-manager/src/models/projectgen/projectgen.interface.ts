interface IProjectGen {
  _id: String;
  project_id: String,
  project_name: String,
  user_id: String,
  user_name: String,
  status: String,
  status_message: String,
  stack_trace: String,
  claimed: String,
  created_at: Date,
  updated_at: Date,
  parent_gen_id: String,
}

export default IProjectGen;
