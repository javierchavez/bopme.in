<script type="text/javascript"
    src="http://www.google.com/jsapi?autoload={'modules':[{name:'maps',version:3,other_params:'sensor=false'}]}"></script>
<script type="text/javascript">
  function init() {
    var mapDiv = document.getElementById('map-canvas');
    var map = new google.maps.Map(mapDiv, {
      center: new google.maps.LatLng(37.790234970864, -122.39031314844),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }

  google.maps.event.addDomListener(window, 'load', init);
</script> 