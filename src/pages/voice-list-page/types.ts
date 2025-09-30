export type VoiceListItemDTO = {
  Received: string;
  From: string;
  To: string;
  Duration: string;
};

export type VoiceListItem = {
  received: string;
  from: string;
  to: string;
  duration: string;
};

export type PaginationDTO = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};
