export interface SummaryData {
  type: string;
  count: number;
}

export interface SummaryCardProps {
  summary: SummaryData[];
}

export interface Client {
  client_id: number;
  name: string;
}

export interface Lawyer {
  lawyer_id: number;
  name: string;
}

export interface TableRowData {
  client: Client;
  matterType: string;
  attorneyName: Lawyer;
  status: string;
}

export interface FetchMattersParams {
  page?: number;
  limit?: number;
}

export interface Matter {
  matter_id: number;
  matter_number: string;
  matter_type: string;
  status: string;
  description: string;
  client: Client;
  lawyer: Lawyer;
  client_id: number;
  lawyer_id: number;
}

export interface MattersData {
  currentPage?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  data?: Matter[];
}

export interface MattersDataProps {
  mattersData: MattersData;
  clients: Client[];
  lawyers: Lawyer[];
  onPageChange: (page: number) => void;
  onAddMatter: (matter: MatterDto) => void;
}

export interface MatterDto {
  matter_type: string;
  status: string;
  description: string;
  client_id: number;
  lawyer_id: number;
}

export interface AddNewMatterProps {
  clients: Client[];
  lawyers: Lawyer[];
  onAddMatter: (matter: MatterDto) => void;
}
