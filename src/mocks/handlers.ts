import { http, HttpResponse } from "msw";
import { voicemailData as allVoices } from "./data/voices";

export const handlers = [
  http.get("/api/voices", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("count") || "10");

    // Пагинация
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedVoices = allVoices.records.slice(startIndex, endIndex);

    // Общее количество постов (после фильтрации)
    const total = allVoices.records.length;
    const totalPages = Math.ceil(total / limit);

    return HttpResponse.json({
      content: paginatedVoices,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  }),
];
