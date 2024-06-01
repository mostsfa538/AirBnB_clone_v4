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
});
