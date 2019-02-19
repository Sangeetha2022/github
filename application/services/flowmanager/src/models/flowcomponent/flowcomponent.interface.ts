interface IFlowComponent {
  _id: string
  name: string,
  label: string,
  type: string,
  sequence_id: string,
  dev_language: string,
  dev_framework: string,
  description: string,
  created_date: Date,
  updated_date: Date
}

export default IFlowComponent;
