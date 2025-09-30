import { VoiceListItem, VoiceListItemDTO } from "./types";

export function mapDtoToVoiceItem(dto: VoiceListItemDTO): VoiceListItem {
  return {
    received: dto.Received,
    from: dto.From,
    to: dto.To,
    duration: dto.Duration,
  };
}
