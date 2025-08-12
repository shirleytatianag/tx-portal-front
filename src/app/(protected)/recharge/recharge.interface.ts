export interface RechargeRequest {
  phone_number: string
  operator_id: string
  operator_name: string
  amount: number
}

export interface RechargeResponse {
  recharge_id: string
  phone_number: string
  operator_name: string
  amount: number
  status: string
  puntored_transaction_id: string
  ticket: string
  created_at: string
}

export interface RechargeSchema {
  phone_number: string
   operator_id: {
    id: string;
    name: string;
  };
  amount: number
}

export interface Supplier {
  id: string
  name: string
}

export interface Error {
  message: string
}

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
