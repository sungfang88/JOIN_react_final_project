import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const JoinMap = () => {
  useEffect(() => {
    const mymap = L.map('joinmap').setView(
      [25.03421433281089, 121.54344508355389],
      17
    )

    const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    L.tileLayer(OSMUrl).addTo(mymap)

    // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
    // const greenIcon = new L.Icon({
    //   iconUrl:
    //     'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    //   shadowUrl:
    //     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    //   iconSize: [25, 41],
    //   iconAnchor: [12, 41],
    //   popupAnchor: [1, -34],
    //   shadowSize: [41, 41],
    // })

    const fontAwesomeIcon = L.divIcon({
      html: '<i class="fa-solid fa-location-pin"></i>',
      iconSize: [50, 65],
      // iconAnchor: [12, 41],
      popupAnchor: [1, -17],
      className: 'myDivIcon',
    })

    const marker = L.marker([25.03421433281089, 121.54344508355389], {
      icon: fontAwesomeIcon,
    }).addTo(mymap)

    marker.bindPopup('<h3 class="j-deepPri">Join 酒・癮</h5>').openPopup()

    L.circle([25.03421433281089, 121.54344508355389], {
      color: 'f58807',
      fillColor: '#f58807',
      fillOpacity: 0.5,
      radius: 15,
    }).addTo(mymap)

    return () => {
      mymap.remove()
    }
  }, [])

  // 設定 height 顯示地圖 ( 預設值 height : 0 )
  //TODO z-index
  return <div id="joinmap" style={{ width: '100%', height: '25rem' }} />
}

export default JoinMap
