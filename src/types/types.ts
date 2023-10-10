interface Category {
  label: string;
  __CLASS__: string;
  tag: string;
}

interface Company {
  __CLASS__: string;
  display_name: string;
}

interface Location {
  area: string[];
  display_name: string;
  __CLASS__: string;
}

interface Job {
  salary_min: number;
  category: Category;
  redirect_url: string;
  contract_time: string;
  company: Company;
  salary_max: number;
  longitude: number;
  contract_type: string;
  description: string;
  salary_is_predicted: string;
  created: string;
  __CLASS__: string;
  adref: string;
  title: string;
  id: string;
  location: Location;
  latitude: number;
}

export default Job;
