interface IFlow {
  _id: string;
  name: string,
  label: string,
  description: string,
  action_on_data: string,
  type: string,
  create_with_default_activity: number
}

export default IFlow;
