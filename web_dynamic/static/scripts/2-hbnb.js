$(document).ready(function () {
  let amenitiesData = {};

  $('.amenities input[type=checkbox]').on('change', function () {
    const amenityId = this.dataset.id;
    const amenityName = this.dataset.name;
    if (this.checked) {
      amenitiesData[amenityId] = amenityName;
    } else {
      delete amenitiesData[amenityId];
    }
    const amenitiesList = Object.values(amenitiesData).join(', ');
    $('.amenities h4').text(amenitiesList);
  });

  const api = 'http://0.0.0.0:5001/api/v1/status/';
  console.log('Res:');
  $.getJSON(api, (data) => {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
      console.log('YES!!!');
    } else {
      $('#api_status').removeClass('available');
      console.log('NO.');
    }
  });
});
