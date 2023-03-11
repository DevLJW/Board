export const getMyDate = (createdate: any) => {
      const date = new Date(createdate);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      //const Hours = date.getHours() - 12;
      //const Minutes = date.getMinutes();
      // const se = date.getSeconds();
      return `${yyyy}-${mm}-${dd}`;
};
