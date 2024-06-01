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
});
