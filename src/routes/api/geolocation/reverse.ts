import { createFileRoute } from "@tanstack/react-router";
import { fetchGeoapifyReverse } from "@/lib/geoapify-server";

export const Route = createFileRoute("/api/geolocation/reverse")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const lat = Number(url.searchParams.get("lat"));
        const lon = Number(url.searchParams.get("lon"));

        if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
          return Response.json({ error: "lat and lon query params are required" }, { status: 400 });
        }

        const result = await fetchGeoapifyReverse(lat, lon);
        return Response.json(result, {
          headers: { "Cache-Control": "private, max-age=300" },
        });
      },
    },
  },
});
