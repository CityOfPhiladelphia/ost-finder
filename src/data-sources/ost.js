export default {
  id: 'ost',
  type: 'http-get',
  dependent: 'none',
  resettable: false,
  url: 'https://stage.cityspan.com:8080/phillyost/service/getall',
  // url: 'https://api.cityspan.com/phillyost/service/getall',
  options: {
    success: function(data) {
      console.log('ost.js success is running, data:', data);
      let newData = { features: []};
      for (let datum of data) {
        newData.features.push({
          attributes: datum,
          latlng: [ datum.latitude, datum.longitude ],
        });
      }
      return newData;
    },
  },
};
