export default function (date) {
  //   return (
  //     new Date(date).getDate() +
  //     ' th ' +
  //     new Date(date).toLocaleString('default', { month: 'long' }) +
  //     ', ' +
  //     new Date(date).getFullYear()
  //   );

  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-US', options); // Saturday, September 17, 2016
}
