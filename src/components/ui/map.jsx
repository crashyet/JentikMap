import * as React from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { cn } from "@/lib/utils"

const MapContext = React.createContext(null)

const Map = React.forwardRef(
  (
    {
      className,
      center = [108.99, -7.71], // Cilacap default
      zoom = 13,
      style = "https://demotiles.maplibre.org/style.json",
      children,
      ...props
    },
    ref
  ) => {
    const mapContainerRef = React.useRef(null)
    const [map, setMap] = React.useState(null)

    React.useEffect(() => {
      if (!mapContainerRef.current) return

      const mapInstance = new maplibregl.Map({
        container: mapContainerRef.current,
        style: style,
        center: center,
        zoom: zoom,
        attributionControl: false,
      })

      mapInstance.on("load", () => {
        setMap(mapInstance)
      })

      if (ref) {
        if (typeof ref === "function") {
          ref(mapInstance)
        } else {
          ref.current = mapInstance
        }
      }

      return () => mapInstance.remove()
    }, [])

    return (
      <MapContext.Provider value={map}>
        <div
          ref={mapContainerRef}
          className={cn("relative h-full w-full overflow-hidden", className)}
          {...props}
        >
          {map && children}
        </div>
      </MapContext.Provider>
    )
  }
)
Map.displayName = "Map"

const MapControls = () => {
  const map = React.useContext(MapContext)

  React.useEffect(() => {
    if (!map) return
    const nav = new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true,
    })
    map.addControl(nav, "bottom-right")
    return () => map.removeControl(nav)
  }, [map])

  return null
}

const MapMarker = ({ lngLat, children, className }) => {
  const map = React.useContext(MapContext)
  const markerRef = React.useRef(null)

  React.useEffect(() => {
    if (!map || !markerRef.current) return

    const marker = new maplibregl.Marker({
      element: markerRef.current,
    })
      .setLngLat(lngLat)
      .addTo(map)

    return () => marker.remove()
  }, [map, lngLat])

  return (
    <div className="hidden">
      <div ref={markerRef} className={cn("cursor-pointer", className)}>
        {children}
      </div>
    </div>
  )
}

export { Map, MapControls, MapMarker }
