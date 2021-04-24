import * as React from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
const TOKEN =
	"pk.eyJ1IjoiYXJpc2FyZXMyMiIsImEiOiJja21hNHN4bncxbzN1Mm5wcnZqZmhmd245In0.mo6lAUdwinLZchtCADFthw";

const geojson = {
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			geometry: { type: "Point", coordinates: [-122.4, 37.8] },
		},
	],
};

const layerStyle = {
	id: "point",
	type: "circle",
	paint: {
		"circle-radius": 10,
		"circle-color": "#007cbf",
	},
};

function App() {
	const [viewport, setViewport] = React.useState({
		longitude: -122.45,
		latitude: 37.78,
		zoom: 14,
	});
	return (
		<ReactMapGL
			{...viewport}
			width="10"
			height="100%"
			onViewportChange={setViewport}
			mapboxApiAccessToken={TOKEN}
		>
			<Source id="my-data" type="geojson" data={geojson}>
				<Layer {...layerStyle} />
			</Source>
		</ReactMapGL>
	);
}

export default App;
