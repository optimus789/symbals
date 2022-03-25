async function getMultiplier(ethAddress) {
  const settings = {
    async: false,
    crossDomain: true,
    url: `/api/getMultiplier/${ethAddress}`,
    method: 'get',
    processData: false,
  };
  $.ajax(settings).done(function (response) {
    console.log('GetMultiplier response: ', response);
    if (response?.data?.rows && response.data.rows.length == 0) {
      multiplier = 1;
    } else if (response?.data?.rows) {
      multiplier = response.data.rows[0][1];
      $('#multiplierString').text(`Multiplier Activated: X${multiplier}`);
    }
    return multiplier;
  });
}

async function setMultiplier(ethAddress, level) {
  const settings = {
    async: false,
    crossDomain: true,
    url: `/api/updateMultiplier/${ethAddress}/${level}`,
    method: 'get',
    processData: false,
  };
  $.ajax(settings).done(function (response) {
    alert('NFT Burned and Multiplier Added!');
  });
}

async function delMultiplier(ethAddress) {
  const settings = {
    async: false,
    crossDomain: true,
    url: `/api/delMultiplier/${ethAddress}`,
    method: 'get',
    processData: false,
  };
  $.ajax(settings).done(function (response) {
    if (response) {
      multiplier = 1;
      $('#multiplierString').text(`Multiplier Disabled`);
    }
  });
}
