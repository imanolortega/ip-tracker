<template>
  <div class="flex flex-col h-screen max-h-screen">
    <div
      class="flex justify-center relative px-4 pt-8 pb-32 bg-nice-gradient z-20"
    >
      <div class="w-full max-w-screen-sm">
        <h1 class="text-white text-center text-3xl pb-4">IP Tracker</h1>
        <div class="flex">
          <input
            v-model="queryIp"
            class="
              flex-1
              py-3
              px-3
              rounded-tl-md rounded-bl-md
              focus:outline-none
            "
            type="text"
            placeholder="Busca una IP o dejalo vacío para ver la información de tu IP"
          />
          <i
            @click="getIpInfo"
            class="
              fas
              fa-chevron-right
              text-white
              bg-black
              flex
              justify-center
              items-center
              px-4
              py-4
              rounded-tr-md rounded-br-md
              cursor-pointer
              border-4 border-black
              hover:opacity-75
            "
          ></i>
        </div>
      </div>

      <IPInfo v-if="ipInfo" v-bind:ipInfo="ipInfo" />
    </div>

    <div id="mapid" class="h-full z-10"></div>
  </div>
</template>

<script>
import IPInfo from "../components/IPInfo.vue";
import leaflet from "leaflet";
import { onMounted, ref } from "@vue/runtime-core";
import axios from "axios";
export default {
  name: "Home",
  components: { IPInfo },
  setup() {
    let myMap;

    const queryIp = ref("");
    const ipInfo = ref(null);

    const getIpInfo = async () => {
      try {
        const data = await axios.get(
          `https://geo.ipify.org/api/v1?apiKey=at_b69g5ETC0NVw4O7fWq7MKfdjrPWGC&ipAddress=${queryIp.value}`
        );
        const result = data.data;
        ipInfo.value = {
          address: result.ip,
          country: result.location.country,
          location: result.location.city,
          lat: result.location.lat,
          lng: result.location.lng,
          isp: result.isp,
        };
        leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(myMap);
        myMap.setView([ipInfo.value.lat, ipInfo.value.lng], 13);
      } catch (err) {
        console.log(err.message);
      }
    };

    onMounted(() => {
      getIpInfo();
      myMap = leaflet.map("mapid").setView([51.505, -0.09], 13);

      leaflet
        .tileLayer(
          `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaW1hbm9scnRlZ2EiLCJhIjoiY2tyMmFveWc2MHBmeTJ1dGNlNWt6dDAzcCJ9.Z_kSKUi-qSNH1yWXqiYxtQ`,
          {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1,
            accessToken:
              "pk.eyJ1IjoiaW1hbm9scnRlZ2EiLCJhIjoiY2tyMmFveWc2MHBmeTJ1dGNlNWt6dDAzcCJ9.Z_kSKUi-qSNH1yWXqiYxtQ",
          }
        )
        .addTo(myMap);
    });

    return { queryIp, ipInfo, getIpInfo };
  },
};
</script>
