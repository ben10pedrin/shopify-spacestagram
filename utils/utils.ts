// in order to get the video to loop forever we have to get its id
export const getVideoURLWithParameters = (url: string): string => {
  const newUrl = `${url}&autoplay=1&mute=1&controls=0`;
  const regex = /\/embed\/(.+)\?/;
  const result = url.match(regex);
  if (!result || !result[1]) return newUrl;
  const id = result[1];
  return `${newUrl}&playlist=${id}&loop=1`;
};

export const dateToString = (date: Date) => {
  //https://stackoverflow.com/questions/3552461/how-to-format-a-javascript-date
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "2-digit" });
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });

  return `${year}-${month}-${day}`;
};

export const getDateStringWithOffset = (offset: number): string => {
  //https://stackoverflow.com/questions/5511323/calculate-the-date-yesterday-in-javascript
  let date = new Date();
  date.setDate(date.getDate() - offset);
  return dateToString(date);
};

export const NAVBAR_SIZE = "56px";
