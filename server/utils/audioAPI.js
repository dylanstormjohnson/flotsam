const fetch = require('node-fetch');

const url = 'https://api.soundstripe.com/v1/songs/%22Dead%20Ends%22';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/vnd.api+json',
    'content-type': 'application/vnd.api+json',
    Authorization: 'Token ${process.env.SOUNDSTRIPE_API_KEY}'
  }
};

const audio = async (query) => {
  try {
    const res = await fetch(url, options);

    const data = await res.json();

    return data;

  } catch (err) {
    console.log(err)
    return err;
  }
}

export default audio;




