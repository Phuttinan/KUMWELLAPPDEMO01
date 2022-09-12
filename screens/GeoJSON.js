// create geojson layer from USGS earthquakes data
const layer = new GeoJSONLayer({
    url: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
});