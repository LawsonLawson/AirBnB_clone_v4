$(document).ready(function () {
  const amenitiesHeading4 = $('div.amenities h4');
  const amenities = $('div.amenities .popover ul input:checkbox');
  const amenitiesDict = {};

  /* Event listener for checkbox clicks to manage selected amenities */
  amenities.on('click', function () {
    const dataId = $(this).attr('data-id');

    if ($(this).is(':checked')) {
      const dataName = $(this).attr('data-name');
      amenitiesDict[dataId.toString()] = dataName;
    } else {
      delete amenitiesDict[dataId];
    }

    amenitiesHeading4.text(Object.values(amenitiesDict).join(', '));
  });

  /* Get API status and update UI */
  $.get('http://localhost:5001/api/v1/status', (data, status) => {
    if (status === 'success' && data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  /* Send a POST request to the API to fetch places */
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: JSON.stringify({}),
    contentType: 'application/json',
    success: (places_data) => {
      const places = $('section.places');
      places.empty(); /* Clear any existing places */
      for (const place of places_data) {
        const article = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="description">${place.description}</div>
          </article>
        `;
        places.append(article);
      }
    },
    error: () => {
      alert('Failed to retrieve data');
    }
  });
});
