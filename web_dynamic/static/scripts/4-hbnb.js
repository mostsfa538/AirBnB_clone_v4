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

  function placesSearch(data = {}) {
    $('.places').empty();
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        response.forEach(function (place) {
          const article = $('<article>');

          const titleBox = $('<div class="title_box">');
          titleBox.append($('<h2>').text(place.name));
          titleBox.append(
            $('<div class="price_by_night">').text('$' + place.price_by_night)
          );

          article.append(titleBox);

          const information = $('<div class="information">');

          information.append(
            $('<div class="max_guest">').text(
              place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '')
            )
          );

          information.append(
            $('<div class="number_rooms">').text(
              place.number_rooms +
                ' Bedroom' +
                (place.number_rooms !== 1 ? 's' : '')
            )
          );

          information.append(
            $('<div class="number_bathrooms">').text(
              place.number_bathrooms +
                ' Bathroom' +
                (place.number_bathrooms !== 1 ? 's' : '')
            )
          );

          article.append(information);

          article.append(
            $('<div class="description">').text(place.description)
          );

          $('.places').append(article);
        });
      },
      error: function (xhr, status, error) {
        console.error(error);
      },
    });
  }
  placesSearch({});

  $('button#search').click(function () {
    placesSearch({ amenities: amenitiesData });
  });
});
