$(document).ready(function () {
  const amenitiesDict = {};

  $('input[type="checkbox"]').change(function () {
    const dataId = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenitiesDict[dataId] = dataName;
    } else {
      delete amenitiesDict[dataId];
    }

    const amenityNames = Object.values(amenitiesDict);
    if (amenityNames.length > 0) {
      $('div.amenities h4').text(amenityNames.join(', '));
    } else {
      $('div.amenities h4').html('&nbsp;');
    }
  });

  $.get('http://localhost:5001/api/v1/status', function(data, status) {
    console.log("GET Request Status:", status);
    console.log("GET Request Data:", data);

    if (status === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      }
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
