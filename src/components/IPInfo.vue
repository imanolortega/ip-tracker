<template>
  <div
    class="
      absolute
      -bottom-64
      lg:-bottom-20
      flex flex-col
      lg:flex-row
      bg-white
      gap-y-4 gap-x-12
      px-8
      pt-8
      pb-12
      rounded-md
    "
  >
    <!--Box 1-->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">Dirección IP</h3>
      <span class="text-2xl">{{ ipInfo.address }}</span>
    </div>
    <!--Box 2-->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">Ciudad</h3>
      <span class="text-2xl">{{ ipInfo.location }}, {{ ipInfo.country }}</span>
    </div>
    <!--Box 3-->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">Latitud y Longitud</h3>
      <span class="text-2xl">{{ ipInfo.lat }}, {{ ipInfo.lng }}</span>
    </div>
    <!--Box 4-->
    <div class="flex flex-col">
      <h3 class="text-xs mb-2 uppercase">ISP</h3>
      <span class="text-2xl">{{ ipInfo.isp }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["ipInfo"],
};
</script>
