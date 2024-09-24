
export const fetchContacts = () => {
    return fetch('https://randomuser.me/api/?results=50')
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => {
        console.error("Error fetching contacts: ", error);
        return [];
      });
  };
  