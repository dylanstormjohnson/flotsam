const options = {
  method: 'GET',
  headers: {
    accept: 'application/vnd.api+json',
    'content-type': 'application/vnd.api+json',
    Authorization: 'Token vwHorKgXrg5k30zSGo3GWa8swlVftI9XdYxPejtQwSFVLvAlYqEzNUnnNxzwNBvg'
  }
};
const songExample = '6154'

const audio = async (song) => {
  const url = `https://api.soundstripe.com/v1/songs/${song}`;
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




