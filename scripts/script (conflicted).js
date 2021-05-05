window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line strict
  'use strict';

  const valutes = document.querySelector('.valute'),
    selectValutes = document.querySelectorAll('.select-valutes');
  console.log(selectValutes);

  const getData = () => {
    return fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  };

  const renderValute = valObj => {

    for (const entries of Object.entries(valObj.Valute)) {

      if (entries[0] === 'USD' || entries[0] === 'EUR')
        valutes.insertAdjacentHTML('beforeend', `
          <div class="${entries[0]}">${entries[0]}: ${entries[1].Value}</div>
        `);
    }
  };

  getData()
    .then(response => {
      if (response.status !== 200) {
        throw new Error('status Network not 200');
      }
      return (response.json());
    })
    .then(data => {
      renderValute(data);
    })
    .catch(error => console.error(error));
});
