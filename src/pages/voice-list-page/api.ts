import { mapDtoToVoiceItem } from "./mappers";
import { PaginationDTO, VoiceListItem, VoiceListItemDTO } from "./types";
import { ListApi } from "./use-list";

export const voiceApi: ListApi<VoiceListItem> = {
  async list(params: { page: number; count: number }) {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      count: params.count.toString(),
    }).toString();
    return await fetch(`/api/voices?${queryParams}`).then((res) =>
      (
        res.json() as Promise<{
          content: VoiceListItemDTO[];
          pagination: PaginationDTO;
        }>
      ).then((data) => ({
        items: data.content.map(mapDtoToVoiceItem),
        totalItems: data.pagination.total,
      }))
    );
  },
};
