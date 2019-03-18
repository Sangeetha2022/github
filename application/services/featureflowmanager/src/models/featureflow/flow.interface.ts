interface IFlow {
  _id: string;
  name: string,
  label: string,
  screenName: string;
  description: string,
  action_on_data: string,
  type: string,
  create_with_default_activity: number,
  created_date: Date,
  updated_date: Date
}

export default IFlow;
