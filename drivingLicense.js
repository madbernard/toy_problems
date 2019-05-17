/*
  https://www.codewars.com/kata/driving-licence/javascript

  Task
      The UK driving number is made up from the personal details of the driver. The individual letters and digits can be code using the below information

  Rules
      1–5: The first five characters of the surname (padded with 9s if less than 5 characters)

  6: The decade digit from the year of birth (e.g. for 1987 it would be 8)

  7–8: The month of birth (7th character incremented by 5 if driver is female i.e. 51–62 instead of 01–12)

  9–10: The date within the month of birth

  11: The year digit from the year of birth (e.g. for 1987 it would be 7)

  12–13: The first two initials of the first name and middle name, padded with a 9 if no middle name

  14: Arbitrary digit – usually 9, but decremented to differentiate drivers with the first 13 characters in common. We will always use 9

  15–16: Two computer check digits. We will always use "AA"


  Your task is to code a UK driving license number using an Array of data. The Array will look like

  data = ["John","James","Smith","01-Jan-2000","M"];

  Where the elements are as follows
      0 = Forename

  1 = Middle Name (if any)

  2 = Surname

  3 = Date of Birth (In the format Day Month Year, this could include the full Month name or just shorthand ie September or Sep)

  4 = M-Male or F-Female


  You will need to output the full 16 digit driving license number.

  Good luck and enjoy!
*/
function driver(data) {
  var processed = [];

  var lastName = data[2].slice(0,5);
  if (lastName.length < 5) lastName = lastName.padEnd(5, '9');
  processed.push(lastName);

  var dateArr = data[3].split('-');
  processed.push(dateArr[2][2]);

  var monthToNumberM = {'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06',
    'Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'};
  var monthToNumberF = {'Jan':'51','Feb':'52','Mar':'53','Apr':'54','May':'55','Jun':'56',
    'Jul':'57','Aug':'58','Sep':'59','Oct':'60','Nov':'61','Dec':'62'};
  if (data[4] === 'M') {
    processed.push( monthToNumberM[dateArr[1].slice(0,3)] );
  } else {
    processed.push( monthToNumberF[dateArr[1].slice(0,3)] );
  }

  processed.push(dateArr[0]);
  processed.push(dateArr[2][3]);

  processed.push(data[0][0]);

  var middleInitial = data[1] ? data[1][0] : '9';
  processed.push(middleInitial);

  return (processed.join('') + '9AA').toUpperCase();
}
