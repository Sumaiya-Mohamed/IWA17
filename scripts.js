const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  // Only change the code below this line
  const createArray = (length) => {
    const result = [];
  
    for (let i = 0; i < length; i++) {
      result.push(i);
    }
  
    return result;
  };
  
  const createData = () => {
    const current1 = new Date('April 1, 2023 00:00:00');
    const startDay = current1.getDate(); // startDay will now be the 1st of April.
    const daysInMonth = getDaysInMonth(current1); // there are 31 days.
    const weeks = createArray(5);  // creates an array for the weeks as there are 5 weeks.
    const days = createArray(7); // creates an array for the days as there are 7 days in the week.
    const data = [];
  
    for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
      const week = weeks[weekIndex]; // retrieving the values of the array.
      const weekData = {
        week: week + 1,
        days: []
      };
  
      for (let dayIndex = 0; dayIndex < days.length; dayIndex++) {
        const dayOfWeek = dayIndex + 1;
        const day = (week * 7) + dayOfWeek - startDay;
        const isValid = day > 0 && day <= daysInMonth;
  
        weekData.days.push({
          dayOfWeek,
          value: isValid ? day : null
        });
      }
  
      data.push(weekData);
    }
  
    return data;
  };
  
  const addCell = (existing, classString, value) => {
    return /* html */ `
      <td class="${classString}"  style="${classString.includes('table__cell_today') ? 'color: blue;' : ''}"> 
        ${value}
      </td>
      ${existing}
    `;
  };
  //The style code makes the date number appear in blue.
  
  const createHtml = (data) => {
    let result = '';
  
    for (const weekData of data) {
      let inner = '';
      inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${weekData.week}`);
  
      for (const dayData of weekData.days) {
        const { dayOfWeek, value } = dayData;
        let classString = 'table__cell';
        const today = new Date().getDate() === value;
        const isWeekend = dayOfWeek === 1 || dayOfWeek === 7;
        const isAlternate = weekData.week % 2 !== 0;
  
        if (today) classString += ' table__cell_today table__cell_today-blue'; 
        if (isWeekend) classString += ' table__cell_weekend';
        if (isAlternate) classString += ' table__cell_alternate';
  
        inner = addCell(inner, classString, value || '');
      }
  
      result += `<tr>${inner}</tr>`;
    }
  
    return result;
  };
  
  
  // only change the code above
  const current = new Date();
  document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`;
  
  const data1 = createData();
  document.querySelector('[data-content]').innerHTML = createHtml(data1);