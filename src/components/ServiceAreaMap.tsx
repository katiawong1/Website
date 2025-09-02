import { useEffect, useRef } from 'react';

interface ServiceAreaMapProps {
  className?: string;
}

const ServiceAreaMap = ({ className = "" }: ServiceAreaMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Austin, TX coordinates
    const austinCenter = { lat: 30.2672, lng: -97.7431 };

    // Service area polygon coordinates (Austin metro area)
    const serviceAreaCoords = [
      { lat: 30.5168, lng: -97.9383 }, // Northwest (Cedar Park)
      { lat: 30.5084, lng: -97.6789 }, // North (Round Rock)
      { lat: 30.4518, lng: -97.5563 }, // Northeast (Pflugerville)
      { lat: 30.2240, lng: -97.4696 }, // East (Del Valle)
      { lat: 30.1133, lng: -97.5563 }, // Southeast (Buda)
      { lat: 30.0877, lng: -97.8331 }, // Southwest (Dripping Springs)
      { lat: 30.2240, lng: -98.0178 }, // West (Lakeway)
      { lat: 30.3882, lng: -97.9383 }, // Northwest (Leander)
    ];

    // Initialize map
    const map = new google.maps.Map(mapRef.current, {
      zoom: 10,
      center: austinCenter,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "all",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#c9c9c9" }]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#ffffff" }]
        }
      ]
    });

    mapInstanceRef.current = map;

    // Create service area polygon
    const serviceAreaPolygon = new google.maps.Polygon({
      paths: serviceAreaCoords,
      strokeColor: "#2563eb", // Blue color matching your theme
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#2563eb",
      fillOpacity: 0.15,
    });

    serviceAreaPolygon.setMap(map);

    // Add office marker
    const officeMarker = new google.maps.Marker({
      position: austinCenter,
      map: map,
      title: "E-Tax CPA - Austin Office",
      icon: {
        url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#2563eb" stroke="white" stroke-width="4"/>
            <circle cx="20" cy="20" r="8" fill="white"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(40, 40),
        anchor: new google.maps.Point(20, 20),
      },
    });

    // Info window for office
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 10px; font-family: system-ui, -apple-system, sans-serif;">
          <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px; font-weight: 600;">E-Tax CPA</h3>
          <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">Professional Tax Services</p>
          <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;">📞 (512) 555-0137</p>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">📧 hello@etaxcpa.com</p>
        </div>
      `,
    });

    officeMarker.addListener("click", () => {
      infoWindow.open(map, officeMarker);
    });

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        // Clean up map instance if needed
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className={`w-full h-96 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};

export default ServiceAreaMap;
