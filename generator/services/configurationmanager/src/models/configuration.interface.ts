interface IGpConfigModel {
  _id: string
  name: string,
  label: string,
  description: string,
  value: string,
  type: string,
  sub_type: string,
  created_at: Date,
  updated_at: Date,
}

export default IGpConfigModel;
