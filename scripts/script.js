window.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line strict
  'use strict';

  const valutes = document.querySelector('.valutes'),
    selectRubVal = document.querySelector('.select-rub-val'),
    selectValRub = document.querySelector('.select-val-rub'),
    inputRub = document.getElementById('rub'),
    inputValute = document.getElementById('valute'),
    inputResultRub = document.getElementById('result-rub'),
    inputResultValute = document.getElementById('result-valute');


  const getData = () => fetch('https://www.cbr-xml-daily.ru/daily_json.js');

  const renderValute = valObj => {

    for (const entries of Object.entries(valObj.Valute)) {
      if (entries[0] === 'USD' || entries[0] === 'EUR')
        valutes.insertAdjacentHTML('beforeend', `
          <div>${entries[0]}: <span class="${entries[0]}">${entries[1].Value}</span></div>
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


  const changeValue = (select, input, result, flag) => {
    const usd = document.querySelector('.USD'),
      eur = document.querySelector('.EUR');

    if (flag) {
      if (select.selectedIndex === 1) {
        result.value = (parseFloat(usd.textContent) * +input.value).toFixed(2);
      } else if (select.selectedIndex === 2) {
        result.value = (parseFloat(eur.textContent) * +input.value).toFixed(2);
      } else {
        result.value = 0;
      }
    } else {
      if (select.selectedIndex === 1) {
        result.value = (+input.value / parseFloat(usd.textContent)).toFixed(2);
      } else if (select.selectedIndex === 2) {
        result.value = (+input.value / parseFloat(eur.textContent)).toFixed(2);
      } else {
        result.value = 0;
      }
    }
  };

  selectValRub.addEventListener('change', () => {
    changeValue(selectValRub, inputValute, inputResultValute, 1);
    inputValute.addEventListener('input', () => {
      changeValue(selectValRub, inputValute, inputResultValute, 1);
    });
  });

  selectRubVal.addEventListener('change', () => {
    changeValue(selectRubVal, inputRub, inputResultRub, 0);
    inputRub.addEventListener('input', () => {
      changeValue(selectRubVal, inputRub, inputResultRub, 0);
    });
  });
});
